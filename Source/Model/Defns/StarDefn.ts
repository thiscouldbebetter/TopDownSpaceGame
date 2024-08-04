
class StarDefn implements EntityPropertyBase
{
	static fromEntity(entity: Entity): StarDefn
	{
		return entity.propertyByName(StarDefn.name) as StarDefn;
	}

	// EntityPropertyBase.

	equals(other: StarDefn): boolean { return false; }
	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	initialize(uwpe: UniverseWorldPlaceEntities): void {}
	propertyName(): string { return StarDefn.name; }
	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void {}

}
