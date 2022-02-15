
class WorldExtended extends World
{
	starsystems: Starsystem[];

	starsystemsByName: Map<string, Starsystem>;

	starsystemCurrent: Starsystem;
	starsystemNext: Starsystem;
	timerTicksSoFar: number;

	constructor
	(
		name: string,
		defn: WorldDefnExtended,
		starsystems: Starsystem[]
	)
	{
		super
		(
			name,
			DateTime.now(),
			defn,
			starsystems // places
		);

		this.starsystems = starsystems;

		this.starsystemsByName =
			ArrayHelper.addLookupsByName(this.starsystems);

		this.timerTicksSoFar = 0;

		// hack
		this.initialize(null);
	}

	// static methods

	static create(universe: Universe, worldCreator: WorldCreator): WorldExtended
	{
		return new Demo().worldGrid(universe, null);
	}

	// instance methods

	draw(): void
	{
		// todo
	}

	initialize(uwpe: UniverseWorldPlaceEntities): void
	{
		this.starsystemNext = this.starsystems[0];
	}

	placeByName(name: string): Place
	{
		return this.starsystemsByName.get(name);
	}

	secondsSoFar(universe: Universe): number
	{
		return Math.round
		(
			this.timerTicksSoFar / universe.timerHelper.ticksPerSecond
		);
	}

	starsystemByName(name: string): Starsystem
	{
		return this.starsystemsByName.get(name);
	}

	toControl(): ControlBase
	{
		return new ControlNone();
	}

	toVenue(): VenueWorld
	{
		return new VenueWorld(this);
	}

	updateForTimerTick(universeWorldPlaceEntities: UniverseWorldPlaceEntities): void
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
