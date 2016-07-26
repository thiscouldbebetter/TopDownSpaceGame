
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

	Demo.prototype.universeGrid = function(sizeInVenues)
	{
		if (sizeInVenues == null)
		{
			sizeInVenues = new Coords(10, 10);
		}

		var font = this.font();
		var nameGenerator = new NameGenerator();
		
		var itemDefns = this.universe_ItemDefns();

		var activityDefns = this.universe_ActivityDefns();

		var colors = Color.Instances._All;
		
		var constraintDefns = this.universe_ConstraintDefns();

		var entityDefns = this.universe_EntityDefns();

		var venueDefns = this.universe_VenueDefns();

		var venueSizeInPixels = new Coords(1200, 1200);
		var venueSizeInPixelsHalf = venueSizeInPixels.clone().divideScalar(2);
		var venues = [];

		var venuePos = new Coords();
		var venueDefn0 = venueDefns[0];

		for (var y = 0; y < sizeInVenues.y; y++)
		{
			venuePos.y = y;

			for (var x = 0; x < sizeInVenues.x; x++)
			{
				venuePos.x = x;

				var venuePosWest = venuePos.clone().addXY(-1, 0).wrapToRange(sizeInVenues);
				var venuePosEast = venuePos.clone().addXY(1, 0).wrapToRange(sizeInVenues);
				var venuePosNorth = venuePos.clone().addXY(0, -1).wrapToRange(sizeInVenues);
				var venuePosSouth = venuePos.clone().addXY(0, 1).wrapToRange(sizeInVenues);

				var venueNamePrefix = "System_";
				var venueName = venueNamePrefix + venuePos.toString();

				var venue = new Venue
				(
					venueName,
					venueDefn0.name,
					venueSizeInPixels,
					// entities
					[
						// sun
						new Entity
						(
							"Sun", 
							entityDefns["Sun"].name, 
							[ 
								new Body(new Location(venueSizeInPixelsHalf.clone())),
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
								new Body(new Location(new Coords(.05 * venueSizeInPixels.x, venueSizeInPixelsHalf.y))),
								new PortalData
								(
									venueNamePrefix + venuePosWest.toString(),
									new Coords(.9 * venueSizeInPixels.x, venueSizeInPixelsHalf.y),
									colors["Red"]
								),
							]
						),

						new Entity
						(
							"PortalEast", 
							entityDefns["PortalGreen"].name, 
							[
								new Body(new Location(new Coords(.95 * venueSizeInPixels.x, venueSizeInPixelsHalf.y))),
								new PortalData
								(
									venueNamePrefix + venuePosEast.toString(),
									new Coords(.1 * venueSizeInPixels.x, venueSizeInPixelsHalf.y),
									colors["Green"]
								),
							]
						),

						new Entity
						(
							"PortalNorth", 
							entityDefns["PortalBlue"].name, 
							[
								new Body(new Location(new Coords(venueSizeInPixelsHalf.x, .05 * venueSizeInPixels.y))),
								new PortalData
								(
									venueNamePrefix + venuePosNorth.toString(),
									new Coords(venueSizeInPixelsHalf.x, .9 * venueSizeInPixels.y),
									colors["Blue"]
								),
							]
						),

						new Entity
						(
							"PortalEast", 
							entityDefns["PortalViolet"].name, 
							[
								new Body(new Location(new Coords(venueSizeInPixelsHalf.x, .95 * venueSizeInPixels.y))),
								new PortalData
								(
									venueNamePrefix + venuePosSouth.toString(),
									new Coords(venueSizeInPixelsHalf.x, .1 * venueSizeInPixels.y),
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
					var pos = new Coords().randomize().multiply(venueSizeInPixels).round();
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
					venue.entitiesToSpawn.push(entityPlanet);
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
						venueSizeInPixels
					).round();
					
					var entityEnemy = new Entity
					(
						"Enemy" + e, 
						entityDefns["Enemy"].name, 
						[ new Body(new Location(pos)) ]
					);
					
					venue.entitiesToSpawn.push(entityEnemy);
				}
				
				var numberOfItemCollections = 1;
				for (var c = 0; c < numberOfItemCollections; c++)
				{
					var pos = new Coords().randomize().multiply
					(
						venueSizeInPixels
					).round();

					var entityItemCollection = new Entity
					(
						"ItemCollection" + c, 
						entityDefns["ItemCollection"].name, 
						[ 
							new Body(new Location(pos)) 
						]
					);
					
					venue.entitiesToSpawn.push(entityItemCollection);
				}

				if (venuePos.x == 0 && venuePos.y == 0)
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
					venue.entitiesToSpawn.push(entityPlayer);

					// friendlies

					var entityFriendly = new Entity
					(
						"Friendly0", 
						entityDefns["Friendly"].name, 
						[ new Body(new Location(new Coords(350, 50))) ] 
					);
					venue.entitiesToSpawn.push(entityFriendly);
				}

				venues.push(venue);

			}  // end for sizeInVenues.x

		} // end for sizeInVenues.y
	
		var universe = new Universe
		(
			"UniverseGrid" + sizeInVenues.toString(),
			colors,
			font,
			itemDefns,
			activityDefns,
			constraintDefns,
			entityDefns,
			venueDefns, 
			venues
		);

		return universe;
	}
	
	Demo.prototype.universe_ItemDefns = function()
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

	Demo.prototype.universe_ActivityDefns = function()
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
					var actorVenue = actorLoc.venue;
					var venueSizeInPixels = actorVenue.sizeInPixels;

					var newTarget = new Coords	
					(
						Math.floor(Math.random() * venueSizeInPixels.x), 
						Math.floor(Math.random() * venueSizeInPixels.y)
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
				var keyCodesPressed = Globals.Instance.inputHelper.keyCodesPressed;
				var actionsFromActor = activity.actor.actions;
				var venueCurrent = Globals.Instance.universe.venueCurrent;
				var inputBindings = venueCurrent.defn().inputBindingSet.bindings; 

				for (var i = 0; i < keyCodesPressed.length; i++)
				{
					var keyCodePressed = keyCodesPressed[i];
					var bindingForKeyPressed = inputBindings[keyCodePressed];
					if (bindingForKeyPressed != null)
					{
						var actionForKeyPressed = bindingForKeyPressed.action;
						actionsFromActor.push(actionForKeyPressed);
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
	
	Demo.prototype.universe_ConstraintDefns = function()
	{
		var conformToBounds = new ConstraintDefn
		(
			"ConformToBounds",
			// applyConstraintToEntity
			function(constraint, entityConstrained)
			{
				var entityConstrainedLoc = entityConstrained.body.loc;
				var boundsToConformTo = constraint.variables[0]
				entityConstrainedLoc.pos.trimToBounds(boundsToConformTo);
			}
		);		
		
		var followEntityByName = new ConstraintDefn
		(
			"FollowEntityByName",
			// applyConstraintToEntity
			function(constraint, entityConstrained)
			{
				var venue = entityConstrained.body.loc.venue;
				var nameOfEntityToFollow = constraint.variables[0];
				var entityToFollow = venue.entities[nameOfEntityToFollow];
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

	Demo.prototype.universe_EntityDefns = function()
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

		var imageMoverProjectile = imageHelper.buildImageFromStrings
		(
			"Projectile",
			[
				"yyy",
				"y.y",
				"yyy",
			]			
		);

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
				new BodyDefn(new Coords(3, 3)), // sizeInPixels
				new CollidableDefn
				(
					[], // entityDefnNameToCollideWith
					function() {} // collide
				),
				new DrawableDefn
				(
					AnimationDefnSet.fromImages
					(
						entityDefnName, 
						imagesForItemCollection,
						2 // ticksPerFrame
					).toAnimationRun()
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
				new BodyDefn(new Coords(3, 3)), // sizeInPixels
				new MoverDefn(1, 1, 16), // mass, force, speedMax
				new DrawableDefn
				(
					new AnimationRun
					(
						AnimationDefnSet.fromImage(imageMoverProjectile)
					)
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
				new BodyDefn(new Coords(16, 16)), // sizeInPixels
				new CollidableDefn([], function() {}),
				new DrawableDefn
				(
					imagePlanet
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
					new BodyDefn(new Coords(19, 19)), // sizeInPixels
					new CollidableDefn([], function() {}),
					new DrawableDefn
					(
						new VisualSet
						(
							[
								animationDefnSetPortal.clone().toColor
								(
									color
								).toAnimationRun(),
								new VisualOffset
								(
									new VisualText
									(
										new DataSourceEntity
										(										
											function(entity) 
											{ 												
												var returnValue = 
													"To " + entity.portal.destinationVenueName; 
													
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
				new BodyDefn(new Coords(20, 20)), // sizeInPixels
				new DrawableDefn
				(
					new AnimationRun
					(
						AnimationDefnSet.fromImages("Sun", imagesForSun)
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
				new BodyDefn(new Coords(16, 9)), // sizeInPixels
				new MoverDefn(1, 1, 4), // mass, forcePerTick, speedMax
				new ActorDefn("DoNothing"),
				new DrawableDefn
				(
					new AnimationRun
					(
						AnimationDefnSet.fromImages
						(
							"Friendly", imagesFriendly
						)
					)
				),
				new FriendlyDefn(),
			]
		);

		var entityDefnEnemy = new EntityDefn
		(
			"Enemy", 	
			[
				new ActorDefn("MoveRandomly"),
				new BodyDefn(new Coords(16, 9)), // sizeInPixels
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
					new AnimationRun
					(
						AnimationDefnSet.fromImages
						(
							"Enemy", imagesEnemy
						)
					)
				),
				new KillableDefn(1), // integrityMax
				new EnemyDefn(),				
				new MoverDefn(1, 1, 2), // mass, forcePerTick, speedMax
			]
		);

		var playerCollide = function(entityThis, entityOther)
		{
			var player = entityThis;
			var venue = player.body.loc.venue;
			var entityOtherProperties = entityOther.defn().properties;
			
			if (entityOtherProperties["ItemCollection"] != null)
			{
				var itemCollection = entityOther;
				venue.entitiesToRemove.push(itemCollection);
				var itemsToTransfer = itemCollection.itemContainer.items;
				player.itemContainer.itemsAdd(itemsToTransfer);
			}
			else if (entityOtherProperties["Enemy"] != null)
			{
				player.killable.integrity = 0;

				venue.entitiesToSpawn.push
				(	
					Globals.Instance.universe.font.buildEntityForText
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

				venue.entitiesToRemove.push(player);

				var portalData = portal.portal;
				
				var itemFuel = player.itemContainer.items["Fuel"];
				var fuelUsedByPortal = 1000;
				if (itemFuel.quantity >= fuelUsedByPortal)
				{
					itemFuel.quantity -= fuelUsedByPortal;
					
					var destinationVenueName = portalData.destinationVenueName;
					var universe = Globals.Instance.universe;
					var destinationVenue = universe.venues[destinationVenueName];
					
					destinationVenue.entitiesToSpawn.push(player);
					entityThis.body.loc.pos.overwriteWith(portalData.destinationPos);
					universe.venueNext = destinationVenue;					
				}
	

			}
		}
		
		var gridSpacing = 8;

		var entityDefnPlayer = new EntityDefn
		(
			"Player", 	
			[
				new ActorDefn("UserInputAccept"),
				new BodyDefn(new Coords(9, 9)), // sizeInPixels	
				new CollidableDefn
				(
					[ "ItemCollection", "Enemy", "Planet", "Portal" ],
					playerCollide
				),
				new ConstrainableDefn(),
				new DrawableDefn
				(
					AnimationDefnSet.fromImagesForHeadings
					(
						"Player", imagesForPlayerClockwise
					).toAnimationRun()
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

	Demo.prototype.universe_VenueDefns = function()
	{
		var venueDefns = 
		[
			new VenueDefn
			(
				"VenueDefn0",
				new InputBindingSet
				([
					new InputBinding(InputKey.Instances.W, new Action_Accelerate()),
					new InputBinding(InputKey.Instances.A, new Action_Turn(-1)),
					new InputBinding(InputKey.Instances.D, new Action_Turn(1)),
					new InputBinding(InputKey.Instances.F, new Action_Fire()),
				])
			),
		];

		return venueDefns;

	}
}
