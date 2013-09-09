function nwNaviActivityByDayGraph()
{
	var name = "nwNaviActivityByDayGraph";
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

    $.getJSON('http://localhost:3000/activity', activityGraph_total_callBack, "json");
    $.getJSON('http://localhost:3000/activity/tweeted', activityGraph_tweets_callBack, "json");
    $.getJSON('http://localhost:3000/activity/commented', activityGraph_comments_callBack, "json");
    $.getJSON('http://localhost:3000/activity/posted', activityGraph_posts_callBack, "json");


}

var svgW = 400;//1200;
var svgH = 150;
var graphBarPadding = 1;
var graphPadding = 50;
var graphTransformX = [];
var graphTransformY = [];
var graphDays = 0;
var minDate = new Date(1361232000000);
var maxDate = new Date(1369612800000);
function addGraph(data, id, title, color) {


    var dataset = [];

    for(var i = 0; i < data.length; i++)
    {
        var day = new Date(data[i]._id.day);
        var item = [day, data[i].value.count] ;
        dataset.push(item);
    }

    var w = svgW;//1200;
    var h = svgH;
    var svg = d3.select("#nwNaviActivityByDayGraph")
        .append("svg")
        .attr("id", id )
        .attr("width", w)   // <-- Here
        .attr("height", h); // <-- and here!
    var barPadding = graphBarPadding;
    var padding = graphPadding;

    var xScale = d3.time.scale()
        .domain([minDate, maxDate])
        .range([padding, w - padding * 2]);
    var yMax = d3.max(dataset, function (d) {
        return d[1];
    });
    var yScale = d3.scale.linear()
        .domain([0, yMax])
        .range([h - padding, padding]);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .tickFormat(d3.time.format("%W"));
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(3);
    graphTransformX[id] = xScale;
    graphTransformY[id] = yScale;


    svg.append("g")
        .attr("class", "ActivityGraphAxis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "ActivityGraphAxis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

    var mainBars = svg.append("g").attr("id","mainBars");
    svg.append("g").attr("id","subBars");
    svg.append("g").attr("id","subBars2");


    graphDays = Math.floor((maxDate.getTime() - minDate.getTime())/(1000*60*60*24));

    mainBars.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "mainBar")
        .attr("id", function(d,i){return id + i;})
        .attr("x", function (d) {
            return xScale(d[0]);// * (w / dataset.length);
        })
        .attr("width", w / graphDays - barPadding)
        .attr("y", function (d) {
            return yScale(d[1]);//d[1];
        })
        .attr("height", function (d) {
            //console.log("height is " + d[1] + " yScale is" + yScale(d[1]));
            return h - yScale(d[1]) - padding;
        })
        .attr("fill", color);//"teal");
    var toAddToFw = svg.selectAll("rect");
    var objects = [];
    for(var i = 0;i < toAddToFw[0].length;i++)
    {
        //console.log(test[0][t].id);
        objects.push(new nwNaviGraphBar(id, toAddToFw[0][i].id, dataset[i][0]));
    }
    fw.addObjectsToDocument(objects);
    svg.append("text")
        .attr("class", "ActivityGraphTitle")
        .attr("x", -h/2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("fill",color)
        .text(title);
}

var colors = [];
var fadedColors = {};
colors[0] = {};
colors[1] = {};

colors[0]["nwTweetGraph"] = "#ff7f0e";
colors[0]["nwActivityGraph"] = "#74c476";
colors[0]["nwBlogCommentGraph"] = "#9467bd";
colors[0]["nwBlogPostGraph"] = "#d62728";

fadedColors["nwTweetGraph"] = "#9d2c00";
fadedColors["nwActivityGraph"] = "#004e07";
fadedColors["nwBlogCommentGraph"] = "#47206f";
fadedColors["nwBlogPostGraph"] = "#7f0000";

colors[1]["nwTweetGraph"] = "#ffba51";
colors[1]["nwActivityGraph"] = "#baffba";
colors[1]["nwBlogCommentGraph"] = "#ecbbff";
colors[1]["nwBlogPostGraph"] = "#ff6b5a";

var dataCache = {
        "nwTweetGraph": {GRAPH_NOCOMPARE: [], GRAPH_COMPARE: []},
        "nwActivityGraph": {GRAPH_NOCOMPARE: [], GRAPH_COMPARE: []},
        "nwBlogCommentGraph": {GRAPH_NOCOMPARE: [], GRAPH_COMPARE: []},
        "nwBlogPostGraph": {GRAPH_NOCOMPARE: [], GRAPH_COMPARE: []}
};




function activityGraph_tweets_callBack(data)
{
    dataCache["nwTweetGraph"][GRAPH_NOCOMPARE] = data;
    addGraph(data, "nwTweetGraph", "Tweets", colors[0]["nwTweetGraph"]);
}
function activityGraph_comments_callBack(data)
{
    dataCache["nwBlogCommentGraph"][GRAPH_NOCOMPARE] = data;
    addGraph(data, "nwBlogCommentGraph","Blog Comments", colors[0]["nwBlogCommentGraph"]);
}
function activityGraph_total_callBack(data)
{
    dataCache["nwActivityGraph"][GRAPH_NOCOMPARE] = data;
    addGraph(data, "nwActivityGraph","Total Activity", colors[0]["nwActivityGraph"]);
}
function activityGraph_posts_callBack(data)
{
    dataCache["nwBlogPostGraph"][GRAPH_NOCOMPARE] = data;
    addGraph(data, "nwBlogPostGraph","Blog Posts", colors[0]["nwBlogPostGraph"]);
}



function updateGraph(data, id, reset, compareSet)
{

    var svg = d3.select("#"+id);
    var mainBars = svg.select("#mainBars");
    var subBars = svg.select("#subBars");
    if(reset)
    {
        mainBars.selectAll("rect").transition()
            .duration(500).attr("fill", colors[id]);
        subBars.selectAll("rect").remove();
        return;

    }
    var w = svgW;//1200;
    var h = svgH;
    var barPadding = graphBarPadding;
    var padding = graphPadding;
    var dataset = [];
    for(var i = 0; i < data.length; i++)
    {
        var day = new Date(data[i]._id.day);
        var item = [day, data[i].value.count] ;
        dataset.push(item);
    }

    //check if we're showing 1 value, or comparing 2. if 2, which one, left or right
    var barXOffset;
    var barWidth;
    var barGroupName;
    var barColor;
    switch(compareGroupStatus)
    {
        case GRAPH_COMPARE:
            if(compareSet == 1)
            {
                barXOffset = 0;
                barWidth = (w / graphDays - barPadding)/2;
                barGroupName  = "#subBars";
                barColor = colors[0][id];
            }
            else
            {
                barXOffset = (w / graphDays - barPadding)/2;
                barWidth = (w / graphDays - barPadding)/2;
                barGroupName  = "#subBars2";
                barColor = colors[1][id];
            }
            break;
        case GRAPH_NOCOMPARE:
        default:
            barXOffset = 0;
            barWidth = (w / graphDays - barPadding);
            barGroupName  = "#subBars";
            //reset if there is still a comparison
            var subBars2 = svg.select(barGroupName + "2");
            subBars2.selectAll("rect").remove();
            barColor = colors[0][id];
            break;

    }


    mainBars.selectAll("rect").transition()
        .duration(500).attr("fill", fadedColors[id]);

    var subBars = svg.select(barGroupName);
    subBars.selectAll("rect").remove();

    subBars.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "subBar")
        .attr("y", function (d) {
            return graphTransformY[id](0);//d[1];
        })
        .attr("height", function (d) {
            return h - graphTransformY[id](0) - padding;
        });


    subBars.selectAll("rect")
        .data(dataset)
        .transition()
        .duration(500)
        .attr("id", function(d,i){return id + i;})
        .attr("x", function (d) {
            return graphTransformX[id](d[0])+barXOffset;
        })
        .attr("width", barWidth)
        .attr("y", function (d) {
            return graphTransformY[id](d[1]);//d[1];
        })
        .attr("height", function (d) {
            return h - graphTransformY[id](d[1]) - padding;
        })
        .attr("fill",barColor);
    ;
}

