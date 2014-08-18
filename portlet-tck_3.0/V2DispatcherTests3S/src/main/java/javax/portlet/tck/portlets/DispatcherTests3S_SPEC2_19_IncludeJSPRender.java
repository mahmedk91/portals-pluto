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
import javax.servlet.*;
import javax.servlet.http.*;
import javax.portlet.tck.beans.*;
import javax.portlet.tck.constants.*;
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
 * portlet DispatcherTests3S_SPEC2_19_IncludeJSPRender_event
 *
 */
public class DispatcherTests3S_SPEC2_19_IncludeJSPRender implements Portlet, ResourceServingPortlet {
   private static final String LOG_CLASS = 
         DispatcherTests3S_SPEC2_19_IncludeJSPRender.class.getName();
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

      Cookie c = new Cookie(COOKIE_PREFIX +"DispatcherTests3S_SPEC2_19_IncludeJSPRender", COOKIE_VALUE);
      c.setMaxAge(10);
      portletResp.addProperty(c);
      portletResp.addProperty(PROP_PREFIX +"DispatcherTests3S_SPEC2_19_IncludeJSPRender", PROP_VALUE);

      long tid = Thread.currentThread().getId();
      portletReq.setAttribute("void", tid);

      StringWriter writer = new StringWriter();

   }

   @Override
   public void serveResource(ResourceRequest portletReq, ResourceResponse portletResp)
         throws PortletException, IOException {
      LOGGER.entering(LOG_CLASS, "main portlet serveResource entry");

      Cookie c = new Cookie(COOKIE_PREFIX +"DispatcherTests3S_SPEC2_19_IncludeJSPRender", COOKIE_VALUE);
      c.setMaxAge(10);
      portletResp.addProperty(c);
      portletResp.addProperty(PROP_PREFIX +"DispatcherTests3S_SPEC2_19_IncludeJSPRender", PROP_VALUE);

      long tid = Thread.currentThread().getId();
      portletReq.setAttribute("void", tid);

      PrintWriter writer = portletResp.getWriter();

   }

   @Override
   public void render(RenderRequest portletReq, RenderResponse portletResp)
         throws PortletException, IOException {
      LOGGER.entering(LOG_CLASS, "main portlet render entry");

      Cookie c = new Cookie(COOKIE_PREFIX +"DispatcherTests3S_SPEC2_19_IncludeJSPRender", COOKIE_VALUE);
      c.setMaxAge(10);
      portletResp.addProperty(c);
      portletResp.addProperty(PROP_PREFIX +"DispatcherTests3S_SPEC2_19_IncludeJSPRender", PROP_VALUE);

      long tid = Thread.currentThread().getId();
      portletReq.setAttribute("void", tid);

      PrintWriter writer = portletResp.getWriter();

      PortletRequestDispatcher rd = portletConfig.getPortletContext()
            .getRequestDispatcher("/WEB-INF/jsp/DispatcherTests3S_SPEC2_19_IncludeJSPRender.jsp?qparm1=qvalue1&qparm2=qvalue2");
      rd.include(portletReq, portletResp);
   }

}