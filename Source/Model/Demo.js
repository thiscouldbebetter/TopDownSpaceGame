
class Demo
{
	actions()
	{
		var accelerate = new Action
		(
			"Accelerate",
			(universeWorldPlaceEntities) =>
			{
				var actor = universeWorldPlaceEntities.entity;

				var fuelUsedByAcceleration = 1;
				var itemContainer = actor.propertyByName(ItemContainer.name);
				var itemFuel = itemContainer.itemByDefnName("Fuel");

				if (itemFuel.quantity >= fuelUsedByAcceleration)
				{
					itemFuel.quantity -= fuelUsedByAcceleration;

					var actorLoc = actor.locatable().loc;
					var actorOrientation = actorLoc.orientation;

					actorLoc.accel.add
					(
						new Coords().overwriteWith
						(
							actorOrientation.forward
						).multiplyScalar
						(
							.3 // accelerationPerTick
						)
					);
				}
			}
		);

		var fire = new Action
		(
			"Fire",
			(universeWorldPlaceEntities) =>
			{
				var actor = universeWorldPlaceEntities.entity;

				var itemContainer = actor.propertyByName(ItemContainer.name);
				var itemFuel = itemContainer.itemByDefnName("Fuel");
				var fuelConsumed = 10;
				if (itemFuel.quantity >= fuelConsumed)
				{
					itemFuel.quantity -= fuelConsumed;

					var world = universeWorldPlaceEntities.world;
					var entityDefnProjectile =
						world.defn.entityDefnByName("Projectile");

					var entityToSpawn = entityDefnProjectile.clone().nameSet
					(
						"[projectile]"
					).propertyAddForPlace
					(
						new Locatable(actor.locatable().loc.clone()), null // place
					);

					var forward = actor.locatable().loc.orientation.forward;
					entityToSpawn.locatable().loc.vel = forward.clone().normalize().multiplyScalar
					(
						entityDefnProjectile.propertyByName(MoverDefn.name).speedMax
					);

					var place = universeWorldPlaceEntities.place;
					place.entitiesToSpawn.push(entityToSpawn);
				}
			}
		);

		var turnLeft = new Action
		(
			"TurnLeft",
			(universeWorldPlaceEntities) =>
			{
				var actor = universeWorldPlaceEntities.entity;

				var actorLoc = actor.locatable().loc;
				var actorOrientation = actorLoc.orientation;

				var turnRate = .25;

				actorOrientation.forwardSet
				(
					actorOrientation.right.clone().multiplyScalar
					(
						0 - turnRate
					).add
					(
						actorOrientation.forward
					)
				);

				var actorHeading = Math.floor(
					actorLoc.orientation.forward.headingInTurns() * 8 // hack
				);
			}
		);

		var turnRight = new Action
		(
			"TurnRight",
			(universeWorldPlaceEntities) =>
			{
				var actor = universeWorldPlaceEntities.entity;

				var actorLoc = actor.locatable().loc;
				var actorOrientation = actorLoc.orientation;

				var turnRate = .25;

				actorOrientation.forwardSet
				(
					actorOrientation.right.clone().multiplyScalar
					(
						turnRate
					).add
					(
						actorOrientation.forward
					)
				);

				var actorHeading = Math.floor(
					actorLoc.orientation.forward.headingInTurns() * 8 // hack
				);
			}
		);

		var actions =
		[
			accelerate,
			fire,
			turnLeft,
			turnRight,
		];

		return actions;
	}


