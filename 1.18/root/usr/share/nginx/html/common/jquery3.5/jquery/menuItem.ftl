<#--
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
-->
<li
<#if parameters.id?if_exists != "">
		id="${parameters.id?html}"<#rt/>
</#if>
<#if parameters.cssStyle?if_exists != "">
		style="${parameters.cssStyle?html}"<#rt/>
</#if>
<#if parameters.cssClass?if_exists != "">
		class="${parameters.cssClass?html}"<#rt/>
</#if>
<#if parameters.type?if_exists != "">
		rel="${parameters.type?html}"<#rt/>
</#if>
<#include "/${parameters.templateDir}/simple/scripting-events.ftl" />
<#include "/${parameters.templateDir}/simple/common-attributes.ftl" />
<#include "/${parameters.templateDir}/simple/dynamic-attributes.ftl" />
>
<div>
<#if !parameters.targets?exists && parameters.href?if_exists != "">
<a href="${parameters.href?string}">
<#elseif parameters.targets?exists && parameters.href?if_exists != "">
<a href="javascript:void(0)" >
</#if>
<#if parameters.menuIcon?if_exists != "">
<span class="ui-icon ${parameters.menuIcon?html}"></span><#rt/>
</#if>
<#if parameters.title?if_exists != "">
${parameters.title?html}<#rt/>
</#if>
<#if parameters.href?if_exists != "">
</a><#rt/>
</#if>
</div>