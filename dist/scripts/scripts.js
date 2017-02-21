RemoteStorage.defineModule("teams",function(a,b){a.cache("","ALL"),a.declareType("team",{type:"object",properties:{id:{type:"string"},name:{type:"string"},members:{type:"array",default:[],items:{type:"object",properties:{id:{type:"string"},name:{type:"string"}}}}},required:["id","name"]});var c=function(a){return a.getAll("team/").then(function(b){var c=[],d=[];for(var e in b)c.push(a.storeObject("",e,b[e])),d.push(a.remove("team/"+e));return d.push(a.remove("team/")),0!=c.length&&Promise.all(c).then(function(){return console.log("items moved from teams/team/ to teams/"),Promise.all(c).then(function(){return console.log("items removed at teams/team/*"),!0}).catch(function(a){return console.log("oups..."+a),!1})}).catch(function(a){return console.log("oups..."+a),!1})})},d={upgrade:function(){return c(a)},store:function(b){return b.id||(b.id=g(),b.members=[]),a.storeObject("team",b.id,b).then(function(){return b})},addMember:function(a,b){return remoteStorage.teams.find(a).then(function(a){return b.id=g(),a.members.push(b),remoteStorage.teams.store(a)})},findMember:function(b){return a.getAll("").then(function(a){for(var c in a){var d=h(a[c].members,b);if(d)return d}return null})},updateMember:function(b){return a.getAll("").then(function(a){for(var c in a)for(var d=a[c].members,e=0;e<d.length;e++)if(d[e].id===b.id)return d[e]=b,remoteStorage.teams.store(a[c]);return null})},removeMember:function(b){return a.getAll("").then(function(a){for(var c in a)for(var d=a[c].members,e=0;e<d.length;e++)if(d[e].id===b)return d.splice(e,1),remoteStorage.teams.store(a[c]);return!1})},remove:function(b){return a.remove(b)},find:function(b){return a.getObject(b)},findAll:function(){return a.getAll("")}},e="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",f=8,g=function(){for(var a="",b=0;b<f;b++)a+=e.charAt(Math.floor(Math.random()*e.length));return a},h=function(a,b){for(var c=0;c<a.length;c++)if(a[c].id===b)return a[c];return null};return{exports:d}}),RemoteStorage.defineModule("archives",function(a,b){a.cache("","ALL"),a.declareType("archive",{type:"object",description:"archives"});var c=function(a){return a.getAll("archive/").then(function(b){var c=[],d=[];for(var e in b)c.push(a.storeObject("",e,b[e])),d.push(a.remove("archive/"+e));return d.push(a.remove("archive/")),0!=c.length&&Promise.all(c).then(function(){return console.log("items moved from archives/archive/ to archives/"),Promise.all(c).then(function(){return console.log("items removed at archives/archive/*"),!0}).catch(function(a){return console.log("oups..."+a),!1})}).catch(function(a){return console.log("oups..."+a),!1})})},d={upgrade:function(){return c(a)},store:function(b){return b.id||(b.id=g()),a.storeObject("archive",b.id,b).then(function(){return b})},remove:function(b){return a.remove("archiveId")},find:function(b){return a.getObject(b)},findAll:function(){return a.getAll("")}},e="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",f=5,g=function(){for(var a="",b=0;b<f;b++)a+=e.charAt(Math.floor(Math.random()*e.length));return a};return{exports:d}}),RemoteStorage.defineModule("config",function(a,b){a.cache("","ALL"),a.declareType("config",{type:"object",description:"config"});var c={path:"aaa",get:function(){return a.getObject(c.path).then(function(a){if(!a)var a={team_names:["blue","green","red","purple","black","pink","grey","orange","yellow","brown"]};return a})},set:function(b){return a.storeObject("config",c.path,b)}};return{exports:c}}),app.alert=function(a,b){var c="."+a,d=document.querySelector(c),e=d.querySelector(".alert-msg");e.innerHTML=b,d.style.display="block",window.addEventListener("click",app.cleanUI)},app.cleanUI=function(a){"icon"!==a.target.parentNode.className&&(document.getElementById("menu").className="topnav",window.removeEventListener("click",app.cleanUI)),document.querySelector(".alert").style.display="none"},app.init=function(a){function b(){"topnav"===c.className?(c.className+=" responsive",window.addEventListener("click",app.cleanUI)):c.className="topnav"}var c=document.getElementById("menu"),d=c.querySelector(".icon > a");d.onclick=b,remoteStorage.access.claim("teams","rw"),remoteStorage.access.claim("archives","rw"),remoteStorage.access.claim("config","rw"),remoteStorage.on("ready",function(){remoteStorage.teams.findAll().then(function(a){0===Object.keys(a).length&&app.alert("alert-info",'<strong>hello ;-)</strong>. Welcome to <strong>Team Tool Box!</strong>. Maybe your first time here, please have a look to the <a href="#about">About</a> section. For those who may not retrieve your datas, be sure to be synced with remoteStorage or see <a href="#settings">settings</a> to upgrade')})}),remoteStorage.displayWidget();var e=document.querySelector("#navigation h1"),f=document.querySelector("#navigation a"),g=function(a){var b=a.detail.title||"Home",c="home"===a.detail.currentPage?"&#8962;":"&#8592;";e.innerHTML=b,f.innerHTML=c};document.addEventListener("page.shown",g),window.dispatchEvent(new CustomEvent("hashchange"))},document.addEventListener("DOMContentLoaded",app.init),app.page("team-list",function(){var a=document.querySelector("#team-list ul"),b=doT.template(a.innerHTML);return a.innerHTML=null,function(c){remoteStorage.teams.findAll().then(function(c){a.innerHTML=b(c)})}}),app.page("team-list-details",function(){var a=document.getElementById("team-list-details"),b=a.querySelector("h2"),c=a.querySelector('input[name="name"]'),d=(a.querySelector('input[type="submit"]'),a.querySelector("ul.team-members")),e=doT.template(b.innerHTML),f=doT.template(d.innerHTML),g=null;d.innerHTML=null;var h=function(){return confirm("sure you want to remove this team ?")&&remoteStorage.teams.remove(g).then(function(){history.back()}),!1},i=function(a){a.preventDefault(),c.value.length>0&&remoteStorage.teams.addMember(g,{name:c.value}).then(function(a){j(a)})},j=function(g){d.innerHTML=f(g),b.innerHTML=e(g),c.value="",a.querySelector('button[name="remove"]').onclick=h};return a.querySelector('input[type="submit"]').onclick=i,function(a){g=a,remoteStorage.teams.find(g).then(function(a){j(a)})}}),app.page("team-member-details",function(){var a=document.querySelector("#team-member-details form"),b=a.querySelector('[name="id"]'),c=a.querySelector('[name="name"]'),d=a.querySelector('input[name="update-member"]'),e=a.querySelector('input[name="remove-member"]'),f=null;return d.onclick=function(a){a.preventDefault(),f.name=c.value,remoteStorage.teams.updateMember(f).then(function(){history.back()})},e.onclick=function(a){a.preventDefault();var b=window.confirm("are you sure you want to remove "+c.value);b&&remoteStorage.teams.removeMember(f.id).then(function(){history.back()})},function(a){remoteStorage.teams.findMember(a).then(function(a){a&&(f=a,b.value=f.id,c.value=f.name)})}}),app.page("team-member-add",function(){var a=document.querySelector('#team-member-add form input[name="name"]'),b=document.querySelector('#team-member-add form input[name="add"]'),c=null;return b.onclick=function(b){b.preventDefault(),a.value.length>0&&remoteStorage.teams.addMember(c,{name:a.value}).then(function(){history.back()})},function(b){c=b,a.value=""}}),app.page("team-add",function(){var a=document.querySelector('#team-add form input[name="name"]'),b=document.querySelector('#team-add form input[name="add"]');return b.onclick=function(b){b.preventDefault(),a.value.length>0&&remoteStorage.teams.store({name:a.value}).then(function(a){app("team-list-details",a.id)})},function(b){a.value=""}}),app.page("archive-save",function(){var a,b=document.querySelector("#archive-save form"),c=b.querySelector('input[name="name"]'),d=b.querySelector('textarea[name="description"]'),e=b.querySelector('button[name="cancel"]'),f=b.querySelector('input[type="submit"]');return e.onclick=function(a){a.preventDefault(),app.back()},f.onclick=function(b){if(b.preventDefault(),0==c.value.length)return!1;var e=new Date,f=e.getFullYear()+"/"+(e.getMonth()+1)+"/"+e.getDate(),g={name:c.value,description:d.value,date:f,teams:a};remoteStorage.archives.store(g).then(function(){alert("cool, generated teams archived, you can retrieve it in Archives menu"),app.back({event:"onSavedOutput"})})},function(b){a=b,c.value="",d.value=""}}),app.page("archive-list",function(){var a=document.querySelector("#archive-list .archive-list"),b=doT.template(a.innerHTML);return a.innerHTML=null,function(c){remoteStorage.archives.findAll().then(function(c){Object.keys(c).length>0?a.innerHTML=b(c):(a.innerHTML=null,app.alert("alert-info","no archives found, random generated teams when saved will be displayed here."))})}}),app.page("archive-details",function(){var a=document.getElementById("archive-details"),b=doT.template(a.innerHTML),c=null;a.innerHTML=null;var d=function(){return confirm("sure you want to remove this archive ?")&&remoteStorage.archives.remove(c.id).then(function(){history.back()}),!1},e=function(b){b.preventDefault();var d=a.querySelector("textarea");return 0!=d.value.length&&(c.comment=d.value,void remoteStorage.archives.store(c).then(function(a){f(a)}))},f=function(c){a.innerHTML=b(c),a.querySelector('button[name="remove"]').onclick=d,a.querySelector('input[name="add"]').onclick=e};return function(a){remoteStorage.archives.find(a).then(function(a){c=a,f(a)})}}),app.page("tool-build-teams",function(){var a=document.getElementById("tool-build-teams"),b=a.querySelector(".nb-members"),c=a.querySelector(".team-list"),d=a.querySelector(".teams-result"),e=a.querySelector('input[type="submit"]'),f=doT.template(c.innerHTML),g=doT.template(d.innerHTML),h=null,i=null,j=function(){var a=c.value;a==-1?remoteStorage.teams.findAll().then(function(a){var b={members:[]};for(var c in a)b.members.push.apply(b.members,a[c].members);k(b)}):remoteStorage.teams.find(a).then(k)},k=function(a){var c=i.team_names||[1,2,3,4,5,6,7,8,9,10],e=a.members;if(0==e.length)return d.innerHTML=null,void app.alert("alert-info",'humm, no members found, you can add members by clicking on the "My Groups" menu');var f,g,h=e.map(function(a,b){return b}),j=parseInt(b.value),k=Math.floor(e.length/j),m={teams:[]};if(0==k)m.teams.push({name:"Team "+c[0],members:e}),h=[];else{for(var o=0;o<k;o++){for(var a={name:"Team "+c[o]+":"},p=[j],q=0;q<j;q++)g=Math.floor(Math.random()*h.length),f=h.splice(g,1),p[q]=e[f];a.members=p,m.teams[o]=a}if(h.length>0){var p=h.map(function(a,b){return e[a]});m.orphans=p}}if(n(m),m.orphans){var r=d.querySelector(".team-orphans button");r.onclick=function(){l(m.teams,m.orphans),m.orphans=null,n(m)}}},l=function(a,b){for(var c=0,d=a.length-1;b.length>0;){var e=b.pop();c>=d&&(c=0),a[c].members.push(e),c++}},m=function(){if(h){var a=h.teams;h.orphans&&a.push({name:"Team orphan(s)",members:h.orphans}),app("archive-save",a)}},n=function(a){h=a,d.innerHTML=g(a);var b=d.querySelector('button[name="save"]');b.onclick=m};return c.innerHTML='<option value="-1">--all groups--</option>',d.innerHTML=null,e.onclick=function(a){a.preventDefault(),j()},function(a){if(remoteStorage.teams.findAll().then(function(a){0===Object.keys(a).length&&app.alert("alert-info",'humm, no members found, you can add members by clicking on the "My Groups" menu'),c.innerHTML=f(a)}),remoteStorage.config.get().then(function(a){i=a}),a&&"onSavedOutput"==a.event){var b=d.querySelector('button[name="save"]');b.classList.toggle("btn-success"),b.classList.toggle("btn-default"),b.onclick=null}}}),app.page("tool-find-members",function(){var a=document.getElementById("tool-find-members"),b=a.querySelector(".nb-members"),c=a.querySelector(".team-list"),d=a.querySelector(".teams-result"),e=a.querySelector('input[type="submit"]'),f=doT.template(c.innerHTML),g=doT.template(d.innerHTML),h=null,i=function(){var a=c.value;a==-1?remoteStorage.teams.findAll().then(function(a){var b={members:[]};for(var c in a)b.members.push.apply(b.members,a[c].members);j(b)}):remoteStorage.teams.find(a).then(j)},j=function(a){var c=a.members;if(0==c.length)return d.innerHTML=null,void app.alert("alert-info",'humm, no members found, you can add members by clicking on the "My Groups" menu');for(var e,f,g=c.map(function(a,b){return b}),h=parseInt(b.value),i=[h],j=Math.min(h,c.length),a={name:"Hall of fame:"},l=0;l<j;l++)f=Math.floor(Math.random()*g.length),e=g.splice(f,1),i[l]=c[e];a.members=i,a.name="Hall of fame:",k([a])},k=function(a){h=a,d.innerHTML=g(a);var b=d.querySelector("button");b.onclick=function(){h&&app("archive-save",h)}};return c.innerHTML='<option value="-1">--all groups--</option>',d.innerHTML=null,e.onclick=function(a){a.preventDefault(),i()},function(a){if(remoteStorage.teams.findAll().then(function(a){0===Object.keys(a).length&&app.alert("alert-info",'humm, no members found, you can add members by clicking on the "My Groups" menu'),c.innerHTML=f(a)}),a&&"onSavedOutput"==a.event){var b=d.querySelector("button");b.classList.toggle("btn-default"),b.onclick=null}}}),app.page("tool-next-member",function(){var a=document.getElementById("tool-next-member"),b=a.querySelector(".team-list"),c=a.querySelector(".teams-result"),d=a.querySelector("#shuffle-result"),e=doT.template(b.innerHTML),f=doT.template(c.innerHTML),g=doT.template(d.innerHTML),h=null;b.innerHTML='<option value="-1" selected="selected"></option>',c.innerHTML=null,d.innerHTML=null;var i=function(a){var b,c,d;for(d=a.length;d;d--)b=Math.floor(Math.random()*d),c=a[d-1],a[d-1]=a[b],a[b]=c},j=function(a){var b=a.currentTarget,c=b.checked;$checkbox_members=b.parentNode.parentNode.querySelectorAll('input[name="member_id"]');for(var d=0;d<$checkbox_members.length;d++)$checkbox_members[d].checked=c},k=function(b){b.preventDefault();var c=[];$checkbox_members=a.querySelectorAll('input[name="member_id"]');for(var e=0;e<$checkbox_members.length;e++)$checkbox_members[e].checked&&c.push(h[$checkbox_members[e].value]);i(c),d.innerHTML=g(c),window.scrollTo(0,document.body.scrollHeight)},l=function(b){h={};for(var e in b)for(var g=b[e].members,i=0;i<g.length;i++){var l=g[i];h[l.id]=l}c.innerHTML=f(b),d.innerHTML=null;for(var m=a.querySelectorAll('input[name="tick_all"]'),i=0;i<m.length;i++)m[i].onclick=j;a.querySelector('input[type="submit"]').onclick=k};return b.onchange=function(a){var c=b.value;c==-1?remoteStorage.teams.findAll().then(function(a){l(a)}):remoteStorage.teams.find(c).then(function(a){var b={};b[c]=a,l(b)})},function(a){remoteStorage.teams.findAll().then(function(a){0===Object.keys(a).length&&app.alert("alert-info",'humm, no members found, you can add members by clicking on the "My Groups" menu'),b.innerHTML=e(a)})}}),app.page("settings",function(){var a=document.getElementById("settings"),b=a.querySelector('input[name="team_names"]'),c=a.querySelector('input[name="submit"]'),d=a.querySelector('button[name="upgrade"]'),e=null;return c.onclick=function(a){a.preventDefault();var c=b.value.split(",");c.length>0&&(e.team_names=c,remoteStorage.config.set(e),alert("cool, config stored"))},d.onclick=function(a){a.stopPropagation(),remoteStorage.teams.upgrade().then(function(a){if(!a)return void app.alert("alert-info","nothing to do for teams")}),remoteStorage.archives.upgrade().then(function(a){a?app.alert("alert-info",'ok, upgrade done, just need to reload the app now: <a href="">click here</a> '):app.alert("alert-info","nothing to do")})},function(a){remoteStorage.config.get().then(function(a){e=a,b.value=a.team_names})}}),app.page("tool-match",function(){var a=document.getElementById("tool-match"),b=document.getElementById("match-left"),c=document.getElementById("match-right"),d=a.querySelector(".result"),e=b.querySelector(".team-list"),f=b.querySelector(".teams-result"),g=c.querySelector(".team-list"),h=c.querySelector(".teams-result"),i=doT.template(e.innerHTML),j=doT.template(f.innerHTML),k=doT.template(d.innerHTML);e.innerHTML=g.innerHTML='<option value="-1" selected="selected"></option>',f.innerHTML=h.innerHTML=null,d.innerHTML=null;var l=function(a){var b,c,d;for(d=a.length;d;d--)b=Math.floor(Math.random()*d),c=a[d-1],a[d-1]=a[b],a[b]=c},m=function(a,b){b.innerHTML=j(a);var c=b.querySelectorAll('input[name="member_name"]');if(b.querySelector('input[name="tick_all"]').onclick=function(){for(var a=this.checked,b=0;b<c.length;b++)c[b].checked=a},b==h){var d=o(f);if(d.length>0)for(var c=h.querySelectorAll('input[name="member_name"]'),e=0;e<c.length;e++)d.includes(c[e].value)&&(c[e].parentNode.style="text-decoration:line-through",c[e].disabled=!0)}},n=function(a,b){var c=a.value;c==-1?remoteStorage.teams.findAll().then(function(a){m(a,b)}):remoteStorage.teams.find(c).then(function(a){var d={};d[c]=a,m(d,b)})};e.onchange=function(a){n(this,f)},g.onchange=function(a){n(this,h)};var o=function(a){for(var b=a.querySelectorAll('input[name="member_name"]'),c=[],d=0;d<b.length;d++)b[d].checked&&c.push(b[d].value);return l(c),c};return a.querySelector('input[type="submit"]').onclick=function(a){a.preventDefault();var b=o(f),c=o(h);d.innerHTML=k({left:b,right:c}),window.scrollTo(0,document.body.scrollHeight)},function(a){remoteStorage.teams.findAll().then(function(a){0===Object.keys(a).length&&app.alert("alert-info",'humm, no members found, you can add members by clicking on the "My Groups" menu'),e.innerHTML=i(a),g.innerHTML=i(a)})}});