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
<#assign escapedOptionId="${parameters.id?string?replace('.', '_')}">
<script type='text/javascript'>
jQuery(document).ready(function () { 
	var options_${escapedOptionId?html} = {};
<#if parameters.nameValue??>
	options_${escapedOptionId?html}.value = "<@s.property value="parameters.nameValue"/>";
</#if>
<#if parameters.remoteList??>
	options_${escapedOptionId?html}.datatype = "json";
	options_${escapedOptionId?html}.type = 'checkbox';
	options_${escapedOptionId?html}.list = "${parameters.remoteList?html}";
</#if>
<#if parameters.remoteListKey??>
	options_${escapedOptionId?html}.listkey = "${parameters.remoteListKey?html}";
</#if>
<#if parameters.remoteListValue??>
	options_${escapedOptionId?html}.listvalue = "${parameters.remoteListValue?html}";
</#if>
<#if parameters.buttonset?default(true)>
	options_${escapedOptionId?html}.buttonset = true;
<#else>
	options_${escapedOptionId?html}.buttonset = false;
</#if>
<#if parameters.icon?default(true)>
    options_${escapedOptionId?html}.icon = true;
<#else>
    options_${escapedOptionId?html}.icon = false;
</#if>
<#if parameters.direction??>
    options_${escapedOptionId?html}.direction = "${parameters.direction?html}";
</#if>
  <#include "/${parameters.templateDir}/jquery/base.ftl" />
  <#include "/${parameters.templateDir}/jquery/interactive.ftl" />
  <#include "/${parameters.templateDir}/jquery/topics.ftl" />
  <#include "/${parameters.templateDir}/jquery/action.ftl" />
  <#include "/${parameters.templateDir}/jquery/container.ftl" />

  <#include "/${parameters.templateDir}/jquery/jquery-ui-bind.ftl" />
 });  
</script>
