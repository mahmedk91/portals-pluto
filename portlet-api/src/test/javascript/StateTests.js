/*  Licensed to the Apache Software Foundation (ASF) under one
 *  or more contributor license agreements.  See the NOTICE file
 *  distributed with this work for additional information
 *  regarding copyright ownership.  The ASF licenses this file
 *  to you under the Apache License, Version 2.0 (the
 *  "License"); you may not use this file except in compliance
 *  with the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the License is distributed on an
 *  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, either express or implied.  See the License for the
 *  specific language governing permissions and limitations
 *  under the License.
 */

/**
 * This is Jasmine test code for the Portlet Hub.
 * <p>
 * Since the portlet hub does not get reinitialized, its state is
 * maintained throughout the testing. The tests are constructed so that
 * by the end of module execution, any listeners that are added in the 
 * earlier portions of the test are removed.
 */


describe('The Portlet Hub provides accessor functions for the render state and parameters.',function(){
   'use strict'

   // get the portlet IDs provided by the system under test. The function must
   // return a string array of portlet IDs that are known to the portlet hub being 
   // tested. Portlets:
   //                private parms        public parms             Render data
   //                =============        ============             ===========
   //    portletA      parm1, parm2             -                     -   
   //    portletB      parm1, parm2       pubparm1                    -   
   //    portletC      parm1, parm2       pubparm1, pubparm2          -
   //    portletD      parm2, pubparm1    pubparm2                    -
   //    portletE      parm1, parm2       pubparm1, pubparm2          -
   //    portletF           -                   -                     -   
   var portletIds = portlet.test.getIds(),                      
   portletA = portletIds[0],                                
   portletB = portletIds[1],                                 
   portletC = portletIds[2],                                 
   portletD = portletIds[3],                                 

   // Test data provided by the portlet hub
   pageState = portlet.test.getInitData(),                  


   // Tests in this module need following portlets. register them.
   // These variables provide linkage between the "describe" sections
   hubA;

   describe('The portlet hub is initialized for the tests: ',function(){

      it('initializes a portlet hub instance for portlet A',function(){
         var testFunc = function () {
            return portlet.register(portletA);
         }
         var ph = new portlet.jasmine.PromiseHandler(testFunc);
         runs(ph.getRun());
         waitsFor(ph.getIsComplete(), "The PortletInit object should be returned", 1000);
         runs(ph.getChecker()); 
         runs(function() {
            expect(ph.result).toBeDefined();
         }); 
         runs(function() {
            hubA = ph.result;
         }); 
      });

   });

   
   describe('The portlet hub newParameters function: ', function () {

      // The tests in this section use just a single portlet - portletA
      var cbA = new portlet.jasmine.JasminePortletUtils('SimulateCommError', pageState);

      // add an osc handler for the test
      beforeEach(function () {
         cbA.complete = false;
         runs(function() {
            cbA.oscHandle = hubA.addEventListener("portlet.onStateChange", cbA.getListener());
         }); 
         waitsFor(cbA.getIsComplete(), "The onStateChange callback should be called", 100);
         runs(function() {
            cbA.complete = false;    // in prep for the actual test
         }); 
      });

      // remove the osc handler added during the test
      afterEach(function () {
         if (cbA.oscHandle !== null) {
            hubA.removeEventListener(cbA.oscHandle);
            cbA.oscHandle = null;
         }
      });

      it('is present in the register return object and is a function', function () {
         expect(typeof hubA.newParameters).toEqual('function');
      });

      it('returns a Parameters object containing the required functions', function () {
         var p;
         runs(function() {
            p = hubA.newParameters();
            expect(typeof p).toEqual('object');
            expect(typeof p.clone).toEqual('function');
            expect(typeof p.setValue).toEqual('function');
            expect(typeof p.setValues).toEqual('function');
            expect(typeof p.getValue).toEqual('function');
            expect(typeof p.getValues).toEqual('function');
            expect(typeof p.remove).toEqual('function');
         }); 
      });

      it('returns a Parameters object containing no parameters', function () {
         var p, key, cnt = 0;
         runs(function() {
            p = hubA.newParameters();
            for (key in p) {
               expect(p.hasOwnProperty(key)).toEqual(false);
               if (p.hasOwnProperty(key)){
                  cnt++;
               }
            }
            expect(cnt).toEqual(0);
         }); 
      });

      it('returns a Parameters object containing no parameters', function () {
         var p, key, cnt = 0;
         runs(function() {
            p = hubA.newParameters();
            for (key in p) {
               expect(p.hasOwnProperty(key)).toEqual(false);
               if (p.hasOwnProperty(key)){
                  cnt++;
               }
            }
            expect(cnt).toEqual(0);
         }); 
      });

      it('returns a Parameters object containing the parameters if passed a parameters object', function () {
         var parms = {parm1: ['fred'], parm2: ['barney']}, p, key, cnt = 0;
         runs(function() {
            p = hubA.newParameters(parms);
            for (key in p) {
               if (p.hasOwnProperty(key)){
                  cnt++;
               }
            }
            expect(cnt).toEqual(2);
            expect(p.parm1).toEqual(['fred']);
            expect(p.parm2).toEqual(['barney']);
         }); 
      });

   });

   
   describe('The returned parameters object: ', function () {

      // The tests in this section use just a single portlet - portletA
      var cbA = new portlet.jasmine.JasminePortletUtils('SimulateCommError', pageState),
      parms = null;

      // add an osc handler for the test
      beforeEach(function () {
         cbA.complete = false;
         runs(function() {
            cbA.oscHandle = hubA.addEventListener("portlet.onStateChange", cbA.getListener());
            parms = null;
         }); 
         waitsFor(cbA.getIsComplete(), "The onStateChange callback should be called", 100);
         runs(function() {
            cbA.complete = false;    // in prep for the actual test
            parms = hubA.newParameters();
         }); 
      });

      // remove the osc handler added during the test
      afterEach(function () {
         if (cbA.oscHandle !== null) {
            hubA.removeEventListener(cbA.oscHandle);
            cbA.oscHandle = null;
         }
      });

      it('allows parameters to be set', function () {
         var parm1 = ['fred'], parm2 = ['barney'], key, cnt = 0;
         runs(function() {
            parms.setValue('parm1', parm1)
            parms.setValue('parm2', parm2)
            for (key in parms) {
               if (parms.hasOwnProperty(key)){
                  cnt++;
               }
            }
            expect(cnt).toEqual(2);
            expect(parms.parm1).toEqual(parm1);
            expect(parms.parm2).toEqual(parm2);
         }); 
      });

      it('setting a parameter of the same name replaces the old  parameter value', function () {
         var parm1 = ['fred'], parm2 = ['barney'], key, cnt = 0;
         runs(function() {
            parms.setValue('parm1', parm1)
            parms.setValue('parm1', parm2)
            for (key in parms) {
               if (parms.hasOwnProperty(key)){
                  cnt++;
               }
            }
            expect(cnt).toEqual(1);
            expect(parms.parm1).toEqual(parm2);
         }); 
      });

      it('allows reading a single-value parameter that was set', function () {
         var parm1 = ['fred'], parm2;
         runs(function() {
            parms.setValue('parm1', parm1)
            parm2 = parms.getValue('parm1');
            expect(parm2).toEqual(parm1[0]);
         }); 
      });

      it('allows reading a single-value parameter when a default value is provided', function () {
         var parm1 = ['fred'], parm2;
         runs(function() {
            parms.setValue('parm1', parm1)
            parm2 = parms.getValue('parm1', 'defaultVal');
            expect(parm2).toEqual(parm1[0]);
         }); 
      });

      it('allows reading a single-value parameter that was set to null', function () {
         var parm1 = [null], parm2;
         runs(function() {
            parms.setValue('parm1', parm1)
            parm2 = parms.getValue('parm1', 'defaultVal');
            expect(parm2).toBeNull();
         }); 
      });

      it('allows removing a single-value parameter that was set', function () {
         var parm1 = ['fred'], parm2;
         runs(function() {
            parms.setValue('parm1', parm1)
            parms.remove('parm1');
            parm2 = parms.getValue('parm1');
            expect(parm2).toBeUndefined();
            expect(parms.parm1).toBeUndefined();
         }); 
      });

      it('returns undefined when reading an undefined single-value parameter without a default', function () {
         var parm2;
         runs(function() {
            parm2 = parms.getValue('parm1');
            expect(parm2).toBeUndefined();
         }); 
      });

      it('returns the default value when reading an undefined single-value parameter with a default', function () {
         var parm2;
         runs(function() {
            parm2 = parms.getValue('parm1', 'defaultValue');
            expect(parm2).toEqual('defaultValue');
         }); 
      });

      it('allows reading a multi-value parameter that was set', function () {
         var parm1 = ['fred', 'barney'], parm2;
         runs(function() {
            parms.parm1 = parm1;
            parm2 = parms.getValues('parm1', ['defaultVal1', 'defaultVal2']);
            expect(parm2).toEqual(parm1);
         }); 
      });

      it('allows reading a multi-value parameter that was set through setValues', function () {
         var parm1 = ['fred', 'barney'], parm2;
         runs(function() {
            parms.setValues('parm1', parm1)
            parm2 = parms.getValues('parm1');
            expect(parm2).toEqual(parm1);
         }); 
      });

      it('allows reading a multi-value parameter when a default value array is provided', function () {
         var parm1 = ['fred', 'barney'], parm2;
         runs(function() {
            parms.setValues('parm1', parm1)
            parm2 = parms.getValues('parm1', ['defVal1', 'defVal2']);
            expect(parm2).toEqual(parm1);
         }); 
      });

      it('allows reading a multi-value parameter that was set to null', function () {
         var parm1 = ['fred', null], parm2;
         runs(function() {
            parms.setValue('parm1', parm1)
            parm2 = parms.getValues('parm1');
            expect(parm2).toEqual(parm1);
            expect(parm2[0]).toEqual('fred');
            expect(parm2[1]).toEqual(null);
         }); 
      });

      it('allows removing a multi-value parameter that was set', function () {
         var parm1 = ['fred', 'barney'], parm2;
         runs(function() {
            parms.setValue('parm1', parm1)
            parms.remove('parm1');
            parm2 = parms.getValue('parm1');
            expect(parm2).toBeUndefined();
            expect(parms.parm1).toBeUndefined();
         }); 
      });

      it('returns undefined when reading an undefined multi-value parameter without a default', function () {
         var parm2;
         runs(function() {
            parm2 = parms.getValues('parm1');
            expect(parm2).toBeUndefined();
         }); 
      });

      it('returns the default value when reading an undefined multi-value parameter with a default', function () {
         var parm2;
         runs(function() {
            parm2 = parms.getValues('parm1', ['defaultVal1', 'defaultVal2']);
            expect(parm2).toEqual(['defaultVal1', 'defaultVal2']);
         }); 
      });

      it('can be cloned if empty', function () {
         var p2, key, cnt = 0;
         runs(function() {
            p2 = parms.clone();
            for (key in p2) {
               if (parms.hasOwnProperty(key)){
                  cnt++;
               }
            }
            expect(cnt).toEqual(0);
            expect(typeof p2).toEqual('object');
            expect(typeof p2.clone).toEqual('function');
            expect(typeof p2.setValue).toEqual('function');
            expect(typeof p2.getValue).toEqual('function');
            expect(typeof p2.getValues).toEqual('function');
            expect(typeof p2.remove).toEqual('function');
        }); 
      });

      it('can be cloned if parameters are set', function () {
         var parm1 = ['fred'], parm2 = ['barney'], key, cnt = 0, p2;
         runs(function() {
            parms.setValue('parm1', parm1)
            parms.setValue('parm2', parm2)
            p2 = parms.clone();
            for (key in p2) {
               if (parms.hasOwnProperty(key)){
                  cnt++;
               }
            }
            expect(cnt).toEqual(2);
            expect(typeof p2).toEqual('object');
            expect(typeof p2.clone).toEqual('function');
            expect(typeof p2.setValue).toEqual('function');
            expect(typeof p2.setValues).toEqual('function');
            expect(typeof p2.getValue).toEqual('function');
            expect(typeof p2.getValues).toEqual('function');
            expect(typeof p2.remove).toEqual('function');
            expect(p2.parm1).toEqual(parm1);
            expect(p2.parm2).toEqual(parm2);
         }); 
      });
   });

   
   describe('The portlet hub newState function: ', function () {

      // The tests in this section use just a single portlet - portletA
      var cbA = new portlet.jasmine.JasminePortletUtils('SimulateCommError', pageState);

      // add an osc handler for the test
      beforeEach(function () {
         cbA.complete = false;
         runs(function() {
            cbA.oscHandle = hubA.addEventListener("portlet.onStateChange", cbA.getListener());
         }); 
         waitsFor(cbA.getIsComplete(), "The onStateChange callback should be called", 100);
         runs(function() {
            cbA.complete = false;    // in prep for the actual test
         }); 
      });

      // remove the osc handler added during the test
      afterEach(function () {
         if (cbA.oscHandle !== null) {
            hubA.removeEventListener(cbA.oscHandle);
            cbA.oscHandle = null;
         }
      });

      it('is present in the register return object and is a function', function () {
         expect(typeof hubA.newState).toEqual('function');
      });

      it('returns a State object containing the required functions and fields', function () {
         var s;
         runs(function() {
            s = hubA.newState();
            expect(typeof s).toEqual('object');
            expect(typeof s.clone).toEqual('function');
            expect(typeof s.setPortletMode).toEqual('function');
            expect(typeof s.getPortletMode).toEqual('function');
            expect(typeof s.setWindowState).toEqual('function');
            expect(typeof s.getWindowState).toEqual('function');
            expect(typeof s.parameters).toEqual('object');
            expect(typeof s.p).toEqual('object');
            expect(s.p).toEqual(s.parameters);
            expect(typeof s.portletMode).toEqual('string');
            expect(typeof s.windowState).toEqual('string');
         }); 
      });

      it('returns a State object containing no parameters', function () {
         var s, key, cnt = 0;
         runs(function() {
            s = hubA.newState();
            for (key in s.parameters) {
               expect(s.parameters.hasOwnProperty(key)).toEqual(false);
               if (s.parameters.hasOwnProperty(key)){
                  cnt++;
               }
            }
            expect(cnt).toEqual(0);
         }); 
      });

      it('returns a State object containing cloned values if passed a State object', function () {
         var state = {parameters: {parm1: ['fred'], parm2: ['barney']}, portletMode:'EDIT', windowState: 'MINIMIZED'}, 
                     s, key, cnt = 0;
         runs(function() {
            s = hubA.newState(state);
            for (key in s.parameters) {
               if (s.parameters.hasOwnProperty(key)){
                  cnt++;
               }
            }
            expect(cnt).toEqual(2);
            expect(s.parameters.parm1).toEqual(['fred']);
            expect(s.parameters.parm2).toEqual(['barney']);
            expect(s.portletMode).toEqual('EDIT');
            expect(s.windowState).toEqual('MINIMIZED');
         }); 
      });

   });

   
   describe('The returned State object: ', function () {

      // The tests in this section use just a single portlet - portletA
      var cbA = new portlet.jasmine.JasminePortletUtils('SimulateCommError', pageState),
      state = null;

      // add an osc handler for the test
      beforeEach(function () {
         cbA.complete = false;
         runs(function() {
            cbA.oscHandle = hubA.addEventListener("portlet.onStateChange", cbA.getListener());
            state = null;
         }); 
         waitsFor(cbA.getIsComplete(), "The onStateChange callback should be called", 100);
         runs(function() {
            cbA.complete = false;    // in prep for the actual test
            state = hubA.newState();
         }); 
      });

      // remove the osc handler added during the test
      afterEach(function () {
         if (cbA.oscHandle !== null) {
            hubA.removeEventListener(cbA.oscHandle);
            cbA.oscHandle = null;
         }
      });

      it('allows parameters to be set', function () {
         var parm1 = ['fred'], parm2 = ['barney'], key, cnt = 0;
         runs(function() {
            state.parameters.setValue('parm1', parm1)
            state.parameters.setValue('parm2', parm2)
            for (key in state.parameters) {
               if (state.parameters.hasOwnProperty(key)){
                  cnt++;
               }
            }
            expect(cnt).toEqual(2);
            expect(state.parameters.parm1).toEqual(parm1);
            expect(state.parameters.parm2).toEqual(parm2);
         }); 
      });

      it('has a shortcut p to access the parameters', function () {
         var parm1 = ['fred'], parm2 = ['barney'], key, cnt = 0;
         runs(function() {
            state.p.setValue('parm1', parm1)
            state.p.setValue('parm2', parm2)
            for (key in state.p) {
               if (state.p.hasOwnProperty(key)){
                  cnt++;
               }
            }
            expect(cnt).toEqual(2);
            expect(state.p.parm1).toEqual(parm1);
            expect(state.p.parm2).toEqual(parm2);
         }); 
      });

      it('setting a parameter of the same name replaces the old  parameter value', function () {
         var parm1 = ['fred'], parm2 = ['barney'], key, cnt = 0;
         runs(function() {
            state.parameters.setValue('parm1', parm1)
            state.parameters.setValue('parm1', parm2)
            for (key in state.parameters) {
               if (state.parameters.hasOwnProperty(key)){
                  cnt++;
               }
            }
            expect(cnt).toEqual(1);
            expect(state.parameters.parm1).toEqual(parm2);
         }); 
      });

      it('allows reading a single-value parameter that was set', function () {
         var parm1 = ['fred'], parm2;
         runs(function() {
            state.parameters.setValue('parm1', parm1)
            parm2 = state.parameters.getValue('parm1');
            expect(parm2).toEqual(parm1[0]);
         }); 
      });

      it('allows reading a single-value parameter that was set to null', function () {
         var parm1 = [null], parm2;
         runs(function() {
            state.parameters.setValue('parm1', parm1)
            parm2 = state.parameters.getValue('parm1');
            expect(parm2).toBeNull();
         }); 
      });

      it('allows removing a single-value parameter that was set', function () {
         var parm1 = ['fred'], parm2;
         runs(function() {
            state.parameters.setValue('parm1', parm1)
            state.parameters.remove('parm1');
            parm2 = state.parameters.getValue('parm1');
            expect(parm2).toBeUndefined();
            expect(state.parameters.parm1).toBeUndefined();
         }); 
      });

      it('allows reading a multi-value parameter that was set', function () {
         var parm1 = ['fred', 'barney'], parm2;
         runs(function() {
            state.parameters.setValue('parm1', parm1)
            parm2 = state.parameters.getValues('parm1');
            expect(parm2).toEqual(parm1);
         }); 
      });

      it('allows reading a multi-value parameter that was set through the shortcut p', function () {
         var parm1 = ['fred', 'barney'], parm2;
         runs(function() {
            state.p.setValue('parm1', parm1)
            parm2 = state.p.getValues('parm1');
            expect(parm2).toEqual(parm1);
         }); 
      });

      it('allows reading a multi-value parameter that was set to null', function () {
         var parm1 = ['fred', null], parm2;
         runs(function() {
            state.parameters.setValue('parm1', parm1)
            parm2 = state.parameters.getValues('parm1');
            expect(parm2).toEqual(parm1);
            expect(parm2[0]).toEqual('fred');
            expect(parm2[1]).toEqual(null);
         }); 
      });

      it('allows removing a multi-value parameter that was set', function () {
         var parm1 = ['fred', 'barney'], parm2;
         runs(function() {
            state.parameters.setValue('parm1', parm1)
            state.parameters.remove('parm1');
            parm2 = state.parameters.getValue('parm1');
            expect(parm2).toBeUndefined();
            expect(state.parameters.parm1).toBeUndefined();
         }); 
      });

      it('returns undefined when getValue reads a parameter that was not set', function () {
         var parm1;
         runs(function() {
            parm1 = state.parameters.getValue('parm1');
            expect(parm1).toBeUndefined();
         }); 
      });

      it('returns undefined when getValues reads a parameter that was not set', function () {
         var parm1;
         runs(function() {
            parm1 = state.parameters.getValues('parm1');
            expect(parm1).toBeUndefined();
         }); 
      });

      it('can be cloned if empty', function () {
         var p2, key, cnt = 0;
         runs(function() {
            p2 = state.parameters.clone();
            for (key in p2) {
               if (state.parameters.hasOwnProperty(key)){
                  cnt++;
               }
            }
            expect(cnt).toEqual(0);
            expect(typeof p2).toEqual('object');
            expect(typeof p2.clone).toEqual('function');
            expect(typeof p2.setValue).toEqual('function');
            expect(typeof p2.getValue).toEqual('function');
            expect(typeof p2.getValues).toEqual('function');
            expect(typeof p2.remove).toEqual('function');
        }); 
      });

      it('can be cloned if parameters are set', function () {
         var parm1 = ['fred'], parm2 = ['barney'], key, cnt = 0, p2;
         runs(function() {
            state.parameters.setValue('parm1', parm1)
            state.parameters.setValue('parm2', parm2)
            p2 = state.parameters.clone();
            for (key in p2) {
               if (state.parameters.hasOwnProperty(key)){
                  cnt++;
               }
            }
            expect(cnt).toEqual(2);
            expect(typeof p2).toEqual('object');
            expect(typeof p2.clone).toEqual('function');
            expect(typeof p2.setValue).toEqual('function');
            expect(typeof p2.getValue).toEqual('function');
            expect(typeof p2.getValues).toEqual('function');
            expect(typeof p2.remove).toEqual('function');
            expect(p2.parm1).toEqual(parm1);
            expect(p2.parm2).toEqual(parm2);
         }); 
      });

      it('allows setting and getting the portlet mode', function () {
         var pm = 'EDIT', pm2;
         runs(function() {
            state.setPortletMode(pm)
            pm2 = state.getPortletMode();
            expect(state.portletMode).toEqual(pm);
            expect(pm2).toEqual(pm);
         }); 
      });

      it('allows setting and getting the window state', function () {
         var ws = 'MAXIMIZED', ws2;
         runs(function() {
            state.setWindowState(ws)
            ws2 = state.getWindowState();
            expect(state.windowState).toEqual(ws);
            expect(ws2).toEqual(ws);
         }); 
      });
   });

   
   describe('The Constants object: ', function () {

      // The tests in this section use just a single portlet - portletA
      var cbA = new portlet.jasmine.JasminePortletUtils('SimulateCommError', pageState),
      cons = null;

      // add an osc handler for the test
      beforeEach(function () {
         cbA.complete = false;
         runs(function() {
            cbA.oscHandle = hubA.addEventListener("portlet.onStateChange", cbA.getListener());
            cons = null;
         }); 
         waitsFor(cbA.getIsComplete(), "The onStateChange callback should be called", 100);
         runs(function() {
            cbA.complete = false;    // in prep for the actual test
            cons = hubA.constants;
         }); 
      });

      // remove the osc handler added during the test
      afterEach(function () {
         if (cbA.oscHandle !== null) {
            hubA.removeEventListener(cbA.oscHandle);
            cbA.oscHandle = null;
         }
      });

      it('contains constants for the portlet mode', function () {
         runs(function() {
            expect(typeof cons.VIEW).toEqual('string');
            expect(typeof cons.EDIT).toEqual('string');
            expect(typeof cons.HELP).toEqual('string');
            expect(cons.VIEW).toEqual('VIEW');
            expect(cons.EDIT).toEqual('EDIT');
            expect(cons.HELP).toEqual('HELP');
         }); 
      });

      it('contains constants for the window state', function () {
         runs(function() {
            expect(typeof cons.NORMAL).toEqual('string');
            expect(typeof cons.MINIMIZED).toEqual('string');
            expect(typeof cons.MAXIMIZED).toEqual('string');
            expect(cons.NORMAL).toEqual('NORMAL');
            expect(cons.MINIMIZED).toEqual('MINIMIZED');
            expect(cons.MAXIMIZED).toEqual('MAXIMIZED');
         }); 
      });

      it('contains constants for the resource URL cacheability setting', function () {
         runs(function() {
            expect(typeof cons.FULL).toEqual('string');
            expect(typeof cons.PORTLET).toEqual('string');
            expect(typeof cons.PAGE).toEqual('string');
            expect(cons.FULL).toEqual('cacheLevelFull');
            expect(cons.PORTLET).toEqual('cacheLevelPortlet');
            expect(cons.PAGE).toEqual('cacheLevelPage');
         }); 
      });
   });

});
