function ItemContainer(items)
{
	this.items = items;
	this.items.addLookups( (x) => { return x.defnName; } );
}
{
	ItemContainer.prototype.hasItem = function(itemToCheck)
	{
		var returnValue = false;

		var itemHeld = this.items[itemToCheck.defnName];
		if (itemHeld != null)
		{
			if (itemHeld.quantity >= itemToCheck.quantity)
			{
				returnValue = true;
			}
		}

		return returnValue;
	}

	ItemContainer.prototype.itemAdd = function(itemToTransfer)
	{
		var itemsHeld = this.items;
		var itemHeld = itemsHeld[itemToTransfer.defnName];
		if (itemHeld == null)
		{
			itemHeld = itemToTransfer;
			itemsHeld.push(itemHeld);
			itemsHeld[itemHeld.defnName] = itemHeld;
		}
		else
		{
			itemHeld.quantity += itemToTransfer.quantity;
		}
	}

	ItemContainer.prototype.itemSubtract = function(itemToTransfer)
	{
		var itemsHeld = this.items;
		var itemHeld = itemsHeld[itemToTransfer.defnName];
		if (itemHeld == null)
		{
			itemHeld = itemToTransfer;
			itemsHeld.push(itemHeld);
			itemsHeld[itemHeld.defnName] = itemHeld;
		}
		else
		{
			itemHeld.quantity -= itemToTransfer.quantity;
		}
	}

	ItemContainer.prototype.itemsAdd = function(itemsToTransfer)
	{
		for (var i = 0; i < itemsToTransfer.length; i++)
		{
			var itemToTransfer = itemsToTransfer[i];
			this.itemAdd(itemToTransfer);
		}
	}

	ItemContainer.prototype.itemsSubtract = function(itemsToTransfer)
	{
		for (var i = 0; i < itemsToTransfer.length; i++)
		{
			var itemToTransfer = itemsToTransfer[i];
			this.itemSubtract(itemToTransfer);
		}
	}
}

