
class Enemy implements EntityPropertyBase
{
	static fromEntity(entity: Entity): Enemy
	{
		return entity.propertyByName(Enemy.name) as Enemy;
	}

	// EntityPropertyBase.

	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	initialize(uwpe: UniverseWorldPlaceEntities): void {}
	equals(other: Enemy): boolean { return false; }
	propertyName(): string { return Enemy.name; }
	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void {}
}
