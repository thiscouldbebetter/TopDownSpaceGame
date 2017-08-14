function Constrainable(constraints)
{
	this.constraints = constraints;
}
{
	Constrainable.prototype.propertyName = function() { return "Constrainable"; }
	
	Constrainable.prototype.updateEntityForVenue = function(entity, venue)
	{
		entity.defn().constrainable.updateEntityForVenue(entity, venue);
	}
}
