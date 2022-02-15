
class Portal2 implements EntityPropertyBase
{
	destinationStarsystemName: string;
	destinationPos: Coords;

	constructor
	(
		destinationStarsystemName: string,
		destinationPos: Coords
	)
	{
		this.destinationStarsystemName = destinationStarsystemName;
		this.destinationPos = destinationPos;
	}

	static fromEntity(entity: Entity): Portal2
	{
		return entity.propertyByName(Portal2.name) as Portal2;
	}

	destinationStarsystem(world: WorldExtended): Starsystem
	{
		return world.starsystemByName(this.destinationStarsystemName);
	}

	initialize(universeWorldPlaceEntities: UniverseWorldPlaceEntities): void
	{
		var entity = universeWorldPlaceEntities.entity;

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
						null, // fontHeight
						Color.byName("White"),
						Color.byName("Black")
					),
					Coords.fromXY(0, 20)
				),
			]
		);
	}

	// EntityPropertyBase.

	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	equals(other: Star): boolean { return false; }
	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void {}

}
