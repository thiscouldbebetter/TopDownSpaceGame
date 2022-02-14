
class WorldDefns
{
	constructor
	(
		colors, itemDefns, actions, activityDefns, entityDefns, starsystemDefns
	)
	{
		this.colors = colors;
		this.colorsByName = ArrayHelper.addLookupsByName(this.colors);

		this.itemDefns = itemDefns;
		this._itemDefnsByName =
			ArrayHelper.addLookupsByName(this.itemDefns);

		this.actions = actions;
		this._actionsByName =
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

	actionByName(name) { return this._actionsByName.get(name); }

	activityDefnsByName() { return this._activityDefnsByName; }

	itemDefnByName(name) { return this._itemDefnsByName.get(name); }

	entityDefnByName(name) { return this._entityDefnsByName.get(name); }

	entityDefnsByName() { return this._entityDefnsByName; }
}
