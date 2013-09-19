function nwBadgeGraphs()
{
	var name = "nwBadgeGraphs";
	var states = [];
	var animations = [];
	var eventHandler =  
	{
		onHit: function(point, obj)
		{
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





}

function initSingleBadgeGraphs()
{
    dataCache["nwBadgeGraphs"]["DATA"].forEach(function(d){
        initSingleBadgeGraph(d.key);
    });
}

function loadSingleBadgeGraphs()
{

    dataCache["nwBadgeGraphs"]["DATA"].forEach(function(d){
        //d.key is badge_image
        var set1 = 0, set2 = 0;
        if(dataCache["nwBadgeGraphs"]["DATA_USERS"][d.key] != null)
            set1 = dataCache["nwBadgeGraphs"]["DATA_USERS"][d.key];
        if(dataCache["nwBadgeGraphs"]["DATA_USERS2"][d.key] != null)
            set2 = dataCache["nwBadgeGraphs"]["DATA_USERS2"][d.key];

        addSingleBadgeGraph(d.key, d.value,set1,set2);

    });

}

var bg_svgW = 400;//1200;
var bg_svgH = 200;
var bg_graphBarPadding = 1;
var bg_graphPaddingX = 0;
var bg_graphPaddingY = 0;


function initSingleBadgeGraph(title)
{
    var w = bg_svgW;
    var h = bg_svgH;
    var svg = d3.select("#nwBadgeGraphs")
        .append("svg")
        .attr("id","badgeGraph" +title )
        .attr("width", w)   // <-- Here
        .attr("height", h); // <-- and here!



    var mainBars = svg.append("g").attr("id","bg_mainbars"+title);
    var set1Bars = svg.append("g").attr("id","bg_set1bars"+title);
    var set2Bars = svg.append("g").attr("id","bg_set2bars"+title);
}

function addSingleBadgeGraph(title, total, set1, set2) {

    var svg = d3.select("#nwBadgeGraphs");
    var mainBars = svg.select("#bg_mainbars"+title);
    var set1Bars = svg.select("#bg_set1bars"+title);
    var set2Bars = svg.select("#bg_set2bars"+title);



    // var rects = mainBars.selectAll("rect");
    var dataTotal = [];
    var dataSet1 = [];
    var dataSet2 = [];
    for(var i = 0;i < total;i++)
        dataTotal.push(1);
    for(var i = 0;i < set1;i++)
        dataSet1.push(1);
    for(var i = 0;i < set2;i++)
        dataSet2.push(1);

    var bars = [{bar:mainBars, name:"bg_mainbars", color:"#008293",y:10, data:dataTotal},
                {bar:set1Bars, name:"bg_set1bars", color:"#00daec",y:22, data:dataSet1},
                {bar:set2Bars, name:"bg_set2bars", color:"#ff877f",y:34, data:dataSet2}];

    bars.forEach(function(d){
        d.bar.selectAll("rect").remove();
        d.bar.selectAll("rect").data(d.data).enter().append("rect")
            .attr("id",  "bg_mainbars" + title + "_" + i)
            .attr("y", d.y)

            .attr("x", function(d,i){return i*4;}) // map the user name onto the correct X value

            .attr("width", 2)
            .attr("height", 10)

            .attr("fill", d.color);




    });








}



nwBadgeGraphs.prototype = Object.create(NObject.prototype);








