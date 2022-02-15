
class FriendlyDefn implements EntityPropertyBase
{
	static fromEntity(entity: Entity): FriendlyDefn
	{
		return entity.propertyByName(FriendlyDefn.name) as FriendlyDefn;
	}

	// EntityPropertyBase.

	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	initialize(uwpe: UniverseWorldPlaceEntities): void {}
	equals(other: FriendlyDefn): boolean { return false; }
	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void {}
}
