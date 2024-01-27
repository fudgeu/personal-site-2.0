'use client';

import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import initShaderProgram, { ProgramInfo } from '@/app/new-components/webgl/Shaders';
import drawScene from '@/app/new-components/webgl/DrawScene';
import {
  World,
  WorldObject
} from '@/app/new-components/webgl/World';
import { Object3D, createObject } from '@/app/new-components/webgl/Object3D';
import { mat4 } from 'gl-matrix';
import { MeshWithBuffers, OBJ } from 'webgl-obj-loader';
import styles from './style.module.css';

type ModelResult = {
  model: MeshWithBuffers,
  id: string
};

type MainGLProps = {
  model: string,
};

let lastUsedShape = 'torus';
let then = 0;
let introAnimProgress = 1;

export default function BackgroundGL({ model }: MainGLProps) {
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [world, _] = useState(new World());

  /* Parallax effect */
  const doParallaxEffect = useCallback(() => {
    world.getObjects().forEach(({ worldPosition }: WorldObject) => {
      const xOffset = lastMousePos.current.x - mousePos.current.x;
      const yOffset = lastMousePos.current.y - mousePos.current.y;
      mat4.translate(
        worldPosition,
        worldPosition,
        [0.0004 * xOffset, -0.0004 * yOffset, 0]
      );
    });
  }, [world]);

  /* Mouse pos */
  const mousePos = useRef({x: 0, y: 0});
  const lastMousePos = useRef({x: 0, y: 0});
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      lastMousePos.current = mousePos.current;
      mousePos.current = {x: event.clientX, y: event.clientY};
      doParallaxEffect();
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  });

  const ref = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRequestRef = useRef<number>();

  // Render WebGL
  const render = useCallback((now: number, gl: WebGLRenderingContext, prgmInfo: ProgramInfo) => {
    now *= 0.001;
    const delta = now - then;
    then = now;

    // rotate shape
    world.getObjects().forEach(({ object, worldPosition }: WorldObject) => {
      mat4.rotate(object.localPosition, object.localPosition, 0.01, [0, 0, 1]);
      mat4.translate(worldPosition, worldPosition, [0.01, 0, 0]);

      if (introAnimProgress < 100) {
        mat4.translate(worldPosition, worldPosition, [0, 0, -(0.02 * introAnimProgress * (100 - introAnimProgress)) * delta]);
      }

      if (worldPosition[12] > 100) {
        worldPosition[12] = -100;
      }
    });

    introAnimProgress += (0.02 * introAnimProgress * (100 - introAnimProgress)) * delta;

    drawScene(gl, prgmInfo, world);
    animationRequestRef.current = requestAnimationFrame((newTime) => render(newTime, gl, prgmInfo),);
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
    async (gl: WebGLRenderingContext, vertexSrc: string, fragmentSrc: string,): Promise<ProgramInfo> => {
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

      const modelsArray = Array.from(models.values());
      for (let i = 0; i < 400; i++) {
        const model = modelsArray[Math.floor(Math.random() * modelsArray.length)];
        const worldObj = createObject(gl, model);
        if (worldObj == null) continue;
        mat4.rotate(worldObj.localPosition, worldObj.localPosition, Math.PI / 2, [1, 1, 0]);

        const scale = 0.1;
        mat4.scale(worldObj.localPosition, worldObj.localPosition, [scale, scale, scale]);

        const x = Math.random() * 200 - 100;
        const y = Math.random() * 100 - 50;
        const z = -Math.random() * 100 + 85;

        const objPos = mat4.create();
        mat4.translate(objPos, objPos, [x, y, z]);

        world.addObject(worldObj, objPos);
      }
    },
    [world],
  );

  // begin init
  useEffect((): () => void => {
    // load gl
    const gl = ref.current?.getContext('webgl');
    if (gl == null) return () => {};
    gl.getExtension('OES_standard_derivatives');
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // load models, then world

    let loadList = [];
    if (model === 'all') {
      loadList = [
        loadModel(gl, 'sphere', './sphere.obj'),
        loadModel(gl, 'cube', './cube.obj'),
        loadModel(gl, 'ico', './ico.obj'),
        loadModel(gl, 'torus', './torus.obj'),
      ];
    } else {
      loadList = [
        loadModel(gl, model, `./${model}.obj`)
      ];
    }

    Promise.all([
      ...loadList
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
        animationRequestRef.current = requestAnimationFrame((time) => render(time, gl, programInfo),);
      })
      .catch((err) => {
        console.error(`Failed to initialize WebGL - shader init failed: ${err}`);
      });

    return () => {
      if (animationRequestRef.current == null) return;
      cancelAnimationFrame(animationRequestRef.current);
    };
  }, [loadShader, loadModel, loadWorld, render, model]);

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
    <div className={styles.bkgContainer} ref={containerRef}>
      <canvas className={styles.bkgCanvas} width={containerDimensions.width} height={containerDimensions.height} ref={ref} />
    </div>
  );
}
