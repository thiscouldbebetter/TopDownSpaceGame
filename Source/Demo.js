
function Demo()
{
	// do nothing
}

{
	Demo.prototype.font = function()
	{
		var characterSize = new Coords(5, 5);
		var charactersAvailable = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 !>/";		
		var characterImages = new ImageHelper().buildImagesFromStringArrays
		("Font", [
			[
				".aaa.",
				"a...a",
				"aaaaa",
				"a...a",
				"a...a",
			],
			[
				"aaaa.",
				"a...a",
				"aaaa.",
				"a...a",
				"aaaa.",
			],
			[
				".aaaa",
				"a....",
				"a....",
				"a....",
				".aaaa",
			],
			[
				"aaaa.",
				"a...a",
				"a...a",
				"a...a",
				"aaaa.",
			],
			[
				"aaaaa",
				"a....",
				"aaaa.",
				"a....",
				"aaaaa",
			],
			[
				"aaaaa",
				"a....",
				"aaaa.",
				"a....",
				"a....",
			],
			[
				".aaaa",
				"a....",
				"a..aa",
				"a...a",
				".aaaa",
			],
			[
				"a...a",
				"a...a",
				"aaaaa",
				"a...a",
				"a...a",
			],
			[
				"aaaaa",
				"..a..",
				"..a..",
				"..a..",
				"aaaaa",
			],
			[
				".aaaaa",
				"....a.",
				"....a.",
				".a..a.",
				"..aa..",
			],
			[
				"a...a",
				"a..a.",
				"aaa..",
				"a..a.",
				"a...a",
			],
			[
				"a....",
				"a....",
				"a....",
				"a....",
				"aaaaa",
			],
			[
				"a...a",
				"aa.aa",
				"a.a.a",
				"a...a",
				"a...a",
			],
			[
				"a...a",
				"aa..a",
				"a.a.a",
				"a..aa",
				"a...a",
			],
			[
				".aaa.",
				"a...a",
				"a...a",
				"a...a",
				".aaa.",
			],
			[
				"aaaa.",
				"a...a",
				"aaaa.",
				"a....",
				"a.....",
			],
			[
				".aaa.",
				"a...a",
				"a...a",
				".aaa.",
				"..a..",
			],
			[
				"aaaa.",
				"a...a",
				"aaaa.",
				"a..a.",
				"a...a",
			],
			[
				".aaaa",
				"a....",
				".aaa.",
				"....a",
				"aaaa.",
			],
			[
				"aaaaa",
				"..a..",
				"..a..",
				"..a..",
				"..a..",
			],
			[
				"a...a",
				"a...a",
				"a...a",
				"a...a",
				".aaa.",
			],
			[
				"a...a",
				"a...a",
				".a.a.",
				".a.a.",
				"..a..",
			],
			[
				"a...a",
				"a...a",
				"a.a.a",
				"aa.aa",
				"a...a",
			],
			[
				"a...a",
				".a.a.",
				"..a..",
				".a.a.",
				"a...a",
			],
			[
				"a...a",
				".a.a.",
				"..a..",
				"..a..",
				"..a..",
			],
			[
				"aaaaa",
				"...a.",
				"..a..",
				".a...",
				"aaaaa",
			],

			// numeaals

			[
				".aaa.",
				"a...a",
				"a...a",
				"a...a",
				".aaa.",
			],
			[
				"..a..",
				".aa..",
				"..a..",
				"..a..",
				"aaaaa",
			],
			[
				".aaa.",
				"a...a",
				"...a.",
				"..a..",
				"aaaaa",
			],
			[
				".aaa.",
				"a...a",
				"...a.",
				"a...a",
				".aaa.",
			],
			[
				"a...a",
				"a...a",
				"aaaaa",
				"....a",
				"....a",
			],
			[
				"aaaaa",
				"a....",
				".aaa.",
				"....a",
				"aaaa.",
			],

			[
				".aaa.",
				"a....",
				"aaaa.",
				"a...a",
				".aaa.",
			],
			[
				"aaaaa",
				"...a.",
				"..aa.",
				".a...",
				"a....",
			],
			[
				".aaa.",
				"a...a",
				".aaa.",
				"a...a",
				".aaa.",
			],
			[
				".aaa.",
				"a...a",
				".aaaa",
				"....a",
				".aaa.",
			],

			// punctuation

			[
				".....",
				".....",
				".....",
				".....",
				".....",
			],
			[
				"..a..",
				"..a..",
				"..a..",
				".....",
				"..a..",
			],
			[
				".aa..",
				"..aa.",
				"...aa",
				"..aa.",
				".aa..",
			],
			[
				"....a",
				"...a.",
				"..a..",
				".a...",
				"a....",
			],			
		]);

		var font = new Font
		(
			"Font",
			characterSize,
			charactersAvailable,
			characterImages
		);

		return font;
	}

	Demo.prototype.worldGrid = function(sizeInStarsystems)
	{
		if (sizeInStarsystems == null)
		{
			sizeInStarsystems = new Coords(10, 10);
		}

		var font = this.font();
		var nameGenerator = new NameGenerator();
		
		var itemDefns = this.world_ItemDefns();
		
		var actions = 
		[
			new Action_Accelerate(), 
			new Action_Fire(),
			new Action_Turn(1),
			new Action_Turn(-1),	
		];

		var activityDefns = this.world_ActivityDefns();

		var colors = Color.Instances._All;
		
		var constraintDefns = this.world_ConstraintDefns();

		var entityDefns = this.world_EntityDefns();

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

				var starsystemPosWest = starsystemPos.clone().addDimensions(-1, 0).wrapToRangeMax(sizeInStarsystems);
				var starsystemPosEast = starsystemPos.clone().addDimensions(1, 0).wrapToRangeMax(sizeInStarsystems);
				var starsystemPosNorth = starsystemPos.clone().addDimensions(0, -1).wrapToRangeMax(sizeInStarsystems);
				var starsystemPosSouth = starsystemPos.clone().addDimensions(0, 1).wrapToRangeMax(sizeInStarsystems);

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
			font,
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
			function(activity) 
			{
				// do nothing
			},
			// perform 
			function(activity)
			{
				// do nothing
			}
		);

		var moveRandomly = new ActivityDefn
		(
			"MoveRandomly",

			// initialize
			function(activity) {},

			// perform 
			function(activity)
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

					var moverDefn = actor.defn().mover;

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
						actor.defn().mover.force
					);
					actorLoc.force.add(forceToApplyTowardTarget);
				}
			}
		);

		var userInputAccept = new ActivityDefn
		(
			"UserInputAccept",

			// initialize 
			function(activity) 
			{},

			// perform 
			function(activity)
			{
				var inputsActive = Globals.Instance.inputHelper.inputsActive;
				var actionsFromActor = activity.actor.actions;
				var world = Globals.Instance.universe.world;
				var starsystemCurrent = world.starsystemCurrent;
				var inputToActionMappings = starsystemCurrent.defn().inputToActionMappings; 

				for (var i = 0; i < inputsActive.length; i++)
				{
					var inputActive = inputsActive[i];
					var mapping = inputToActionMappings[inputActive];
					if (mapping != null)
					{
						var action = mapping.action();
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
			// applyConstraintToEntity
			function(constraint, entityConstrained)
			{
				var entityConstrainedLoc = entityConstrained.body.loc;
				var boundsToConformTo = constraint.variables[0];
				entityConstrainedLoc.pos.trimToRangeMinMax
				(
					boundsToConformTo.min(),
					boundsToConformTo.max()
				);
			}
		);		
		
		var followEntityByName = new ConstraintDefn
		(
			"FollowEntityByName",
			// applyConstraintToEntity
			function(constraint, entityConstrained)
			{
				var starsystem = entityConstrained.body.loc.venue;
				var nameOfEntityToFollow = constraint.variables[0];
				var entityToFollow = starsystem.entities[nameOfEntityToFollow];
				entityConstrained.body.loc.pos.overwriteWith
				(
					entityToFollow.body.loc.pos
				);
			}
		);
		
		var _all = 
		[
			conformToBounds,
			followEntityByName,
		];
		
		return _all;

	}

	Demo.prototype.world_EntityDefns = function()
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

		var mediaLibrary = Globals.Instance.mediaLibrary;
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
		//imagePlanet = imageHelper.imageToColor(imagePlanet, Color.Instances.Green);
		
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
					/*
					AnimationDefnSet.fromImages
					(
						entityDefnName, 
						imagesForItemCollection,
						2 // ticksPerFrame
					).toAnimationRun()
					*/
					new VisualImage(imagesForItemCollection[0].name),
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
					//new AnimationRun(AnimationDefnSet.fromImage(imageMoverProjectile))
					new VisualImage(imageMoverProjectile.name),
				),
				new ProjectileDefn(),
				new CollidableDefn
				(
					[ "Enemy" ],
					// collide
					function(entityThis, entityOther)
					{
						var entityOtherProperties = entityOther.defn().properties;
						if (entityOtherProperties["Enemy"] != null)
						{
							entityOther.killable.integrity -= entityThis.defn().projectile.damage;
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
		
		var animationDefnSetPortal = AnimationDefnSet.fromImages
		(
			entityDefnName, 
			imagesForPortal
		);
		
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
						new VisualGroup
						(
							[
								/*
								animationDefnSetPortal.clone().toColor
								(
									color
								).toAnimationRun(),
								*/
								new VisualImage(imagesForPortal[0].name),
								new VisualOffset
								(
									new VisualText
									(
										new DataSourceEntity
										(										
											function(entity) 
											{ 												
												var returnValue = 
													"To " + entity.portal.destinationStarsystemName; 
													
												return returnValue;
											}
										)
									),
									new Coords(0, 20) // offset
								),
							]	
						)
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
					//new AnimationRun(AnimationDefnSet.fromImages("Sun", imagesForSun))
					new VisualImage(imagesForSun[0].name)
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
					//new AnimationRun(AnimationDefnSet.fromImages("Friendly", imagesFriendly))
					new VisualImage(imagesFriendly[0].name)
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
					//new AnimationRun(AnimationDefnSet.fromImages("Enemy", imagesEnemy))
					new VisualImage(imagesEnemy[0].name)
				),
				new KillableDefn(1), // integrityMax
				new EnemyDefn(),				
				new MoverDefn(1, 1, 2), // mass, forcePerTick, speedMax
			]
		);

		var playerCollide = function(entityThis, entityOther)
		{
			var player = entityThis;
			var starsystem = player.body.loc.venue;
			var entityOtherProperties = entityOther.defn().properties;
			
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

				starsystem.entitiesToSpawn.push
				(		
					Globals.Instance.universe.world.font.buildEntityForText
					(
						"You lose!", 
						entityThis.body.loc.pos.clone(),
						true // isFloater
					)
				);
			}
			else if (entityOtherProperties["Planet"] != null)
			{
				var planet = entityOther;
				var itemTradeOffer = planet.planet.itemTradeOffer;
				if (itemTradeOffer != null)
				{
					itemTradeOffer.trade(player, planet);
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
					var universe = Globals.Instance.universe;
					var starsystems = universe.world.starsystems;
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
					/*
					AnimationDefnSet.fromImagesForHeadings
					(
						"Player", imagesForPlayerClockwise
					).toAnimationRun()
					*/
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
					new InputToActionMapping("w", "Accelerate", false),
					new InputToActionMapping("a", "TurnLeft", false),
					new InputToActionMapping("d", "TurnRight", false),
					new InputToActionMapping("f", "Fire", true),
				]
			),
		];

		return starsystemDefns;

	}
}