	worldGrid(universe, sizeInStarsystems)
	{
		if (sizeInStarsystems == null)
		{
			sizeInStarsystems = new Coords(10, 10, 1);
		}

		var nameGenerator = new NameGenerator();

		var itemDefns = this.world_ItemDefns();

		var actions = this.actions();

		var activityDefns = this.world_ActivityDefns();

		var colors = Color.Instances()._All;

		var entityDefns = this.world_EntityDefns(universe);
		var entityDefnsByName = ArrayHelper.addLookupsByName(entityDefns);

		var starsystemDefns = this.world_StarsystemDefns();

		var starsystemSizeInPixels = new Coords(1200, 1200);
		var starsystemSizeInPixelsHalf = starsystemSizeInPixels.clone().divideScalar(2);
		var starsystems = [];

		var starsystemPos = new Coords();
		var starsystemDefn0 = starsystemDefns[0];

		for (var y = 0; y < sizeInStarsystems.y; y++)
		{
			starsystemPos.y = y;

			for (var x = 0; x < sizeInStarsystems.x; x++)
			{
				starsystemPos.x = x;

				var starsystemPosWest = starsystemPos.clone().addDimensions(-1, 0, 0).wrapToRangeMax(sizeInStarsystems);
				var starsystemPosEast = starsystemPos.clone().addDimensions(1, 0, 0).wrapToRangeMax(sizeInStarsystems);
				var starsystemPosNorth = starsystemPos.clone().addDimensions(0, -1, 0).wrapToRangeMax(sizeInStarsystems);
				var starsystemPosSouth = starsystemPos.clone().addDimensions(0, 1, 0).wrapToRangeMax(sizeInStarsystems);

				var starsystemNamePrefix = "System_";
				var starsystemName = starsystemNamePrefix + starsystemPos.toString();

				var starsystem = new Starsystem
				(
					starsystemName,
					starsystemDefn0.name,
					starsystemSizeInPixels,
					// entities
					[
						// background
						entityDefnsByName.get("Background").clone().nameSet("Background").propertyAddForPlace
						(
							new Locatable(new Disposition( new Coords(0, 0, 0) ) ),
							null // place
						),

						// sun
						entityDefnsByName.get("Sun").clone().nameSet("Sun").propertyAddForPlace
						(
							new Locatable(new Disposition(starsystemSizeInPixelsHalf.clone())),
							null // place
						).propertyAddForPlace
						(
							new Star
							(
								new NameGenerator().generateNameWithSyllables(3),
								null // color
							),
							null // place
						),

						// portals

						entityDefnsByName.get("PortalRed").clone().nameSet("PortalWest").propertyAddForPlace
						(
							new Locatable(new Disposition(new Coords(.05 * starsystemSizeInPixels.x, starsystemSizeInPixelsHalf.y))),
							null // place
						).propertyAddForPlace
						(
							new Portal2
							(
								starsystemNamePrefix + starsystemPosWest.toString(),
								new Coords(.9 * starsystemSizeInPixels.x, starsystemSizeInPixelsHalf.y),
								colors["Red"]
							),
							null
						),

						entityDefnsByName.get("PortalGreen").clone().nameSet("portalEast").propertyAddForPlace
						(
							new Locatable(new Disposition(new Coords(.95 * starsystemSizeInPixels.x, starsystemSizeInPixelsHalf.y))),
							null // place
						).propertyAddForPlace
						(
							new Portal2
							(
								starsystemNamePrefix + starsystemPosEast.toString(),
								new Coords(.1 * starsystemSizeInPixels.x, starsystemSizeInPixelsHalf.y),
								colors["Green"]
							),
							null // place
						),

						entityDefnsByName.get("PortalBlue").clone().nameSet("PortalNorth").propertyAddForPlace
						(
							new Locatable(new Disposition(new Coords(starsystemSizeInPixelsHalf.x, .05 * starsystemSizeInPixels.y))),
							null // place
						).propertyAddForPlace
						(
							new Portal2
							(
								starsystemNamePrefix + starsystemPosNorth.toString(),
								new Coords(starsystemSizeInPixelsHalf.x, .9 * starsystemSizeInPixels.y),
								colors["Blue"]
							),
							null // place
						),

						entityDefnsByName.get("PortalViolet").clone().nameSet("PortalEast").propertyAddForPlace
						(
							new Locatable
							(
								new Disposition(new Coords(starsystemSizeInPixelsHalf.x, .95 * starsystemSizeInPixels.y))
							),
							null // place
						).propertyAddForPlace
						(
							new Portal2
							(
								starsystemNamePrefix + starsystemPosSouth.toString(),
								new Coords(starsystemSizeInPixelsHalf.x, .1 * starsystemSizeInPixels.y),
								colors["Violet"]
							),
							null // place
						),
					]
				);

				var numberOfPlanetsMin = 1;
				var numberOfPlanetsMax = 5;
				var numberOfPlanetsRange = numberOfPlanetsMax - numberOfPlanetsMin;
				var numberOfPlanets =
					numberOfPlanetsMin
					+ Math.floor(Math.random() * numberOfPlanetsRange);

				var entityDefnPlanet = entityDefnsByName.get(Planet.name);

				for (var p = 0; p < numberOfPlanets; p++)
				{
					var pos = new Coords().randomize().multiply(starsystemSizeInPixels).round();
					var entityPlanet = entityDefnPlanet.clone().nameSet
					(
						Planet.name + p
					).propertyAddForPlace
					(
						new Locatable(new Disposition(pos)), null // place
					).propertyAddForPlace
					(
						new Planet
						(
							nameGenerator.generateNameWithSyllables(2),
							Color.Instances().Orange
						),
						null
					);
					starsystem.entitiesToSpawn.push(entityPlanet);
				}

				var numberOfEnemiesMin = 0;
				var numberOfEnemiesMax = 5;
				var numberOfEnemiesRange = numberOfEnemiesMax - numberOfEnemiesMin;
				var numberOfEnemies =
						numberOfEnemiesMin
						+ Math.floor(Math.random() * numberOfEnemiesRange);

				var entityDefnEnemy = entityDefnsByName.get("Enemy");
				for (var e = 0; e < numberOfEnemies; e++)
				{
					var pos = new Coords().randomize().multiply
					(
						starsystemSizeInPixels
					).round();

					var entityEnemy = entityDefnEnemy.clone().nameSet
					(
						"Enemy" + e
					).propertyAddForPlace
					(
						new Locatable(new Disposition(pos))
					);

					starsystem.entitiesToSpawn.push(entityEnemy);
				}

				var numberOfItemCollections = 1;
				var entityDefnItemCollection = entityDefnsByName.get("ItemCollection");
				for (var c = 0; c < numberOfItemCollections; c++)
				{
					var pos = new Coords().randomize().multiply
					(
						starsystemSizeInPixels
					).round();

					var entityItemCollection = entityDefnItemCollection.clone().nameSet
					(
						"ItemCollection" + c
					).propertyAddForPlace
					(
						new Locatable(new Disposition(pos))
					);

					starsystem.entitiesToSpawn.push(entityItemCollection);
				}

				if (starsystemPos.x == 0 && starsystemPos.y == 0)
				{
					var entityPlayer = entityDefnsByName.get("Player").clone().nameSet
					(
						"Player"
					).propertyAddForPlace
					(
						new Locatable(new Disposition(new Coords(100, 100))),
						null // place
					);
					starsystem.entitiesToSpawn.push(entityPlayer);

					// friendlies

					var entityFriendly = entityDefnsByName.get("Friendly").clone().nameSet
					(
						"Friendly0"
					).propertyAddForPlace
					(
						new Locatable(new Disposition(new Coords(350, 50))),
						null // place
					);
					starsystem.entitiesToSpawn.push(entityFriendly);
				}

				starsystems.push(starsystem);

			}  // end for sizeInStarsystems.x

		} // end for sizeInStarsystems.y

		var defns = new WorldDefns
		(
			colors,
			itemDefns,
			actions,
			activityDefns,
			entityDefns,
			starsystemDefns
		);

		var world = new WorldExtended
		(
			"WorldGrid" + sizeInStarsystems.toString(),
			defns,
			starsystems
		);

		return world;
	}

	world_ItemDefns()
	{
			var returnValues =
			[
				new ItemDefn("Ammo", "A"),
				new ItemDefn("Bioforms", "B"),
				new ItemDefn("Crew", "C"),
				new ItemDefn("Fuel", "F"),
				new ItemDefn("Food", "N"),
				new ItemDefn("Luxuries", "L"),
				new ItemDefn("Materials", "M"),
				new ItemDefn("Science", "S"),
			];

			ArrayHelper.addLookupsByName(returnValues);

			return returnValues;
	}

