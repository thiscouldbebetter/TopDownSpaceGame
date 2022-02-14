
class Activity2
{
	constructor(defnName, target)
	{
		this.defnName = defnName;
		this.target = target;
	}

	defn(world)
	{
		return world.defn.activityDefnsByName().get(this.defnName);
	}

	initialize(universeWorldPlaceEntities)
	{
		var world = universeWorldPlaceEntities.world;
		this.defn(world).initialize(universeWorldPlaceEntities);
		return this;
	}

	perform(universeWorldPlaceEntities)
	{
		var world = universeWorldPlaceEntities.world;
		this.defn(world).perform(universeWorldPlaceEntities);
	}
}
