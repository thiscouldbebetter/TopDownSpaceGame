
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

	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	initialize(uwpe: UniverseWorldPlaceEntities): void {}
	equals(other: Planet): boolean { return false; }
	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void {}

}
