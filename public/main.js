$(function() {
	var tags = Tags.getTags();
	$( "#tags" ).autocomplete({
		source: tags
	});
});

$("#submit").click(
	function() {
		console.log($("#tags").val())
	}
);

var graph = new NodeGraph("body");
$.getJSON("mockdataset.json",
function(data){
	var d = JSONParser.convertKeyValuePairsToNodesAndLinks(data);
	for(var i = 0; i < d.nodes.length; i++){
		graph.addNode(d.nodes[i].name);
	}
	for(var i = 0; i < d.links.length; i++){
		graph.addLink(d.links[i].source,d.links[i].target);
	}
},
function(err){
	//tERROR!
});

console.log(graph);