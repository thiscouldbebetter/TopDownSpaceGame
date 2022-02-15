
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

	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	initialize(uwpe: UniverseWorldPlaceEntities): void {}
	equals(other: Star): boolean { return false; }
	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void {}
}
