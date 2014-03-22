$(function() {
  var tags = Tags.getTags();
  $( "#tags" ).autocomplete({
    source: tags
  });
});

$("#submit").click(function(e) {
  if (e || e.keyCode == 13) {
    var val = $("#tags").val();
    runGraph(val);
  }
});

var graph = new NodeGraph("body");

function runGraph(tagVal) {
  $.getJSON("http://localhost:3000/search?t=" + tagVal,
            function(data){
              graph.clear();
              var d = JSONParser.convertKeyValuePairsToNodesAndLinks(data);
              for(var i = 0; i < d.nodes.length; i++){
                graph.addNode(d.nodes[i]);
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
