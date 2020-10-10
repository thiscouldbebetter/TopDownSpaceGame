
class Portal
{
	constructor(destinationStarsystemName, destinationPos, color)
	{
		this.destinationStarsystemName = destinationStarsystemName;
		this.destinationPos = destinationPos;
	}

	destinationStarsystem(world)
	{
		return world.starsystems[this.destinationStarsystemName];
	}

	initialize(universe, world, venue, entity)
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
