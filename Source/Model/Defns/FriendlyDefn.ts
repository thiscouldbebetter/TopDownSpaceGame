
class FriendlyDefn implements EntityPropertyBase
{
	static fromEntity(entity: Entity): FriendlyDefn
	{
		return entity.propertyByName(FriendlyDefn.name) as FriendlyDefn;
	}

	// EntityPropertyBase.

	equals(other: FriendlyDefn): boolean { return false; }
	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	initialize(uwpe: UniverseWorldPlaceEntities): void {}
	propertyName(): string { return FriendlyDefn.name; }
	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void {}
}
