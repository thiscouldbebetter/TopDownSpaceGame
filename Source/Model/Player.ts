
class Player
{
	static fromEntity(entity: Entity): Player
	{
		return entity.propertyByName(Player.name) as Player;
	}

	// EntityPropertyBase.

	equals(other: Player): boolean { return false; }
	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	initialize(uwpe: UniverseWorldPlaceEntities): void {}
	propertyName(): string { return Player.name; }
	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void {}
}
