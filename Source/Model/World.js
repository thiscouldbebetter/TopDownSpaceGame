
class WorldExtended
{
	constructor(name, defn, starsystems)
	{
		this.name = name;
		this.defn = defn;
		this.starsystems = starsystems;

		this.starsystemsByName =
			ArrayHelper.addLookupsByName(this.starsystems);

		this.timerTicksSoFar = 0;

		// hack
		this.initialize();
	}

	// static methods

	static create(universe, worldCreator)
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

	placeByName(name)
	{
		return this.starsystemsByName.get(name);
	}

	secondsSoFar(universe)
	{
		return Math.round
		(
			this.timerTicksSoFar / universe.timerHelper.ticksPerSecond
		);
	}

	starsystemByName(name)
	{
		return this.starsystemsByName.get(name);
	}

	toControl()
	{
		return new ControlNone();
	}

	toVenue()
	{
		return new VenueWorld(this);
	}

	updateForTimerTick(universeWorldPlaceEntities)
	{
		universeWorldPlaceEntities.worldSet(this);

		if (this.starsystemNext != null)
		{
			this.starsystemNext.initialize(universeWorldPlaceEntities);

			this.starsystemCurrent = this.starsystemNext;

			this.starsystemNext = null;
		}

		this.starsystemCurrent.updateForTimerTick(universeWorldPlaceEntities);

		this.timerTicksSoFar++;
	}
}
