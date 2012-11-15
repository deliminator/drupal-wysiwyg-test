/* delicious.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */

GENTICS.Aloha.Repositories||(GENTICS.Aloha.Repositories={}),GENTICS.Aloha.Repositories.delicious=new GENTICS.Aloha.Repository("delicious"),GENTICS.Aloha.Repositories.delicious.settings.username="draftkraft",GENTICS.Aloha.Repositories.delicious.settings.weight=.35,GENTICS.Aloha.Repositories.delicious.init=function(){var e=this;this.settings.weight+.15>1&&(this.settings.weight=.85),this.deliciousURL="http://feeds.delicious.com/v2/json/",this.settings.username?(this.deliciousURL+=this.settings.username+"/",this.repositoryName="deliciuos/"+this.settings.username,this.tags=[],jQuery.ajax({type:"GET",dataType:"jsonp",url:"http://feeds.delicious.com/v2/json/tags/"+e.settings.username,success:function(t){for(var n in t)e.tags.push(n)}})):(this.repositoryName="deliciuos/"+popular,this.deliciousURL+="tag/")},GENTICS.Aloha.Repositories.delicious.query=function(e,t){var n=this;if(e.objectTypeFilter&&jQuery.inArray("website",e.objectTypeFilter)==-1)t.call(this,[]);else{var r=[];if(this.settings.username
){var i=e.queryString?e.queryString.split(" "):[];for(var s=0;s<i.length;s++){var o=i[s].trim();if(jQuery.inArray(o,n.tags)==-1){var u=n.tags.filter(function(e,t,n){var r=new RegExp(o,"i");return e.match(r)});u.length>0&&r.push(u[0])}else r.push(o)}}else r=e.queryString.split(" ");var a=e.inFolderId?e.inFolderId.split("+"):[];jQuery.extend(r,a);if(e.queryString&&r.length==0){t.call(n,[]);return}jQuery.ajax({type:"GET",dataType:"jsonp",url:n.deliciousURL+r.join("+"),success:function(e){var r=[];for(var i=0;i<e.length;i++)typeof e[i]!="function"&&r.push(new GENTICS.Aloha.Repository.Document({id:e[i].u,name:e[i].d,repositoryId:n.repositoryId,type:"website",url:e[i].u,weight:n.settings.weight+.14}));t.call(n,r)}})}},GENTICS.Aloha.Repositories.delicious.getChildren=function(e,t){var n=this;if(this.settings.username){var r=[];if(e.inFolderId==this.repositoryId){for(var i=0;i<this.tags.length;i++)typeof this.tags[i]!="function"&&r.push(new GENTICS.Aloha.Repository.Folder({id:this.tags[i],name:
this.tags[i],repositoryId:this.repositoryId,type:"tag",url:"http://feeds.delicious.com/v2/rss/tags/"+n.settings.username+"/"+this.tags[i]}));t.call(this,r)}else jQuery.ajax({type:"GET",dataType:"jsonp",url:"http://feeds.delicious.com/v2/json/tags/"+n.settings.username+"/"+e.inFolderId,success:function(r){var i=[];for(var s in r){var o=e.inFolderId?e.inFolderId+"+"+s:s;typeof r[s]!="function"&&i.push(new GENTICS.Aloha.Repository.Folder({id:o,name:s,repositoryId:n.repositoryId,type:"tag",url:"http://feeds.delicious.com/v2/rss/tags/"+n.settings.username+"/"+o,hasMoreItems:!0}))}t.call(n,i)}})}else t.call(this,[])},GENTICS.Aloha.Repositories.delicious.getObjectById=function(e,t){var n=this;jQuery.ajax({type:"GET",dataType:"jsonp",url:"http://feeds.delicious.com/v2/json/urlinfo/"+jQuery.md5(e),success:function(r){var i=[];for(var s=0;s<r.length;s++)typeof r[s]!="function"&&i.push(new GENTICS.Aloha.Repository.Document({id:e,name:r[s].title,repositoryId:n.repositoryId,type:"website",url:e,weight
:n.settings.weight+.14}));t.call(n,i)}})}