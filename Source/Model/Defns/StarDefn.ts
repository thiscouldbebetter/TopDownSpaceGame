
class StarDefn implements EntityPropertyBase
{
	static fromEntity(entity: Entity): StarDefn
	{
		return entity.propertyByName(StarDefn.name) as StarDefn;
	}

	// EntityPropertyBase.

	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	initialize(uwpe: UniverseWorldPlaceEntities): void {}
	equals(other: StarDefn): boolean { return false; }
	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void {}

}
