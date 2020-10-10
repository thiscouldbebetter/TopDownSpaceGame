
class ActorDefn
{
	constructor(activityDefnNameInitial)
	{
		this.activityDefnNameInitial = activityDefnNameInitial;
	}

	initialize(universe, world, venue, entity)
	{
		this.actions = [];

		this.activity = new Activity
		(
			this.activityDefnNameInitial
		).initialize
		(
			universe, world, venue, entity
		);
	}

	update(universe, world, venue, entity)
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
	}
}
