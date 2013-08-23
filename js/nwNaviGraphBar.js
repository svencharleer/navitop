function nwNaviGraphBar(graphID, barID)
{
	var name = barID ;
	var states = [];
	var animations = [];
	var eventHandler =  
	{
		onHit: function(point, obj)
		{
            console.log("bar is hit");

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
