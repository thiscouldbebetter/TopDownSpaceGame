
function ActorDefn(activityDefnNameInitial)
{
	this.activityDefnNameInitial = activityDefnNameInitial;
}

{
	ActorDefn.prototype.propertyName = function() { return "Actor"; }

	ActorDefn.prototype.initializeEntityForVenue = function(universe, entity, venue)
	{
		entity.actions = [];

		entity.activity
		(
			universe,
			new Activity
			(
				entity,
				entity.defn(universe.world).actor.activityDefnNameInitial,
				null
			)
		);
	}


	ActorDefn.prototype.updateEntityForVenue = function(universe, entity, venue)
	{
		var activity = entity.activity(universe);
		activity.perform(universe);

		var entityActions = entity.actions;

		var world = universe.world;
		for (var a = 0; a < entityActions.length; a++)
		{
			var action = entityActions[a];
			action.perform(world, entity);
		}

		entityActions.length = 0;
	}
}
