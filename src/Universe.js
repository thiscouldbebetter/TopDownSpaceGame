
function Universe
(
	name, 
	colors, 
	font, 
	itemDefns, 
	activityDefns, 
	constraintDefns, 
	entityDefns, 
	venueDefns, 
	venues
)
{
	this.name = name;
	this.colors = colors;
	this.font = font;
	this.itemDefns = itemDefns;
	this.activityDefns = activityDefns;
	this.constraintDefns = constraintDefns;
	this.entityDefns = entityDefns;
	this.venueDefns = venueDefns;
	this.venues = venues;
	
	this.timerTicksSoFar = 0;
	
	this.colors.addLookups("name");
	this.itemDefns.addLookups("name");
	this.activityDefns.addLookups("name");
	this.constraintDefns.addLookups("name");
	this.entityDefns.addLookups("name");
	this.venueDefns.addLookups("name");
	this.venues.addLookups("name");
}
{
	Universe.prototype.initialize = function()
	{
		//this.venueNext = this.venues[0];
		
		var venueControlsTitle = new VenueControls
		(
			ControlBuilder.title()
		);

		venueControlsTitle = new VenueFader
		(
			venueControlsTitle, venueControlsTitle
		);

		this.venueNext = venueControlsTitle;		
	}
	
	Universe.prototype.secondsSoFar = function()
	{
		return Math.round
		(
			this.timerTicksSoFar / Globals.Instance.timerTicksPerSecond
		);
	}
	
	Universe.prototype.updateForTimerTick = function()
	{
		if (this.venueNext != null)
		{
			this.venueNext.initialize();

			this.venueCurrent = this.venueNext;

			this.venueNext = null;
		}

		this.venueCurrent.updateForTimerTick();
				
		this.timerTicksSoFar++;
	}
}
