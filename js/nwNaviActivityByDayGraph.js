function nwNaviActivityByDayGraph()
{
	var name = "nwNaviActivityByDayGraph";
	var states = [];
	var animations = [];
	var eventHandler =  
	{
		onHit: function(point, obj)
		{
			//document.getElementsByTagName("html")[0].webkitRequestFullScreen();
			//naviOverlay.element.style.display = "block";
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

    $.getJSON('http://localhost:3000/activity', activityGraph_total_callBack, "json");
    $.getJSON('http://localhost:3000/activity/tweeted', activityGraph_tweets_callBack, "json");
    $.getJSON('http://localhost:3000/activity/commented', activityGraph_comments_callBack, "json");
    $.getJSON('http://localhost:3000/activity/posted', activityGraph_posts_callBack, "json");


}

function addGraph(data, title, color) {
    var dataset = [];
    for(var i = 0; i < data.length; i++)
    {
        var day = new Date(data[i]._id.day);
        var item = [day, data[i].value.count] ;
        dataset.push(item);
        console.log(item[0] + " " + item[1]);
    }
    var w = 1200;
    var h = 250;
    var svg = d3.select("#nwNaviActivityByDayGraph")
        .append("svg")
        .attr("width", w)   // <-- Here
        .attr("height", h); // <-- and here!
    var barPadding = 1;
    var padding = 30;
    var minDate = new Date(1361232000000); /*[dataset[0][0]*/
    var maxDate = dataset[dataset.length - 1][0];
    var xScale = d3.time.scale()
        .domain([minDate, maxDate])
        .range([padding, w - padding * 2]);
    var yMax = d3.max(dataset, function (d) {
        return d[1];
    });
    var yScale = d3.scale.linear()
        .domain([0, yMax])
        .range([h - padding, padding]);
    console.log("0= " + yScale(0));
    console.log("140= " + yScale(140));

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .tickFormat(d3.time.format("%W"));
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(3);


    svg.append("g")
        .attr("class", "ActivityGraphAxis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "ActivityGraphAxis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

    var days = Math.floor((maxDate.getTime() - minDate.getTime())/(1000*60*60*24));

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function (d) {
            return xScale(d[0]);// * (w / dataset.length);
        })
        .attr("width", w / days - barPadding)
        .attr("y", function (d) {
            return yScale(d[1]);//d[1];
        })
        .attr("height", function (d) {
            //console.log("height is " + d[1] + " yScale is" + yScale(d[1]));
            return h - yScale(d[1]) - padding;
        })
        .attr("fill", color);//"teal");

    svg.append("text")
        .attr("class", "ActivityGraphTitle")
        .attr("x", (w / 2))
        .attr("y", (padding))
        .attr("text-anchor", "middle")
        .text(title);
}
function activityGraph_tweets_callBack(data)
{
    addGraph(data, "Tweets", "#ff7f0e");
}
function activityGraph_comments_callBack(data)
{
    addGraph(data, "Blog Comments", "#9467bd");
}
function activityGraph_total_callBack(data)
{
    addGraph(data, "Total Activity", "#74c476");
}
function activityGraph_posts_callBack(data)
{
    addGraph(data, "Blog Posts", "#d62728");
}





nwNaviActivityByDayGraph.prototype = Object.create(NObject.prototype);
