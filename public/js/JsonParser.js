var JSONParser = {};

JSONParser.getColorsMap = function(jsonObject) {
  var colorString = ["#00FFFF", "#8A2BE2", "#7FFF00", "#FF7F50", "#00FFFF", "#9932CC"
  , "#FFD700", "#90EE90", "#FFB6C1", "#48D1CC", "#DA70D6"];
  var colorMap = {};
  for (var keyIndex in Object.keys(jsonObject)) {

    var key = Object.keys(jsonObject)[keyIndex];
    var randomIndex = Math.round(colorString.length * Math.random());

    var colorAssignedToKey = colorString[randomIndex];
    console.log(colorAssignedToKey);
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
