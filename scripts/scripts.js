function mustache(a,b,c,d){function e(a,b){return b=b.pop?b:b.split("."),a=a[b.shift()]||"",0 in b?e(a,b):a}var f=mustache,g="";b=Array.isArray(b)?b:b?[b]:[],b=d?0 in b?[]:[1]:b;for(d=0;d<b.length;d++){var h,i="",j=0,k="object"==typeof b[d]?b[d]:{};k.prototype=c,k[""]={"":b[d]},a.replace(/([\s\S]*?)({{((\/)|(\^)|#)(.*?)}}|$)/g,function(a,b,c,d,l,m,n){j?i+=j&&!l||1<j?a:b:(g+=b.replace(/{{{(.*?)}}}|{{(!?)(&?)(>?)(.*?)}}/g,function(a,b,c,d,g,h){return b?e(k,b):d?e(k,h):g?f(e(k,h),k):c?"":new Option(e(k,h)).innerHTML}),h=m),l?--j||(n=e(k,n),g=/^f/.test(typeof n)?g+n.call(k,i,function(a){return f(a,k)}):g+f(i,n,k,h),i=""):++j})}return g}!function(){function a(a,b){b=b||{bubbles:!1,cancelable:!1,detail:void 0};var c=document.createEvent("CustomEvent");return c.initCustomEvent(a,b.bubbles,b.cancelable,b.detail),c}a.prototype=window.Event.prototype,window.CustomEvent=a}(),function(a){function b(a,b){var c=document.querySelector("section#"+a);if(0==c.length)return void console.warn("section with id=%s not found!",a);var d=e[a];if(d){var i=c.length>0?c[0]:null,j=d.call(i,b);"function"==typeof j&&(h(c,"[no-ctl-cache]")||(e[a]=j),j.call(i,b))}f&&(document.body.classList.remove(f),g&&(document.dispatchEvent(new CustomEvent("page.hidden",{currentPage:f})),g.getAttribute("src")&&h(g,"[no-ctl-cache]")&&(g.innerHTML=null))),document.body.classList.add(f=a),(g=c)&&document.dispatchEvent(new CustomEvent("page.shown",{currentPage:f}))}function c(a,d){var e=document.body.querySelector("section#"+a),f=e.getAttribute("src");f&&!e.hasChildNodes()?c.get(f,e,a,d):b(a,d)}function d(){var a=location.hash||"#"+document.querySelector("section[default]").getAttribute("id"),b=/#([-0-9A-Za-z]+)(\:(.+))?/,d=b.exec(a);a=d[1];var e=d[3];c(a,e)}var e={},f=null,g=null,h=function(a,b){return(a.matches||a.matchesSelector||a.msMatchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.oMatchesSelector).call(a,b)};c.page=function(a,b){e[a]=b},c.get=function(a,c,d,e){var f=new XMLHttpRequest;f.open("GET",a,!0),f.onload=function(){f.status>=200&&f.status<400?(c.innerHTML=f.responseText,b(d,e)):console.warn("failed to get %s page!",d)},f.onerror=function(){console.warn("failed to get %s page!",d)},f.send()},c.start=function(){a.dispatchEvent(new CustomEvent("hashchange"))},a.addEventListener("hashchange",d),a.app=c}(this),function(a){function b(){var a=JSON.stringify(g,["last_member_id","last_team_id","teams","members","name","id","description"]);localStorage.setItem(f,a)}function c(){var a=localStorage.getItem(f);return JSON.parse(a)}function d(a,b){for(var c=0;c<a.length;c++)if(a[c].id===b)return a[c];return null}function e(){console.log("TeamRepo called")}var f="ttb",g=c()||{last_member_id:0,last_team_id:0,teams:[]};e.findAll=function(){return g.teams},e.findById=function(a){return d(g.teams,a)},e.removeMember=function(a){for(var c=0;c<g.teams.length;c++)for(var d=g.teams[c].members,c=0;c<d.length;c++)if(d[c].id===a){d.splice(c,1);break}b()},e.addTeam=function(a){g.last_team_id++,a.id=g.last_team_id,g.teams.push(a),b()},e.findMember=function(a){for(var b=0;b<g.teams.length;b++){var c=d(g.teams[b].members,a);if(c)return c}return null},e.addMember=function(a,c){var e=d(g.teams,a);if(!e)throw"gloups, team does not exist";e.members||(e.members=[]);var f=e.members;g.last_member_id++,c.id=g.last_member_id,f.push(c),b()},e.save=b,e.updateMember=function(a,c){var e=d(a);if(!e)throw"gloups, team does not exist";var c=d(e.members,id);c&&(c.name=c.name),b()},a.TeamRepository=e}(this),app.alert=function(a,b){var c="."+a,d=document.querySelector(c),e=d.querySelector(".alert-msg");e.innerHTML=b,d.style.display="block"},app.page("team-list",function(){var a=document.querySelector("#team-list ul"),b=a.innerHTML;return a.innerHTML=null,function(c){var d=TeamRepository.findAll(),e=mustache(b,{teams:d});a.innerHTML=e}}),app.page("team-list-details",function(){var a=document.getElementById("team-list-details"),b=a.innerHTML;return a.innerHTML=null,function(c){var d=parseInt(c),e=TeamRepository.findById(d),f=mustache(b,e);a.innerHTML=f}}),app.page("home",function(){var a=document.getElementById("home"),b=a.querySelector("#nb"),c=a.querySelector("#gen_teams"),d=(a.querySelector("#gen_members"),a.querySelector(".team-list")),e=a.querySelector("#teams-result"),f=a.querySelector('input[type="submit"]'),g=e.innerHTML,h=d.innerHTML,i=null,j=function(){var a=parseInt(d.value),e=TeamRepository.findById(a),f=e.members;if(0!=f.length){var g=f.map(function(a,b){return b}),h=parseInt(b.value),i=null;i=c.checked?l(h,f,g):k(h,f,g),i&&m(i)}},k=function(a,b,c){for(var d,e,f=[a],g=Math.min(a,b.length),h={name:"Hall of fame:"},i=0;i<g;i++)e=Math.floor(Math.random()*c.length),d=c.splice(e,1),f[i]=b[d];return h.members=f,h.name="Hall of fame:",[h]},l=function(a,b,c){var d=Math.floor(b.length/a);console.log("nbPers:"+a+" - nbTeam:"+d);for(var e,f,g=[],h=0;h<d;h++){for(var i={name:"Team "+h+":"},j=[a],k=0;k<a;k++)f=Math.floor(Math.random()*c.length),e=c.splice(f,1),j[k]=b[e];i.members=j,g[h]=i}if(c.length>0){var j=c.map(function(a,b){return peoples[a]}),i={name:"Team Orphan(s)",members:j};g.push(i)}return g},m=function(a){var b=mustache(g,{list:a});i=a,e.innerHTML=b};return e.innerHTML=null,f.onclick=function(a){a.preventDefault(),j()},function(a){console.log("kikou");var b=TeamRepository.findAll();0==b.length&&app.alert("alert-info",'hello, no members found, you can add members by clicking on the "Team List" menu');var c=mustache(h,{teams:b});d.innerHTML=c}}),app.page("team-member-details",function(){var a=document.querySelector("#team-member-details form"),b=a.querySelector('[name="id"]'),c=a.querySelector('[name="name"]'),d=a.querySelector('input[name="update-member"]'),e=a.querySelector('input[name="remove-member"]'),f=null;return d.onclick=function(a){a.preventDefault(),f.name=c.value,TeamRepository.save(),history.back()},e.onclick=function(a){a.preventDefault();var d=window.confirm("are you sure you want to remove "+c.value);d&&(TeamRepository.removeMember(parseInt(b.value)),history.back())},function(a){var d=parseInt(a);f=TeamRepository.findMember(d),b.value=f.id,c.value=f.name}}),app.page("team-member-add",function(){var a=document.querySelector('#team-member-add form input[name="name"]'),b=document.querySelector('#team-member-add form input[name="add"]'),c=null;return b.onclick=function(b){b.preventDefault(),a.value.length>0&&(TeamRepository.addMember(c,{name:a.value}),history.back())},function(a){c=parseInt(a)}}),app.page("team-add",function(){var a=document.querySelector('#team-add form input[name="name"]'),b=document.querySelector('#team-add form input[name="add"]');return b.onclick=function(b){b.preventDefault(),a.value.length>0&&(TeamRepository.addTeam({name:a.value}),history.back())},function(a){}}),app.page("archive-save",function(){var a,b=document.querySelector("#archive-save form"),c=b.querySelector("name"),d=b.querySelector("description"),e=b.querySelector(".button");return e.onclick=function(){var a={name:c.value,description:d.value,output:currentOutput};TeamRepository.archiveSave(a)},function(b){a=b,console.log(b)}});