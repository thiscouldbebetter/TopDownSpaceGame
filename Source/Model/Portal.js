
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
		entity.drawable().visual = new VisualGroup
		(
			[
				entity.drawable().visual,
				new VisualOffset
				(
					new VisualText
					(
						DataBinding.fromContext
						(
							"To " + this.destinationStarsystemName,
						),
						false, // shouldTextContextBeReset
						null, // fontHeight
						Color.byName("White"),
						Color.byName("Black")
					),
					new Coords(0, 20)
				),
			]
		);
	}
}
