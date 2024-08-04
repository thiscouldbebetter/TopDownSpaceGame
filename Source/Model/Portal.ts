
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

		var colors = Color.Instances();

		entity.drawable().visual = new VisualGroup
		(
			[
				entity.drawable().visual,
				new VisualOffset
				(
					Coords.fromXY(0, 20),
					new VisualText
					(
						DataBinding.fromContext
						(
							"To " + this.destinationStarsystemName,
						),
						null, // font,
						colors.White,
						colors.Black
					)
				),
			]
		);
	}

	// EntityPropertyBase.

	equals(other: Star): boolean { return false; }
	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	propertyName(): string { return Portal2.name; }
	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void {}

}
