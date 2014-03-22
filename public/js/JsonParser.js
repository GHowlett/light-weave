var JSONParser = {};

JSONParser.convertKeyValuePairsToNodesAndLinks = function(jsonObject) {
  var mapIndex = 0;
  var nodes = [];
  var nodeBackMap = {};
  for (index in Object.keys(jsonObject)) {
    var key = Object.keys(jsonObject)[index];
    var vals = jsonObject[key];
    for (var i = 0; i < vals.length; i++) {
      var val = vals[i];
      if (nodeBackMap[val] == null) {
        nodes.push({name: val});
		
        //nodeBackMap[val] = mapIndex++;
		nodeBackMap[val] = val;
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
      var srcNodeIndex = nodeBackMap[val];

      for(var j = i + 1; j < vals.length; j++) {

        var val2 = vals[j];
        var dstNodeIndex = nodeBackMap[val2];
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
