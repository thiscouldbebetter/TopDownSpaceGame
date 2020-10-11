
class ItemTradeOffer
{
	constructor(itemTaken, itemGiven, secondsToRecharge)
	{
		this.itemTaken = itemTaken;
		this.itemGiven = itemGiven;
		this.secondsToRecharge = secondsToRecharge;

		this.secondLastUsed = null;
	}

	// static methods

	static random()
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

	isCharged(universe, world)
	{
		var returnValue =
			(this.secondLastUsed == null ? true : (this.secondsSinceLastUsed(universe, world) >= this.secondsToRecharge));
		return returnValue;
	}

	secondsSinceLastUsed(universe, world)
	{
		return world.secondsSoFar(universe) - this.secondLastUsed;
	}

	trade(universe, world, entityCustomer, entityVendor)
	{
		if (this.secondsSinceLastUsed(universe, world) >= this.secondsToRecharge)
		{
			var customerItemContainer =
				entityCustomer.propertyByName(ItemContainer.name);
			if (customerItemContainer.hasItem(this.itemTaken) == true)
			{
				customerItemContainer.itemSubtract(this.itemTaken);
				customerItemContainer.itemAdd(this.itemGiven.clone());
				this.secondLastUsed = world.secondsSoFar(universe);
			}
		}
	}

	toString(universe, world)
	{
		var returnValue;

		if (this.isCharged(universe, world) == true)
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
