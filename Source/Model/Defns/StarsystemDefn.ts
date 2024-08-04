
class StarsystemDefn extends PlaceDefn
{
	actionToInputsMappings: ActionToInputsMapping[];

	actionToInputsMappingsByName: Map<string, ActionToInputsMapping>;
	propertyNamesToProcess: string[];

	constructor
	(
		name: string,
		actionToInputsMappings: ActionToInputsMapping[]
	)
	{
		super
		(
			name,
			null, // soundForMusicName: string,
			null, // actions: Action[],
			null, // actionToInputsMappings: ActionToInputsMapping[],
			StarsystemDefn.propertyNamesToProcess(),
			null, // placeInitialize: (uwpe: UniverseWorldPlaceEntities) => void,
			null // placeFinalize: (uwpe: UniverseWorldPlaceEntities) => void
		);

		this.actionToInputsMappings = actionToInputsMappings;

		this.actionToInputsMappingsByInputName = ArrayHelper.addLookupsMultiple
		(
			this.actionToInputsMappings,
			(x) => { return x.inputNames; }
		);
	}

	static propertyNamesToProcess(): string[]
	{
		var returnNames =
		[
			Locatable.name,
			Actor.name,
			MoverDefn.name,
			Constrainable.name,
			Killable.name,
			Ephemeral.name,
			Collidable.name,
		];

		return returnNames;
	}
}
