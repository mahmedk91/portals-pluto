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

/*
 * This source code implements specifications defined by the Java
 * Community Process. In order to remain compliant with the specification
 * DO NOT add / change / or delete method signatures!
 */

package javax.portlet.annotations;


import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.*;


/**
 * <div class='changed_added_3_0'>
 * This annotation is used within composite portlet configuration annotations to
 * represent a custom portlet mode.
 * It cannot be used as a stand-alone portlet annotation.
 * </div>
 */
@Retention(RUNTIME) @Target({ANNOTATION_TYPE})
public @interface CustomPortletMode {
   
   /**
    * <div class='container-change'>
    * Provides locale-specific text describing the custom portlet mode for use by the portal application or by tools.
    * </div>
    * 
    * @return  The custom portlet mode description
    */
   LocaleString[]      description() default {};
   
   /**
    * <div class='container-change'>
    * The custom portlet mode name.
    * <p>
    * The name by which the portlet mode is identified.
    * </div>
    * 
    * @return  The custom portlet mode name
    */
   String      name();
   
   /**
    * <div class='container-change'>
    * The portal managed flag.
    * <p>
    * If set to <code>true</code>, the custom portlet mode will be managed by the portal.
    * If set to <code>false</code>, the custom portlet mode will be managed by the portlet.
    * </div>
    * 
    * @return  The portal managed flag setting 
    */
   boolean     portalManaged() default true;
}
