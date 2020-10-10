
class Activity
{
	constructor(defnName, target)
	{
		this.defnName = defnName;
		this.target = target;
	}

	defn(world)
	{
		return world.defns.activityDefns[this.defnName];
	}

	initialize(universe, world, place, actor)
	{
		this.defn(world).initialize(universe, world, place, actor, this);
		return this;
	}

	perform(universe, world, place, actor)
	{
		this.defn(world).perform(universe, world, place, actor, this);
	}
}
