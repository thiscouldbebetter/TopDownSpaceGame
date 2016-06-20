
function Universe
(
	name, colors, font, itemDefns, activityDefns, entityDefns, venueDefns, venues
)
{
	this.name = name;
	this.colors = colors;
	this.font = font;
	this.itemDefns = itemDefns;
	this.activityDefns = activityDefns;
	this.entityDefns = entityDefns;
	this.venueDefns = venueDefns;
	this.venues = venues;
	
	this.colors.addLookups("name");
	this.itemDefns.addLookups("name");
	this.activityDefns.addLookups("name");
	this.entityDefns.addLookups("name");
	this.venueDefns.addLookups("name");
	this.venues.addLookups("name");
}
