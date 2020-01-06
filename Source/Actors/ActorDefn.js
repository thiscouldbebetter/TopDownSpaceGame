
function ActorDefn(activityDefnNameInitial)
{
	this.activityDefnNameInitial = activityDefnNameInitial;
}

{
	ActorDefn.prototype.initialize = function(universe, world, venue, entity)
	{
		this.actions = [];

		this.activity = new Activity
		(
			this.activityDefnNameInitial
		).initialize
		(
			universe, world, venue, entity
		);
	};

	ActorDefn.prototype.update = function(universe, world, venue, entity)
	{
		var world = universe.world;

		var actor = entity.ActorDefn;
		var activity = actor.activity;
		activity.perform(universe, world, venue, entity);

		var entityActions = actor.actions;

		for (var a = 0; a < entityActions.length; a++)
		{
			var action = entityActions[a];
			action.perform(world, entity);
		}

		entityActions.length = 0;
	};
}
