
function PortalData(destinationStarsystemName, destinationPos, color)
{
	this.destinationStarsystemName = destinationStarsystemName;
	this.destinationPos = destinationPos;
}
{
	PortalData.prototype.propertyName = function() { return "Portal"; }

	PortalData.prototype.destinationStarsystem = function(world)
	{
		return world.starsystems[this.destinationStarsystemName];
	}

	PortalData.prototype.initializeEntityForVenue = function(universe, entity, venue)
	{
		entity.drawable.visual = new VisualGroup
		(
			[
				entity.drawable.visual,
				new VisualOffset
				(
					new VisualText("To " + this.destinationStarsystemName, "White", "Black"),
					new Coords(0, 20)
				),
			]
		);
	}
}
