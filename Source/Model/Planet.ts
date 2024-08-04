
class Planet implements EntityPropertyBase
{
	name: string;
	color: Color;

	itemTradeOffer: ItemTradeOffer;

	constructor(name: string, color: Color)
	{
		this.name = name;
		this.color = color;

		this.itemTradeOffer = ItemTradeOffer.random();
	}

	static fromEntity(entity: Entity): Planet
	{
		return entity.propertyByName(Planet.name) as Planet;
	}

	// EntityPropertyBase.

	equals(other: Planet): boolean { return false; }
	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	initialize(uwpe: UniverseWorldPlaceEntities): void {}
	propertyName(): string { return Planet.name; }
	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void {}

}
