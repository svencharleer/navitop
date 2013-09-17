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
var GRAPH_COMPARE = 1;

var compareGroupStatus =   GRAPH_NOCOMPARE;

function eventButtonCompare()
{
    if(compareGroupStatus == GRAPH_NOCOMPARE)
    {
        compareGroupStatus = GRAPH_COMPARE;
        $("#nwCompareButton").css("border","solid 1px white");
    }
    else
    {
        compareGroupStatus = GRAPH_NOCOMPARE;
        $("#nwCompareButton").css("border","none");
    }
    updateGraph();

}