	world_ActivityDefns()
	{
		var doNothing = new ActivityDefn2
		(
			"DoNothing",
			// initialize
			(universeWorldPlaceEntities) =>
			{
				// do nothing
			},
			// perform
			(universeWorldPlaceEntities) =>
			{
				// do nothing
			}
		);

		var moveRandomly = new ActivityDefn2
		(
			"MoveRandomly",

			// initialize
			(universeWorldPlaceEntities) => {},

			// perform
			(universeWorldPlaceEntities) =>
			{
				var world = universeWorldPlaceEntities.world;
				var actor = universeWorldPlaceEntities.entity;

				var actorLoc = actor.locatable().loc;
				var actorPos = actorLoc.pos;

				var activity = actor.propertyByName(ActorDefn.name).activity;

				if (activity.target == null)
				{
					var actorStarsystem = actorLoc.place(world);
					var starsystemSizeInPixels = actorStarsystem.size;

					var newTarget = new Coords
					(
						Math.floor(Math.random() * starsystemSizeInPixels.x),
						Math.floor(Math.random() * starsystemSizeInPixels.y)
					);

					activity.target = newTarget;
				}

				var target = activity.target;

				var displacementToTarget = target.clone().subtract(actorPos);
				var distanceToTarget = displacementToTarget.magnitude();
				var directionToAccelerate = displacementToTarget.clone().normalize();

				var speedCurrent = actorLoc.vel.magnitude();
				if (speedCurrent > 0)
				{
					var timeToTarget =
						distanceToTarget / speedCurrent;

					var moverDefn = actor.propertyByName(MoverDefn.name);

					var accelerationCurrent =
						moverDefn.force / moverDefn.mass;

					if (speedCurrent > accelerationCurrent * timeToTarget)
					{
						directionToAccelerate.multiplyScalar(-1);
					}
				}

				var distanceThreshold = 8;
				if (distanceToTarget < distanceThreshold)
				{
					activity.target = null;
				}
				else
				{
					var forceToApplyTowardTarget = directionToAccelerate.clone().multiplyScalar
					(
						actor.propertyByName(MoverDefn.name).force
					);
					actorLoc.force.add(forceToApplyTowardTarget);
				}
			}
		);

		var userInputAccept = new ActivityDefn2
		(
			"UserInputAccept",

			(universeWorldPlaceEntities) =>
			{},

			(universeWorldPlaceEntities) =>
			{
				var universe = universeWorldPlaceEntities.universe;
				var actor = universeWorldPlaceEntities.entity;

				var inputHelper = universe.inputHelper;
				var inputsActive = inputHelper.inputsActive();
				var actionsFromActor = actor.propertyByName(ActorDefn.name).actions;
				var world = universe.world;
				var starsystemCurrent = world.starsystemCurrent;
				var starsystemDefn = starsystemCurrent.defn(world);
				var actionToInputsMappingsByInputName =
					starsystemDefn.actionToInputsMappingsByInputName;

				for (var i = 0; i < inputsActive.length; i++)
				{
					var inputActiveName = inputsActive[i].name;
					if (inputActiveName.startsWith("Mouse") == false)
					{
						var mapping =
							actionToInputsMappingsByInputName.get(inputActiveName);

						if (mapping != null)
						{
							var action = mapping.action(universe);
							actionsFromActor.push(action);
						}
					}
				}
			}
		);

		var _all =
		[
			doNothing,
			moveRandomly,
			userInputAccept,
		];

		// ArrayHelper.addLookupsByName(_all);

		return _all;
	}

