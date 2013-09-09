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
                case "nwBlogComment"   :
                    verb = "commented";
                    break;
                case "nwActivityGraph" :
                    verb = "";
                    break;
            }

            var dateForURL = "";
            if(verb != "")
                dateForURL = 'http://localhost:3000/activitybydate/' + value.getTime() + "/" + verb;
            else
                dateForURL = 'http://localhost:3000/activitybydate/' + value.getTime();

            $.getJSON(dateForURL, function(data){ console.log(data.toString());}, "json");
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
