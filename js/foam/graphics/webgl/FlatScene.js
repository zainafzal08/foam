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
  name: 'FlatScene',
  extendsModel: 'foam.graphics.webgl.Scene',

  properties: [
    {
      name: 'fov',
      help: 'Field-of-view in degrees.',
      defaultValue: 0
    },
    {
      name: 'cameraDistance',
      help: 'Units to back the camera away from the XY plane.',
      defaultValue: 0
    },
  ],

  listeners: [
    {
      name: 'updateProjection',
      code: function() {
        this.projectionMatrix.flat = this.makeOrtho(
          0,this.view.width,this.view.height,0,-2000.0,2000.0);
      }
    }
  ],


});