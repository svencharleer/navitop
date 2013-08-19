function nwButton(name, template, buttonEvent, alreadyInDocument)
{
	var name = name;
	var states = [];
	var animations = [];
	var eventHandler =  
	{
		timer: null,
		onHit: function(point, obj)
		{
			if(this.timer == null)
			{
				obj.animatable.switchToAnimation(1);
				this.timer = setTimeout(function()
						{
							buttonEvent();
							obj.animatable.idle();
						},

						10);
				return;
			}
		},
		onLetGo: function(obj)
		{
			obj.animatable.idle();
			clearTimeout(this.timer);
			this.timer = null;
		},
		onMove: function(point, obj)
		{

		}
	};
	var layer = 2;
	var innerHTML = "";
	if(template != null)
		innerHTML = $("#" + template).html();
	NObject.call(this, name, layer, null, null, "", innerHTML, eventHandler, animations, states,[], alreadyInDocument);
	this.element.style.display = "";
}

nwButton.prototype = Object.create(NObject.prototype);