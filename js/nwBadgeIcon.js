function nwBadgeIcon(_name, position, size, filename, badgeData)
{
	var name = "nwBadgeIcon" + _name;
    this.id = _name;
	var states = [];
	var animations = [];
	this.badgeData = badgeData;
	var eventHandler =  
	{
		timer: null,
		onHit: function(point, obj)
		{
			//obj.setPosition(point);
			//$("#" + obj.element.id).removeClass("transit");
			obj.setTouchAnchor(point);

			if(!obj.activated)
			{
				var placeHolder = document.createElement("div");
				$("#"+obj.element.id).before("<div id='"+ obj.element.id + "_ph' class='nwBadge'><img class='nwBadgeIcon emptyBadge' src='img/navi_empty_badge.png' draggable='false'/></div>");
				document.getElementById("playfield").appendChild(obj.element);
			}
			obj.setPosition(point);
			updateStudentColorsForBadges([obj]);
			obj.activated = true;
			var icon = $("#" + obj.element.id).find(".nwBadgeIcon");
			icon.removeClass("nwBadgeIcon");
			icon.addClass("nwBadgeIconDetailed");
			$("#" + obj.element.id).removeClass("nwBadge");		
			$("#" + obj.element.id).addClass("nwBadgeDetailed");
		
		},
		onLetGo: function(obj)
		{
			if(obj.getPosition().y < $("#nwContainerArea").offset().top)
			{
				var details = $("#" + obj.element.id).find(".nwBadgeDetails_hidden");
				details.removeClass("nwBadgeDetails_hidden");
				details.addClass("nwBadgeDetails_shown");
					
				obj.activated = true;
				updateStudentColors(true);
				
			}
			else
			{
				var details = $("#" + obj.element.id).find(".nwBadgeDetails_shown");
				details.removeClass("nwBadgeDetails_shown");
				details.addClass("nwBadgeDetails_hidden");
				var icon = $("#" + obj.element.id).find(".nwBadgeIconDetailed");
				icon.removeClass("nwBadgeIconDetailed");
				icon.addClass("nwBadgeIcon");
				$("#" + obj.element.id).removeClass("nwBadgeDetailed");		
				$("#" + obj.element.id).addClass("nwBadge");
				var jElement = $("#"+obj.element.id);
				$("#"+obj.element.id + "_ph").before(jElement);
				$("#"+obj.element.id + "_ph").remove();
				obj.setPosition(null);
				
				updateStudentColors(true);
				obj.activated = false;
				updateStudentColors(true);
			}
			//if outside of container area, let it go ...
			//otherwise snap back
		},
		onMove: function(point, obj)
		{
			

			obj.setPosition(point);
			updateStudentColorsForBadges([obj]);
		}
	};
	var layer = 2;
	var innerHTML = $("#nwBadge").html();
	NObject.call(this, name, layer, position, size, "", innerHTML, eventHandler, animations, states, [], false, false);
	this.element.style.display = "";
	this.element.className = "nwBadge";
	//replace placeholders
	this.element.innerHTML = this.element.innerHTML.replace("NT_IMG_SRC", filename);
	this.element.innerHTML = this.element.innerHTML.replace("NT_BADGE_NAME", this.badgeData.name);
	this.element.innerHTML = this.element.innerHTML.replace("NT_BADGE_DESCRIPTION", this.badgeData.description);	

	this.activated = false;

}

nwBadgeIcon.prototype = Object.create(NObject.prototype);
