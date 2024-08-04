
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

	equals(other: ProjectileDefn): boolean { return false; }
	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	initialize(uwpe: UniverseWorldPlaceEntities): void {}
	propertyName(): string { return ProjectileDefn.name; }
	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void {}
}
