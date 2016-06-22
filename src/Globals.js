
function Globals()
{
	// do nothing
}

{
	Globals.prototype.initialize = function
	(
		timerTicksPerSecond,
		viewSizeInPixels, 
		universe
	)	
	{
		this.collisionHelper = new CollisionHelper();

		this.timerTicksPerSecond = timerTicksPerSecond;

		this.display = new Display(viewSizeInPixels);
		this.display.initialize();

		this.universe = universe;
		this.universe.initialize();
	
		var millisecondsPerTimerTick = Math.round
		(
			1000 / this.timerTicksPerSecond
		);

		this.timer = setInterval
		(
			this.handleEventTimerTick.bind(this), 
			millisecondsPerTimerTick
		);

		this.inputHelper = new InputHelper();
		this.inputHelper.initialize();
	}

	Globals.prototype.handleEventTimerTick = function()
	{		
		this.universe.updateForTimerTick();
	}
}

{
	Globals.Instance = new Globals();
}
