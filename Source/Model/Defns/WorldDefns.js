
function WorldDefns
(
	colors, itemDefns, actions, activityDefns, constraintDefns, entityDefns, starsystemDefns
)
{
	this.colors = colors.addLookups("name");
	this.itemDefns = itemDefns.addLookups("name");
	this.actions = actions.addLookups("name");
	this.activityDefns = activityDefns.addLookups("name");
	this.constraintDefns = constraintDefns.addLookups("name");
	this.entityDefns = entityDefns.addLookups("name");
	this.starsystemDefns = starsystemDefns.addLookups("name");
}
