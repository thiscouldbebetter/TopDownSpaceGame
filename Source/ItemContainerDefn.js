function ItemContainerDefn(itemsInitial)
{
	this.itemsInitial = itemsInitial;
}
{
	ItemContainerDefn.prototype.propertyName = function() { return "ItemContainer"; }
	
	ItemContainerDefn.prototype.initializeEntityForVenue = function(universe, entity, venue)
	{
		if (entity.itemContainer == null)
		{
			entity.itemContainer = new ItemContainer
			(
				Cloneable.cloneMany(this.itemsInitial)
			);
		}
	}
}

