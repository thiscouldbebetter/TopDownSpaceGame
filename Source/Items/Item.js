function Item(defnName, quantity)
{
	this.defnName = defnName;
	this.quantity = quantity;
}
{
	Item.prototype.clone = function()
	{
		return new Item(this.defnName, this.quantity);
	}

	Item.prototype.defn = function(world)
	{
		return world.defns.itemDefns[this.defnName];
	}

	Item.prototype.toString = function(world)
	{
		return this.quantity + this.defn(world).name;
	}
}