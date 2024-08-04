
class WorldDefnExtended extends WorldDefn
{
	colors: Color[];
	itemDefns: ItemDefn[];
	actions: Action[];
	activityDefns: ActivityDefn[];
	starsystemDefns: StarsystemDefn[];

	colorsByName: Map<string, Color>;
	_itemDefnsByName: Map<string, ItemDefn>;
	_actionsByName: Map<string, Action>;
	_activityDefnsByName: Map<string, ActivityDefn>;
	starsystemDefnsByName: Map<string, StarsystemDefn>;

	constructor
	(
		colors: Color[],
		itemDefns: ItemDefn[],
		actions: Action[],
		activityDefns: ActivityDefn[],
		entityDefns: Entity[],
		starsystemDefns: StarsystemDefn[]
	)
	{
		super
		(
			[
				entityDefns // entityDefns
			]
		);

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

		this.starsystemDefns = starsystemDefns;
		this.starsystemDefnsByName =
			ArrayHelper.addLookupsByName(this.starsystemDefns);
	}

	actionByName(name: string): Action { return this._actionsByName.get(name); }

	activityDefnByName(name: string): ActivityDefn { return this._activityDefnsByName.get(name); }

	entityDefnByName(name: string): Entity
	{
		return this.entityDefnsByName.get(name);
	}

	itemDefnByName(name: string): ItemDefn { return this._itemDefnsByName.get(name); }

	starsystemDefnByName(name: string): StarsystemDefn
	{
		return this.starsystemDefnsByName.get(name);
	}
}
