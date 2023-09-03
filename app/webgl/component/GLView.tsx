'use client';

import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import initShaderProgram, { ProgramInfo } from '@/app/webgl/Shaders';
import drawScene from '@/app/webgl/DrawScene';
import {
  WorldObject, addWorldObject, clearWorldObjects, getWorldObjects,
} from '@/app/webgl/World';
import { Object3D, createObject } from '@/app/webgl/Object3D';
import { mat4 } from 'gl-matrix';
import { MeshWithBuffers, OBJ } from 'webgl-obj-loader';
import styles from './style.module.css';

type ModelResult = {
  model: MeshWithBuffers,
  id: string
};

export default function GLView() {
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  const ref = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRequestRef = useRef<number>();

  // Render WebGL
  const render = useCallback((time: number, gl: WebGLRenderingContext, prgmInfo: ProgramInfo) => {

		// rotate shape
		getWorldObjects().forEach(({ object, worldPosition }: WorldObject) => {
			mat4.rotate(object.localPosition, object.localPosition, 0.01, [1, 0.7, 1])
		});

    drawScene(gl, prgmInfo);
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
      clearWorldObjects();

      const sphere = models.get('sphere');
      if (sphere === undefined) {
        console.log('Could not load world, sphere model not loaded');
        return;
      }

      const cube = models.get('cube');
      if (cube === undefined) {
        console.log('Could not load world, cube model not loaded');
        return;
      }

      const iso = models.get('iso');
      const torus = models.get('torus');
			if (torus === undefined) {
        console.log('Could not load world, torus model not loaded');
        return;
      }


      const cube1: Object3D = createObject(torus);
      mat4.rotate(cube1.localPosition, cube1.localPosition, Math.PI / 2, [1, 1, 0]);
      mat4.scale(cube1.localPosition, cube1.localPosition, [1.5, 1.5, 1.5]);
      const cube1Pos = mat4.create();
      mat4.translate(cube1Pos, cube1Pos, [0, 0, -10]);


      addWorldObject(cube1, cube1Pos);
    },
    [],
  );

  // begin init
  useEffect((): () => void => {
    // load gl
    const gl = ref.current?.getContext('webgl');
    if (gl == null) return () => {};
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // load models, then world
    Promise.all([
      loadModel(gl, 'sphere', './sphere.obj'),
      loadModel(gl, 'cube', './cube.obj'),
      loadModel(gl, 'iso', './iso.obj'),
      loadModel(gl, 'torus', './torus.obj'),
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
