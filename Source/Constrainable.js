function Constrainable(constraints)
{
	this.constraints = constraints;
}
{
	Constrainable.prototype.propertyName = function() { return "Constrainable"; }

	Constrainable.prototype.updateEntityForVenue = function(universe, entity, venue)
	{
		entity.defn().constrainable.updateEntityForVenue(universe, entity, venue);
	}
}
