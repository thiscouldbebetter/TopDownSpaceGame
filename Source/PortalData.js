
function PortalData(destinationStarsystemName, destinationPos, color)
{
	this.destinationStarsystemName = destinationStarsystemName;
	this.destinationPos = destinationPos;
}
{
	PortalData.prototype.propertyName = function() { return "Portal"; }
	
	PortalData.prototype.destinationStarsystem = function()
	{
		var world = Globals.Instance.universe.world;
		return world.starsystems[this.destinationStarsystemName];
	}
}
