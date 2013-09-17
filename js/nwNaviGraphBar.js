function nwNaviGraphBar(graphID, barID, _value)
{
	var name = barID ;
    var graph = graphID;
    var value = new Date(_value);
	var states = [];
	var animations = [];
	var eventHandler =  
	{
		onHit: function(point, obj)
		{
            var verb = "";
            switch(graphID)
            {
                case "nwTweetGraph":
                    verb = "tweeted";
                    break;
                case "nwBlogPostGraph":
                    verb = "posted";
                    break;
                case "nwBlogCommentGraph"   :
                    verb = "commented";
                    break;
                case "nwActivityGraph" :
                    verb = "";
                    break;
            }
            $("#nwNaviDetailedActivityView").empty();
            var dateForURL = "";
            if(verb != "")
                dateForURL = 'http://localhost:3000/activitybydate/' + value.getTime() + "/" + verb;
            else
                dateForURL = 'http://localhost:3000/activitybydate/' + value.getTime();

            $.getJSON(dateForURL, barClick_callback, "json");
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

nwNaviGraphBar.prototype = Object.create(NObject.prototype);


function graphBarHit(id, date)
{
    var verb = "";
    switch(id)
    {
        case "nwTweetGraph":
            verb = "tweeted";
            break;
        case "nwBlogPostGraph":
            verb = "posted";
            break;
        case "nwBlogCommentGraph"   :
            verb = "commented";
            break;
        case "nwActivityGraph" :
            verb = "";
            break;
    }
    $("#nwNaviDetailedActivityView").empty();
    var dateForURL = "";
    if(verb != "")
        dateForURL = 'http://localhost:3000/activitybydate/' + date + "/" + verb;
    else
        dateForURL = 'http://localhost:3000/activitybydate/' + date;

    $.getJSON(dateForURL, barClick_callback, "json");
}

//nwNaviDetailedActivityView
var link = [];
var bkData = {};
function barClick_callback(data)
{
     bkData = data;
    for(var i = 0; i < data.length; i++)
    {

        var html = "";
        switch(data[i].verb)
        {
            case "tweeted":
                html = "Tweet by " + data[i].username;
                link[i] = "https://twitter.com/" +data[i].username + "/status/" + data[i].object;
                break;
            case "posted":
                html = "Blog post by " + data[i].username + "(" + data[i].starttime + ")";
                link[i] = data[i].object;
                break;
            case "commented"   :
                html = "Blog comment by " + data[i].username;
                link[i] = data[i].object;
                break;
            default:
                html = "badge..<br/>";
                break;
        }
        var iframeButton = new nwButton(
            "detailedActivity" + i,
            null,
            function(obj)
            {
                /*$.get(link,
                    function(data)
                    {
                        //$("#nwNaviDetailedActivityIFRAME").attr("src", "http://google.com");
                        //$("#nwNaviDetailedActivityView").load(link + " .tweet-text");
                        $("#nwNaviDetailedActivityViewExternal").load(link + " #content");

                    })   */
                if(bkData[obj.order].verb == "posted")
                {
                    var linkJSON = encodeURIComponent(link[obj.order]);
                    $.getJSON("http://localhost:3000/blogposts/" + linkJSON, blogpost_callback, "json");
                    console.log(linkJSON);
                }
                if(bkData[obj.order].verb == "commented")
                {
                    var linkJSON = encodeURIComponent(link[obj.order]);
                    $.getJSON("http://localhost:3000/comments/" + linkJSON, blogpost_callback, "json");
                    console.log(linkJSON);
                }
                if(bkData[obj.order].verb == "tweeted")
                {
                    var tmp = link[obj.order] + " .tweet-text";
                    $("#nwNaviDetailedActivityViewExternal").load(tmp);
                }
            },
            false,html,i);

        fw.addObjectToDocument(iframeButton);
        //should make that an object, and use hte methods i made
        $("#nwNaviDetailedActivityView").append(iframeButton.element);
    }

}

function blogpost_callback(data)
{   if(data != null)
        $("#nwNaviDetailedActivityViewExternal").html(data.originalrequest);
    else
    $("#nwNaviDetailedActivityViewExternal").text("none");
}
