/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

CLASS({
  package: 'foam.graphics.webgl',
  name: 'Scene',
  requires: ['foam.graphics.webgl.SylvesterLib'],
  extendsModel: 'foam.graphics.CView',

  exports: [ 
    'gl',
    'positionMatrix',
    'projectionMatrix'
  ],

  properties: [
    {
      name: 'positionMatrix'
    },
    {
      name: 'projectionMatrix'
    }
  ],

  methods: [
    function: init() {
      this.SylvesterLib.create();
    }
    
    function paintSelf() {
      var gl = this.gl;
      if ( ! gl ) return;
      
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
      perspectiveMatrix = this.makePerspective(45, 640.0/480.0, 0.1, 100.0);
      this.loadIdentity();
      this.mvTranslate([-0.0, 0.0, -6.0]);
  
      // children can now draw
    },
    
///////////////////// from MDN demo

    function loadIdentity() {
      this.positionMatrix = Matrix.I(4);
    },

    function multMatrix(m) {
      this.positionMatrix = this.positionMatrix.x(m);
    },

    function mvTranslate(v) {
      multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
    },

    function setMatrixUniforms() {
      var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
      gl.uniformMatrix4fv(pUniform, false, new Float32Array(this.projectionMatrix.flatten()));

      var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
      gl.uniformMatrix4fv(mvUniform, false, new Float32Array(this.positionMatrix.flatten()));
    },
/////////////////////
    
    //
    // gluLookAt
    //
    function makeLookAt(ex, ey, ez,
                        cx, cy, cz,
                        ux, uy, uz)
    {
        var eye = $V([ex, ey, ez]);
        var center = $V([cx, cy, cz]);
        var up = $V([ux, uy, uz]);

        var mag;

        var z = eye.subtract(center).toUnitVector();
        var x = up.cross(z).toUnitVector();
        var y = z.cross(x).toUnitVector();

        var m = $M([[x.e(1), x.e(2), x.e(3), 0],
                    [y.e(1), y.e(2), y.e(3), 0],
                    [z.e(1), z.e(2), z.e(3), 0],
                    [0, 0, 0, 1]]);

        var t = $M([[1, 0, 0, -ex],
                    [0, 1, 0, -ey],
                    [0, 0, 1, -ez],
                    [0, 0, 0, 1]]);
        return m.x(t);
    },

    //
    // glOrtho
    //
    function makeOrtho(left, right,
                       bottom, top,
                       znear, zfar)
    {
        var tx = -(right+left)/(right-left);
        var ty = -(top+bottom)/(top-bottom);
        var tz = -(zfar+znear)/(zfar-znear);

        return $M([[2/(right-left), 0, 0, tx],
                   [0, 2/(top-bottom), 0, ty],
                   [0, 0, -2/(zfar-znear), tz],
                   [0, 0, 0, 1]]);
    },

    //
    // gluPerspective
    //
    function makePerspective(fovy, aspect, znear, zfar)
    {
        var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
        var ymin = -ymax;
        var xmin = ymin * aspect;
        var xmax = ymax * aspect;

        return makeFrustum(xmin, xmax, ymin, ymax, znear, zfar);
    },

    //
    // glFrustum
    //
    function makeFrustum(left, right,
                         bottom, top,
                         znear, zfar)
    {
        var X = 2*znear/(right-left);
        var Y = 2*znear/(top-bottom);
        var A = (right+left)/(right-left);
        var B = (top+bottom)/(top-bottom);
        var C = -(zfar+znear)/(zfar-znear);
        var D = -2*zfar*znear/(zfar-znear);

        return $M([[X, 0, A, 0],
                   [0, Y, B, 0],
                   [0, 0, C, D],
                   [0, 0, -1, 0]]);
    },

    //
    // glOrtho
    //
    function makeOrtho(left, right, bottom, top, znear, zfar)
    {
        var tx = - (right + left) / (right - left);
        var ty = - (top + bottom) / (top - bottom);
        var tz = - (zfar + znear) / (zfar - znear);

        return $M([[2 / (right - left), 0, 0, tx],
               [0, 2 / (top - bottom), 0, ty],
               [0, 0, -2 / (zfar - znear), tz],
               [0, 0, 0, 1]]);
    }
    
  ]

});