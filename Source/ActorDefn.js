
function ActorDefn(activityDefnNameInitial)
{
	this.activityDefnNameInitial = activityDefnNameInitial;
}

{
	ActorDefn.prototype.initialize = function(universe, world, venue, entity)
	{
		entity.actions = [];

		entity._activity = new Activity
		(
			entity.defn(universe.world).actor.activityDefnNameInitial
		).initialize
		(
			universe, world, venue, entity
		);
	}

	ActorDefn.prototype.update = function(universe, world, venue, entity)
	{
		var world = universe.world;

		var activity = entity.activity();
		activity.perform(universe, world, venue, entity);

		var entityActions = entity.actions;

		for (var a = 0; a < entityActions.length; a++)
		{
			var action = entityActions[a];
			action.perform(world, entity);
		}

		entityActions.length = 0;
	}
}
