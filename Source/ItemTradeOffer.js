function ItemTradeOffer(itemTaken, itemGiven, secondsToRecharge)
{
	this.itemTaken = itemTaken;
	this.itemGiven = itemGiven;
	this.secondsToRecharge = secondsToRecharge;

	this.secondLastUsed = null;
}
{
	// static methods

	ItemTradeOffer.random = function()
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

	ItemTradeOffer.prototype.isCharged = function(world)
	{
		var returnValue =
			(this.secondLastUsed == null ? true : (this.secondsSinceLastUsed(world) >= this.secondsToRecharge));
		return returnValue;
	}

	ItemTradeOffer.prototype.secondsSinceLastUsed = function(world)
	{
		return world.secondsSoFar() - this.secondLastUsed;
	}

	ItemTradeOffer.prototype.trade = function(world, entityCustomer, entityVendor)
	{
		var customerItemContainer = entityCustomer.itemContainer;
		if (customerItemContainer.hasItem(this.itemTaken) == true)
		{
			customerItemContainer.itemSubtract(this.itemTaken);
			customerItemContainer.itemAdd(this.itemGiven.clone());
			this.secondLastUsed = world.secondsSoFar();
		}
	}

	ItemTradeOffer.prototype.toString = function(world)
	{
		var returnValue;

		if (this.isCharged(world) == true)
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
				this.secondsSinceLastUsed(world)
				+ " / "
				+ this.secondsToRecharge + "s";
		}

		return returnValue;
	}
}
