/*
	The main graph that display the data
*/

/*
	Creates a force node graph
	@constructor
	@this {NodeGraph}
	@param {string|domElement} el - the element to attach the graph to (ex: "body")
*/
function NodeGraph(el,w,h){
  this.el = $(el);
  this.width = $(el).innerWidth();
  this.height = $(el).innerHeight();

  var scope = this;
  $(window).resize(function(){
    scope.update();
  });

  //@private
  this._display = d3.select(el).append("svg:svg")
  .attr("class","display")
  .attr("width",this.width)
  .attr("height",this.height)
  .attr("viewBox", "0,0,"+[w,h].join(","));

  //@private
  this._force = d3.layout.force()
  .gravity(.05)
  .distance(100)
  .charge(-100)
  .size([w, h]);

  this.nodes = this._force.nodes();
  this.links = this._force.links();
  this.colorMap = {};
  this.legendLoaded = false;
  this.update();
}

NodeGraph.prototype = {
  setColorMap: function(colorMap) {
    this.colorMap = colorMap;
  },
  addNode : function(verseNode){
    this.nodes.push({
      id:verseNode.name,
      content:verseNode.content
    });
    this.update();
  },
  findNode : function(id){
    for (var i = 0, _len = this.nodes.length; i < _len; i++){
      if( this.nodes[i]["id"] === id ) return this.nodes[i];
    }
  },
  findNodeIndex : function(id){
    for (var i = 0, _len = this.nodes.length; i < _len; i++){
      if( this.nodes[i]["id"] === id ) return i;
    }
  },
  removeNode : function(id){
    var i = 0;
    var n = this.findNode(id);

    while( i < this.links.length ){
      if( (this.links[i]['source'] == n) || (this.links[i]['target'] == n) ){
        this.links.splice(i,1);
      } else i++;
    }
    var m = this.findNodeIndex(id);
    this.nodes.splice(m,1);
    this.update();
  },
  addLink : function(source , target){
    this.links.push({
      source: this.findNode(source),
      target: this.findNode(target)
    });
    this.update();
  },
  //update graph
  //NOT DONE - I need some actual data to mess around with
  update : function(){
    //clear
    this._display.attr("width",0).attr("height",0);
    this.width = this.el.innerWidth();
    this.height = this.el.innerHeight();
    this._display.attr("width",this.width).attr("height",this.height);
    this._display.selectAll("*").remove();
    //append
    var link = this._display.selectAll('line.link')
    .data(this.links, function(d){
      return d.source.id + "-" + d.target.id;
    });
    link.enter().insert('line')
    .attr('class', 'link');
    link.exit().remove();

    var node = this._display.selectAll("g.node")
    .data(this.nodes, function(d) {
      return d.id;
    });

    var nodeEnter = node.enter().append("g")
    .attr('class', "node")
    .call(this._force.drag);

    var circle = nodeEnter.append("circle")
    .attr("class","nodeBody")
    .attr("r",20)
    .on("mouseover", function(d) {
      $("#versecontainer").empty();
      $("#versecontainer").append("<b>" + d.id + "</b>" + d.content);
    })
    .on("click", function(d) {
      console.log(d.id);
      runGraph("v=" + d.id + "&l=3");
    });

    var colorMap = this.colorMap || {};
    if (colorMap) {
      circle.attr("fill", function(d) {
        return colorMap[d.id];});
    }

    var truncateString = function(input, maxLength) {
      maxLength = maxLength || 200;
      if (input.length <= maxLength) {return input;}
      var subsString = "...";
      var firstPartString = input.substring(0, maxLength/2 - subsString.length/2);
      var remainingLength = maxLength - (firstPartString.length + subsString.length);

      var indexOfSecondHalf = input.length - remainingLength;
      var secondPartString = input.substring(indexOfSecondHalf);

      return firstPartString + subsString + secondPartString;
    }

    $(".nodeBody").tipsy({
      gravity: 's',
      html: true,
      title: function() {
        return this.__data__.id;
      }
    });


    node.exit().remove();

    //force update
    this._force.on("tick", function(){
      link.attr("x1", function(d){ return d.source.x;})
      .attr("y1", function(d){ return d.source.y; })
      .attr("x2", function(d){ return d.target.x; })
      .attr("y2", function(d){ return d.target.y; })

      node.attr("transform", function(d){
        return "translate(" + [d.x, d.y].join(',') + ")";
      });
    });

    this._force.start();
  },
  clear: function() {
    this.nodes.splice(0, this.nodes.length);
    this.links.splice(0, this.links.length);
    this.update();
  },
  showColors: function() {

    if (this.colorMap.hasOwnProperty("keys")) {
      var colorVector = this.colorMap["keys"];

      d3.select(".legend").selectAll("*").remove();

      var legend = d3.select(".legend").selectAll("div")
      .data(colorVector).enter()
      .append("div");

      legend.text(function(d) {return d.key;})
      .on("click", function(d) {runGraph("t=" + d.key);})
      .style("color", function(d) {return d.color;});

    }
  }
};
