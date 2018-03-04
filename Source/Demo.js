
function Demo()
{
	// do nothing
}

{
	Demo.prototype.actions = function()
	{
		var accelerate = new Action
		(
			"Accelerate",
			function perform(world, actor)
			{
				var fuelUsedByAcceleration = 1;
				var itemFuel = actor.itemContainer.items["Fuel"];

				if (itemFuel.quantity >= fuelUsedByAcceleration)
				{
					itemFuel.quantity -= fuelUsedByAcceleration;

					var actorLoc = actor.body.loc;
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
				var itemFuel = actor.itemContainer.items["Fuel"];
				var fuelConsumed = 10;
				if (itemFuel.quantity >= fuelConsumed)
				{
					itemFuel.quantity -= fuelConsumed;

					var venue = actor.body.loc.venue;
					var entityDefnProjectile = world.defns.entityDefns["Projectile"];

					var entityToSpawn = new Entity
					(
						"[projectile]",
						entityDefnProjectile.name,
						[
							new Body(actor.body.loc.clone())
						]
					);

					var forward = actor.body.loc.orientation.forward;
					entityToSpawn.body.loc.vel = forward.clone().normalize().multiplyScalar
					(
						entityDefnProjectile.mover.speedMax
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
				var actorLoc = actor.body.loc;
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
				var actorLoc = actor.body.loc;
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


	Demo.prototype.worldGrid = function(universe, sizeInStarsystems)
	{
		if (sizeInStarsystems == null)
		{
			sizeInStarsystems = new Coords(10, 10, 1);
		}

		var nameGenerator = new NameGenerator();

		var itemDefns = this.world_ItemDefns();

		var actions = this.actions();

		var activityDefns = this.world_ActivityDefns();

		var colors = Color.Instances._All;

		var constraintDefns = this.world_ConstraintDefns();

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
						new Entity
						(
							"Background",
							entityDefns["Background"].name,
							[
								new Body( new Location( new Coords(0, 0, 0) ) ),
							]
						),

						// sun
						new Entity
						(
							"Sun",
							entityDefns["Sun"].name,
							[
								new Body(new Location(starsystemSizeInPixelsHalf.clone())),
								new Star
								(
									new NameGenerator().generateNameWithSyllables(3),
									null // color
								),
							]
						),

						// portals

						new Entity
						(
							"PortalWest",
							entityDefns["PortalRed"].name,
							[
								new Body(new Location(new Coords(.05 * starsystemSizeInPixels.x, starsystemSizeInPixelsHalf.y))),
								new Portal
								(
									starsystemNamePrefix + starsystemPosWest.toString(),
									new Coords(.9 * starsystemSizeInPixels.x, starsystemSizeInPixelsHalf.y),
									colors["Red"]
								),
							]
						),

						new Entity
						(
							"PortalEast",
							entityDefns["PortalGreen"].name,
							[
								new Body(new Location(new Coords(.95 * starsystemSizeInPixels.x, starsystemSizeInPixelsHalf.y))),
								new Portal
								(
									starsystemNamePrefix + starsystemPosEast.toString(),
									new Coords(.1 * starsystemSizeInPixels.x, starsystemSizeInPixelsHalf.y),
									colors["Green"]
								),
							]
						),

						new Entity
						(
							"PortalNorth",
							entityDefns["PortalBlue"].name,
							[
								new Body(new Location(new Coords(starsystemSizeInPixelsHalf.x, .05 * starsystemSizeInPixels.y))),
								new Portal
								(
									starsystemNamePrefix + starsystemPosNorth.toString(),
									new Coords(starsystemSizeInPixelsHalf.x, .9 * starsystemSizeInPixels.y),
									colors["Blue"]
								),
							]
						),

						new Entity
						(
							"PortalEast",
							entityDefns["PortalViolet"].name,
							[
								new Body(new Location(new Coords(starsystemSizeInPixelsHalf.x, .95 * starsystemSizeInPixels.y))),
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

				for (var p = 0; p < numberOfPlanets; p++)
				{
					var pos = new Coords().randomize().multiply(starsystemSizeInPixels).round();
					var entityPlanet = new Entity
					(
						"Planet" + p,
						entityDefns["Planet"].name,
						[
							new Body(new Location(pos)),
							new Planet
							(
								nameGenerator.generateNameWithSyllables(2),
								Color.Instances.Orange
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

				for (var e = 0; e < numberOfEnemies; e++)
				{
					var pos = new Coords().randomize().multiply
					(
						starsystemSizeInPixels
					).round();

					var entityEnemy = new Entity
					(
						"Enemy" + e,
						entityDefns["Enemy"].name,
						[ new Body(new Location(pos)) ]
					);

					starsystem.entitiesToSpawn.push(entityEnemy);
				}

				var numberOfItemCollections = 1;
				for (var c = 0; c < numberOfItemCollections; c++)
				{
					var pos = new Coords().randomize().multiply
					(
						starsystemSizeInPixels
					).round();

					var entityItemCollection = new Entity
					(
						"ItemCollection" + c,
						entityDefns["ItemCollection"].name,
						[
							new Body(new Location(pos))
						]
					);

					starsystem.entitiesToSpawn.push(entityItemCollection);
				}

				if (starsystemPos.x == 0 && starsystemPos.y == 0)
				{
					var entityPlayer = new Entity
					(
						"Player",
						entityDefns["Player"].name,
						[
							new Body(new Location(new Coords(100, 100))),
							new Constrainable([]),
						]
					);
					starsystem.entitiesToSpawn.push(entityPlayer);

					// friendlies

					var entityFriendly = new Entity
					(
						"Friendly0",
						entityDefns["Friendly"].name,
						[ new Body(new Location(new Coords(350, 50))) ]
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
			constraintDefns,
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

	Demo.prototype.world_ItemDefns = function()
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

			returnValues.addLookups("name");

			return returnValues;
	}

	Demo.prototype.world_ActivityDefns = function()
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
				var actorLoc = actor.body.loc;
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

					var moverDefn = actor.defn(universe.world).mover;

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
						actor.defn(universe.world).mover.force
					);
					actorLoc.force.add(forceToApplyTowardTarget);
				}
			}
		);

		var userInputAccept = new ActivityDefn
		(
			"UserInputAccept",

			// initialize
			function(universe, world, place, actor, activity)
			{},

			// perform
			function(universe, world, place, actor, activity)
			{
				var inputHelper = universe.inputHelper
				var inputsActive = inputHelper.inputsActive;
				var actionsFromActor = actor.actions;
				var world = universe.world;
				var starsystemCurrent = world.starsystemCurrent;
				var starsystemDefn = starsystemCurrent.defn(world);
				var inputToActionMappings = starsystemDefn.inputToActionMappings;

				for (var i = 0; i < inputsActive.length; i++)
				{
					var inputActive = inputsActive[i];
					var mapping = inputToActionMappings[inputActive];
					if (mapping != null)
					{
						var action = mapping.action(universe);
						actionsFromActor.push(action);
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

		_all.addLookups("name");

		return _all;
	}

	Demo.prototype.world_ConstraintDefns = function()
	{
		var conformToBounds = new ConstraintDefn
		(
			"ConformToBounds",
			function constrain(universe, world, place, entity, constraint)
			{
				var target = constraint.target;
				var entityLoc = entity.body.loc;
				var boundsToConformTo = target;
				entityLoc.pos.trimToRangeMinMax
				(
					boundsToConformTo.min(),
					boundsToConformTo.max()
				);
			}
		);

		var followEntityByName = new ConstraintDefn
		(
			"FollowEntityByName",
			function constrain(universe, world, place, entity, constraint)
			{
				var starsystem = entity.body.loc.venue;
				var nameOfEntityToFollow = constraint.target;
				var entityToFollow = starsystem.entities[nameOfEntityToFollow];
				if (entityToFollow != null) // hack
				{
					entity.body.loc.pos.overwriteWith
					(
						entityToFollow.body.loc.pos
					);
				}
			}
		);

		var _all =
		[
			conformToBounds,
			followEntityByName,
		];

		return _all;

	}

	Demo.prototype.world_EntityDefns = function(universe)
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

		var imageDirectory = "../Media/Images/";

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

		/*
		var imagesForPlayerClockwise = imageHelper.buildImagesFromStringArrays
		("Player", [
			[
				".................",
				".....b...........",
				".....bb..........",
				".....b.b.........",
				".....b..b........",
				".....b...b.......",
				".....b....b......",
				".....b.....b.....",
				".....b......b....",
				".....b.....b.....",
				".....b....b......",
				".....b...b.......",
				".....b..b........",
				".....b.b.........",
				".....bb..........",
				".....b...........",
				".................",
			],
			[
				".................",
				".................",
				".................",
				"............b....",
				"...........bb....",
				"..........b.b....",
				".........b..b....",
				"........b...b....",
				".......b....b....",
				"......b.....b....",
				".....b......b....",
				"....b.......b....",
				"...bbbbbbbbbb....",
				".................",
				".................",
				".................",
				".................",
			],
			[
				".................",
				".................",
				".................",
				".................",
				".................",
				".bbbbbbbbbbbbbbb.",
				"..b...........b..",
				"...b.........b...",
				"....b.......b....",
				".....b.....b.....",
				"......b...b......",
				".......b.b.......",
				"........b........",
				".................",
				".................",
				".................",
				".................",
			],
			[
				".................",
				".................",
				".................",
				"....b............",
				"....bb...........",
				"....b.b..........",
				"....b..b.........",
				"....b...b........",
				"....b....b.......",
				"....b.....b......",
				"....b......b.....",
				"....b.......b....",
				"....bbbbbbbbbb...",
				".................",
				".................",
				".................",
				".................",
			],
			[
				".................",
				"...........b.....",
				"..........bb.....",
				".........b.b.....",
				"........b..b.....",
				".......b...b.....",
				"......b....b.....",
				".....b.....b.....",
				"....b......b.....",
				".....b.....b.....",
				"......b....b.....",
				".......b...b......",
				"........b..b.....",
				".........b.b.....",
				"..........bb.....",
				"...........b.....",
				".................",
			],
			[
				".................",
				".................",
				".................",
				".................",
				"....bbbbbbbbbb...",
				"....b.......b....",
				"....b......b.....",
				"....b.....b......",
				"....b....b.......",
				"....b...b........",
				"....b..b.........",
				"....b.b..........",
				"....bb...........",
				"....b............",
				".................",
				".................",
				".................",
			],
			[
				".................",
				".................",
				".................",
				".................",
				"........b........",
				".......b.b.......",
				"......b...b......",
				".....b.....b.....",
				"....b.......b....",
				"...b.........b...",
				"..b...........b..",
				".bbbbbbbbbbbbbbb.",
				".................",
				".................",
				".................",
				".................",
				".................",
			],
			[
				".................",
				".................",
				".................",
				".................",
				"...bbbbbbbbbb....",
				"....b.......b....",
				".....b......b....",
				"......b.....b....",
				".......b....b....",
				"........b...b....",
				".........b..b....",
				"..........b.b....",
				"...........bb....",
				"............b....",
				".................",
				".................",
				".................",
			],
		]);
		*/

		var imageNamePrefixPlayer = "Player";
		var imageDirectoryPlayer = imageDirectory + "Rocket/"

		imagesForPlayerClockwise =
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

		var entityDefnCamera = new EntityDefn
		(
			"Camera",
			// properties
			[
				new CameraDefn(camera),
				new ConstrainableDefn(),
			]
		);

		var entityDefnItemCollection = new EntityDefn
		(
			"ItemCollection",

			// properties
			[
				new BodyDefn(new Coords(3, 3, 1)), // sizeInPixels
				new CollidableDefn
				(
					[], // entityDefnNameToCollideWith
					function() {} // collide
				),
				new DrawableDefn
				(
					new VisualCameraProjection
					(
						camera,
						new VisualAnimation
						(
							ticksPerAnimationFrame,
							VisualImage.manyFromImages(imagesForItemCollection)
						)
					)
				),
				new ItemCollectionDefn(),
				new ItemContainerDefn([ new Item("Fuel", 100) ]), // hack
				new KillableDefn(1), // integrityMax
			]
		);

		var entityDefnProjectile = new EntityDefn
		(
			"Projectile",

			// properties
			[
				new KillableDefn(1), // integrityMax
				new EphemeralDefn(16), // ticksToLive
				new BodyDefn(new Coords(3, 3, 1)), // sizeInPixels
				new MoverDefn(1, 1, 16), // mass, force, speedMax
				new DrawableDefn
				(
					new VisualCameraProjection
					(
						camera,
						new VisualImage(imageMoverProjectile.name)
					),
				),
				new ProjectileDefn(),
				new CollidableDefn
				(
					[ "Enemy" ],
					// collide
					function(world, entityThis, entityOther)
					{
						var entityOtherProperties = entityOther.defn().properties;
						if (entityOtherProperties["Enemy"] != null)
						{
							entityOther.killable.integrity -= entityThis.defn(world).projectile.damage;
							entityThis.killable.integrity = 0;
						}
					}
				),
			]
		);

		var planetSizeInPixels = new Coords(32, 32, 1);

		var entityDefnPlanet = new EntityDefn
		(
			"Planet",
			[
				new BodyDefn(planetSizeInPixels),
				new CollidableDefn([], function() {}),
				new DrawableDefn
				(
					new VisualCameraProjection
					(
						camera,
						new VisualGroup
						([
							new VisualAnimation
							(
								ticksPerAnimationFrame * 8,
								VisualImage.manyFromImages(imagesForPlanet, planetSizeInPixels)
							),
							new VisualOffset
							(
								new VisualText
								(
									new DataSourceEntity
									(
										function(universe, world, display, entity)
										{
											return entity.planet.name;
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
											return entity.planet.itemTradeOffer.toString(universe, world);
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

		var colorsAll = Color.Instances._All;

		var entityDefnsPortal = [];

		var portalColorNames = [ "Red", "Green", "Blue", "Violet" ];
		for (var c = 0; c < portalColorNames.length; c++)
		{
			var colorName = portalColorNames[c];
			var color = colorsAll[colorName];
			var entityDefnName = "Portal" + colorName;

			var entityDefnPortal = new EntityDefn
			(
				entityDefnName,
				[
					new BodyDefn(new Coords(19, 19, 1)), // sizeInPixels
					new CollidableDefn([], function() {}),
					new DrawableDefn
					(
						new VisualCameraProjection
						(
							camera,
							new VisualAnimation
							(
								ticksPerAnimationFrame,
								VisualImage.manyFromImages(imagesForPortal)
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
		var visualImageBackgroundLayer0 = new VisualImage("BackgroundLayer0");

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
		var visualImageBackgroundLayer1 = new VisualImage("BackgroundLayer1");

		var backgroundViewSize = new Coords(400, 300, 1);
		var backgroundCellSizeMultiplier = 1.5;
		var backgroundCellSize = new Coords
		(
			backgroundViewSize.x * backgroundCellSizeMultiplier,
			backgroundViewSize.x * backgroundCellSizeMultiplier, // x, not y
			1
		);

		var entityDefnBackground = new EntityDefn
		(
			"Background",
			[
				new DrawableDefn
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

		var entityDefnSun = new EntityDefn
		(
			"Sun",
			[
				new BodyDefn(new Coords(20, 20, 1)), // sizeInPixels
				new DrawableDefn
				(
					new VisualCameraProjection
					(
						camera,
						new VisualGroup
						([
							new VisualAnimation
							(
								ticksPerAnimationFrame,
								VisualImage.manyFromImages(imagesForSun)
							),
							new VisualOffset
							(
								new VisualText
								(
									new DataSourceEntity
									(
										function(universe, world, display, entity)
										{
											return entity.star.name;
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

		var entityDefnFriendly = new EntityDefn
		(
			"Friendly",
			[
				new KillableDefn(1), // integrityMax
				new BodyDefn(new Coords(16, 9, 1)), // sizeInPixels
				new MoverDefn(1, 1, 4), // mass, forcePerTick, speedMax
				new ActorDefn("DoNothing"),
				new DrawableDefn
				(
					new VisualCameraProjection
					(
						camera,
						new VisualAnimation
						(
							ticksPerAnimationFrame,
							VisualImage.manyFromImages(imagesFriendly)
						)
					)
				),
				new FriendlyDefn(),
			]
		);

		var enemySize = new Coords(32, 32, 1);

		var entityDefnEnemy = new EntityDefn
		(
			"Enemy",
			[
				new ActorDefn("MoveRandomly"),
				new BodyDefn(enemySize),
				new CollidableDefn
				(
					[ "Player" ],
					// collide
					function (entityThis, entityOther)
					{
						// do nothing
					}
				),
				new DrawableDefn
				(
					new VisualCameraProjection
					(
						camera,
						new VisualAnimation
						(
							1, // ticksPerAnimationFrame,
							VisualImage.manyFromImages(imagesEnemy, enemySize)
						)
					)
				),
				new KillableDefn(1), // integrityMax
				new EnemyDefn(),
				new MoverDefn(1, 1, 2), // mass, forcePerTick, speedMax
			]
		);

		var playerCollide = function(universe, world, entityThis, entityOther)
		{
			var player = entityThis;
			var starsystem = player.body.loc.venue;
			var entityOtherProperties = entityOther.defn(world).properties;

			if (entityOtherProperties["ItemCollection"] != null)
			{
				var itemCollection = entityOther;
				starsystem.entitiesToRemove.push(itemCollection);
				var itemsToTransfer = itemCollection.itemContainer.items;
				player.itemContainer.itemsAdd(itemsToTransfer);
			}
			else if (entityOtherProperties["Enemy"] != null)
			{
				player.killable.integrity = 0;

				/*
				starsystem.entitiesToSpawn.push
				(
					Globals.Instance.universe.world.font.buildEntityForText
					(
						"You lose!",
						entityThis.body.loc.pos.clone(),
						true // isFloater
					)
				);
				*/
				// hack
				alert("You lose!");
			}
			else if (entityOtherProperties["Planet"] != null)
			{
				var planet = entityOther;
				var itemTradeOffer = planet.planet.itemTradeOffer;
				if (itemTradeOffer != null)
				{
					itemTradeOffer.trade(universe, world, player, planet);
				}
			}
			else if (entityOtherProperties["Portal"] != null)
			{
				var portal = entityOther;

				starsystem.entitiesToRemove.push(player);

				var portal = portal.portal;

				var itemFuel = player.itemContainer.items["Fuel"];
				var fuelUsedByPortal = 1000;
				if (itemFuel.quantity >= fuelUsedByPortal)
				{
					itemFuel.quantity -= fuelUsedByPortal;

					var destinationStarsystemName = portal.destinationStarsystemName;
					var starsystems = world.starsystems;
					var destinationStarsystem = starsystems[destinationStarsystemName];

					destinationStarsystem.entitiesToSpawn.push(player);
					entityThis.body.loc.pos.overwriteWith(portal.destinationPos);
					universe.world.starsystemNext = destinationStarsystem;
				}
			}
		}

		var gridSpacing = 8;

		var playerSizeInPixels = new Coords(32, 32, 1);

		var entityDefnPlayer = new EntityDefn
		(
			"Player",
			[
				new ActorDefn("UserInputAccept"),
				new BodyDefn(playerSizeInPixels),
				new CollidableDefn
				(
					[ "ItemCollection", "Enemy", "Planet", "Portal" ],
					playerCollide
				),
				new ConstrainableDefn(),
				new DrawableDefn
				(
					new VisualCameraProjection
					(
						camera,
						new VisualDirectional
						(
							new VisualNone(),
							VisualImage.manyFromImages
							(
								imagesForPlayerClockwise, playerSizeInPixels
							)
						)
					)
				),
				new ItemContainerDefn
				([
					new Item("Crew", 3),
					new Item("Food", 100000),
					new Item("Fuel", 100000),
				]),
				new KillableDefn(1), // integrityMax
				new MoverDefn(1, 2, 8), // mass, forcePerTick, speedMax
				new PlayerDefn(),

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
											+ entity.killable.integrity
											+ " / "
											+ entity.defn().killable.integrityMax;

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
									function(entity) { return entity.body.loc.toString(); }
								)
							),
						];

						var items = entity.itemContainer.items;

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

		entityDefns.addLookups("name");

		return entityDefns;
	}

	Demo.prototype.world_StarsystemDefns = function()
	{
		var starsystemDefns =
		[
			new StarsystemDefn
			(
				"StarsystemDefn0",
				[
					new InputToActionMapping("_w", "Accelerate", false),
					new InputToActionMapping("_a", "TurnLeft", false),
					new InputToActionMapping("_d", "TurnRight", false),
					new InputToActionMapping("_f", "Fire", true),
				]
			),
		];

		return starsystemDefns;
	}
}
