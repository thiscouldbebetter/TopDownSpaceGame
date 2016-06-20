function Item(defnName, quantity)
{
		this.defnName = defnName;
		this.quantity = quantity;
}
{
		Item.prototype.defn = function()
		{
				return Globals.Instance.universe.itemDefns[this.defnName];
		}
}
