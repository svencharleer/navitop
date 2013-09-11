function nwBadgeStudentGraph()
{
	var name = "nwBadgeStudentGraph";
	var states = [];
	var animations = [];
	var eventHandler =  
	{
		onHit: function(point, obj)
		{
            //find the svg

            //find the rect


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





}

var bsg_svgW = 1200;//1200;
var bsg_svgH = 800;
var bsg_graphBarPadding = 1;
var bsg_graphPaddingX = 100;
var bsg_graphPaddingY = 200;


function addBadgeGraph(title) {

    var nrOfStudents = studentsGeneral.length;
    var nrOfBadges = badgesGeneral.length;

    var studentToGraphPositionMap = {};
    for(var i = 0; i < nrOfStudents;i++)
    {
        studentToGraphPositionMap[studentsGeneral[i].username] = i;
    }


    var w = bsg_svgW;
    var h = bsg_svgH;
    var svg = d3.select("#nwContainerArea")
        .append("svg")
        .attr("id","circlechart" )
        .attr("width", w)   // <-- Here
        .attr("height", h); // <-- and here!
    var barPadding = bsg_graphBarPadding;
    var paddingX = bsg_graphPaddingX;
    var paddingY = bsg_graphPaddingY;
    var yScale = d3.scale.linear()
        .domain([0, nrOfBadges-1])
        .range([paddingX+10, h-paddingX]);

    var xMax = nrOfStudents;
    var xScale = d3.scale.linear()
        .domain([0, nrOfStudents-1])

    .range([paddingY+10, w - paddingY * 2]);

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .ticks(badgesGeneral.length)
        .tickFormat(function(d,i) {
            return badgesGeneral[d].name; })

        .orient("left")
        .tickSize(1);



    var xAxis = d3.svg.axis()
        .scale(xScale)
        .ticks(studentsGeneral.length)
        .orient("top")
        .tickFormat(function(d,i) {

            return studentsGeneral[d].username; });


    svg.append("g")
        .attr("class", "CircleGraphAxis")
        .attr("transform", "translate(0," + ( paddingX) + ")")

        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-10px")
        .attr("dy", "10px")
        .attr("transform", function(d) {
            return "rotate(90)"
        })

    ;
    svg.append("g")
        .attr("class", "CircleGraphAxis")
        .attr("transform", "translate(" + paddingY + ",0)")

        .call(yAxis)
        ;

    var mainBars = svg.append("g").attr("id","bsg_mainCircles");

    for(var i = 0; i < nrOfBadges;i++)
    {
        var dataset = badgesGeneral[i].awardedTo;
        var studentKeys = Object.keys(dataset);
        var colors = {"positive":"#92ffa1", "negative":"#ff9292", "neutral":"#92e2ff"};

        for(var j = 0; j  < studentKeys.length;j++)
        {


            var color = colors[badgesGeneral[i].connotation];
            if(color == null)
                console.log("we have a broken badge");

            mainBars//.selectAll("circle")
                //.data(dataset)
                //.enter()
                .append("circle")
                .attr("class", "mainBar")
                .attr("id", "circlechart" + i)
                .attr("cy", yScale(i))

                .attr("cx", xScale(studentToGraphPositionMap[studentKeys[j]])) // map the user name onto the correct X value

                .attr("r", dataset[studentKeys[j]].length)

                .attr("fill", color);

        }



    }




   // var toAddToFw = svg.selectAll("circle");
   // var objects = [];
   // for(var i = 0;i < toAddToFw[0].length;i++)
   // {
        //console.log(test[0][t].id);
        //objects.push(new nwNaviGraphBar("circlechart", toAddToFw[i].id, dataset[i][0]));
  //  }
   // fw.addObjectsToDocument(objects);
    svg.append("text")
        .attr("class", "ActivityGraphTitle")
        .attr("x", 35)
        .attr("y", 20)
        //.attr("x", -h/2)
        //.attr("y", 20)
        //.attr("text-anchor", "middle")
        //.attr("transform", "rotate(-90)")
        .attr("fill","yellow")
        .text(title);
}


nwBadgeStudentGraph.prototype = Object.create(NObject.prototype);
