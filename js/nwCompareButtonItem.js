function nwCompareButtonItem(name, buttonEvent)
{
	this.name = name;
	var states = [];
	var animations = ["","pulsate"];
	nwButton.call(this, name, null, buttonEvent, true)
	this.animatable = new NCAnimatable(this, ["","pulsate"]);
	this.element.style.display = "";
}

nwMenuItem.prototype = Object.create(nwButton.prototype);

var GRAPH_NOCOMPARE = 0;
var GRAPH_COMPARE1 = 1;
var GRAPH_COMPARE2 = 2;

var compareGroupStatus =   GRAPH_NOCOMPARE;

function eventButtonCompareNone()
{
    compareGroupStatus = GRAPH_NOCOMPARE;
}
function eventButtonCompareGroup1()
{
    compareGroupStatus = GRAPH_COMPARE1;
}
function eventButtonCompareGroup2()
{
    compareGroupStatus = GRAPH_COMPARE2;
}

