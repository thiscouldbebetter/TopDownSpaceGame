
class WorldDefns
{
	constructor
	(
		colors, itemDefns, actions, activityDefns, entityDefns, starsystemDefns
	)
	{
		this.colors = colors.addLookupsByName();

		this.itemDefns = itemDefns;
		this._itemDefnsByName =
			ArrayHelper.addLookupsByName(this.itemDefns);

		this.actions = actions.addLookupsByName();
		this._actionDefnsByName =
			ArrayHelper.addLookupsByName(this.actions);

		this.activityDefns = activityDefns;
		this._activityDefnsByName =
			ArrayHelper.addLookupsByName(this.activityDefns);

		this.entityDefns = entityDefns;
		this._entityDefnsByName =
			ArrayHelper.addLookupsByName(this.entityDefns);

		this.starsystemDefns = starsystemDefns;
		this.starsystemDefnsByName =
			ArrayHelper.addLookupsByName(this.starsystemDefns);
	}

	actionDefnsByName() { return this._actionDefnsByName; }

	activityDefnsByName() { return this._activityDefnsByName; }

	itemDefnsByName() { return this._itemDefnsByName; }

	entityDefnsByName() { return this._entityDefnsByName; }
}
