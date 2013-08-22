
function nwStudent(_name, position, size, studentName, _studentData)
{
	var name = "nwStudent" + _name;
	var states = [];
	var animations = [];
    this.studentData = _studentData;
	var eventHandler =  
	{
		timer: null,
		onHit: function(point, obj)
		{
			obj.setTouchAnchor(point);
			//obj.setPosition(point);
			$("#" + obj.element.id).removeClass("transit");
			$("#" + obj.element.id).removeClass("nwStudent");
			$("#" + obj.element.id).addClass("nwStudentDragged");
			if(!obj.activated)
			{
				var placeHolder = document.createElement("div");
				$("#"+obj.element.id).before("<div id='"+ obj.element.id + "_ph' class='nwStudent emptyStudent''>&nbsp;</div>");
				document.getElementById("playfield").appendChild(obj.element);
			}
			obj.activated = true;
			obj.setPosition(point);
			
			updateBadgeColorsForStudent([obj]);
			
		},
		onLetGo: function(obj)
		{
			if(obj.getPosition().y < $("#nwContainerArea").offset().top)
			{
				obj.element.style.border = "";
				
				//move this into more general callback function after drop, but let's put it here now
				//time's a tickin'!
				//var students = getStudentsInPlayField();
				//var students = students.join("_");
				updateBadgeColors(true);
				
				
			}
			else
			{
				obj.element.style.border = "";
				$("#" + obj.element.id).removeClass("nwStudentDragged");
				$("#" + obj.element.id).addClass("nwStudent");
				studentContainer.element.appendChild(obj.element);
				obj.setPosition(null);
				var jElement = $("#"+obj.element.id);
				$("#"+obj.element.id + "_ph").before(jElement);
				$("#"+obj.element.id + "_ph").remove();
				
				updateBadgeColors(true);
				obj.activated = false;
				updateBadgeColors(true);
			}
			//if outside of container area, let it go ...
			//otherwise snap back
		},
		onMove: function(point, obj)
		{
			document.getElementById("playfield").appendChild(obj.element);
			obj.setPosition(point);
			var rotation = calculateRotation(point);
			updateBadgeColorsForStudent([obj]);
			//obj.element.style.webkitTransform = "rotate(" + rotation + "deg)";
			//obj.element.style.webkitTransformOrigin = "50% 50% 0";
 		}
	};

	var layer = 2;
	var innerHTML = $("#nwStudent").html();

	NObject.call(this, name, layer, position, size, "", innerHTML, eventHandler, animations, states, [], false, false);
	this.element.style.display = "";
	this.element.className = "nwStudent";
	this.element.innerHTML = this.element.innerHTML.replace("NT_STUDENT_NAME", studentName);

	this.activated = false;
	this.studentName = _name;	
}

nwStudent.prototype = Object.create(NObject.prototype);
