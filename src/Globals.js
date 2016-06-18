
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

		this.venueNext = this.universe.venues[0];

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
		if (this.venueNext != null)
		{
			this.venueNext.initialize();

			this.venueCurrent = this.venueNext;

			this.venueNext = null;
		}

		this.venueCurrent.update();
	}
}

{
	Globals.Instance = new Globals();
}
