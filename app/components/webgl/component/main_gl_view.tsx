'use client';

import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import initShaderProgram, { ProgramInfo } from '@/app/components/webgl/Shaders';
import drawScene from '@/app/components/webgl/DrawScene';
import {
	World,
  WorldObject
} from '@/app/components/webgl/World';
import { Object3D, createObject } from '@/app/components/webgl/Object3D';
import { mat4 } from 'gl-matrix';
import { MeshWithBuffers, OBJ } from 'webgl-obj-loader';
import styles from './style.module.css';

type ModelResult = {
  model: MeshWithBuffers,
  id: string
};

type MainGLProps = {
	mouseX: number,
	mouseY: number,
}

let lastUsedShape = "torus"

export default function MainGLView({ mouseX, mouseY }: MainGLProps) {
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [world, setWorld] = useState(new World());
	const [lastMousePos, setLastMousePos] = useState({x: 0, y: 0});

  const ref = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRequestRef = useRef<number>();

  // Render WebGL
  const render = useCallback((time: number, gl: WebGLRenderingContext, prgmInfo: ProgramInfo) => {

		// rotate shape
		world.getObjects().forEach(({ object, worldPosition }: WorldObject) => {
			mat4.rotate(object.localPosition, object.localPosition, 0.005, [0, 0, 1])
		});

    drawScene(gl, prgmInfo, world);
    animationRequestRef.current = requestAnimationFrame(
      (newTime) => render(newTime, gl, prgmInfo),
    );
  }, []);

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

	// Change shape every few seconds
	const changeShapeEffect = useCallback((gl: WebGLRenderingContext, models: Map<string, MeshWithBuffers>) => {
		world.clearObjects();
		
		const shapeArray = Array.from(models)
		let shapeName: string;
		let shape: MeshWithBuffers;
		do {
			const shapeEntry = shapeArray[Math.floor(Math.random() * shapeArray.length)]
			shapeName = shapeEntry[0]
			shape = shapeEntry[1]
		} while (shapeName === lastUsedShape)

		lastUsedShape = shapeName;

		if (shape === undefined) {
			console.log('Unable to load shape');
			return;
		}

		const shape2 = createObject(gl, shape);
		if (shape2 == null) {
			console.error("Could not create Object3D")
			return
		}
		mat4.scale(shape2.localPosition, shape2.localPosition, [2.5, 2.5, 2.5]);
		mat4.rotate(shape2.localPosition, shape2.localPosition, Math.PI / 2, [1, -1, 0]);
		const shape2Pos = mat4.create();
		mat4.translate(shape2Pos, shape2Pos, [0, 0, -10]);

		world.addObject(shape2, shape2Pos);

		setLastMousePos({x: 0, y: 0})

		const timeoutId = setTimeout(() => {changeShapeEffect(gl, models)}, 5000)
		return () => { clearTimeout(timeoutId) }
	},
	[world]
	);

	// Load World
  const loadWorld = useCallback(
    (gl: WebGLRenderingContext, models: Map<string, MeshWithBuffers>) => {
      world.clearObjects();

			const ico = models.get('ico');
			if (ico === undefined) {
        console.log('Could not load world, icosphere model not loaded');
        return;
      }

			const shape2 = createObject(gl, ico);
			if (shape2 == null) {
				console.error("Could not create Object3D")
				return
			}
      mat4.scale(shape2.localPosition, shape2.localPosition, [2.5, 2.5, 2.5]);
      mat4.rotate(shape2.localPosition, shape2.localPosition, Math.PI / 2, [1, -1, 0]);
      const shape2Pos = mat4.create();
      mat4.translate(shape2Pos, shape2Pos, [0, 0, -10]);

      world.addObject(shape2, shape2Pos);

			setTimeout(() => {changeShapeEffect(gl, models)}, 5000)
    },
    [changeShapeEffect, world],
  );

  // begin init
  useEffect((): () => void => {
    // load gl
    const gl = ref.current?.getContext('webgl');
    if (gl == null) return () => {};
		gl.getExtension('OES_standard_derivatives')
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // load models, then world
    Promise.all([
      loadModel(gl, 'sphere', './sphere.obj'),
      //loadModel(gl, 'cube', './cube.obj'),
      loadModel(gl, 'ico', './ico.obj'),
      loadModel(gl, 'torus', './torus.obj'),
      //loadModel(gl, 'stage', './stage.obj'),
      //loadModel(gl, 'circles', './circles.obj'),
      //loadModel(gl, 'kz', './stoodl_axo.obj'),
      //loadModel(gl, 'shadow', './shadow.obj'),
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
