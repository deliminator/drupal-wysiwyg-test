Aloha.ready(function(){Aloha.require(["ui/settings"],function(e){module("Settings"),test("combine user and default settings",function(){var t=[{label:"not-modified",components:["1","2","3"]},{label:"groups",components:[["a","b","c"],["d","e","f"]],showOn:{scope:"user"}},{label:"one-added",components:["4","5","6"]}],n=[{label:"one-added",components:["4","added","6","ignored"],showOn:{scope:"default"}},{label:"groups",components:[["d","e","g"],["f","a","b"],["h","i","j"]],showOn:{scope:"default"}},{label:"one-remains",components:["2","3","remains"]},{label:"empty",components:["1","5"]}],r=[{label:"not-modified",components:["1","2","3"]},{label:"groups",components:[["a","b","c"],["d","e","f"],["g"],["h","i","j"]],showOn:{scope:"user"}},{label:"one-added",components:["4","5","6","added"],showOn:{scope:"default"}},{label:"one-remains",components:["remains"]}],i=e.combineToolbarSettings(t,n,["ignored"]);deepEqual(r,i)})})})