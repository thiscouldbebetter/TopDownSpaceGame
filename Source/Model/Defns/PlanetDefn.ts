
class PlanetDefn implements EntityPropertyBase
{
	static fromEntity(entity: Entity): PlanetDefn
	{
		return entity.propertyByName(PlanetDefn.name) as PlanetDefn;
	}

	// EntityPropertyBase.

	equals(other: PlanetDefn): boolean { return false; }
	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	initialize(uwpe: UniverseWorldPlaceEntities): void {}
	propertyName(): string { return PlanetDefn.name; }
	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void {}
}
