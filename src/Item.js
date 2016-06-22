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
	
	Item.prototype.defn = function()
	{
		return Globals.Instance.universe.itemDefns[this.defnName];
	}
	
	Item.prototype.toString = function()
	{
		return this.quantity + this.defn().codeChar;
	}
}