var graph_selectedUsers = []
    graph_selectedUsers[0] = [];
    graph_selectedUsers[1] = [];

function updateGraph_Users(user)
{
    var comparegroup = compareGroupStatus == GRAPH_NOCOMPARE || compareGroupStatus == GRAPH_COMPARE ? 0 : 1;
    graph_selectedUsers[comparegroup].push(user);
    updateGraph_all_users(comparegroup);
}

function updateGraph_UsersDeleted(user)
{
    var comparegroup = compareGroupStatus == GRAPH_NOCOMPARE || compareGroupStatus == GRAPH_COMPARE ? 0 : 1;
    var index = graph_selectedUsers[comparegroup].indexOf(user);
    if(index != -1)
        graph_selectedUsers[comparegroup].splice(index, 1);
    if(graph_selectedUsers[comparegroup].length > 0)
        updateGraph_all_users(comparegroup);
    else
    {
        updateGraph(null, "nwActivityGraph", true);
        updateGraph(null, "nwTweetGraph", true);
        updateGraph(null, "nwBlogCommentGraph", true);
        updateGraph(null, "nwBlogPostGraph", true);
    }
}



function updateGraph_all_users(comparegroup)
{   var usersJSON = JSON.stringify(graph_selectedUsers[comparegroup]);
    $.getJSON('http://localhost:3000/activity/total/' + usersJSON, updateGraph_total_callBack, "json");
    $.getJSON('http://localhost:3000/activity/tweeted/' +usersJSON, updateGraph_tweets_callBack, "json");
    $.getJSON('http://localhost:3000/activity/commented/' + usersJSON, updateGraph_comments_callBack, "json");
    $.getJSON('http://localhost:3000/activity/posted/' + usersJSON, updateGraph_posts_callBack, "json");
}

