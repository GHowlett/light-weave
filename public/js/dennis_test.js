var  allowed = [
	'character',
	'emotion',
	'gender',
	'genre',
	'location',
	'tagstheme',
	'verses'
];

function unique(list) {
  var result = [];
  $.each(list, function(i, e) {
    if ($.inArray(e, result) == -1) result.push(e);
  });
  return result;
}

$.getJSON("https://spreadsheets.google.com/feeds/list/0AghWOk69sH-xdGhRLTA1M2xmMzVGbEp5aFBDN2tnLUE/od6/public/values?alt=json",
	function(data){
		console.log(data);
		var entries = data.feed.entry;
		var obj = {global:[]};
		entries.forEach(function(a){
			for( var i in a){
				var name = i.replace(/gsx\$/,'');
				
				if(allowed.indexOf(name) != -1){
					obj.global.push(name);
					if(obj[name] == undefined)obj[name] = [];
					if(name != "verses"){
						var data = a[i].$t.split(',');
						for(var j = 0 ; j < data.length; j++){
							data[j] = $.trim(data[j]);
							if(data[j] != undefined && data[j] !== ""){
								var _i =obj.global.push(data[j]);
								obj[name].push(_i);
								if(obj[data[j]] == undefined)obj[data[j]] = [];
								obj[data[j]].push(name)
								for(var l = 0; l < data.length; l++) if(l != j)obj[data[j]].push(data[l]);
								for(k in a){
								
								}
							}
						}
					}else{
						var _i =obj.global.push(a[i].$t)
						obj[name].push(_i)
					}
					obj[name] = unique(obj[name]);
					obj.global = unique(obj.global);
				}
				
			}
		});
		console.log(obj);
});