	world_EntityDefns(universe)
	{
		var imageHelper = new ImageHelper();
		var mediaLibrary = universe.mediaLibrary;

		var imagesForItemCollection = imageHelper.buildImagesFromStringArrays
		(
			"ItemCollection",
			[
				[
					"aaaaa..",
					"a...aa.",
					"a...a.a",
					"a...a.a",
					"aaaaa.a",
					".a...aa",
					"..aaaaa",
				],

				[
					"..aaaaa",
					".aa...a",
					"a.a...a",
					"a.a...a",
					"a.aaaaa",
					"aa...a.",
					"aaaaa..",
				],

				[
					"aaaaa..",
					"aa...a.",
					"a.aaaaa",
					"a.a...a",
					"a.a...a",
					".aa...a",
					"..aaaaa",
				],
				[
					"..aaaaa",
					".a...aa",
					"aaaaa.a",
					"a...a.a",
					"a...a.a",
					"a...aa.",
					"aaaaa..",
				],
			]
		);

		mediaLibrary.imagesAdd(imagesForItemCollection);

		var imageMoverProjectile = imageHelper.buildImageFromStrings
		(
			"Projectile",
			[
				"yyy",
				"y.y",
				"yyy",
			]
		);

		mediaLibrary.imagesAdd([imageMoverProjectile]);

		/*
		var imagesForSun = imageHelper.buildImagesFromStringArrays
		( "Sun", [
			[
				".............y............",
				"............y.............",
				".............y............",
				"..........yyyyyy..........",
				"...yy...yy......yy....y...",
				".....y.y..........y...y...",
				".....yy............yyy....",
				".....y..............y.....",
				"....y................y....",
				"....y................y....",
				"...y..................y...",
				"...y..................y...",
				"y.yy..................y.y.",
				".y.y..................yy.y",
				"...y..................y...",
				"...y..................y...",
				"....y................y....",
				"....y................y....",
				".....y..............y.....",
				"......y............yy.....",
				".....yyy..........y.y.....",
				"....y...yy......yy...yy...",
				"....y.....yyyyyy..........",
				"............y.............",
				".............y............",
				"............y.............",
			],
			[
				"............y.............",
				".............y............",
				"............y.............",
				"..........yyyyyy..........",
				"...y....yy......yy...yy...",
				"...y...y..........y.y.....",
				"....yyy............yy.....",
				".....y..............y.....",
				"....y................y....",
				"....y................y....",
				"...y..................y...",
				"...y..................y...",
				".y.y..................yy.y",
				"y.yy..................y.y.",
				"...y..................y...",
				"...y..................y...",
				"....y................y....",
				"....y................y....",
				".....y..............y.....",
				"......y............yyy....",
				"......yy..........y...y...",
				"......y.yy......yy....y...",
				"....yy....yyyyyy..........",
				".............y............",
				"............y.............",
				".............y............",
			],
		]);
		*/

		var imageDirectory = "../Content/Images/";

		var imageNamePrefixStar = "Star";
		var imageDirectoryStar = imageDirectory + "Star/";

		var imagesForSun =
		[
			new Image2(imageNamePrefixStar + "00", imageDirectoryStar + "00.png"),
			new Image2(imageNamePrefixStar + "01", imageDirectoryStar + "01.png"),
			new Image2(imageNamePrefixStar + "02", imageDirectoryStar + "02.png"),
			new Image2(imageNamePrefixStar + "03", imageDirectoryStar + "03.png"),
			new Image2(imageNamePrefixStar + "04", imageDirectoryStar + "04.png"),
			new Image2(imageNamePrefixStar + "05", imageDirectoryStar + "05.png"),
			new Image2(imageNamePrefixStar + "06", imageDirectoryStar + "06.png"),
			new Image2(imageNamePrefixStar + "07", imageDirectoryStar + "07.png"),
			new Image2(imageNamePrefixStar + "08", imageDirectoryStar + "08.png"),
			new Image2(imageNamePrefixStar + "09", imageDirectoryStar + "09.png"),
			new Image2(imageNamePrefixStar + "10", imageDirectoryStar + "10.png"),
			new Image2(imageNamePrefixStar + "11", imageDirectoryStar + "11.png"),
			new Image2(imageNamePrefixStar + "12", imageDirectoryStar + "12.png"),
			new Image2(imageNamePrefixStar + "13", imageDirectoryStar + "13.png"),
			new Image2(imageNamePrefixStar + "14", imageDirectoryStar + "14.png"),
			new Image2(imageNamePrefixStar + "15", imageDirectoryStar + "15.png"),
			new Image2(imageNamePrefixStar + "16", imageDirectoryStar + "16.png"),
			new Image2(imageNamePrefixStar + "17", imageDirectoryStar + "17.png"),
			new Image2(imageNamePrefixStar + "18", imageDirectoryStar + "18.png"),
			new Image2(imageNamePrefixStar + "19", imageDirectoryStar + "19.png"),
			new Image2(imageNamePrefixStar + "20", imageDirectoryStar + "20.png"),
			new Image2(imageNamePrefixStar + "21", imageDirectoryStar + "21.png"),
			new Image2(imageNamePrefixStar + "22", imageDirectoryStar + "22.png"),
			new Image2(imageNamePrefixStar + "23", imageDirectoryStar + "23.png"),
			new Image2(imageNamePrefixStar + "24", imageDirectoryStar + "24.png"),
			new Image2(imageNamePrefixStar + "25", imageDirectoryStar + "25.png"),
			new Image2(imageNamePrefixStar + "26", imageDirectoryStar + "26.png"),
			new Image2(imageNamePrefixStar + "27", imageDirectoryStar + "27.png"),
			new Image2(imageNamePrefixStar + "28", imageDirectoryStar + "28.png"),
			new Image2(imageNamePrefixStar + "29", imageDirectoryStar + "29.png"),
			new Image2(imageNamePrefixStar + "30", imageDirectoryStar + "30.png"),
			new Image2(imageNamePrefixStar + "31", imageDirectoryStar + "31.png"),
		];

		mediaLibrary.imagesAdd(imagesForSun);

		/*
		var imagePlanet = imageHelper.buildImageFromStrings
		(
			"Planet",
			[
				"......cccc......",
				"....cc....cc....",
				"...c........c...",
				"..c..........c..",
				".c............c.",
				".c............c.",
				"c..............c",
				"c..............c",
				"c..............c",
				"c..............c",
				".c............c.",
				".c............c.",
				"..c..........c..",
				"...c........c...",
				"....cc.....cc....",
				"......ccccc.....",
			]
		)
		*/

		var imageNamePrefixPlanet = "Planet";
		var imageDirectoryPlanet = imageDirectory + "Planet/";

		var imagesForPlanet =
		[
			new Image2(imageNamePrefixPlanet + "00", imageDirectoryPlanet + "00.png"),
			new Image2(imageNamePrefixPlanet + "01", imageDirectoryPlanet + "01.png"),
			new Image2(imageNamePrefixPlanet + "02", imageDirectoryPlanet + "02.png"),
			new Image2(imageNamePrefixPlanet + "03", imageDirectoryPlanet + "03.png"),
			new Image2(imageNamePrefixPlanet + "04", imageDirectoryPlanet + "04.png"),
			new Image2(imageNamePrefixPlanet + "05", imageDirectoryPlanet + "05.png"),
			new Image2(imageNamePrefixPlanet + "06", imageDirectoryPlanet + "06.png"),
			new Image2(imageNamePrefixPlanet + "07", imageDirectoryPlanet + "07.png"),
			new Image2(imageNamePrefixPlanet + "08", imageDirectoryPlanet + "08.png"),
			new Image2(imageNamePrefixPlanet + "09", imageDirectoryPlanet + "09.png"),
			new Image2(imageNamePrefixPlanet + "10", imageDirectoryPlanet + "10.png"),
			new Image2(imageNamePrefixPlanet + "11", imageDirectoryPlanet + "11.png"),
			new Image2(imageNamePrefixPlanet + "12", imageDirectoryPlanet + "12.png"),
			new Image2(imageNamePrefixPlanet + "13", imageDirectoryPlanet + "13.png"),
			new Image2(imageNamePrefixPlanet + "14", imageDirectoryPlanet + "14.png"),
			new Image2(imageNamePrefixPlanet + "15", imageDirectoryPlanet + "15.png"),
			new Image2(imageNamePrefixPlanet + "16", imageDirectoryPlanet + "16.png"),
			new Image2(imageNamePrefixPlanet + "17", imageDirectoryPlanet + "17.png"),
			new Image2(imageNamePrefixPlanet + "18", imageDirectoryPlanet + "18.png"),
			new Image2(imageNamePrefixPlanet + "19", imageDirectoryPlanet + "19.png"),
			new Image2(imageNamePrefixPlanet + "20", imageDirectoryPlanet + "20.png"),
			new Image2(imageNamePrefixPlanet + "21", imageDirectoryPlanet + "21.png"),
			new Image2(imageNamePrefixPlanet + "22", imageDirectoryPlanet + "22.png"),
			new Image2(imageNamePrefixPlanet + "23", imageDirectoryPlanet + "23.png"),
			new Image2(imageNamePrefixPlanet + "24", imageDirectoryPlanet + "24.png"),
			new Image2(imageNamePrefixPlanet + "25", imageDirectoryPlanet + "25.png"),
			new Image2(imageNamePrefixPlanet + "26", imageDirectoryPlanet + "26.png"),
			new Image2(imageNamePrefixPlanet + "27", imageDirectoryPlanet + "27.png"),
			new Image2(imageNamePrefixPlanet + "28", imageDirectoryPlanet + "28.png"),
			new Image2(imageNamePrefixPlanet + "29", imageDirectoryPlanet + "29.png"),
			new Image2(imageNamePrefixPlanet + "30", imageDirectoryPlanet + "30.png"),
			new Image2(imageNamePrefixPlanet + "31", imageDirectoryPlanet + "31.png"),
		];

		mediaLibrary.imagesAdd(imagesForPlanet);

		var imagesForPortal = imageHelper.buildImagesFromStringArrays
		("Portal", [
			[
				"...v.....v.....v...",
				"..v.v...v.v...v.v..",
				".v...v.v...v.v...v.",
				"v.....v.....v.....v",
				".v...............v.",
				"..v.............v..",
				"...v...........v...",
				"..v.............v..",
				".v...............v.",
				"v.................v",
				".v...............v.",
				"..v.............v..",
				"...v...........v...",
				"..v.............v..",
				".v...............v.",
				"v.....v.....v.....v",
				".v...v.v...v.v...v.",
				"..v.v...v.v...v.v..",
				"...v.....v.....v...",
			],

			[
				"...v..v.....v..v...",
				"....v..v...v..v....",
				".....v..v.v..v.....",
				"v.....v..v..v.....v",
				".v...v.......v...v.",
				"..v.v.........v.v..",
				"v..v...........v..v",
				".v...............v.",
				"..v.............v..",
				"...v...........v...",
				"..v.............v..",
				".v...............v.",
				"v..v...........v..v",
				"..v.v.........v.v..",
				".v...v.......v...v.",
				"v.....v..v..v.....v",
				".....v..v.v..v.....",
				"....v..v...v..v....",
				"...v..v.....v..v...",
			],
		]);

		mediaLibrary.imagesAdd(imagesForPortal);

		var imagesFriendly = imageHelper.buildImagesFromStringArrays
		("Friendly", [
			[
				"......aaaaa......",
				".....a.....a.....",
				"....a..ggg..a....",
				"...a..g...g..a...",
				"..a...ggggg...a..",
				"..a...........a..",
				"..a...........a..",
				"..a...........a..",
				"...aaaaaaaaaaa...",
				".................",
				".....vvvvvvvv....",
				".................",
				"......vvvvvv......",
				".................",
			],
			[
				"......aaaaa......",
				".....a.....a.....",
				"....a..ggg..a....",
				"...a..g...g..a...",
				"..a...ggggg...a..",
				"..a...........a..",
				"..a...........a..",
				"..a...........a..",
				"...aaaaaaaaaaa...",
				".....vvvvvvvv....",
				".................",
				"......vvvvvv......",
				".................",
				".......vvvv.......",
			],
		]);

		mediaLibrary.imagesAdd(imagesFriendly);

		/*
		var imagesEnemy = imageHelper.buildImagesFromStringArrays
		("Enemy", [
			[
				"......aaaaa......",
				".....a.....a.....",
				"....a..rrr..a....",
				"...a..r...r..a...",
				"..a...rrrrr...a..",
				"..a...........a..",
				"..a...........a..",
				"..a...........a..",
				"...aaaaaaaaaaa...",
				".................",
				".....vvvvvvvv....",
				".................",
				"......vvvvvv......",
				".................",
			],
			[
				"......aaaaa......",
				".....a.....a.....",
				"....a..rrr..a....",
				"...a..r...r..a...",
				"..a...rrrrr...a..",
				"..a...........a..",
				"..a...........a..",
				"..a...........a..",
				"...aaaaaaaaaaa...",
				".....vvvvvvvv....",
				".................",
				"......vvvvvv......",
				".................",
				".......vvvv.......",
			],
		]);
		*/

		var imageNamePrefixEnemy = "Enemy";
		var imageDirectoryEnemy = imageDirectory + "Saucer/";

		var imagesEnemy =
		[
			new Image2(imageNamePrefixEnemy + "00", imageDirectoryEnemy + "00.png"),
			new Image2(imageNamePrefixEnemy + "01", imageDirectoryEnemy + "01.png"),
			new Image2(imageNamePrefixEnemy + "02", imageDirectoryEnemy + "02.png"),
			new Image2(imageNamePrefixEnemy + "03", imageDirectoryEnemy + "03.png"),
			new Image2(imageNamePrefixEnemy + "04", imageDirectoryEnemy + "04.png"),
			new Image2(imageNamePrefixEnemy + "05", imageDirectoryEnemy + "05.png"),
			new Image2(imageNamePrefixEnemy + "06", imageDirectoryEnemy + "06.png"),
			new Image2(imageNamePrefixEnemy + "07", imageDirectoryEnemy + "07.png"),
			new Image2(imageNamePrefixEnemy + "08", imageDirectoryEnemy + "08.png"),
			new Image2(imageNamePrefixEnemy + "09", imageDirectoryEnemy + "09.png"),
			new Image2(imageNamePrefixEnemy + "10", imageDirectoryEnemy + "10.png"),
			new Image2(imageNamePrefixEnemy + "11", imageDirectoryEnemy + "11.png"),
			new Image2(imageNamePrefixEnemy + "12", imageDirectoryEnemy + "12.png"),
			new Image2(imageNamePrefixEnemy + "13", imageDirectoryEnemy + "13.png"),
			new Image2(imageNamePrefixEnemy + "14", imageDirectoryEnemy + "14.png"),
			new Image2(imageNamePrefixEnemy + "15", imageDirectoryEnemy + "15.png"),
		]

		mediaLibrary.imagesAdd(imagesEnemy);

		var imageNamePrefixPlayer = "Player";
		var imageDirectoryPlayer = imageDirectory + "Rocket/"

		var imagesForPlayerClockwise =
		[
			new Image2(imageNamePrefixPlayer + "00", imageDirectoryPlayer + "00.png"),
			new Image2(imageNamePrefixPlayer + "01", imageDirectoryPlayer + "01.png"),
			new Image2(imageNamePrefixPlayer + "02", imageDirectoryPlayer + "02.png"),
			new Image2(imageNamePrefixPlayer + "03", imageDirectoryPlayer + "03.png"),
			new Image2(imageNamePrefixPlayer + "04", imageDirectoryPlayer + "04.png"),
			new Image2(imageNamePrefixPlayer + "05", imageDirectoryPlayer + "05.png"),
			new Image2(imageNamePrefixPlayer + "06", imageDirectoryPlayer + "06.png"),
			new Image2(imageNamePrefixPlayer + "07", imageDirectoryPlayer + "07.png"),
			new Image2(imageNamePrefixPlayer + "08", imageDirectoryPlayer + "08.png"),
			new Image2(imageNamePrefixPlayer + "09", imageDirectoryPlayer + "09.png"),
			new Image2(imageNamePrefixPlayer + "10", imageDirectoryPlayer + "10.png"),
			new Image2(imageNamePrefixPlayer + "11", imageDirectoryPlayer + "11.png"),
			new Image2(imageNamePrefixPlayer + "12", imageDirectoryPlayer + "12.png"),
			new Image2(imageNamePrefixPlayer + "13", imageDirectoryPlayer + "13.png"),
			new Image2(imageNamePrefixPlayer + "14", imageDirectoryPlayer + "14.png"),
			new Image2(imageNamePrefixPlayer + "15", imageDirectoryPlayer + "15.png"),
		];

		mediaLibrary.imagesAdd(imagesForPlayerClockwise);

		mediaLibrary.waitForItemsAllToLoad(() => {});

		var ticksPerAnimationFrame = 2;

		var camera = new Camera
		(
			universe.display.sizesAvailable[0], // viewSize
			1, // focalLength
			new Disposition(new Coords(0, 0, 0))
		);

		var entityDefnCamera = new Entity
		(
			"Camera",
			// properties
			[
				new CameraDefn(camera),
			]
		);

		var itemSizeInPixels = new Coords(10, 10, 1);

		var entityDefnItemCollection = new Entity
		(
			"ItemCollection",

			// properties
			[
				new Animatable2(),
				new BodyDefn(itemSizeInPixels), // sizeInPixels
				new Collidable2
				(
					new Box(new Coords(0, 0, 0), itemSizeInPixels),
					[], // entityDefnNameToCollideWith
					function() {} // collide
				),
				new Drawable
				(
					new VisualCameraProjection
					(
						camera,
						new VisualAnimation
						(
							null, // name
							[ ticksPerAnimationFrame ],
							VisualImageScaled.manyFromSizeAndVisuals
							(
								itemSizeInPixels,
								imagesForItemCollection.map(x => new VisualImageImmediate(x))
							)
						)
					)
				),
				new ItemCollection(),
				new ItemContainer([ new Item("Fuel", 100) ]), // hack
				new Killable2(1), // integrityMax
			]
		);

		var projectileSizeInPixels = new Coords(3, 3, 1);

		var entityDefnProjectile = new Entity
		(
			"Projectile",

			// properties
			[
				new Killable2(1), // integrityMax
				new EphemeralDefn(16), // ticksToLive
				new BodyDefn(projectileSizeInPixels),
				new MoverDefn(1, 1, 16), // mass, force, speedMax
				new Drawable
				(
					new VisualCameraProjection
					(
						camera,
						new VisualImageFromLibrary(imageMoverProjectile.name)
					),
				),
				new ProjectileDefn(1),
				new Collidable2
				(
					new Box(new Coords(0, 0, 0), projectileSizeInPixels),
					[ Enemy.name ],
					(universeWorldPlaceEntities) =>
					{
						var entityThis = universeWorldPlaceEntities.entity;
						var entityOther = universeWorldPlaceEntities.entity2;
						var enemy = entityOther.propertyByName(Enemy.name);
						if (enemy != null)
						{
							var damage = entityThis.propertyByName(ProjectileDefn.name).damage;
							entityOther.propertyByName(Killable2.name).integrity -=
								damage;
							entityThis.propertyByName(Killable2.name).integrity = 0;
						}
					}
				),
			]
		);

		var planetSizeInPixels = new Coords(32, 32, 1);

		var entityDefnPlanet = new Entity
		(
			"Planet",
			[
				new Animatable2(),
				new BodyDefn(planetSizeInPixels),
				new Collidable2
				(
					new Box(new Coords(0, 0, 0), planetSizeInPixels),
					[],
					function collide() {}
				),
				new Drawable
				(
					new VisualCameraProjection
					(
						camera,
						new VisualGroup
						([
							new VisualAnimation
							(
								null, // name
								[ ticksPerAnimationFrame * 8 ],
								VisualImageScaled.manyFromSizeAndVisuals
								(
									planetSizeInPixels,
									imagesForPlanet.map(x => new VisualImageImmediate(x, planetSizeInPixels))
								)
							),
							new VisualOffset
							(
								new VisualText
								(
									DataBinding.fromGet
									(
										(uwpee) =>
											uwpee.entity.propertyByName(Planet.name).name
									),
									null, // fontHeight
									Color.byName("White"),
									Color.byName("Black")
								),
								new Coords(0, 20, 0)
							),
							new VisualOffset
							(
								new VisualText
								(
									DataBinding.fromGet
									(
										(uwpee) =>
										{
											var entity = uwpee.entity;
											var universe = uwpee.universe;
											var world = uwpee.world;
											var planet = entity.propertyByName(Planet.name);
											var tradeOffer = planet.itemTradeOffer;
											var tradeOfferAsString =
												tradeOffer.toString(universe, world);
											return tradeOfferAsString
										}
									),
									null, // fontHeight
									Color.byName("White"),
									Color.byName("Black")
								),
								new Coords(0, 30, 0)
							),
						])
					)
				),
				new PlanetDefn(),
			]
		);

		var colorsAll = Color.Instances()._All;

		var entityDefnsPortal = [];

		var portalColorNames = [ "Red", "Green", "Blue", "Violet" ];
		for (var c = 0; c < portalColorNames.length; c++)
		{
			var colorName = portalColorNames[c];
			var color = colorsAll[colorName];
			var entityDefnName = "Portal" + colorName;

			var portalSizeInPixels = new Coords(19, 19, 1);

			var entityDefnPortal = new Entity
			(
				entityDefnName,
				[
					new Animatable2(),
					new BodyDefn(portalSizeInPixels), // sizeInPixels
					new Collidable2
					(
						new Box(new Coords(0, 0, 0), portalSizeInPixels),
						[],
						function collide() {}
					),
					new Drawable
					(
						new VisualCameraProjection
						(
							camera,
							new VisualAnimation
							(
								null, // name
								[ ticksPerAnimationFrame ],
								VisualImageScaled.manyFromSizeAndVisuals
								(
									portalSizeInPixels,
									imagesForPortal.map(x => new VisualImageImmediate(x))
								)
							),
						)
					),
					new PortalDefn(),
				]
			);

			entityDefnsPortal.push(entityDefnPortal);
		}

		var imageBackgroundLayer0 = imageHelper.buildImageFromStrings
		(
			"BackgroundLayer0",
			[
				"c..c..c",
				".c.c.c.",
				"...c...",
				"ccccccc",
				"...c...",
				".c.c.c.",
				"c..c..c",
			]
		);
		mediaLibrary.imagesAdd([imageBackgroundLayer0]);
		var visualImageBackgroundLayer0 = new VisualImageFromLibrary("BackgroundLayer0");

		var imageBackgroundLayer1 = imageHelper.buildImageFromStrings
		(
			"BackgroundLayer1",
			[
				"..a..",
				"..a..",
				"aaaaa",
				"..a..",
				"..a..",
			]
		);
		mediaLibrary.imagesAdd([imageBackgroundLayer1]);
		var visualImageBackgroundLayer1 = new VisualImageFromLibrary("BackgroundLayer1");

		var backgroundViewSize = new Coords(400, 300, 1);
		var backgroundCellSizeMultiplier = 1.5;
		var backgroundCellSize = new Coords
		(
			backgroundViewSize.x * backgroundCellSizeMultiplier,
			backgroundViewSize.x * backgroundCellSizeMultiplier, // x, not y
			1
		);

		var entityDefnBackground = new Entity
		(
			"Background",
			[
				new Drawable
				(
					new VisualGroup
					([
						new VisualOffset
						(
							new VisualCameraProjection
							(
								camera,
								new VisualRepeating
								(
									backgroundCellSize,
									backgroundViewSize,
									new VisualGroup
									([
										visualImageBackgroundLayer0,
										new VisualOffset
										(
											visualImageBackgroundLayer0,
											new Coords
											(
												backgroundCellSize.x / 3,
												backgroundCellSize.y / 4,
												0
											)
										),
									])
								)
							),
							new Coords(0, 0, 2), // offset
						),

						new VisualOffset
						(
							new VisualCameraProjection
							(
								camera,
								new VisualRepeating
								(
									backgroundCellSize,
									backgroundViewSize,
									visualImageBackgroundLayer1
								)
							),
							new Coords(0, 0, 4) // offset
						),
					])
				)
			]
		);

		var sunSizeInPixels = new Coords(40, 40, 1);

		var entityDefnSun = new Entity
		(
			"Sun",
			[
				new Animatable2(),
				new BodyDefn(sunSizeInPixels), // sizeInPixels
				new Drawable
				(
					new VisualCameraProjection
					(
						camera,
						new VisualGroup
						([
							new VisualAnimation
							(
								null, // name
								[ ticksPerAnimationFrame ],
								VisualImageScaled.manyFromSizeAndVisuals
								(
									sunSizeInPixels,
									imagesForSun.map(x => new VisualImageImmediate(x))
								)
							),
							new VisualOffset
							(
								new VisualText
								(
									DataBinding.fromGet
									(
										(uwpee) =>
											uwpee.entity.propertyByName(Star.name).name
									),
									null, // fontHeight
									Color.byName("White"),
									Color.byName("Black")
								),
								new Coords(0, 20, 0)
							),
						])
					)
				),
				new StarDefn(),
			]
		);

		var friendlySizeInPixels = new Coords(16, 9, 1);
		var entityDefnFriendly = new Entity
		(
			"Friendly",
			[
				new ActorDefn("DoNothing"),
				new Animatable2(),
				new BodyDefn(friendlySizeInPixels), // sizeInPixels
				new Drawable
				(
					new VisualCameraProjection
					(
						camera,
						new VisualAnimation
						(
							null, // name
							[ ticksPerAnimationFrame ],
							VisualImageScaled.manyFromSizeAndVisuals
							(
								friendlySizeInPixels,
								imagesFriendly.map(x => new VisualImageImmediate(x))
							)
						)
					)
				),
				new FriendlyDefn(),
				new Killable2(1), // integrityMax
				new MoverDefn(1, 1, 4) // mass, forcePerTick, speedMax
			]
		);

		var enemySize = new Coords(32, 32, 1);

		var entityDefnEnemy = new Entity
		(
			"Enemy",
			[
				new ActorDefn("MoveRandomly"),
				new Animatable2(),
				new BodyDefn(enemySize),
				new Collidable2
				(
					new Box(new Coords(0, 0, 0), enemySize),
					[ Player.name ],
					// collide
					function (entityThis, entityOther)
					{
						// do nothing
					}
				),
				new Drawable
				(
					new VisualCameraProjection
					(
						camera,
						new VisualAnimation
						(
							null, // name
							[ 1 ], // ticksPerAnimationFrame,
							VisualImageScaled.manyFromSizeAndVisuals
							(
								enemySize,
								imagesEnemy.map(x => new VisualImageImmediate(x, enemySize))
							)
						)
					)
				),
				new Killable2(1), // integrityMax
				new Enemy(),
				new MoverDefn(1, 1, 2), // mass, forcePerTick, speedMax
			]
		);

		var playerCollide = (universeWorldPlaceEntities) =>
		{
			var world = universeWorldPlaceEntities.world;
			var starsystem = universeWorldPlaceEntities.place;
			var player = universeWorldPlaceEntities.entity;
			var entityOther = universeWorldPlaceEntities.entity2;

			if (entityOther.propertyByName(ItemCollection.name) != null)
			{
				var itemCollection = entityOther;
				starsystem.entitiesToRemove.push(itemCollection);
				var itemsToTransfer = itemCollection.propertyByName(ItemContainer.name).items;
				player.propertyByName(ItemContainer.name).itemsAdd(itemsToTransfer);
			}
			else if (entityOther.propertyByName(Enemy.name) != null)
			{
				player.propertyByName(Killable2.name).integrity = 0;

				var venueMessage = new VenueMessage
				(
					DataBinding.fromContext("You lose!"),
					() => // acknowledge
					{
						universe.venueNext = new VenueFader
						(
							new VenueControls(universe.controlBuilder.title(universe))
						);
					},
					universe.venueCurrent, // venuePrev
					universe.display.sizeDefault().clone().half(),
					false // showMessageOnly
				);
				universe.venueNext = venueMessage;
			}
			else if (entityOther.propertyByName(Planet.name) != null)
			{
				var planet = entityOther;
				var itemTradeOffer =
					planet.propertyByName(Planet.name).itemTradeOffer;
				if (itemTradeOffer != null)
				{
					itemTradeOffer.trade(universe, world, player, planet);
				}
			}
			else if (entityOther.propertyByName(Portal2.name) != null)
			{
				starsystem.entitiesToRemove.push(player);

				var portal = entityOther.propertyByName(Portal2.name);

				var itemContainer = player.propertyByName(ItemContainer.name);
				var itemFuel = itemContainer.itemByDefnName("Fuel");
				var fuelUsedByPortal = 1000;
				if (itemFuel.quantity >= fuelUsedByPortal)
				{
					itemFuel.quantity -= fuelUsedByPortal;

					var destinationStarsystemName = portal.destinationStarsystemName;
					var destinationStarsystem =
						world.starsystemByName(destinationStarsystemName);

					destinationStarsystem.entitiesToSpawn.push(player);
					player.locatable().loc.pos.overwriteWith(portal.destinationPos);
					universe.world.starsystemNext = destinationStarsystem;
				}
			}
		}

		var gridSpacing = 8;

		var playerSizeInPixels = new Coords(32, 32, 1);

		var entityDefnPlayer = new Entity
		(
			"Player",
			[
				new ActorDefn("UserInputAccept"),
				new BodyDefn(playerSizeInPixels),
				new Collidable2
				(
					new Box( new Coords(0, 0, 0), playerSizeInPixels),
					[ ItemCollection.name, Enemy.name, Planet.name, Portal2.name ],
					playerCollide
				),
				new Drawable
				(
					new VisualCameraProjection
					(
						camera,
						new VisualDirectional
						(
							new VisualNone(),
							VisualImageScaled.manyFromSizeAndVisuals
							(
								playerSizeInPixels,
								imagesForPlayerClockwise.map
								(
									x => new VisualImageImmediate(x, playerSizeInPixels)
								)
							)
						)
					)
				),
				new ItemContainer
				([
					new Item("Crew", 3),
					new Item("Food", 100000),
					new Item("Fuel", 100000),
				]),
				new Killable2(1), // integrityMax
				new MoverDefn(1, 2, 8), // mass, forcePerTick, speedMax
				new Player(),
				new ControllableDefn
				(
					// buildControlForEntity
					(entity) =>
					{
						var children =
						[
							new ControlText
							(
								"textName",
								entity,
								new Coords(1, 1).multiplyScalar(gridSpacing), // pos
								new DataSourceEntity
								(
									function(entity) { return entity.name; }
								)
							),

							new ControlText
							(
								"textIntegrity",
								entity,
								new Coords(1, 2).multiplyScalar(gridSpacing), // pos
								DataBinding.fromGet
								(
									(entity) =>
									{
										var killable = entity.propertyByName(Killable2.name);
										var returnValue =
											"HP: "
											+ killable.integrity
											+ " / "
											+ killable.integrityMax;

										return returnValue;
									}
								)
							),

							new ControlText
							(
								"textLoc",
								entity,
								new Coords(1, 3).multiplyScalar(gridSpacing), // pos
								DataBinding.fromGet
								(
									(entity) => entity.locatable().loc.toString()
								)
							),
						];

						var items = entity.propertyByName(ItemContainer.name).items;

						for (var i = 0; i < items.length; i++)
						{
							var item = items[i];

							var controlForItem = new ControlText
							(
								"textItem" + item.defnName,
								item,
								new Coords(1, 4 + i).multiplyScalar
								(
									gridSpacing
								), // pos
								DataBinding.fromGet
								(
									(item) =>
										item.defnName + ": "+ item.quantity
								)
							);

							children.push
							(
								controlForItem
							);
						}

						/*
						var controlContainer = new ControlContainer
						(
							"containerPlayer",
							entity,
							new Coords(8, 8).multiplyScalar(gridSpacing), // size
							new Coords(1, 1).multiplyScalar(gridSpacing), // pos
							children
						);
						var returnValue = controlContainer;
						*/

						// hack
						var returnValue = children[0];


						return returnValue;
					}
				),
			]
		);

		var entityDefns =
		[
			entityDefnBackground,
			entityDefnCamera,
			entityDefnPlanet,
			entityDefnsPortal[0],
			entityDefnsPortal[1],
			entityDefnsPortal[2],
			entityDefnsPortal[3],
			entityDefnSun,

			entityDefnItemCollection,
			entityDefnProjectile,
			entityDefnEnemy,
			entityDefnFriendly,
			entityDefnPlayer,
		];

		return entityDefns;
	}

