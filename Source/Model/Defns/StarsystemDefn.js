
function StarsystemDefn(name, actionToInputsMappings)
{
	this.name = name;
	this.actionToInputsMappings = actionToInputsMappings.addLookupsMultiple
	(
		(x) => { return x.inputNames; }
	);
}
