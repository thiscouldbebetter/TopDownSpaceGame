
class ItemContainer
{
	constructor(items)
	{
		this.items = items;
		this.itemsByDefnName = ArrayHelper.addLookups(this.items, (x) => { return x.defnName; } );
	}

	hasItem(itemToCheck)
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

	itemAdd(itemToTransfer)
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

	itemByDefnName(defnName)
	{
		return this.itemsByDefnName.get(defnName);
	}

	itemSubtract(itemToTransfer)
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

	itemsAdd(itemsToTransfer)
	{
		for (var i = 0; i < itemsToTransfer.length; i++)
		{
			var itemToTransfer = itemsToTransfer[i];
			this.itemAdd(itemToTransfer);
		}
	}

	itemsSubtract(itemsToTransfer)
	{
		for (var i = 0; i < itemsToTransfer.length; i++)
		{
			var itemToTransfer = itemsToTransfer[i];
			this.itemSubtract(itemToTransfer);
		}
	}
}

