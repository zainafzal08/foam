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
  name: 'RadioOptionView',
  package: 'foam.ui.md',
  extendsModel: 'foam.ui.SimpleView',
  documentation: "A single radio button",

  requires: [ 'foam.ui.md.SharedStyles' ],
  
  properties: [
    {
      name: 'data',
      documentation: "The selected value from the radio button group. If it equals $$DOC{ref:'.value'}, this is selected.",
      postSet: function(old,nu) {
        console.log("set ", nu);
      }
    },
    {
      name: 'value',
      documentation: "The value that this option represents. If clicked this value is set on $$DOC{ref:'.data'}."
    },
    {
      name: 'label',
      defaultValueFn: function() { return this.value; }
    },
    {
      name: 'className',
      defaultValue: 'checkbox-container'
    },
    {
      name: 'enabled',
      defaultValue: true
    }
  ],
  
  templates: [
    function CSS() {/*    
      
      #checkbox-container {
        display: inline-block;
        white-space: nowrap;
        position: relative;
      }
      
      #checkbox-container(:focus) {
        outline: none;
      }
      
      #radioContainer {
        position: relative;
        width: 16px;
        height: 16px;
        cursor: pointer;
      }
      
      #radioContainer.labeled {
        display: inline-block;
        vertical-align: middle;
      }
      
      #ink {
        position: absolute;
        top: -16px;
        left: -16px;
        width: 48px;
        height: 48px;
        color: #5a5a5a;
      }
      
      #ink[checked] {
        color: #0f9d58;
      }
      
      #offRadio {
        position: absolute;
        top: 0px;
        left: 0px; 
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: solid 2px;
        border-color: #5a5a5a;
        transition: border-color 0.28s;
      }

      .checkbox-background {
        display: inline-block;
        white-space: nowrap;
        position: relative;
      }
      .checkbox-background.checked #offRadio {
        border-color: #4285f4;
      }
      
      #onRadio {
        position: absolute;
        top: 4px;
        left: 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #4285f4;
        -webkit-transform: scale(0);
        transform: scale(0);
        transition: -webkit-transform ease 0.28s;
        transition: transform ease 0.28s;
      }
      
      .checkbox-background.checked #onRadio {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
      
      .radioLabel {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
        white-space: normal;
        pointer-events: none;
      }
      
      .radioLabel.hidden {
        display: none;
      }
      
      .checkbox-background.disabled {
        pointer-events: none;
      }
      
      .checkbox-background.disabled #offRadio,
      .checkbox-background.disabled #onRadio {
        opacity: 0.33;
      }
      
      .checkbox-background.disabled #offRadio {
        border-color: #5a5a5a;
      }
      
      .checkbox-background.disabled .checkbox-background.checked #onRadio {
        background-color: #5a5a5a;
      }

    */},
    function toHTML() {/*
      <div id="%%id" <%= this.cssClassAttr() %>>
        <div id="<%=this.id%>-background" class="checkbox-background">
          <div id="radioContainer" class="labeled">
            <div id="onRadio"></div>
            <div id="offRadio"></div>
          </div>
          <div class="radioLabel">$$label{ mode: 'read-only' }</div>
        </div>
      </div>
      <%
        this.on('click', function() { if ( self.enabled ) self.data = self.value; }, this.id);
        this.setClass('checked', function() { return equals(self.data, self.value); },
            this.id + '-background');
        this.setClass('disabled', function() { return !self.enabled; },
            this.id + '-background');
      %>
    */}
  ]
});