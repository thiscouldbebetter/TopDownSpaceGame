
function ActorDefn(activityDefnNameInitial)
{
	this.activityDefnNameInitial = activityDefnNameInitial;
}

{
	ActorDefn.prototype.propertyName = function() { return "Actor"; }

	ActorDefn.prototype.initializeEntityForVenue = function(entity, venue)
	{
		entity.actions = [];

		entity.activity
		(
			new Activity
			(
				entity,
				entity.defn().actor.activityDefnNameInitial,
				null
			)
		);
	}


	ActorDefn.prototype.updateEntityForVenue = function(entity, venue)
	{
		entity.activity().perform();

		var entityActions = entity.actions;

		for (var a = 0; a < entityActions.length; a++)
		{
			entityActions[a].perform(entity);
		}

		entityActions.length = 0;
	}
}
