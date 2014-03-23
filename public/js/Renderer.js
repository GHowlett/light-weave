var Renderer = Renderer || {};

Renderer.graph = new NodeGraph("#svgcontainer",400,400);

Renderer.runGraph = function(tagVal) {
  var that = this;
  $.getJSON("http://localhost:3000/search?" + tagVal,
            function(data){
              var graph = that.graph;
              graph.clear();
              var d = JSONParser.convertKeyValuePairsToNodesAndLinks(data);
              var colorMap = JSONParser.getColorsMap(data);
              graph.setColorMap(colorMap);
              graph.showColors();
              for(var i = 0; i < d.nodes.length; i++){
                graph.addNode(d.nodes[i], colorMap);
              }
              for(var i = 0; i < d.links.length; i++){
                graph.addLink(d.links[i].source,d.links[i].target);
              }

            },
            function(err){
              alert("Not valid search term!");
            });
}