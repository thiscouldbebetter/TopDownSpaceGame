
class PlanetDefn implements EntityPropertyBase
{
	static fromEntity(entity: Entity): PlanetDefn
	{
		return entity.propertyByName(PlanetDefn.name) as PlanetDefn;
	}

	// EntityPropertyBase.

	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	initialize(uwpe: UniverseWorldPlaceEntities): void {}
	equals(other: PlanetDefn): boolean { return false; }
	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void {}
}
