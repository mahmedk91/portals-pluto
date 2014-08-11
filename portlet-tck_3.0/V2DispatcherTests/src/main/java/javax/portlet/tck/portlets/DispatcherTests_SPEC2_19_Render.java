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

package javax.portlet.tck.portlets;

import java.io.*;
import java.util.*;
import java.util.logging.*;
import static java.util.logging.Logger.*;
import javax.xml.namespace.QName;
import javax.portlet.*;
import javax.portlet.filter.*;
import javax.portlet.tck.beans.*;
import static javax.portlet.tck.beans.JSR286DispatcherTestCaseDetails.*;
import static javax.portlet.tck.constants.Constants.*;
import static javax.portlet.PortletSession.*;
import static javax.portlet.ResourceURL.*;

/**
 * This portlet implements several test cases for the JSR 362 TCK. The test case names
 * are defined in the /src/main/resources/xml-resources/additionalTCs.xml
 * file. The build process will integrate the test case names defined in the 
 * additionalTCs.xml file into the complete list of test case names for execution by the driver.
 *
 * This is the main portlet for the test cases. If the test cases call for events, this portlet
 * will initiate the events, but not process them. The processing is done in the companion 
 * portlet DispatcherTests_SPEC2_19_Render_event
 *
 */
public class DispatcherTests_SPEC2_19_Render implements Portlet, ResourceServingPortlet {
   private static final String LOG_CLASS = 
         DispatcherTests_SPEC2_19_Render.class.getName();
   private final Logger LOGGER = Logger.getLogger(LOG_CLASS);
   
   private PortletConfig portletConfig = null;

   @Override
   public void init(PortletConfig config) throws PortletException {
      this.portletConfig = config;
   }

   @Override
   public void destroy() {
   }

   @Override
   public void processAction(ActionRequest portletReq, ActionResponse portletResp)
         throws PortletException, IOException {
      LOGGER.entering(LOG_CLASS, "main portlet processAction entry");

      long tid = Thread.currentThread().getId();
      portletReq.setAttribute("void", tid);

      StringWriter writer = new StringWriter();

   }

   @Override
   public void serveResource(ResourceRequest portletReq, ResourceResponse portletResp)
         throws PortletException, IOException {
      LOGGER.entering(LOG_CLASS, "main portlet serveResource entry");

      long tid = Thread.currentThread().getId();
      portletReq.setAttribute("void", tid);

      PrintWriter writer = portletResp.getWriter();

   }

   @Override
   public void render(RenderRequest portletReq, RenderResponse portletResp)
         throws PortletException, IOException {
      LOGGER.entering(LOG_CLASS, "main portlet render entry");

      long tid = Thread.currentThread().getId();
      portletReq.setAttribute("void", tid);

      PrintWriter writer = portletResp.getWriter();

      JSR286DispatcherTestCaseDetails tcd = new JSR286DispatcherTestCaseDetails();

      // Create result objects for the tests

      /* TestCase: SPEC2_19_Render_getDispatcher7                             */
      /* Details: "If the path provided to getRequestDispatcher method does   */
      /* not start with \"/\", the method returns null"                       */
      TestResult tr0 = tcd.getTestResultFailed(SPEC2_19_RENDER_GETDISPATCHER7);
      /* TODO: implement test */
      tr0.writeTo(writer);

      /* TestCase: SPEC2_19_Render_getDispatcher8                             */
      /* Details: "If the path provided to getRequestDispatcher method ends   */
      /* with \"/\", the method returns null"                                 */
      TestResult tr1 = tcd.getTestResultFailed(SPEC2_19_RENDER_GETDISPATCHER8);
      /* TODO: implement test */
      tr1.writeTo(writer);

      /* TestCase: SPEC2_19_Render_getDispatcher9                             */
      /* Details: "If the path provided to getRequestDispatcher method does   */
      /* not specify a valid path, the method returns null"                   */
      TestResult tr2 = tcd.getTestResultFailed(SPEC2_19_RENDER_GETDISPATCHER9);
      /* TODO: implement test */
      tr2.writeTo(writer);

      /* TestCase: SPEC2_19_Render_getDispatcher10                            */
      /* Details: "The PortletContext getNamedDispatcher method returns a     */
      /* PortletRequestDispatcher for a servlet within the portlet            */
      /* application"                                                         */
      TestResult tr3 = tcd.getTestResultFailed(SPEC2_19_RENDER_GETDISPATCHER10);
      /* TODO: implement test */
      tr3.writeTo(writer);

      /* TestCase: SPEC2_19_Render_getDispatcher11                            */
      /* Details: "If the name provided to getNamedDispatcher method is not   */
      /* valid, the method returns null"                                      */
      TestResult tr4 = tcd.getTestResultFailed(SPEC2_19_RENDER_GETDISPATCHER11);
      /* TODO: implement test */
      tr4.writeTo(writer);

   }

}
