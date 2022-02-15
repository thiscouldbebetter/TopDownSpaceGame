
class ItemTradeOffer
{
	itemTaken: Item;
	itemGiven: Item;
	secondsToRecharge: number;

	secondLastUsed: number;

	constructor(itemTaken: Item, itemGiven: Item, secondsToRecharge: number)
	{
		this.itemTaken = itemTaken;
		this.itemGiven = itemGiven;
		this.secondsToRecharge = secondsToRecharge;

		this.secondLastUsed = null;
	}

	// static methods

	static random(): ItemTradeOffer
	{
		// todo
		var returnValue = new ItemTradeOffer
		(
			new Item("Fuel", 1),
			new Item("Food", 1),
			10 // secondsToRecharge
		);

		return returnValue;
	}

	// instance methods

	isCharged(universe: Universe, world: WorldExtended): boolean
	{
		var returnValue =
		(
			this.secondLastUsed == null
			? true
			:
			(
				this.secondsSinceLastUsed(universe, world) >= this.secondsToRecharge
			)
		);
		return returnValue;
	}

	secondsSinceLastUsed(universe: Universe, world: WorldExtended): number
	{
		return world.secondsSoFar(universe) - this.secondLastUsed;
	}

	trade
	(
		universe: Universe, world: WorldExtended,
		entityCustomer: Entity, entityVendor: Entity
	)
	{
		if (this.secondsSinceLastUsed(universe, world) >= this.secondsToRecharge)
		{
			var customerItemHolder =
				entityCustomer.itemHolder();
			if (customerItemHolder.hasItem(this.itemTaken))
			{
				customerItemHolder.itemSubtract(this.itemTaken);
				customerItemHolder.itemAdd(this.itemGiven.clone());
				this.secondLastUsed = world.secondsSoFar(universe);
			}
		}
	}

	toString(universe: Universe, world: WorldExtended): string
	{
		var returnValue;

		if (this.isCharged(universe, world))
		{
			returnValue = this.itemTaken.toString(world)
				+ " > "
				+ this.itemGiven.toString(world)
				+ " / "
				+ this.secondsToRecharge + "s";
		}
		else
		{
			returnValue =
				this.secondsSinceLastUsed(universe, world)
				+ " / "
				+ this.secondsToRecharge + "s";
		}

		return returnValue;
	}
}
