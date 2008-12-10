/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.apache.pluto.spi.optional;

import javax.portlet.PortletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.pluto.PortletContainer;
import org.apache.pluto.PortletWindow;
import org.apache.pluto.internal.InternalActionRequest;
import org.apache.pluto.internal.InternalActionResponse;
import org.apache.pluto.internal.InternalPortletSession;
import org.apache.pluto.internal.InternalRenderRequest;
import org.apache.pluto.internal.InternalRenderResponse;
import org.apache.pluto.internal.InternalResourceRequest;
import org.apache.pluto.internal.InternalResourceResponse;

/**
 * Factory Service for creating Portlet request and responses.
 *
 * @since 1.1.0
 */
public interface PortletEnvironmentService {

    InternalActionRequest createActionRequest(
        PortletContainer container,
        HttpServletRequest servletRequest,
        HttpServletResponse servletResponse,
        PortletWindow portletWindow);

    InternalActionResponse createActionResponse(
        PortletContainer container,
        HttpServletRequest servletRequest,
        HttpServletResponse servletResponse,
        PortletWindow portletWindow);

    InternalRenderRequest createRenderRequest(
        PortletContainer container,
        HttpServletRequest servletRequest,
        HttpServletResponse servletResponse,
        PortletWindow portletWindow);

    InternalRenderResponse createRenderResponse(
        PortletContainer container,
        HttpServletRequest servletRequest,
        HttpServletResponse servletResponse,
        PortletWindow portletWindow);
    
    InternalPortletSession createPortletSession(
        PortletContainer container,
        HttpServletRequest servletRequest,
        PortletContext portletContext,
        HttpSession httpSession,
        PortletWindow portletWindow);

    InternalResourceRequest createResourceRequest(
            PortletContainer container,
            HttpServletRequest servletRequest,
            HttpServletResponse servletResponse,
            PortletWindow portletWindow);
    
    InternalResourceResponse createResourceResponse(
            PortletContainer container,
            HttpServletRequest servletRequest,
            HttpServletResponse servletResponse,
            PortletWindow portletWindow);
}