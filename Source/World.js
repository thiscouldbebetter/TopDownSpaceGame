
function World
(
	name, 
	colors, 
	font, 
	itemDefns, 
	actions,
	activityDefns, 
	constraintDefns, 
	entityDefns, 
	starsystemDefns,
	starsystems
)
{
	this.name = name;
	this.colors = colors.addLookups("name");
	this.font = font;
	this.itemDefns = itemDefns.addLookups("name");
	this.actions = actions.addLookups("name");
	this.activityDefns = activityDefns.addLookups("name");
	this.constraintDefns = constraintDefns.addLookups("name");
	this.entityDefns = entityDefns.addLookups("name");
	this.starsystemDefns = starsystemDefns.addLookups("name");
	this.starsystems = starsystems.addLookups("name");
	
	this.timerTicksSoFar = 0;
		
	// hack
	this.initialize();
}
{
	// static methods
	
	World.new = function()
	{
		return new Demo().worldGrid(null);
	}
	
	// instance methods
	
	World.prototype.draw = function()
	{
		// todo
	}

	World.prototype.initialize = function()
	{
		this.starsystemNext = this.starsystems[0];		
	}
	
	World.prototype.secondsSoFar = function()
	{
		return Math.round
		(
			this.timerTicksSoFar / Globals.Instance.timerTicksPerSecond
		);
	}
	
	World.prototype.updateForTimerTick = function()
	{
		if (this.starsystemNext != null)
		{
			this.starsystemNext.initialize();

			this.starsystemCurrent = this.starsystemNext;

			this.starsystemNext = null;
		}

		this.starsystemCurrent.updateForTimerTick();
				
		this.timerTicksSoFar++;
	}
}
