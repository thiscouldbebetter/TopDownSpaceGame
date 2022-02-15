
class PortalDefn
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

	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	initialize(uwpe: UniverseWorldPlaceEntities): void {}
	equals(other: PortalDefn): boolean { return false; }
	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void {}

}
