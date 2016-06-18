
function PortalData(destinationVenueName, destinationPos)
{
	this.destinationVenueName = destinationVenueName;
	this.destinationPos = destinationPos;
}

{
	PortalData.prototype.propertyName = function() { return "Portal"; }
}
