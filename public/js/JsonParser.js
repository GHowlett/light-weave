var JSONParser = {};

JSONParser.getColorsMap = function(jsonObject) {
  var colorString = [
		"#007F35",
		"#003B76",
		"#590047",
		"#932E2B",
		"#F8991C",

		"#61BB46",
		"#0073B1",
		"#883375",
		"#D95934",
		"#FFE000",

		"#24866A",
		"#00B0EF",
		"#C92E46",
		"#AA6435",
		"#FDC364",

		"#004A46",
		"#A3D7EF",
		"#A9719D",
		"#F38487",
		"#7E8082"
  ];
  var colorMap = {};
  colorMap["keys"] = [];
  var randomIndex = (colorString.length * Math.random())|0;
  for (var keyIndex in Object.keys(jsonObject)) {

    var key = Object.keys(jsonObject)[keyIndex];

    var colorAssignedToKey = colorString[randomIndex++];
	if(randomIndex >= colorString.length)randomIndex=0;

    colorMap["keys"].push({"key": key, "color": colorAssignedToKey});

    var values = jsonObject[key];

    for (var valIndex in values) {

      var value = values[valIndex].ref;
      colorMap[value] = colorMap[value] == null ? colorAssignedToKey : colorMap[value];

    }
  }

  return colorMap;
}

JSONParser.convertKeyValuePairsToNodesAndLinks = function(jsonObject) {
  var mapIndex = 0;
  var nodes = [];
  var nodeBackMap = {};
  for (index in Object.keys(jsonObject)) {
    var key = Object.keys(jsonObject)[index];
    console.log(key);
    var vals = jsonObject[key];
    for (var i = 0; i < vals.length; i++) {
      var val = vals[i];
      if (nodeBackMap[val.ref] == null) {
        nodes.push({name: val.ref, content: val.content});
        nodeBackMap[val.ref] = val.ref;
      }
    }
  }

  var links = [];
  var linkExistsMap = {};
  for (index in Object.keys(jsonObject)) {
    var key = Object.keys(jsonObject)[index];
    var vals = jsonObject[key];

    for (var i = 0; i < vals.length; i++) {

      var val = vals[i];

      var srcNodeIndex = nodeBackMap[val.ref];

      for(var j = i + 1; j < vals.length; j++) {

        var val2 = vals[j];
        var dstNodeIndex = nodeBackMap[val2.ref];
        var linkMapKey = srcNodeIndex + "-" + dstNodeIndex;

        if (linkExistsMap[linkMapKey] == null) {
          linkExistsMap[linkMapKey] = true;
          var toPush = {source: srcNodeIndex, target: dstNodeIndex};
          links.push(toPush);
        }

      }
    }
  }

  return {nodes: nodes, links: links};
}
