
class Star implements EntityPropertyBase
{
	name: string;
	color: Color;

	constructor(name: string, color: Color)
	{
		this.name = name;
		this.color = color;
	}

	static fromEntity(entity: Entity): Star
	{
		return entity.propertyByName(Star.name) as Star;
	}

	// EntityPropertyBase.

	equals(other: Star): boolean { return false; }
	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	initialize(uwpe: UniverseWorldPlaceEntities): void {}
	propertyName(): string { return Star.name; }
	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void {}
}
