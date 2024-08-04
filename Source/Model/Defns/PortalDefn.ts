
class PortalDefn implements EntityPropertyBase
{
	colorName: string;

	constructor(colorName: string)
	{
		this.colorName = colorName;
	}

	static fromEntity(entity: Entity): PortalDefn
	{
		return entity.propertyByName(PortalDefn.name) as PortalDefn;
	}

	// EntityPropertyBase.

	equals(other: PortalDefn): boolean { return false; }
	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	initialize(uwpe: UniverseWorldPlaceEntities): void {}
	propertyName(): string { return PortalDefn.name; }
	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void {}

}
