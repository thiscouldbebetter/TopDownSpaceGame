
class ProjectileDefn implements EntityPropertyBase
{
	damage: number;

	constructor(damage: number)
	{
		this.damage = damage;
	}

	static fromEntity(entity: Entity): ProjectileDefn
	{
		return entity.propertyByName(ProjectileDefn.name) as ProjectileDefn;
	}

	// EntityPropertyBase.

	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	initialize(uwpe: UniverseWorldPlaceEntities): void {}
	equals(other: ProjectileDefn): boolean { return false; }
	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void {}
}
