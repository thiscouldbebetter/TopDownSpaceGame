
class StarsystemDefn
{
	constructor(name, actionToInputsMappings)
	{
		this.name = name;
		this.actionToInputsMappings = actionToInputsMappings;

		this.actionToInputsMappingsByInputName = ArrayHelper.addLookupsMultiple
		(
			this.actionToInputsMappings,
			(x) => { return x.inputNames; }
		);

		this.propertyNamesToProcess =
		[
			Locatable.name,
			ActorDefn.name,
			MoverDefn.name,
			Constrainable2.name,
			Killable2.name,
			EphemeralDefn.name,
			Collidable2.name,
		];
	}
}
