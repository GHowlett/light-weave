$(function() {
  $.getJSON("tags.json", function(tags) {
    $( "#tags" ).autocomplete({
      source: tags
    });
  })
});

$("#submit").click(function(e) {
  e.preventDefault();
  if (e || e.keyCode == 13) {
    var val = $("#tags").val();
    runGraph("t="+val);
  }
});

var graph = new NodeGraph("#svgcontainer",800,800);

function runGraph(tagVal) {
	$(".loading").removeClass("loadhide").addClass("loadshow");
  $.getJSON("search?" + tagVal,
            function(data){
              var paramType = tagVal.slice(0,1);
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
              $("#tags").val('');
              if (d['nodes'].length <= 0) {
                $("#displayquery").text("Sorry, " + tagVal.slice(2) + " does not return any values!  Try another search.");
              }
              else {
                $("#displayquery").text(tagVal.slice(2));
              }
              graph.update();
			  $(".loading").removeClass("loadshow").addClass("loadhide");
            },
            function(err){
              alert("Error: " + err);
            });
}

$(document).ready(function(){
	runGraph("t=father");
});
