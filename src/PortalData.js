
function PortalData(destinationVenueName, destinationPos, color)
{
	this.destinationVenueName = destinationVenueName;
	this.destinationPos = destinationPos;
}
{
	PortalData.prototype.propertyName = function() { return "Portal"; }
	
	PortalData.prototype.destinationVenue = function()
	{
		return Globals.Instance.universe.venues[this.destinationVenueName];
	}
}
