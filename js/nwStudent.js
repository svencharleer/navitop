
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
			//obj.setTouchAnchor(point);
			//obj.setPosition(point);
			//$("#" + obj.element.id).removeClass("transit");
			//$("#" + obj.element.id).removeClass("nwStudent");
			//$("#" + obj.element.id).addClass("nwStudentDragged");
			//if(!obj.activated)
			//{
			//	var placeHolder = document.createElement("div");
			//	$("#"+obj.element.id).before("<div id='"+ obj.element.id + "_ph' class='nwStudent emptyStudent''>&nbsp;</div>");
			//	document.getElementById("playfield").appendChild(obj.element);
			//}

            if(!obj.activated)
            {
                obj.activated = true;
                //obj.setPosition(point);
                $("#"+obj.element.id).addClass("selectedObject1");
                updateBadgeColorsForStudent([obj]);

                updateGraph_Users(obj.studentName);
            }
            else
            {
                $("#"+obj.element.id).removeClass("selectedObject");
                updateBadgeColors(true);
                obj.activated = false;
                updateBadgeColors(true);
                updateGraph_UsersDeleted(obj.studentName);
            }
		},
		onLetGo: function(obj)
		{



			//if outside of container area, let it go ...
			//otherwise snap back
		},
		onMove: function(point, obj)
		{
			//document.getElementById("playfield").appendChild(obj.element);
			//obj.setPosition(point);
			//var rotation = calculateRotation(point);
			//updateBadgeColorsForStudent([obj]);
			//obj.element.style.webkitTransform = "rotate(" + rotation + "deg)";
			//obj.element.style.webkitTransformOrigin = "50% 50% 0";
 		}
	};

	var layer = 2;
	var innerHTML = $("#nwStudent").html();

	NObject.call(this, name, layer, position, size, "", innerHTML, eventHandler, animations, states, [], false, false);
	this.element.style.display = "";
    if(this.studentData.group != null)
	    this.element.className = "nwStudent" + " " + this.studentData.group.replace(/ /g, "_");;
	this.element.innerHTML = this.element.innerHTML.replace("NT_STUDENT_NAME", _studentData.fullname);

	this.activated = false;
	this.studentName = studentName;

}

nwStudent.prototype = Object.create(NObject.prototype);
