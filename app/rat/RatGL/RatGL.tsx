'use client';

import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import initShaderProgram, { ProgramInfo } from '@/app/components/webgl/Shaders';
import drawScene from '@/app/components/webgl/DrawScene';
import {
	World,
  WorldObject,
} from '@/app/components/webgl/World';
import { Object3D, createObject } from '@/app/components/webgl/Object3D';
import { mat4 } from 'gl-matrix';
import { MeshWithBuffers, OBJ } from 'webgl-obj-loader';
import styles from './styles.module.css';

type ModelResult = {
  model: MeshWithBuffers,
  id: string
};

let lastUsedShape = "torus"

/* there will usually only be 1 instance of this element per page + using state for interactivity is not feasible */
let mousePos = {x: 0, y: 0}
let lastMousePos = {x: 0, y: 0}
let mouseUpdateWaiting = false
let isMouseButtonDown = false

export default function ShadowGL() {
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [world, setWorld] = useState(new World());

  const ref = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRequestRef = useRef<number>();

	// Mouse position
	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			lastMousePos = {x: mousePos.x, y: mousePos.y}
			mousePos = {x: event.clientX, y: event.clientY}
			mouseUpdateWaiting = true;
		}
		window.addEventListener('mousemove', handleMouseMove)
		return () => window.removeEventListener('mousemove', handleMouseMove)
	}, [])

	// Mouse down
	useEffect(() => {
		const handleMouseDown = (event: MouseEvent) => {
			if (event.button == 0) {
				isMouseButtonDown = true
			}
		}
		window.addEventListener("mousedown", handleMouseDown);
		return () => window.removeEventListener("mousedown", handleMouseDown)
	}, [])

	// Mouse up
	useEffect(() => {
		const handleMouseDown = (event: MouseEvent) => {
			if (event.button == 0) {
				isMouseButtonDown = false
			}
		}
		window.addEventListener("mouseup", handleMouseDown);
		return () => window.removeEventListener("mouseup", handleMouseDown)
	}, [])

  // Render WebGL
  const render = useCallback((time: number, gl: WebGLRenderingContext, prgmInfo: ProgramInfo) => {

		// rotate shape
		world.getObjects().forEach(({ object, worldPosition }: WorldObject) => {
			mat4.rotate(object.localPosition, object.localPosition, 0.01, [0, 1, 0])
		});

		// check for drag, rotate further
		if (isMouseButtonDown && mouseUpdateWaiting) {
			const deltaX = lastMousePos.x - mousePos.x
			const deltaY = lastMousePos.y - mousePos.y
			world.getObjects().forEach(({ object, worldPosition }: WorldObject) => {
				mat4.rotate(object.localPosition, object.localPosition, -0.02 * deltaX, [0, 1, 0])
				mat4.rotate(worldPosition, worldPosition, -0.02 * deltaY, [1, 0, 0])
			});
			mouseUpdateWaiting = false;
		}

    drawScene(gl, prgmInfo, world);
    animationRequestRef.current = requestAnimationFrame(
      (newTime) => render(newTime, gl, prgmInfo),
    );
		return () => {if (animationRequestRef.current) cancelAnimationFrame(animationRequestRef.current)}
  }, [world]);

  // Init WebGL
  const loadModel = useCallback(
    async (gl: WebGLRenderingContext, id: string, location: string): Promise<ModelResult> => {
      const response = await fetch(location);
      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

      const rawObj = await response.text();
      const rawModel = new OBJ.Mesh(rawObj);
      const model = OBJ.initMeshBuffers(gl, rawModel);

      return { model, id };
    },
    [],
  );

	// Load Shader
  const loadShader = useCallback(
    async (
      gl: WebGLRenderingContext, vertexSrc: string, fragmentSrc: string,
    ): Promise<ProgramInfo> => {
      const [vertexResponse, fragmentResponse] = await Promise.all([
        fetch(vertexSrc),
        fetch(fragmentSrc),
      ]);

      if (!vertexResponse.ok) throw new Error(`Vertex Shader HTTP Error: ${vertexResponse.status}`);
      if (!fragmentResponse.ok) throw new Error(`Fragment Shader HTTP Error: ${fragmentResponse.status}`);

      const [vertexText, fragmentText] = await Promise.all([
        vertexResponse.text(),
        fragmentResponse.text(),
      ]);

      // create shader program from source
      const shaderProgram = initShaderProgram(gl, vertexText, fragmentText);

      if (shaderProgram == null) {
        throw new Error('Shader program compilation failed');
      }

      // grab shader attribute and uniform locations
      return {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
          vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
					barycentricCoords: gl.getAttribLocation(shaderProgram, 'aBarycentricCoords')
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
          modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
          worldMatrix: gl.getUniformLocation(shaderProgram, 'uWorldMatrix'),
          normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
        },
      };
    },
    [],
  );


	// Load World
  const loadWorld = useCallback(
    (gl: WebGLRenderingContext, models: Map<string, MeshWithBuffers>) => {
      world.clearObjects();

			const shadow = models.get('4krat');
			if (shadow === undefined) {
        console.log('Could not load world, circle model not loaded');
        return;
      }

			const shape2 = createObject(gl, shadow);
			if (shape2 == null) {
				console.error("Could not create Object3D")
				return
			}
      mat4.scale(shape2.localPosition, shape2.localPosition, [1, 1, 1]);
      const shape2Pos = mat4.create();
      mat4.translate(shape2Pos, shape2Pos, [0, 0, -10]);

      world.addObject(shape2, shape2Pos);
    },
    [world],
  );

  // begin init
  useEffect((): () => void => {
    // load gl
    const gl = ref.current?.getContext('webgl', {antialias: true});
    if (gl == null) return () => {};
		gl.getExtension('OES_standard_derivatives')
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // load models, then world
    Promise.all([
      loadModel(gl, '4krat', './4krat.obj'),
    ])
      .then((models) => {
        // register each loaded model
        const loadedModels = new Map<string, MeshWithBuffers>();
        models.forEach((model: ModelResult) => {
          loadedModels.set(model.id, model.model);
        });
        loadWorld(gl, loadedModels);
      })
      .catch((err) => {
        console.error(`Failed to load 3D models: ${err}`);
      });

    // load shader, then begin render
    loadShader(gl, './vertex.glsl', './fragment.glsl')
      .then((programInfo) => {
        animationRequestRef.current = requestAnimationFrame(
          (time) => render(time, gl, programInfo),
        );
      })
      .catch((err) => {
        console.error(`Failed to initialize WebGL - shader init failed: ${err}`);
      });

    return () => {
      if (animationRequestRef.current == null) return;
      cancelAnimationFrame(animationRequestRef.current);
    };
  }, [loadShader, loadModel, loadWorld, render]);

  // Handle Resize
  useEffect(() => {
    function handleResize() {
      setContainerDimensions({ width: containerRef.current?.clientWidth ?? 0, height: containerRef.current?.clientHeight ?? 0 });
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setContainerDimensions]);

  return (
    <div className={styles.container} ref={containerRef}>
      <canvas className={styles.canvas} width={containerDimensions.width} height={containerDimensions.height} ref={ref} />
    </div>
  );
}