	world_StarsystemDefns()
	{
		var starsystemDefns =
		[
			new StarsystemDefn
			(
				"StarsystemDefn0",
				[
					new ActionToInputsMapping("Accelerate", ["w"], false),
					new ActionToInputsMapping("TurnLeft", ["a"], false),
					new ActionToInputsMapping("TurnRight", ["d"],false),
					new ActionToInputsMapping("Fire", ["f"],true),
				]
			),
		];

		return starsystemDefns;
	}
}

// Constraints.

class Constraint_ConformToBounds
{
	constructor(boxToConformTo)
	{
		this.boxToConformTo = boxToConformTo;
	}

	constrain(universeWorldPlaceEntities)
	{
		var entity = universeWorldPlaceEntities.entity;
		var entityLoc = entity.locatable().loc;
		entityLoc.pos.trimToRangeMinMax
		(
			this.boxToConformTo.min(),
			this.boxToConformTo.max()
		);
	}
}

class Constraint_FollowEntityByName
{
	constructor(entityToFollowName)
	{
		this.entityToFollowName = entityToFollowName;
	}

	constrain(universeWorldPlaceEntities)
	{
		var place = universeWorldPlaceEntities.place;
		var entity = universeWorldPlaceEntities.entity;

		var entityToFollow = place.entityByName(this.entityToFollowName);
		if (entityToFollow != null) // hack
		{
			entity.locatable().loc.pos.overwriteWith
			(
				entityToFollow.locatable().loc.pos
			);
		}
	}
}

