
function Portal(destinationStarsystemName, destinationPos, color)
{
	this.destinationStarsystemName = destinationStarsystemName;
	this.destinationPos = destinationPos;
}
{
	Portal.prototype.destinationStarsystem = function(world)
	{
		return world.starsystems[this.destinationStarsystemName];
	}

	Portal.prototype.initialize = function(universe, world, venue, entity)
	{
		entity.Drawable.visual = new VisualGroup
		(
			[
				entity.Drawable.visual,
				new VisualOffset
				(
					new VisualText("To " + this.destinationStarsystemName, "White", "Black"),
					new Coords(0, 20)
				),
			]
		);
	}
}
