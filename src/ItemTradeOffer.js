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
			new Item("Nutrients", 1),
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
		return Globals.Instance.universe.secondsSoFar() - this.secondLastUsed;
	}
	
	ItemTradeOffer.prototype.trade = function(entityCustomer, entityVendor)
	{
		var customerItemContainer = entityCustomer.itemContainer;
		if (customerItemContainer.hasItem(this.itemTaken) == true)
		{
			customerItemContainer.itemSubtract(this.itemTaken);
			customerItemContainer.itemAdd(this.itemGiven);
			this.secondLastUsed = Globals.Instance.universe.secondsSoFar();
		}
	}
	
	ItemTradeOffer.prototype.toString = function()
	{
		var returnValue = 
			this.itemTaken.toString() 
			+ " > " 
			+ this.itemGiven.toString()
			+ " / "
			+ this.secondsToRecharge + "s";
			
		if (this.isCharged() == false)
		{
			returnValue = 
				this.secondsSinceLastUsed() 
				+ " / "
				+ this.secondsToRecharge + "s";
		}

		return returnValue;
	}
}
