function Constrainable(constraints)
{
	this.constraints = constraints;
}
{
	Constrainable.prototype.update = function(universe, world, venue, entity)
	{
		entity.defn().constrainable.update(universe, world, venue, entity);
	}
}
