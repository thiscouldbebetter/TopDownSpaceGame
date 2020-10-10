
class Demo
{
	actions()
	{
		var accelerate = new Action
		(
			"Accelerate",
			function perform(world, actor)
			{
				var fuelUsedByAcceleration = 1;
				var itemFuel = actor.ItemContainer.items["Fuel"];

				if (itemFuel.quantity >= fuelUsedByAcceleration)
				{
					itemFuel.quantity -= fuelUsedByAcceleration;

					var actorLoc = actor.Locatable.loc;
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
			function perform(world, actor)
			{
				var itemFuel = actor.ItemContainer.items["Fuel"];
				var fuelConsumed = 10;
				if (itemFuel.quantity >= fuelConsumed)
				{
					itemFuel.quantity -= fuelConsumed;

					var venue = actor.Locatable.loc.venue;
					var entityDefnProjectile = world.defns.entityDefns["Projectile"];

					var entityToSpawn = entityDefnProjectile.clone().nameAndPropertiesAdd
					(
						"[projectile]",
						[
							new Locatable(actor.Locatable.loc.clone())
						]
					);

					var forward = actor.Locatable.loc.orientation.forward;
					entityToSpawn.Locatable.loc.vel = forward.clone().normalize().multiplyScalar
					(
						entityDefnProjectile.MoverDefn.speedMax
					);

					venue.entitiesToSpawn.push(entityToSpawn);
				}
			}
		);

		var turnLeft = new Action
		(
			"TurnLeft",
			function perform(world, actor)
			{
				var actorLoc = actor.Locatable.loc;
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
					actorLoc.orientation.headingInTurns() * 8 // hack
				);
			}
		);

		var turnRight = new Action
		(
			"TurnRight",
			function perform(world, actor)
			{
				var actorLoc = actor.Locatable.loc;
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
					actorLoc.orientation.headingInTurns() * 8 // hack
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
						entityDefns["Background"].clone().nameAndPropertiesAdd
						(
							"Background",
							[
								new Locatable( new Location( new Coords(0, 0, 0) ) ),
							]
						),

						// sun
						entityDefns["Sun"].clone().nameAndPropertiesAdd
						(
							"Sun",
							[
								new Locatable(new Location(starsystemSizeInPixelsHalf.clone())),
								new Star
								(
									new NameGenerator().generateNameWithSyllables(3),
									null // color
								),
							]
						),

						// portals

						entityDefns["PortalRed"].clone().nameAndPropertiesAdd
						(
							"PortalWest",
							[
								new Locatable(new Location(new Coords(.05 * starsystemSizeInPixels.x, starsystemSizeInPixelsHalf.y))),
								new Portal
								(
									starsystemNamePrefix + starsystemPosWest.toString(),
									new Coords(.9 * starsystemSizeInPixels.x, starsystemSizeInPixelsHalf.y),
									colors["Red"]
								),
							]
						),

						entityDefns["PortalGreen"].clone().nameAndPropertiesAdd
						(
							"PortalEast",
							[
								new Locatable(new Location(new Coords(.95 * starsystemSizeInPixels.x, starsystemSizeInPixelsHalf.y))),
								new Portal
								(
									starsystemNamePrefix + starsystemPosEast.toString(),
									new Coords(.1 * starsystemSizeInPixels.x, starsystemSizeInPixelsHalf.y),
									colors["Green"]
								),
							]
						),

						entityDefns["PortalBlue"].clone().nameAndPropertiesAdd
						(
							"PortalNorth",
							[
								new Locatable(new Location(new Coords(starsystemSizeInPixelsHalf.x, .05 * starsystemSizeInPixels.y))),
								new Portal
								(
									starsystemNamePrefix + starsystemPosNorth.toString(),
									new Coords(starsystemSizeInPixelsHalf.x, .9 * starsystemSizeInPixels.y),
									colors["Blue"]
								),
							]
						),

						entityDefns["PortalViolet"].clone().nameAndPropertiesAdd
						(
							"PortalEast",
							[
								new Locatable(new Location(new Coords(starsystemSizeInPixelsHalf.x, .95 * starsystemSizeInPixels.y))),
								new Portal
								(
									starsystemNamePrefix + starsystemPosSouth.toString(),
									new Coords(starsystemSizeInPixelsHalf.x, .1 * starsystemSizeInPixels.y),
									colors["Violet"]
								),
							]
						),
					]
				);

				var numberOfPlanetsMin = 1;
				var numberOfPlanetsMax = 5;
				var numberOfPlanetsRange = numberOfPlanetsMax - numberOfPlanetsMin;
				var numberOfPlanets =
					numberOfPlanetsMin
					+ Math.floor(Math.random() * numberOfPlanetsRange);

				var entityDefnPlanet = entityDefns["Planet"];

				for (var p = 0; p < numberOfPlanets; p++)
				{
					var pos = new Coords().randomize().multiply(starsystemSizeInPixels).round();
					var entityPlanet = entityDefnPlanet.clone().nameAndPropertiesAdd
					(
						"Planet" + p,
						[
							new Locatable(new Location(pos)),
							new Planet
							(
								nameGenerator.generateNameWithSyllables(2),
								Color.Instances().Orange
							)
						]
					);
					starsystem.entitiesToSpawn.push(entityPlanet);
				}

				var numberOfEnemiesMin = 0;
				var numberOfEnemiesMax = 5;
				var numberOfEnemiesRange = numberOfEnemiesMax - numberOfEnemiesMin;
				var numberOfEnemies =
						numberOfEnemiesMin
						+ Math.floor(Math.random() * numberOfEnemiesRange);

				var entityDefnEnemy = entityDefns["Enemy"];
				for (var e = 0; e < numberOfEnemies; e++)
				{
					var pos = new Coords().randomize().multiply
					(
						starsystemSizeInPixels
					).round();

					var entityEnemy = entityDefnEnemy.clone().nameAndPropertiesAdd
					(
						"Enemy" + e,
						[ new Locatable(new Location(pos)) ]
					);

					starsystem.entitiesToSpawn.push(entityEnemy);
				}

				var numberOfItemCollections = 1;
				var entityDefnItemCollection = entityDefns["ItemCollection"];
				for (var c = 0; c < numberOfItemCollections; c++)
				{
					var pos = new Coords().randomize().multiply
					(
						starsystemSizeInPixels
					).round();

					var entityItemCollection = entityDefnItemCollection.clone().nameAndPropertiesAdd
					(
						"ItemCollection" + c,
						[
							new Locatable(new Location(pos))
						]
					);

					starsystem.entitiesToSpawn.push(entityItemCollection);
				}

				if (starsystemPos.x == 0 && starsystemPos.y == 0)
				{
					var entityPlayer = entityDefns["Player"].clone().nameAndPropertiesAdd
					(
						"Player",
						[
							new Locatable(new Location(new Coords(100, 100)))
						]
					);
					starsystem.entitiesToSpawn.push(entityPlayer);

					// friendlies

					var entityFriendly = entityDefns["Friendly"].clone().nameAndPropertiesAdd
					(
						"Friendly0",
						[ new Locatable(new Location(new Coords(350, 50))) ]
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

		var world = new World
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

			returnValues.addLookupsByName();

			return returnValues;
	}

	world_ActivityDefns()
	{
		var doNothing = new ActivityDefn
		(
			"DoNothing",
			// initialize
			function(universe, world, actor, activity)
			{
				// do nothing
			},
			// perform
			function(universe, world, actor, activity)
			{
				// do nothing
			}
		);

		var moveRandomly = new ActivityDefn
		(
			"MoveRandomly",

			// initialize
			function(universe, world, place, actor, activity) {},

			// perform
			function(universe, world, place, actor, activity)
			{
				var actorLoc = actor.Locatable.loc;
				var actorPos = actorLoc.pos;

				if (activity.target == null)
				{
					var actorStarsystem = actorLoc.venue;
					var starsystemSizeInPixels = actorStarsystem.sizeInPixels;

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

					var moverDefn = actor.MoverDefn;

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
						actor.MoverDefn.force
					);
					actorLoc.force.add(forceToApplyTowardTarget);
				}
			}
		);

		var userInputAccept = new ActivityDefn
		(
			"UserInputAccept",

			function initialize(universe, world, place, actor, activity)
			{},

			function perform(universe, world, place, actor, activity)
			{
				var inputHelper = universe.inputHelper
				var inputsActive = inputHelper.inputsActive();
				var actionsFromActor = actor.ActorDefn.actions;
				var world = universe.world;
				var starsystemCurrent = world.starsystemCurrent;
				var starsystemDefn = starsystemCurrent.defn(world);
				var actionToInputsMappings = starsystemDefn.actionToInputsMappings;

				for (var i = 0; i < inputsActive.length; i++)
				{
					var inputActiveName = inputsActive[i].name;
					if (inputActiveName.startsWith("Mouse") == false)
					{
						var mapping = actionToInputsMappings[inputActiveName];
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

		_all.addLookupsByName();

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
			new Image(imageNamePrefixStar + "00", imageDirectoryStar + "00.png"),
			new Image(imageNamePrefixStar + "01", imageDirectoryStar + "01.png"),
			new Image(imageNamePrefixStar + "02", imageDirectoryStar + "02.png"),
			new Image(imageNamePrefixStar + "03", imageDirectoryStar + "03.png"),
			new Image(imageNamePrefixStar + "04", imageDirectoryStar + "04.png"),
			new Image(imageNamePrefixStar + "05", imageDirectoryStar + "05.png"),
			new Image(imageNamePrefixStar + "06", imageDirectoryStar + "06.png"),
			new Image(imageNamePrefixStar + "07", imageDirectoryStar + "07.png"),
			new Image(imageNamePrefixStar + "08", imageDirectoryStar + "08.png"),
			new Image(imageNamePrefixStar + "09", imageDirectoryStar + "09.png"),
			new Image(imageNamePrefixStar + "10", imageDirectoryStar + "10.png"),
			new Image(imageNamePrefixStar + "11", imageDirectoryStar + "11.png"),
			new Image(imageNamePrefixStar + "12", imageDirectoryStar + "12.png"),
			new Image(imageNamePrefixStar + "13", imageDirectoryStar + "13.png"),
			new Image(imageNamePrefixStar + "14", imageDirectoryStar + "14.png"),
			new Image(imageNamePrefixStar + "15", imageDirectoryStar + "15.png"),
			new Image(imageNamePrefixStar + "16", imageDirectoryStar + "16.png"),
			new Image(imageNamePrefixStar + "17", imageDirectoryStar + "17.png"),
			new Image(imageNamePrefixStar + "18", imageDirectoryStar + "18.png"),
			new Image(imageNamePrefixStar + "19", imageDirectoryStar + "19.png"),
			new Image(imageNamePrefixStar + "20", imageDirectoryStar + "20.png"),
			new Image(imageNamePrefixStar + "21", imageDirectoryStar + "21.png"),
			new Image(imageNamePrefixStar + "22", imageDirectoryStar + "22.png"),
			new Image(imageNamePrefixStar + "23", imageDirectoryStar + "23.png"),
			new Image(imageNamePrefixStar + "24", imageDirectoryStar + "24.png"),
			new Image(imageNamePrefixStar + "25", imageDirectoryStar + "25.png"),
			new Image(imageNamePrefixStar + "26", imageDirectoryStar + "26.png"),
			new Image(imageNamePrefixStar + "27", imageDirectoryStar + "27.png"),
			new Image(imageNamePrefixStar + "28", imageDirectoryStar + "28.png"),
			new Image(imageNamePrefixStar + "29", imageDirectoryStar + "29.png"),
			new Image(imageNamePrefixStar + "30", imageDirectoryStar + "30.png"),
			new Image(imageNamePrefixStar + "31", imageDirectoryStar + "31.png"),
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
			new Image(imageNamePrefixPlanet + "00", imageDirectoryPlanet + "00.png"),
			new Image(imageNamePrefixPlanet + "01", imageDirectoryPlanet + "01.png"),
			new Image(imageNamePrefixPlanet + "02", imageDirectoryPlanet + "02.png"),
			new Image(imageNamePrefixPlanet + "03", imageDirectoryPlanet + "03.png"),
			new Image(imageNamePrefixPlanet + "04", imageDirectoryPlanet + "04.png"),
			new Image(imageNamePrefixPlanet + "05", imageDirectoryPlanet + "05.png"),
			new Image(imageNamePrefixPlanet + "06", imageDirectoryPlanet + "06.png"),
			new Image(imageNamePrefixPlanet + "07", imageDirectoryPlanet + "07.png"),
			new Image(imageNamePrefixPlanet + "08", imageDirectoryPlanet + "08.png"),
			new Image(imageNamePrefixPlanet + "09", imageDirectoryPlanet + "09.png"),
			new Image(imageNamePrefixPlanet + "10", imageDirectoryPlanet + "10.png"),
			new Image(imageNamePrefixPlanet + "11", imageDirectoryPlanet + "11.png"),
			new Image(imageNamePrefixPlanet + "12", imageDirectoryPlanet + "12.png"),
			new Image(imageNamePrefixPlanet + "13", imageDirectoryPlanet + "13.png"),
			new Image(imageNamePrefixPlanet + "14", imageDirectoryPlanet + "14.png"),
			new Image(imageNamePrefixPlanet + "15", imageDirectoryPlanet + "15.png"),
			new Image(imageNamePrefixPlanet + "16", imageDirectoryPlanet + "16.png"),
			new Image(imageNamePrefixPlanet + "17", imageDirectoryPlanet + "17.png"),
			new Image(imageNamePrefixPlanet + "18", imageDirectoryPlanet + "18.png"),
			new Image(imageNamePrefixPlanet + "19", imageDirectoryPlanet + "19.png"),
			new Image(imageNamePrefixPlanet + "20", imageDirectoryPlanet + "20.png"),
			new Image(imageNamePrefixPlanet + "21", imageDirectoryPlanet + "21.png"),
			new Image(imageNamePrefixPlanet + "22", imageDirectoryPlanet + "22.png"),
			new Image(imageNamePrefixPlanet + "23", imageDirectoryPlanet + "23.png"),
			new Image(imageNamePrefixPlanet + "24", imageDirectoryPlanet + "24.png"),
			new Image(imageNamePrefixPlanet + "25", imageDirectoryPlanet + "25.png"),
			new Image(imageNamePrefixPlanet + "26", imageDirectoryPlanet + "26.png"),
			new Image(imageNamePrefixPlanet + "27", imageDirectoryPlanet + "27.png"),
			new Image(imageNamePrefixPlanet + "28", imageDirectoryPlanet + "28.png"),
			new Image(imageNamePrefixPlanet + "29", imageDirectoryPlanet + "29.png"),
			new Image(imageNamePrefixPlanet + "30", imageDirectoryPlanet + "30.png"),
			new Image(imageNamePrefixPlanet + "31", imageDirectoryPlanet + "31.png"),
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
			new Image(imageNamePrefixEnemy + "00", imageDirectoryEnemy + "00.png"),
			new Image(imageNamePrefixEnemy + "01", imageDirectoryEnemy + "01.png"),
			new Image(imageNamePrefixEnemy + "02", imageDirectoryEnemy + "02.png"),
			new Image(imageNamePrefixEnemy + "03", imageDirectoryEnemy + "03.png"),
			new Image(imageNamePrefixEnemy + "04", imageDirectoryEnemy + "04.png"),
			new Image(imageNamePrefixEnemy + "05", imageDirectoryEnemy + "05.png"),
			new Image(imageNamePrefixEnemy + "06", imageDirectoryEnemy + "06.png"),
			new Image(imageNamePrefixEnemy + "07", imageDirectoryEnemy + "07.png"),
			new Image(imageNamePrefixEnemy + "08", imageDirectoryEnemy + "08.png"),
			new Image(imageNamePrefixEnemy + "09", imageDirectoryEnemy + "09.png"),
			new Image(imageNamePrefixEnemy + "10", imageDirectoryEnemy + "10.png"),
			new Image(imageNamePrefixEnemy + "11", imageDirectoryEnemy + "11.png"),
			new Image(imageNamePrefixEnemy + "12", imageDirectoryEnemy + "12.png"),
			new Image(imageNamePrefixEnemy + "13", imageDirectoryEnemy + "13.png"),
			new Image(imageNamePrefixEnemy + "14", imageDirectoryEnemy + "14.png"),
			new Image(imageNamePrefixEnemy + "15", imageDirectoryEnemy + "15.png"),
		]

		mediaLibrary.imagesAdd(imagesEnemy);

		var imageNamePrefixPlayer = "Player";
		var imageDirectoryPlayer = imageDirectory + "Rocket/"

		var imagesForPlayerClockwise =
		[
			new Image(imageNamePrefixPlayer + "00", imageDirectoryPlayer + "00.png"),
			new Image(imageNamePrefixPlayer + "01", imageDirectoryPlayer + "01.png"),
			new Image(imageNamePrefixPlayer + "02", imageDirectoryPlayer + "02.png"),
			new Image(imageNamePrefixPlayer + "03", imageDirectoryPlayer + "03.png"),
			new Image(imageNamePrefixPlayer + "04", imageDirectoryPlayer + "04.png"),
			new Image(imageNamePrefixPlayer + "05", imageDirectoryPlayer + "05.png"),
			new Image(imageNamePrefixPlayer + "06", imageDirectoryPlayer + "06.png"),
			new Image(imageNamePrefixPlayer + "07", imageDirectoryPlayer + "07.png"),
			new Image(imageNamePrefixPlayer + "08", imageDirectoryPlayer + "08.png"),
			new Image(imageNamePrefixPlayer + "09", imageDirectoryPlayer + "09.png"),
			new Image(imageNamePrefixPlayer + "10", imageDirectoryPlayer + "10.png"),
			new Image(imageNamePrefixPlayer + "11", imageDirectoryPlayer + "11.png"),
			new Image(imageNamePrefixPlayer + "12", imageDirectoryPlayer + "12.png"),
			new Image(imageNamePrefixPlayer + "13", imageDirectoryPlayer + "13.png"),
			new Image(imageNamePrefixPlayer + "14", imageDirectoryPlayer + "14.png"),
			new Image(imageNamePrefixPlayer + "15", imageDirectoryPlayer + "15.png"),
		];

		mediaLibrary.imagesAdd(imagesForPlayerClockwise);

		var ticksPerAnimationFrame = 2;

		var camera = new Camera
		(
			universe.display.sizesAvailable[0], // viewSize
			1, // focalLength
			new Location(new Coords(0, 0, 0))
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
				new BodyDefn(itemSizeInPixels), // sizeInPixels
				new Collidable
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
							ticksPerAnimationFrame,
							VisualImageScaled.manyFromSizeAndVisuals
							(
								itemSizeInPixels,
								VisualImageImmediate.manyFromImages(imagesForItemCollection)
							)
						)
					)
				),
				new ItemCollection(),
				new ItemContainer([ new Item("Fuel", 100) ]), // hack
				new Killable(1), // integrityMax
			]
		);

		var projectileSizeInPixels = new Coords(3, 3, 1);

		var entityDefnProjectile = new Entity
		(
			"Projectile",

			// properties
			[
				new Killable(1), // integrityMax
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
				new ProjectileDefn(),
				new Collidable
				(
					new Box(new Coords(0, 0, 0), projectileSizeInPixels),
					[ Enemy.name ],
					function collide(world, entityThis, entityOther)
					{
						var enemy = entityOther.Enemy;
						if (enemy != null)
						{
							entityOther.Killable.integrity -= entityThis.Projectile.damage;
							entityThis.Killable.integrity = 0;
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
				new BodyDefn(planetSizeInPixels),
				new Collidable
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
								ticksPerAnimationFrame * 8,
								VisualImageScaled.manyFromSizeAndVisuals
								(
									planetSizeInPixels,
									VisualImageImmediate.manyFromImages(imagesForPlanet, planetSizeInPixels)
								)
							),
							new VisualOffset
							(
								new VisualText
								(
									new DataSourceEntity
									(
										function(universe, world, display, entity)
										{
											return entity.Planet.name;
										}
									),
									"White", "Black"
								),
								new Coords(0, 20, 0)
							),
							new VisualOffset
							(
								new VisualText
								(
									new DataSourceEntity
									(
										function(universe, world, display, entity)
										{
											return entity.Planet.itemTradeOffer.toString(universe, world);
										}
									),
									"White", "Black"
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
					new BodyDefn(portalSizeInPixels), // sizeInPixels
					new Collidable
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
								ticksPerAnimationFrame,
								VisualImageScaled.manyFromSizeAndVisuals
								(
									portalSizeInPixels,
									VisualImageImmediate.manyFromImages(imagesForPortal)
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
								ticksPerAnimationFrame,
								VisualImageScaled.manyFromSizeAndVisuals
								(
									sunSizeInPixels,
									VisualImageImmediate.manyFromImages(imagesForSun)
								)
							),
							new VisualOffset
							(
								new VisualText
								(
									new DataSourceEntity
									(
										function(universe, world, display, entity)
										{
											return entity.Star.name;
										}
									),
									"White", "Black"
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
				new Killable(1), // integrityMax
				new BodyDefn(friendlySizeInPixels), // sizeInPixels
				new MoverDefn(1, 1, 4), // mass, forcePerTick, speedMax
				new ActorDefn("DoNothing"),
				new Drawable
				(
					new VisualCameraProjection
					(
						camera,
						new VisualAnimation
						(
							null, // name
							ticksPerAnimationFrame,
							VisualImageScaled.manyFromSizeAndVisuals
							(
								friendlySizeInPixels,
								VisualImageImmediate.manyFromImages(imagesFriendly)
							)
						)
					)
				),
				new FriendlyDefn(),
			]
		);

		var enemySize = new Coords(32, 32, 1);

		var entityDefnEnemy = new Entity
		(
			"Enemy",
			[
				new ActorDefn("MoveRandomly"),
				new BodyDefn(enemySize),
				new Collidable
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
							1, // ticksPerAnimationFrame,
							VisualImageScaled.manyFromSizeAndVisuals
							(
								enemySize,
								VisualImageImmediate.manyFromImages(imagesEnemy, enemySize)
							)
						)
					)
				),
				new Killable(1), // integrityMax
				new Enemy(),
				new MoverDefn(1, 1, 2), // mass, forcePerTick, speedMax
			]
		);

		var playerCollide = (universe, world, entityThis, entityOther) =>
		{
			//return; // hack - Currently colliding with everything all the time.

			var player = entityThis;
			var starsystem = player.Locatable.loc.venue;

			if (entityOther.ItemCollection != null)
			{
				var itemCollection = entityOther;
				starsystem.entitiesToRemove.push(itemCollection);
				var itemsToTransfer = itemCollection.ItemContainer.items;
				player.ItemContainer.itemsAdd(itemsToTransfer);
			}
			else if (entityOther.Enemy != null)
			{
				player.Killable.integrity = 0;

				var venueMessage = new VenueMessage
				(
					"You lose!",
					universe.venueCurrent, // venuePrev
					universe.display.sizeDefault().clone().half(),
					function acknowledge(universe)
					{
						universe.venueNext = new VenueFader
						(
							new VenueControls(universe.controlBuilder.title(universe))
						);
					}
				);
				universe.venueNext = venueMessage;
			}
			else if (entityOther.Planet != null)
			{
				var planet = entityOther;
				var itemTradeOffer = planet.Planet.itemTradeOffer;
				if (itemTradeOffer != null)
				{
					itemTradeOffer.trade(universe, world, player, planet);
				}
			}
			else if (entityOther.Portal != null)
			{
				starsystem.entitiesToRemove.push(player);

				var portal = entityOther.Portal;

				var itemFuel = player.ItemContainer.items["Fuel"];
				var fuelUsedByPortal = 1000;
				if (itemFuel.quantity >= fuelUsedByPortal)
				{
					itemFuel.quantity -= fuelUsedByPortal;

					var destinationStarsystemName = portal.destinationStarsystemName;
					var starsystems = world.starsystems;
					var destinationStarsystem = starsystems[destinationStarsystemName];

					destinationStarsystem.entitiesToSpawn.push(player);
					entityThis.Locatable.loc.pos.overwriteWith(portal.destinationPos);
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
				new Collidable
				(
					new Box( new Coords(0, 0, 0), playerSizeInPixels),
					[ ItemCollection.name, Enemy.name, Planet.name, Portal.name ],
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
								VisualImageImmediate.manyFromImages
								(
									imagesForPlayerClockwise, playerSizeInPixels
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
				new Killable(1), // integrityMax
				new MoverDefn(1, 2, 8), // mass, forcePerTick, speedMax
				new Player(),
				new ControllableDefn
				(
					// buildControlForEntity
					function(entity)
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
								new DataSourceEntity
								(
									function(entity)
									{
										var returnValue =
											"HP: "
											+ entity.Killable.integrity
											+ " / "
											+ entity.Killable.integrityMax;

										return returnValue;
									}
								)
							),

							new ControlText
							(
								"textLoc",
								entity,
								new Coords(1, 3).multiplyScalar(gridSpacing), // pos
								new DataSourceEntity
								(
									function(entity) { return entity.Locatable.loc.toString(); }
								)
							),
						];

						var items = entity.ItemContainer.items;

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
								new DataSourceEntity
								(
									function(item)
									{
										var returnValue =
											item.defnName + ": "
											+ item.quantity;

										return returnValue;
									}
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

		entityDefns.addLookupsByName();

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

	constrain(universe, world, place, entity)
	{
		var entityLoc = entity.Locatable.loc;
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

	constrain(universe, world, place, entity)
	{
		var entityToFollow = place.entities[this.entityToFollowName];
		if (entityToFollow != null) // hack
		{
			entity.Locatable.loc.pos.overwriteWith
			(
				entityToFollow.Locatable.loc.pos
			);
		}
	}
}

