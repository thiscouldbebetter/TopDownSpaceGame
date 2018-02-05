
function Planet(name, color)
{
	this.name = name;
	this.color = color;

	this.itemTradeOffer = ItemTradeOffer.random();
}
{
	Planet.prototype.propertyName = function() { return "Planet"; }
}
