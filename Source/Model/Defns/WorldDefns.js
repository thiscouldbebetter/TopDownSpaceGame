
function WorldDefns
(
	colors, itemDefns, actions, activityDefns, entityDefns, starsystemDefns
)
{
	this.colors = colors.addLookupsByName();
	this.itemDefns = itemDefns.addLookupsByName();
	this.actions = actions.addLookupsByName();
	this.activityDefns = activityDefns.addLookupsByName();
	this.entityDefns = entityDefns.addLookupsByName();
	this.starsystemDefns = starsystemDefns.addLookupsByName();
}
