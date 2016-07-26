
function Globals()
{}
{
	// instance

	Globals.Instance = new Globals();

	// instance methods

	Globals.prototype.handleEventTimerTick = function()
	{
		this.universe.updateForTimerTick();
	}

	Globals.prototype.initialize = function
	(
		programName,
		timerTicksPerSecond, 
		display,
		universe,
		soundHelper,
		videoHelper
	)
	{
		this.programName = programName;
		
		this.serializer = new Serializer
		([
			Coords,
			DateTime,
			Profile,
			World,
			Universe
		]);
		
		this.display = display;
		this.collisionHelper = new CollisionHelper();
		this.inputHelper = new InputHelper();
		this.profileHelper = new ProfileHelper();
		this.soundHelper = soundHelper;
		this.videoHelper = videoHelper;

		this.universe = universe;

		var divMain = document.createElement("div");
		//divMain.style.position = "absolute";
		//divMain.style.left = "50%";
		//divMain.style.top = "50%";
		//divMain.style.marginTop = 0 - this.display.sizeInPixels.x / 2;
		//divMain.style.marginLeft = 0 - this.display.sizeInPixels.y / 2;
		document.body.appendChild(divMain);
		this.divMain = divMain;

		this.display.initialize();
		this.inputHelper.initialize();
		this.universe.initialize();

		this.timerTicksPerSecond = timerTicksPerSecond;
		this.millisecondsPerTimerTick = 1000 / this.timerTicksPerSecond;
		this.timer = setInterval
		(
			this.handleEventTimerTick.bind(this),
			this.millisecondsPerTimerTick
		);
	}

	Globals.prototype.reset = function()
	{
		this.soundHelper.reset();
	}
}
