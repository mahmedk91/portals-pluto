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


package javax.portlet.tck.servlets;

import java.io.*;
import java.util.*;
import java.util.logging.*;
import static java.util.logging.Logger.*;
import javax.portlet.*;
import javax.portlet.filter.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.portlet.tck.beans.*;
import javax.portlet.tck.constants.Constants;
import static javax.portlet.tck.constants.Constants.*;
import static javax.portlet.tck.beans.JSR286DispatcherTestCaseDetails.*;

/**
 * Servlet for JSR 362 request dispatcher testing.
 * Used by portlet: DispatcherTests_SPEC2_19_IncludeServletResource
 *
 * @author nick
 *
 */
public class DispatcherTests_SPEC2_19_IncludeServletResource_servlet extends HttpServlet {
   private static final String LOG_CLASS = 
         DispatcherTests_SPEC2_19_IncludeServletResource_servlet.class.getName();
   private final Logger LOGGER = Logger.getLogger(LOG_CLASS);

   @Override
   protected void doGet(HttpServletRequest req, HttpServletResponse resp)
         throws ServletException, IOException {
      processTCKReq(req, resp);
   }

   @Override
   protected void doPost(HttpServletRequest req, HttpServletResponse resp)
         throws ServletException, IOException {
      processTCKReq(req, resp);
   }

   // The tck uses only get & post requests
   protected void processTCKReq(HttpServletRequest request, HttpServletResponse response)
         throws ServletException, IOException {
      LOGGER.entering(LOG_CLASS, "servlet entry");

      PortletRequest portletReq = (PortletRequest) request.getAttribute("javax.portlet.request");
      PortletResponse portletResp = (PortletResponse) request.getAttribute("javax.portlet.response");
      PortletConfig portletConfig = (PortletConfig) request.getAttribute("javax.portlet.config");
      long svtTid = Thread.currentThread().getId();
      long reqTid = (Long) portletReq.getAttribute("void");

      PrintWriter writer = ((MimeResponse)portletResp).getWriter();

      JSR286DispatcherTestCaseDetails tcd = new JSR286DispatcherTestCaseDetails();

      // Create result objects for the tests

      /* TestCase: SPEC2_19_IncludeServletResource_attributes1                */
      /* Details: "If the request dispatcher is obtained through the          */
      /* getRequestDispatcher method, the request attribute                   */
      /* javax.servlet.include.request_uri will be set, and equals the        */
      /* value from HTTPServletRequest.getRequestURI for the first servlet    */
      /* in the include chain"                                                */
      TestResult tr0 = tcd.getTestResultFailed(SPEC2_19_INCLUDESERVLETRESOURCE_ATTRIBUTES1);
      /* TODO: implement test */
      tr0.writeTo(writer);

      /* TestCase: SPEC2_19_IncludeServletResource_attributes2                */
      /* Details: "If the request dispatcher is obtained through the          */
      /* getRequestDispatcher method, the request attribute                   */
      /* javax.servlet.include.context_path will be set, and equals the       */
      /* value from HTTPServletRequest.getContestPath for the first servlet   */
      /* in the include chain"                                                */
      TestResult tr1 = tcd.getTestResultFailed(SPEC2_19_INCLUDESERVLETRESOURCE_ATTRIBUTES2);
      /* TODO: implement test */
      tr1.writeTo(writer);

      /* TestCase: SPEC2_19_IncludeServletResource_attributes3                */
      /* Details: "If the request dispatcher is obtained through the          */
      /* getRequestDispatcher method, the request attribute                   */
      /* javax.servlet.include.servlet_path will be set, and equals the       */
      /* value from HTTPServletRequest.getServletPath for the first servlet   */
      /* in the include chain"                                                */
      TestResult tr2 = tcd.getTestResultFailed(SPEC2_19_INCLUDESERVLETRESOURCE_ATTRIBUTES3);
      /* TODO: implement test */
      tr2.writeTo(writer);

      /* TestCase: SPEC2_19_IncludeServletResource_attributes4                */
      /* Details: "If the request dispatcher is obtained through the          */
      /* getRequestDispatcher method, the request attribute                   */
      /* javax.servlet.include.path_info will be set, and equals the value    */
      /* from HTTPServletRequest.getPathInfo for the first servlet in the     */
      /* include chain"                                                       */
      TestResult tr3 = tcd.getTestResultFailed(SPEC2_19_INCLUDESERVLETRESOURCE_ATTRIBUTES4);
      /* TODO: implement test */
      tr3.writeTo(writer);

      /* TestCase: SPEC2_19_IncludeServletResource_attributes5                */
      /* Details: "If the request dispatcher is obtained through the          */
      /* getRequestDispatcher method, the request attribute                   */
      /* javax.servlet.include.query_string will be set, and equals the       */
      /* value from HTTPServletRequest.getQueryString for the first servlet   */
      /* in the include chain"                                                */
      TestResult tr4 = tcd.getTestResultFailed(SPEC2_19_INCLUDESERVLETRESOURCE_ATTRIBUTES5);
      /* TODO: implement test */
      tr4.writeTo(writer);

      /* TestCase: SPEC2_19_IncludeServletResource_attributes6                */
      /* Details: "The request attribute javax.portlet.config must be set     */
      /* to the javax.portlet.PortletConfig object"                           */
      TestResult tr5 = tcd.getTestResultFailed(SPEC2_19_INCLUDESERVLETRESOURCE_ATTRIBUTES6);
      /* TODO: implement test */
      tr5.writeTo(writer);

      /* TestCase: SPEC2_19_IncludeServletResource_attributes7                */
      /* Details: "For includes from the serveResource method, The request    */
      /* attribute javax.portlet.request must be set to the                   */
      /* javax.portlet.ResourceRequest object"                                */
      TestResult tr6 = tcd.getTestResultFailed(SPEC2_19_INCLUDESERVLETRESOURCE_ATTRIBUTES7);
      /* TODO: implement test */
      tr6.writeTo(writer);

      /* TestCase: SPEC2_19_IncludeServletResource_attributes8                */
      /* Details: "For includes from the serveResource method, The request    */
      /* attribute javax.portlet.response must be set to the                  */
      /* javax.portlet.ResourceResponse object"                               */
      TestResult tr7 = tcd.getTestResultFailed(SPEC2_19_INCLUDESERVLETRESOURCE_ATTRIBUTES8);
      /* TODO: implement test */
      tr7.writeTo(writer);


   }
}
