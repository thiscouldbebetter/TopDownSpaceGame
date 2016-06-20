function ItemContainerDefn()
{
	// do nothing
}
{
	ItemContainerDefn.prototype.propertyName = function() { return "ItemContainer"; }
	
	ItemContainerDefn.prototype.initializeEntityForVenue = function(entity, venue)
	{
			entity.itemContainer = new ItemContainer();
	}
}

