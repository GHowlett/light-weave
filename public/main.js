$(function() {
  var tags = Tags.getTags();
  $( "#tags" ).autocomplete({
    source: tags
  });
});

$("#submit").click(function() {
  var val = $("#tags").val();
  runGraph(val);
});

var graph = new NodeGraph("body");

function runGraph(tagVal) {
  $.getJSON("http://localhost:3000/search?t=" + tagVal,
            function(data){

              var d = JSONParser.convertKeyValuePairsToNodesAndLinks(data);
              for(var i = 0; i < d.nodes.length; i++){
                graph.addNode(d.nodes[i]);
              }
              for(var i = 0; i < d.links.length; i++){
                graph.addLink(d.links[i].source,d.links[i].target);
              }
            },
            function(err){
              //tERROR!
            });
}


console.log(graph);
