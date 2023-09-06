attribute vec4 aVertexPosition;
attribute vec4 aVertexColor;
attribute vec3 aVertexNormal;
attribute vec3 aBarycentricCoords;

uniform mat4 uModelViewMatrix;
uniform mat4 uWorldMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uNormalMatrix;

//varying lowp vec4 vColor;
varying highp vec3 vNormal;
varying highp vec3 vFragPos;
varying highp vec3 vbc;

void main(void) {
	vbc = aBarycentricCoords;
  gl_Position = uProjectionMatrix * uWorldMatrix * uModelViewMatrix * aVertexPosition;

  //vColor = aVertexColor;
  vNormal = mat3(uNormalMatrix) * aVertexNormal;
  vFragPos = vec3(uModelViewMatrix * aVertexPosition);
}