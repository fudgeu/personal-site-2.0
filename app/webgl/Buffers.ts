export type BufferContainer = {
  positions: WebGLBuffer,
  colors: WebGLBuffer,
  indices: WebGLBuffer,
  normals: WebGLBuffer
};

export function createBarycentricBuffer(gl: WebGLRenderingContext, coords: Float32Array): WebGLBuffer | null {
	const bCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, bCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, coords, gl.STATIC_DRAW);
	return bCoordBuffer;
}

function initPositionBuffer(gl: WebGLRenderingContext): WebGLBuffer | null {
  const positionBuffer = gl.createBuffer();

  // set the position buffer as the buffer to gl to perform operations on
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const positions = [
    // Front face
    -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,

    // Back face
    -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,

    // Top face
    -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,

    // Right face
    1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,

    // Left face
    -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
  ];

  // supply position buffer with positions
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // return gl buffer with positions supplied
  return positionBuffer;
}

function initIndexBuffer(gl: WebGLRenderingContext): WebGLBuffer | null {
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.

  const indices = [
    0,
    1,
    2,
    0,
    2,
    3, // front
    4,
    5,
    6,
    4,
    6,
    7, // back
    8,
    9,
    10,
    8,
    10,
    11, // top
    12,
    13,
    14,
    12,
    14,
    15, // bottom
    16,
    17,
    18,
    16,
    18,
    19, // right
    20,
    21,
    22,
    20,
    22,
    23, // left
  ];

  // Now send the element array to GL

  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW,
  );

  return indexBuffer;
}

function initColorBuffers(gl: WebGLRenderingContext): WebGLBuffer | null {
  const faceColors = [
    [1.0, 1.0, 1.0, 1.0], // Front face: white
    [1.0, 1.0, 1.0, 1.0], // Back face: red
    [1.0, 1.0, 1.0, 1.0], // Top face: green
    [1.0, 1.0, 1.0, 1.0], // Bottom face: blue
    [1.0, 1.0, 1.0, 1.0], // Right face: yellow
    [1.0, 1.0, 1.0, 1.0], // Left face: purple
  ];

  // Convert the array of colors into a table for all the vertices.

  let colors: number[] = [];

  for (let j = 0; j < faceColors.length; ++j) {
    const c = faceColors[j];
    // Repeat each color four times for the four vertices of the face
    colors = colors.concat(c, c, c, c);
  }

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return colorBuffer;
}

function initNormalBuffer(gl: WebGLRenderingContext): WebGLBuffer | null {
  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

  const vertexNormals = [
    // Front
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,

    // Back
    0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,

    // Top
    0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,

    // Bottom
    0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,

    // Right
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,

    // Left
    -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);

  return normalBuffer;
}

export default function initBuffers(gl: WebGLRenderingContext): BufferContainer | null {
  // create a buffer containing the positions of vertices to render
  const positionBuffer = initPositionBuffer(gl);

  if (positionBuffer == null) {
    console.error('Failed to initialize buffers, position buffer is empty');
    return null;
  }

  const colorBuffer = initColorBuffers(gl);

  if (colorBuffer == null) {
    console.error('Failed to initialize buffers, color buffer is empty');
    return null;
  }

  const indexBuffer = initIndexBuffer(gl);

  if (indexBuffer == null) {
    console.error('Failed to initialize buffers, index buffer is empty');
    return null;
  }

  const normalBuffer = initNormalBuffer(gl);

  if (normalBuffer == null) {
    console.error('Failed to initalize buffers, noraml buffer is empty');
    return null;
  }

  return {
    positions: positionBuffer,
    colors: colorBuffer,
    indices: indexBuffer,
    normals: normalBuffer,
  };
}
