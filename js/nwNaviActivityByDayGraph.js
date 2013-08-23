function nwNaviActivityByDayGraph()
{
	var name = "nwNaviActivityByDayGraph";
	var states = [];
	var animations = [];
	var eventHandler =  
	{
		onHit: function(point, obj)
		{
			document.getElementsByTagName("html")[0].webkitRequestFullScreen();
			naviOverlay.element.style.display = "block";
		},
		onLetGo: function(obj)
		{
		},
		onMove: function(point, obj)
		{

		}
	};
	var layer = 2;
	
	NObject.call(this, name, layer, null, null, "", "", eventHandler, animations, states,[], true);
	this.element.style.display = "";

    $.getJSON('http://localhost:3000/activity', activityGraph_callBack, "json");


}

function activityGraph_callBack(data)
{
    var dataset = [];
    for(var i = 0; i < data.length; i++)
    {
        var day = new Date(data[i]._id.day);
        var item = [day, data[i].value.count] ;
        dataset.push(item);
        console.log(item[0] + " " + item[1]);
    }

    var w = 1300;
    var h = 300;
    var svg = d3.select("#nwNaviActivityByDayGraph")
        .append("svg")
        .attr("width", w)   // <-- Here
        .attr("height", h); // <-- and here!
    var barPadding = 1;
    var padding = 30;
    var xScale = d3.time.scale()
        .domain([dataset[0][0], dataset[data.length-1][0]])
        .range([padding, w - padding * 2]);
    var yMax = d3.max(dataset, function(d) {return d[1]; });
    var yScale = d3.scale.linear()
        .domain([0, yMax])
        .range([h - padding, padding]);
    console.log("0= " +yScale(0)) ;
    console.log("140= " +yScale(140)) ;

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .tickFormat(d3.time.format("%W"));
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");


    svg.append("g")
        .attr("class", "nwNaviActivityByDayGraphAxis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "nwNaviActivityByDayGraphAxis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d) {
            return xScale(d[0]);// * (w / dataset.length);
        })
        .attr("width", w / dataset.length - barPadding)
        .attr("y", function(d) {
             return yScale(d[1]);//d[1];
        })
        .attr("height", function(d) {
            console.log("height is " + d[1] + " yScale is" + yScale(d[1]));return h - yScale(d[1])-padding;
        })
        .attr("fill", "teal");
}


nwNaviActivityByDayGraph.prototype = Object.create(NObject.prototype);
