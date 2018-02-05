
function World
(
	name,
	colors,
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

	World.new = function(universe)
	{
		return new Demo().worldGrid(universe, null);
	}

	// instance methods

	World.prototype.draw = function()
	{
		// todo
	}

	World.prototype.initialize = function(universe)
	{
		this.starsystemNext = this.starsystems[0];
	}

	World.prototype.secondsSoFar = function(universe)
	{
		return Math.round
		(
			this.timerTicksSoFar / universe.timerHelper.ticksPerSecond
		);
	}

	World.prototype.updateForTimerTick = function(universe)
	{
		if (this.starsystemNext != null)
		{
			this.starsystemNext.initialize(universe, this);

			this.starsystemCurrent = this.starsystemNext;

			this.starsystemNext = null;
		}

		this.starsystemCurrent.updateForTimerTick(universe, this);

		this.timerTicksSoFar++;
	}
}