function updateGraph_all_badges()
{   var badgesJSON = JSON.stringify(graph_selectedBadges);
    $.getJSON('http://localhost:3000/relatedevents/activity/total/' + badgesJSON, updateGraph_total_callBack, "json");
    $.getJSON('http://localhost:3000/relatedevents/activity/tweeted/' +badgesJSON, updateGraph_tweets_callBack, "json");
    $.getJSON('http://localhost:3000/relatedevents/activity/commented/' + badgesJSON, updateGraph_comments_callBack, "json");
    $.getJSON('http://localhost:3000/relatedevents/activity/posted/' + badgesJSON, updateGraph_posts_callBack, "json");
}


function updateGraph_total_callBack(data)
{
    dataCache["nwActivityGraph"][compareGroupStatus] = data;
    updateGraph(data, "nwActivityGraph");

}

function updateGraph_tweets_callBack(data)
{
    dataCache["nwTweetGraph"][compareGroupStatus] = data;
    updateGraph(data, "nwTweetGraph");

}

function updateGraph_comments_callBack(data)
{
    dataCache["nwBlogCommentGraph"][compareGroupStatus] = data;
    updateGraph(data, "nwBlogCommentGraph");

}


function updateGraph_posts_callBack(data)
{
    dataCache["nwBlogPostGraph"][compareGroupStatus] = data;
    updateGraph(data, "nwBlogPostGraph");

}

function switchComparisonOnOff()
{

    if(compareGroupStatus == GRAPH_COMPARE)
    {
        //update all graphs with the right cache
        updateGraph(dataCache["nwBlogPostGraph"][GRAPH_NOCOMPARE], "nwBlogPostGraph", false, 1);
        updateGraph(dataCache["nwBlogCommentGraph"][GRAPH_NOCOMPARE], "nwBlogCommentGraph",false, 1);
        updateGraph(dataCache["nwTweetGraph"][GRAPH_NOCOMPARE], "nwTweetGraph", false,1);
        updateGraph(dataCache["nwActivityGraph"][GRAPH_NOCOMPARE], "nwActivityGraph", false,1);

        updateGraph(dataCache["nwBlogPostGraph"][GRAPH_COMPARE], "nwBlogPostGraph", false,2);
        updateGraph(dataCache["nwBlogCommentGraph"][GRAPH_COMPARE], "nwBlogCommentGraph", false,2);
        updateGraph(dataCache["nwTweetGraph"][GRAPH_COMPARE], "nwTweetGraph",false, 2);
        updateGraph(dataCache["nwActivityGraph"][GRAPH_COMPARE], "nwActivityGraph",false, 2);
    }
    else
    {
        updateGraph(dataCache["nwBlogPostGraph"][GRAPH_NOCOMPARE], "nwBlogPostGraph",false, 1);
        updateGraph(dataCache["nwBlogCommentGraph"][GRAPH_NOCOMPARE], "nwBlogCommentGraph",false, 1);
        updateGraph(dataCache["nwTweetGraph"][GRAPH_NOCOMPARE], "nwTweetGraph",false, 1);
        updateGraph(dataCache["nwActivityGraph"][GRAPH_NOCOMPARE], "nwActivityGraph", false,1);

    }
}


var badgeFilter = {};
badgeFilter["tweets"] = 0;
badgeFilter["posts"] = 0;
badgeFilter["comments"] = 0;



function updateGraph_Badges(badgeIcon)
{
    if(badgeIcon.badgeData.description.indexOf('tweet') != -1)
       badgeFilter["tweets"]++;
    if(badgeIcon.badgeData.description.indexOf('Commenter') != -1)
       badgeFilter["comments"]++;
    if(badgeIcon.badgeData.description.indexOf('post') != -1)
       badgeFilter["posts"]++;
    updateVisibleGraphs_filterBadges();
}
function updateGraph_BadgesDeleted(badgeIcon)
{
    if(badgeIcon.badgeData.description.indexOf('tweet') != -1)
        badgeFilter["tweets"]--;
    if(badgeIcon.badgeData.description.indexOf('Commenter') != -1)
        badgeFilter["comments"]--;
    if(badgeIcon.badgeData.description.indexOf('post') != -1)
        badgeFilter["posts"]--;
    updateVisibleGraphs_filterBadges();
}

function updateVisibleGraphs_filterBadges()
{

    if(badgeFilter["tweets"] == 0 && badgeFilter["comments"] == 0 && badgeFilter["posts"] == 0)
    {
        $("#" + "nwTweetGraph").show();
        $("#" + "nwBlogCommentGraph").show();
        $("#" + "nwBlogPostGraph").show();
        return;
    }
    if(badgeFilter["tweets"] > 0)
        $("#" + "nwTweetGraph").show();
    else
        $("#" + "nwTweetGraph").hide();

    if(badgeFilter["comments"] > 0)
        $("#" + "nwBlogCommentGraph").show();
    else
        $("#" + "nwBlogCommentGraph").hide();

    if(badgeFilter["posts"] > 0)
        $("#" + "nwBlogPostGraph").show();
    else
        $("#" + "nwBlogPostGraph").hide();

}



nwNaviActivityByDayGraph.prototype = Object.create(NObject.prototype);
