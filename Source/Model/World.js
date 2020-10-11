
class World
{
	constructor(name, defn, starsystems)
	{
		this.name = name;
		this.defn = defn;
		this.starsystems = starsystems.addLookupsByName();

		this.timerTicksSoFar = 0;

		// hack
		this.initialize();
	}

	// static methods

	static create(universe)
	{
		return new Demo().worldGrid(universe, null);
	}

	// instance methods

	draw()
	{
		// todo
	}

	initialize(universe)
	{
		this.starsystemNext = this.starsystems[0];
	}

	secondsSoFar(universe)
	{
		return Math.round
		(
			this.timerTicksSoFar / universe.timerHelper.ticksPerSecond
		);
	}

	toControl()
	{
		return new ControlNone();
	}

	updateForTimerTick(universe)
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
