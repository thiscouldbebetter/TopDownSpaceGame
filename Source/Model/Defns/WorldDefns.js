
function WorldDefns
(
	colors, itemDefns, actions, activityDefns, constraintDefns, entityDefns, starsystemDefns
)
{
	this.colors = colors.addLookupsByName();
	this.itemDefns = itemDefns.addLookupsByName();
	this.actions = actions.addLookupsByName();
	this.activityDefns = activityDefns.addLookupsByName();
	this.constraintDefns = constraintDefns.addLookupsByName();
	this.entityDefns = entityDefns.addLookupsByName();
	this.starsystemDefns = starsystemDefns.addLookupsByName();
}
