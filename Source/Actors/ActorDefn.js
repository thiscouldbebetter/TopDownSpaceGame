
class ActorDefn
{
	constructor(activityDefnNameInitial)
	{
		this.activityDefnNameInitial = activityDefnNameInitial;
	}

	initialize(universeWorldPlaceEntities)
	{
		this.actions = [];

		this.activity = new Activity2
		(
			this.activityDefnNameInitial
		).initialize
		(
			universeWorldPlaceEntities
		);
	}

	updateForTimerTick(universeWorldPlaceEntities)
	{
		var entity = universeWorldPlaceEntities.entity;

		var actor = entity.propertyByName(ActorDefn.name);
		var activity = actor.activity;
		activity.perform(universeWorldPlaceEntities);

		var entityActions = actor.actions;

		for (var a = 0; a < entityActions.length; a++)
		{
			var action = entityActions[a];
			action.perform(universeWorldPlaceEntities);
		}

		entityActions.length = 0;
	}
}
