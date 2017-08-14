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
	
	ItemTradeOffer.prototype.isCharged = function()
	{
		var returnValue = 
			(this.secondLastUsed == null ? true : (this.secondsSinceLastUsed() >= this.secondsToRecharge));
		return returnValue;
	}
		
	ItemTradeOffer.prototype.secondsSinceLastUsed = function()
	{
		var world = Globals.Instance.universe.world;
		return world.secondsSoFar() - this.secondLastUsed;
	}
	
	ItemTradeOffer.prototype.trade = function(entityCustomer, entityVendor)
	{
		var customerItemContainer = entityCustomer.itemContainer;
		if (customerItemContainer.hasItem(this.itemTaken) == true)
		{
			customerItemContainer.itemSubtract(this.itemTaken);
			customerItemContainer.itemAdd(this.itemGiven.clone());
			var world = Globals.Instance.universe.world;
			this.secondLastUsed = world.secondsSoFar();
		}
	}
	
	ItemTradeOffer.prototype.toString = function()
	{
		var returnValue;
		
		if (this.isCharged() == true)
		{ 
			returnValue = this.itemTaken.toString() 
				+ " > " 
				+ this.itemGiven.toString()
				+ " / "
				+ this.secondsToRecharge + "s";
		}	
		else
		{
			returnValue = 
				this.secondsSinceLastUsed() 
				+ " / "
				+ this.secondsToRecharge + "s";
		}

		return returnValue;
	}
}
