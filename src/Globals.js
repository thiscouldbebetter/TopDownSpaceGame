
function Globals()
{
	// do nothing
}

{
	Globals.prototype.initialize = function
	(
		realWorldMillisecondsPerTick, 
		viewSizeInPixels, 
		universe
	)	
	{
		this.collisionHelper = new CollisionHelper();

		this.realWorldMillisecondsPerTick = realWorldMillisecondsPerTick;

		this.display = new Display(viewSizeInPixels);
		this.display.initialize();

		this.universe = universe;
		this.universe.initialize();

		this.timer = setInterval
		(
			this.handleEventTimerTick.bind(this), 
			this.realWorldMillisecondsPerTick
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
