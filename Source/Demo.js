
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
					var entityDefnProjectile = world.entityDefns["Projectile"];

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
								new PortalData
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
								new PortalData
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
								new PortalData
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
								new PortalData
								(
									starsystemNamePrefix + starsystemPosSouth.toString(),
									new Coords(starsystemSizeInPixelsHalf.x, .1 * starsystemSizeInPixels.y),
									colors["Violet"]
								),
							]
						),
					]
				);

				var numberOfPlanetsMin = 0;
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

		var world = new World
		(
			"WorldGrid" + sizeInStarsystems.toString(),
			colors,
			itemDefns,
			actions,
			activityDefns,
			constraintDefns,
			entityDefns,
			starsystemDefns, 
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
			function(universe, activity) 
			{
				// do nothing
			},
			// perform 
			function(universe, activity)
			{
				// do nothing
			}
		);

		var moveRandomly = new ActivityDefn
		(
			"MoveRandomly",

			// initialize
			function(universe, activity) {},

			// perform 
			function(universe, activity)
			{
				var actor = activity.actor;
				var actorLoc = actor.body.loc;
				var actorPos = actorLoc.pos;

				if (activity.vars.target == null)
				{
					var actorStarsystem = actorLoc.venue;
					var starsystemSizeInPixels = actorStarsystem.sizeInPixels;

					var newTarget = new Coords
					(
						Math.floor(Math.random() * starsystemSizeInPixels.x), 
						Math.floor(Math.random() * starsystemSizeInPixels.y)
					);

					activity.vars.target = newTarget;
				}

				var target = activity.vars.target;

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
					activity.vars.target = null;
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
			function(universe, activity) 
			{},

			// perform 
			function(universe, activity)
			{
				var inputHelper = universe.inputHelper
				var inputsActive = inputHelper.inputsActive;
				var actionsFromActor = activity.actor.actions;
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
			function constrain(universe, world, place, entity, target)
			{
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
			function constrain(universe, world, place, entity, target)
			{
				var starsystem = entity.body.loc.venue;
				var nameOfEntityToFollow = target;
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

		var mediaLibrary = universe.mediaLibrary;
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

		mediaLibrary.imagesAdd(imagesForSun);

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

		mediaLibrary.imagesAdd([imagePlanet]);

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

		mediaLibrary.imagesAdd(imagesEnemy);

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

		mediaLibrary.imagesAdd(imagesForPlayerClockwise);

		var ticksPerAnimationFrame = 2;

		var entityDefnCamera = new EntityDefn
		(
			"Camera",
			// properties
			[
				new CameraDefn(),
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
					new VisualAnimation(ticksPerAnimationFrame, VisualImage.manyFromImages(imagesForItemCollection)),
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
					new VisualImage(imageMoverProjectile.name),
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

		var entityDefnPlanet = new EntityDefn
		(
			"Planet",
			[
				new BodyDefn(new Coords(16, 16, 1)), // sizeInPixels
				new CollidableDefn([], function() {}),
				new DrawableDefn
				(
					new VisualImage(imagePlanet.name),
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
						new VisualAnimation(ticksPerAnimationFrame, VisualImage.manyFromImages(imagesForPortal)),
					),
					new PortalDefn(),
				]
			);

			entityDefnsPortal.push(entityDefnPortal);
		}

		var entityDefnSun = new EntityDefn
		(
			"Sun",
			[
				new BodyDefn(new Coords(20, 20, 1)), // sizeInPixels
				new DrawableDefn
				(
					new VisualAnimation(ticksPerAnimationFrame, VisualImage.manyFromImages(imagesForSun))
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
					new VisualAnimation(ticksPerAnimationFrame, VisualImage.manyFromImages(imagesFriendly))
				),
				new FriendlyDefn(),
			]
		);

		var entityDefnEnemy = new EntityDefn
		(
			"Enemy", 
			[
				new ActorDefn("MoveRandomly"),
				new BodyDefn(new Coords(16, 9, 1)), // sizeInPixels
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
					new VisualAnimation(ticksPerAnimationFrame, VisualImage.manyFromImages(imagesEnemy))
				),
				new KillableDefn(1), // integrityMax
				new EnemyDefn(),
				new MoverDefn(1, 1, 2), // mass, forcePerTick, speedMax
			]
		);

		var playerCollide = function(world, entityThis, entityOther)
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
					itemTradeOffer.trade(world, player, planet);
				}
			}
			else if (entityOtherProperties["Portal"] != null)
			{
				var portal = entityOther;

				starsystem.entitiesToRemove.push(player);

				var portalData = portal.portal;

				var itemFuel = player.itemContainer.items["Fuel"];
				var fuelUsedByPortal = 1000;
				if (itemFuel.quantity >= fuelUsedByPortal)
				{
					itemFuel.quantity -= fuelUsedByPortal;

					var destinationStarsystemName = portalData.destinationStarsystemName;
					var starsystems = world.starsystems;
					var destinationStarsystem = starsystems[destinationStarsystemName];

					destinationStarsystem.entitiesToSpawn.push(player);
					entityThis.body.loc.pos.overwriteWith(portalData.destinationPos);
					universe.world.starsystemNext = destinationStarsystem;
				}
			}
		}

		var gridSpacing = 8;

		var entityDefnPlayer = new EntityDefn
		(
			"Player", 
			[
				new ActorDefn("UserInputAccept"),
				new BodyDefn(new Coords(9, 9, 1)), // sizeInPixels
				new CollidableDefn
				(
					[ "ItemCollection", "Enemy", "Planet", "Portal" ],
					playerCollide
				),
				new ConstrainableDefn(),
				new DrawableDefn
				(
					new VisualDirectional
					(
						new VisualNone(),
						VisualImage.manyFromImages(imagesForPlayerClockwise)
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
