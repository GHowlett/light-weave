var JSONParser = {};

JSONParser.getColorsMap = function(jsonObject) {
  var colorString = ["#007F35","#61BB46","#24866A","#004A46","#003B76","#0073B1","#00B0EF","#A3D7EF","#590047","#883375","#C92E46","#A9719D","#932E2B","#D95934","#AA6435","#F38487","#F8991C","#FFE000","#FDC364","#7E8082"];
  var colorMap = {};
  colorMap["keys"] = [];
  for (var keyIndex in Object.keys(jsonObject)) {

    var key = Object.keys(jsonObject)[keyIndex];

    var randomIndex = Math.round(colorString.length * Math.random());

    var colorAssignedToKey = colorString[randomIndex];

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
