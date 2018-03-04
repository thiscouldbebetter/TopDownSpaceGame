function ItemContainerDefn(itemsInitial)
{
	this.itemsInitial = itemsInitial;
}
{
	ItemContainerDefn.prototype.initialize = function(universe, world, venue, entity)
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

