
class BodyDefn implements EntityPropertyBase
{
	sizeInPixels: Coords;

	sizeInPixelsHalf: Coords;

	constructor(sizeInPixels: Coords)
	{
		this.sizeInPixels = sizeInPixels;

		this.sizeInPixelsHalf = this.sizeInPixels.clone().divideScalar(2);
	}

	static fromEntity(entity: Entity): BodyDefn
	{
		return entity.propertyByName(BodyDefn.name) as BodyDefn;
	}

	initialize(universeWorldPlaceEntities: UniverseWorldPlaceEntities): void
	{
		var entity = universeWorldPlaceEntities.entity;
		entity.locatable().loc.placeName = universeWorldPlaceEntities.place.name;
	}

	// EntityPropertyBase.

	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	equals(other: BodyDefn): boolean { return false; }
	propertyName(): string { return BodyDefn.name; }
	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void {}

}
