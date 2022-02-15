
class Demo
{
	actions(): Action[]
	{
		var accelerate = new Action
		(
			"Accelerate",
			(universeWorldPlaceEntities) =>
			{
				var actor = universeWorldPlaceEntities.entity;

				var fuelUsedByAcceleration = 1;
				var itemHolder = actor.itemHolder();
				var itemFuel = itemHolder.itemsByDefnName("Fuel")[0];

				if (itemFuel.quantity >= fuelUsedByAcceleration)
				{
					itemFuel.quantity -= fuelUsedByAcceleration;

					var actorLoc = actor.locatable().loc;
					var actorOrientation = actorLoc.orientation;

					actorLoc.accel.add
					(
						Coords.create().overwriteWith
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

				var itemHolder = actor.itemHolder();
				var itemFuel = itemHolder.itemsByDefnName("Fuel")[0];
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
					entityToSpawn.locatable().loc.vel =
						forward.clone().normalize().multiplyScalar
						(
							MoverDefn.fromEntity(entityDefnProjectile).speedMax
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


	worldGrid
	(
		universe: Universe,
		sizeInStarsystems: Coords
	): WorldExtended
	{
		if (sizeInStarsystems == null)
		{
			sizeInStarsystems = new Coords(10, 10, 1);
		}

		var nameGenerator = new NameGenerator();

		var itemDefns = this.world_ItemDefns();

		var actions = this.actions();

		var activityDefns = this.world_ActivityDefns();

		var entityDefns = this.world_EntityDefns(universe);
		var entityDefnsByName =
			ArrayHelper.addLookupsByName(entityDefns);

		var starsystemDefns = this.world_StarsystemDefns();

		var starsystemSizeInPixels = Coords.fromXY(1200, 1200);
		var starsystemSizeInPixelsHalf =
			starsystemSizeInPixels.clone().divideScalar(2);
		var starsystems = [];

		var starsystemPos = Coords.create();
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
							Locatable.fromPos(Coords.zeroes() ),
							null // place
						),

						// sun
						entityDefnsByName.get("Sun").clone().nameSet("Sun").propertyAddForPlace
						(
							Locatable.fromPos(starsystemSizeInPixelsHalf.clone()),
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

						entityDefnsByName.get("PortalRed").clone().nameSet
						(
							"PortalWest"
						).propertyAddForPlace
						(
							Locatable.fromPos
							(
								Coords.fromXY
								(
									.05 * starsystemSizeInPixels.x,
									starsystemSizeInPixelsHalf.y
								)
							),
							null // place
						).propertyAddForPlace
						(
							new Portal2
							(
								starsystemNamePrefix + starsystemPosWest.toString(),
								Coords.fromXY
								(
									.9 * starsystemSizeInPixels.x,
									starsystemSizeInPixelsHalf.y
								)
							),
							null
						),

						entityDefnsByName.get("PortalGreen").clone().nameSet
						(
							"PortalEast"
						).propertyAddForPlace
						(
							Locatable.fromPos
							(
								Coords.fromXY
								(
									.95 * starsystemSizeInPixels.x,
									starsystemSizeInPixelsHalf.y
								)
							),
							null // place
						).propertyAddForPlace
						(
							new Portal2
							(
								starsystemNamePrefix + starsystemPosEast.toString(),
								Coords.fromXY
								(
									.1 * starsystemSizeInPixels.x,
									starsystemSizeInPixelsHalf.y
								)
							),
							null // place
						),

						entityDefnsByName.get("PortalBlue").clone().nameSet
						(
							"PortalNorth"
						).propertyAddForPlace
						(
							Locatable.fromPos
							(
								Coords.fromXY
								(
									starsystemSizeInPixelsHalf.x, .05 * starsystemSizeInPixels.y
								)
							),
							null // place
						).propertyAddForPlace
						(
							new Portal2
							(
								starsystemNamePrefix + starsystemPosNorth.toString(),
								Coords.fromXY
								(
									starsystemSizeInPixelsHalf.x,
									.9 * starsystemSizeInPixels.y
								)
							),
							null // place
						),

						entityDefnsByName.get("PortalViolet").clone().nameSet
						(
							"PortalEast"
						).propertyAddForPlace
						(
							Locatable.fromPos
							(
								Coords.fromXY
								(
									starsystemSizeInPixelsHalf.x,
									.95 * starsystemSizeInPixels.y
								)
							),
							null // place
						).propertyAddForPlace
						(
							new Portal2
							(
								starsystemNamePrefix + starsystemPosSouth.toString(),
								Coords.fromXY
								(
									starsystemSizeInPixelsHalf.x,
									.1 * starsystemSizeInPixels.y
								)
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
					var pos = Coords.create().randomize(null).multiply
					(
						starsystemSizeInPixels
					).round();

					var entityPlanet = entityDefnPlanet.clone().nameSet
					(
						Planet.name + p
					).propertyAddForPlace
					(
						Locatable.fromPos(pos), null // place
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
					var pos = Coords.create().randomize(null).multiply
					(
						starsystemSizeInPixels
					).round();

					var entityEnemy = entityDefnEnemy.clone().nameSet
					(
						"Enemy" + e
					).propertyAddForPlace
					(
						Locatable.fromPos(pos), null
					);

					starsystem.entitiesToSpawn.push(entityEnemy);
				}

				var numberOfItemCollections = 1;
				var entityDefnItemCollection = entityDefnsByName.get("ItemCollection");
				for (var c = 0; c < numberOfItemCollections; c++)
				{
					var pos = Coords.create().randomize(null).multiply
					(
						starsystemSizeInPixels
					).round();

					var entityItemCollection = entityDefnItemCollection.clone().nameSet
					(
						"ItemCollection" + c
					).propertyAddForPlace
					(
						Locatable.fromPos(pos), null
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
						Locatable.fromPos(Coords.fromXY(100, 100)),
						null // place
					);
					starsystem.entitiesToSpawn.push(entityPlayer);

					// friendlies

					var entityFriendly = entityDefnsByName.get("Friendly").clone().nameSet
					(
						"Friendly0"
					).propertyAddForPlace
					(
						Locatable.fromPos(Coords.fromXY(350, 50)),
						null // place
					);
					starsystem.entitiesToSpawn.push(entityFriendly);
				}

				starsystems.push(starsystem);

			}  // end for sizeInStarsystems.x

		} // end for sizeInStarsystems.y

		var colors = Color.Instances()._All;

		var defns = new WorldDefnExtended
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

	world_ItemDefns(): ItemDefn[]
	{
		var returnValues =
		[
			ItemDefn.fromNameAndAppearance("Ammo", "A"),
			ItemDefn.fromNameAndAppearance("Bioforms", "B"),
			ItemDefn.fromNameAndAppearance("Crew", "C"),
			ItemDefn.fromNameAndAppearance("Fuel", "F"),
			ItemDefn.fromNameAndAppearance("Food", "N"),
			ItemDefn.fromNameAndAppearance("Luxuries", "L"),
			ItemDefn.fromNameAndAppearance("Materials", "M"),
			ItemDefn.fromNameAndAppearance("Science", "S"),
		];

		return returnValues;
	}

	world_ActivityDefns(): ActivityDefn[]
	{
		var doNothing = new ActivityDefn
		(
			"DoNothing",
			// perform
			(universeWorldPlaceEntities) =>
			{
				// do nothing
			}
		);

		var moveRandomly = new ActivityDefn
		(
			"MoveRandomly",

			// perform
			(universeWorldPlaceEntities) =>
			{
				var world = universeWorldPlaceEntities.world;
				var actor = universeWorldPlaceEntities.entity;

				var actorLoc = actor.locatable().loc;
				var actorPos = actorLoc.pos;

				var activity = actor.actor().activity;

				if (activity.targetEntity() == null)
				{
					var actorStarsystem = actorLoc.place(world);
					var starsystemSizeInPixels = actorStarsystem.size;

					var newTargetPos = Coords.fromXY
					(
						Math.floor(Math.random() * starsystemSizeInPixels.x),
						Math.floor(Math.random() * starsystemSizeInPixels.y)
					);
					var newTarget = new Entity
					(
						"Target",
						[ Locatable.fromPos(newTargetPos) ]
					);

					activity.targetEntitySet(newTarget);
				}

				var targetAsEntity = activity.targetEntity();
				var target = targetAsEntity.locatable().loc.pos;

				var displacementToTarget = target.clone().subtract(actorPos);
				var distanceToTarget = displacementToTarget.magnitude();
				var directionToAccelerate = displacementToTarget.clone().normalize();

				var speedCurrent = actorLoc.vel.magnitude();
				if (speedCurrent > 0)
				{
					var timeToTarget =
						distanceToTarget / speedCurrent;

					var moverDefn = MoverDefn.fromEntity(actor);

					var accelerationCurrent =
						moverDefn.force / moverDefn.massBase;

					if (speedCurrent > accelerationCurrent * timeToTarget)
					{
						directionToAccelerate.multiplyScalar(-1);
					}
				}

				var distanceThreshold = 8;
				if (distanceToTarget < distanceThreshold)
				{
					activity.targetEntityClear();
				}
				else
				{
					var forceToApplyTowardTarget = directionToAccelerate.clone().multiplyScalar
					(
						MoverDefn.fromEntity(actor).force
					);
					actorLoc.force.add(forceToApplyTowardTarget);
				}
			}
		);

		var userInputAccept = new ActivityDefn
		(
			"UserInputAccept",

			(universeWorldPlaceEntities: UniverseWorldPlaceEntities) =>
			{
				var universe = universeWorldPlaceEntities.universe;

				var inputHelper = universe.inputHelper;
				var inputsActive = inputHelper.inputsActive();
				var world = universe.world as WorldExtended;
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
							//actionsFromActor.push(action);
							action.perform(universeWorldPlaceEntities);
						}
					}
				}
			}
		);

		var _all =
		[
			doNothing,
			moveRandomly,
			userInputAccept
		];

		return _all;
	}

	world_EntityDefns(universe: Universe): Entity[]
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
			Disposition.fromPos(Coords.zeroes()),
			null // entitiesInViewSort
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
				Animatable2.default(),
				new BodyDefn(itemSizeInPixels), // sizeInPixels
				Collidable.from3
				(
					new Box(Coords.zeroes(), itemSizeInPixels),
					[], // entityDefnNameToCollideWith
					function() {} // collide
				),
				Drawable.fromVisual
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
								imagesForItemCollection.map
								(
									x => new VisualImageImmediate(x, false) // isScaled
								)
							),
							true // isRepeating
						)
					)
				),
				new ItemContainer(),
				ItemHolder.fromItems
				([
					new Item("Fuel", 100)
				]), // hack
				Killable.fromIntegrityMax(1)
			]
		);

		var projectileSizeInPixels = new Coords(3, 3, 1);

		var entityDefnProjectile = new Entity
		(
			"Projectile",

			// properties
			[
				new BodyDefn(projectileSizeInPixels),
				Collidable.from3
				(
					new Box(Coords.zeroes(), projectileSizeInPixels),
					[ Enemy.name ],
					(universeWorldPlaceEntities) =>
					{
						var entityThis = universeWorldPlaceEntities.entity;
						var entityOther = universeWorldPlaceEntities.entity2;
						var enemy = entityOther.propertyByName(Enemy.name);
						if (enemy != null)
						{
							var damage = ProjectileDefn.fromEntity(entityThis).damage;
							entityOther.killable().integrity -=
								damage;
							entityThis.killable().integrity = 0;
						}
					}
				),
				Drawable.fromVisual
				(
					new VisualCameraProjection
					(
						camera,
						new VisualImageFromLibrary(imageMoverProjectile.name)
					),
				),
				new Ephemeral(16, null), // ticksToLive
				Killable.fromIntegrityMax(1),
				Movable.default(),
				new MoverDefn(1, 1, 16), // mass, force, speedMax
				new ProjectileDefn(1),
			]
		);

		var planetSizeInPixels = new Coords(32, 32, 1);

		var entityDefnPlanet = new Entity
		(
			"Planet",
			[
				Animatable2.default(),
				new BodyDefn(planetSizeInPixels),
				Collidable.from3
				(
					new Box(new Coords(0, 0, 0), planetSizeInPixels),
					[],
					function collide() {}
				),
				Drawable.fromVisual
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
									imagesForPlanet.map
									(
										x => new VisualImageImmediate(x, false) // isScaled
									)
								),
								true // isRepeating
							),
							new VisualOffset
							(
								new VisualText
								(
									DataBinding.fromGet
									(
										(uwpee) =>
											Planet.fromEntity(uwpee.entity).name
									),
									null, // fontHeight
									Color.byName("White"),
									Color.byName("Black")
								),
								Coords.fromXY(0, 20)
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
											var planet = Planet.fromEntity(entity);
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
								Coords.fromXY(0, 30)
							),
						])
					)
				),
				new PlanetDefn(),
			]
		);

		var entityDefnsPortal = [];

		var portalColorNames = [ "Red", "Green", "Blue", "Violet" ];
		for (var c = 0; c < portalColorNames.length; c++)
		{
			var colorName = portalColorNames[c];
			var entityDefnName = "Portal" + colorName;

			var portalSizeInPixels = new Coords(19, 19, 1);

			var entityDefnPortal = new Entity
			(
				entityDefnName,
				[
					Animatable2.default(),
					new BodyDefn(portalSizeInPixels), // sizeInPixels
					Collidable.from3
					(
						new Box(new Coords(0, 0, 0), portalSizeInPixels),
						[],
						() => {} // collide
					),
					Drawable.fromVisual
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
									imagesForPortal.map(x => new VisualImageImmediate(x, false)) // isScaled
								),
								true // isRepeating
							),
						)
					),
					new PortalDefn(colorName),
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
				Drawable.fromVisual
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
											Coords.fromXY
											(
												backgroundCellSize.x / 3,
												backgroundCellSize.y / 4,
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
				Animatable2.default(),
				new BodyDefn(sunSizeInPixels), // sizeInPixels
				Drawable.fromVisual
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
									imagesForSun.map(x => new VisualImageImmediate(x, false)) // isScaled
								),
								true // isRepeating
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
								Coords.fromXY(0, 20)
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
				new Actor(Activity.fromDefnName("DoNothing")),
				Animatable2.default(),
				new BodyDefn(friendlySizeInPixels), // sizeInPixels
				Drawable.fromVisual
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
								imagesFriendly.map(x => new VisualImageImmediate(x, false)) // isScaled
							),
							true // isRepeating
						)
					)
				),
				new FriendlyDefn(),
				Killable.fromIntegrityMax(1), // integrityMax
				new MoverDefn(1, 1, 4) // mass, forcePerTick, speedMax
			]
		);

		var enemySize = new Coords(32, 32, 1);

		var entityDefnEnemy = new Entity
		(
			"Enemy",
			[
				new Actor(Activity.fromDefnName("MoveRandomly")),
				Animatable2.default(),
				new BodyDefn(enemySize),
				Collidable.from3
				(
					new Box(new Coords(0, 0, 0), enemySize),
					[ Player.name ],
					// collide
					(entityThis, entityOther) =>
					{
						// do nothing
					}
				),
				Drawable.fromVisual
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
								imagesEnemy.map(x => new VisualImageImmediate(x, false)) // isScaled
							),
							true // isRepeating
						)
					)
				),
				new Enemy(),
				Killable.fromIntegrityMax(1), // integrityMax
				Movable.default(),
				new MoverDefn(1, 1, 2), // mass, forcePerTick, speedMax
			]
		);

		var playerCollide = (universeWorldPlaceEntities: UniverseWorldPlaceEntities) =>
		{
			var world = universeWorldPlaceEntities.world as WorldExtended;
			var starsystem = universeWorldPlaceEntities.place;
			var player = universeWorldPlaceEntities.entity;
			var entityOther = universeWorldPlaceEntities.entity2;

			if (entityOther.propertyByName(ItemContainer.name) != null)
			{
				var itemCollection = entityOther;
				starsystem.entitiesToRemove.push(itemCollection);
				var itemsToTransfer = itemCollection.itemHolder().items;
				player.itemHolder().itemsAdd(itemsToTransfer);
			}
			else if (entityOther.propertyByName(Enemy.name) != null)
			{
				player.killable().integrity = 0;

				var venueMessage = new VenueMessage
				(
					DataBinding.fromContext("You lose!"),
					() => // acknowledge
					{
						universe.venueNext = VenueFader.fromVenueTo
						(
							new VenueControls
							(
								universe.controlBuilder.title(universe, null), // size
								false // ignoreInputs
							)
						);
					},
					universe.venueCurrent, // venuePrev
					universe.display.sizeDefault().clone().half(),
					false // showMessageOnly
				);
				universe.venueNext = venueMessage;
			}
			else if (Planet.fromEntity(entityOther) != null)
			{
				var planet = entityOther;
				var itemTradeOffer =
					Planet.fromEntity(planet).itemTradeOffer;
				if (itemTradeOffer != null)
				{
					itemTradeOffer.trade(universe, world, player, planet);
				}
			}
			else if (Portal2.fromEntity(entityOther) != null)
			{
				starsystem.entitiesToRemove.push(player);

				var portal = Portal2.fromEntity(entityOther);

				var itemHolder = player.itemHolder();
				var itemFuel = itemHolder.itemsByDefnName("Fuel")[0];
				var fuelUsedByPortal = 1000;
				if (itemFuel.quantity >= fuelUsedByPortal)
				{
					itemFuel.quantity -= fuelUsedByPortal;

					var destinationStarsystemName = portal.destinationStarsystemName;
					var destinationStarsystem =
						world.starsystemByName(destinationStarsystemName);

					destinationStarsystem.entitiesToSpawn.push(player);
					player.locatable().loc.pos.overwriteWith(portal.destinationPos);
					world.starsystemNext = destinationStarsystem;
				}
			}
		}

		var gridSpacing = 8;

		var playerSizeInPixels = new Coords(32, 32, 1);

		var fontHeight = 10;

		var entityDefnPlayer = new Entity
		(
			"Player",
			[
				new Actor(Activity.fromDefnName("UserInputAccept")),
				new BodyDefn(playerSizeInPixels),
				Collidable.from3
				(
					new Box( new Coords(0, 0, 0), playerSizeInPixels),
					[ ItemContainer.name, Enemy.name, Planet.name, Portal2.name ],
					playerCollide
				),
				Drawable.fromVisual
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
									x => new VisualImageImmediate(x, false) //, playerSizeInPixels)
								)
							),
							null // headingInTurnsGetForEntity
						)
					)
				),
				ItemHolder.fromItems
				([
					new Item("Crew", 3),
					new Item("Food", 100000),
					new Item("Fuel", 100000),
				]),
				Killable.fromIntegrityMax(1),
				Movable.default(),
				new MoverDefn(1, 2, 8), // mass, forcePerTick, speedMax
				new Player(),
				new Controllable
				(
					// buildControlForEntity
					(uwpe) =>
					{
						var children: ControlBase[] =
						[
							ControlLabel.fromPosHeightAndText
							(
								Coords.fromXY(1, 1).multiplyScalar(gridSpacing), // pos
								fontHeight,
								DataBinding.fromGet
								(
									(uwpe2: UniverseWorldPlaceEntities) => uwpe2.entity.name
								)
							),

							ControlLabel.fromPosHeightAndText
							(
								Coords.fromXY(1, 2).multiplyScalar(gridSpacing), // pos
								fontHeight,
								DataBinding.fromGet
								(
									(uwpe2: UniverseWorldPlaceEntities) =>
									{
										var killable = uwpe2.entity.killable();
										var returnValue =
											"HP: "
											+ killable.integrity
											+ " / "
											+ killable.integrityMax;

										return returnValue;
									}
								)
							),

							ControlLabel.fromPosHeightAndText
							(
								Coords.fromXY(1, 3).multiplyScalar(gridSpacing), // pos
								fontHeight,
								DataBinding.fromGet
								(
									(uwpe2: UniverseWorldPlaceEntities) =>
										uwpe2.entity.locatable().loc.toString()
								)
							),
						];

						var items = uwpe.entity.itemHolder().items;

						for (var i = 0; i < items.length; i++)
						{
							var item = items[i];

							var controlForItem = ControlLabel.fromPosHeightAndText
							(
								Coords.fromXY(1, 4 + i).multiplyScalar
								(
									gridSpacing
								), // pos
								fontHeight,
								DataBinding.fromContextAndGet
								(
									item,
									(item) =>
										item.defnName + ": "+ item.quantity
								)
							);

							children.push
							(
								controlForItem
							);
						}

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

	world_StarsystemDefns(): StarsystemDefn[]
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

class Constraint_ConformToBounds implements Constraint
{
	boxToConformTo: Box;

	constructor(boxToConformTo: Box)
	{
		this.boxToConformTo = boxToConformTo;
	}

	constrain(universeWorldPlaceEntities: UniverseWorldPlaceEntities): void
	{
		var entity = universeWorldPlaceEntities.entity;
		var entityLoc = entity.locatable().loc;
		entityLoc.pos.trimToRangeMinMax
		(
			this.boxToConformTo.min(),
			this.boxToConformTo.max()
		);
	}

	clone(): Constraint { return this; }
	overwriteWith(other: Constraint): Constraint { return this; }
}

class Constraint_FollowEntityByName implements Constraint
{
	entityToFollowName: string;

	constructor(entityToFollowName: string)
	{
		this.entityToFollowName = entityToFollowName;
	}

	constrain(universeWorldPlaceEntities: UniverseWorldPlaceEntities): void
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

	clone(): Constraint { return this; }
	overwriteWith(other: Constraint): Constraint { return this; }
}

