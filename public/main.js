$(function() {
  $.getJSON("http://localhost:3000/tags.json", function(tags) {
    $( "#tags" ).autocomplete({
      source: tags
    });
  })
});

$("#submit").click(function(e) {
  e.preventDefault();
  if (e || e.keyCode == 13) {
    var val = $("#tags").val();
    runGraph(val);
  }
});

var graph = new NodeGraph("#svgcontainer",800,800);

function runGraph(tagVal) {
  $.getJSON("http://localhost:3000/search?t=" + tagVal,
            function(data){
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


console.log(graph);
