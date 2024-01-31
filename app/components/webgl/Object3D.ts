import { mat4 } from 'gl-matrix';
import { MeshWithBuffers } from 'webgl-obj-loader';
import { createBarycentricBuffer } from './Buffers';

export type Object3D = {
  buffers: MeshWithBuffers,
	barycentricCoords: WebGLBuffer,
  localPosition: mat4
};

export function createObject(gl: WebGLRenderingContext, buffers: MeshWithBuffers): Object3D | null {
	const bCoords = calculateBarycentricCoords(buffers.vertices.length)
	const bCoordsBuffer = createBarycentricBuffer(gl, bCoords)
	if (bCoordsBuffer == null) {
		console.error("Failed to create WebGL buffer for barycentric coordinates");
		return null;
	}
  return {
    buffers,
		barycentricCoords: bCoordsBuffer,
    localPosition: mat4.create(),
  };
}

function calculateBarycentricCoords(length: number): Float32Array {
	const n = length / 6;
	const barycentricCoords = []
	for (let i = 0; i < n; i++)
		barycentricCoords.push(1, 0, 0, 0, 1, 0, 0, 0, 1)
	return new Float32Array(barycentricCoords)
}
