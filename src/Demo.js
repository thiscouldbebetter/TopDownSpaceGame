
// demo

function Demo()
{
	// do nothing
}

{
	Demo.prototype.font = function()
	{
		var characterSize = new Coords(5, 5);
		var charactersAvailable = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 !>";		
		var characterImages = new ImageHelper().buildImagesFromStringArrays
		("Font", [
			[
				".rrr.",
				"r...r",
				"rrrrr",
				"r...r",
				"r...r",
			],

			[
				"rrrr.",
				"r...r",
				"rrrr.",
				"r...r",
				"rrrr.",
			],
			[
				".rrrr",
				"r....",
				"r....",
				"r....",
				".rrrr",
			],
			[
				"rrrr.",
				"r...r",
				"r...r",
				"r...r",
				"rrrr.",
			],
			[
				"rrrrr",
				"r....",
				"rrrr.",
				"r....",
				"rrrrr",
			],
			[
				"rrrrr",
				"r....",
				"rrrr.",
				"r....",
				"r....",
			],
			[
				".rrrr",
				"r....",
				"r..rr",
				"r...r",
				".rrrr",
			],
			[
				"r...r",
				"r...r",
				"rrrrr",
				"r...r",
				"r...r",
			],
			[
				"rrrrr",
				"..r..",
				"..r..",
				"..r..",
				"rrrrr",
			],
			[
				".rrrrr",
				"....r.",
				"....r.",
				".r..r.",
				"..rr..",
			],
			[
				"r...r",
				"r..r.",
				"rrr..",
				"r..r.",
				"r...r",
			],
			[
				"r....",
				"r....",
				"r....",
				"r....",
				"rrrrr",
			],
			[
				"r...r",
				"rr.rr",
				"r.r.r",
				"r...r",
				"r...r",
			],
			[
				"r...r",
				"rr..r",
				"r.r.r",
				"r..rr",
				"r...r",
			],
			[
				".rrr.",
				"r...r",
				"r...r",
				"r...r",
				".rrr.",
			],
			[
				"rrrr.",
				"r...r",
				"rrrr.",
				"r....",
				"r.....",
			],
			[
				".rrr.",
				"r...r",
				"r...r",
				".rrr.",
				"..r..",
			],
			[
				"rrrr.",
				"r...r",
				"rrrr.",
				"r..r.",
				"r...r",
			],
			[
				".rrrr",
				"r....",
				".rrr.",
				"....r",
				"rrrr.",
			],
			[
				"rrrrr",
				"..r..",
				"..r..",
				"..r..",
				"..r..",
			],
			[
				"r...r",
				"r...r",
				"r...r",
				"r...r",
				".rrr.",
			],
			[
				"r...r",
				"r...r",
				".r.r.",
				".r.r.",
				"..r..",
			],
			[
				"r...r",
				"r...r",
				"r.r.r",
				"rr.rr",
				"r...r",
			],
			[
				"r...r",
				".r.r.",
				"..r..",
				".r.r.",
				"r...r",
			],
			[
				"r...r",
				".r.r.",
				"..r..",
				"..r..",
				"..r..",
			],
			[
				"rrrrr",
				"...r.",
				"..r..",
				".r...",
				"rrrrr",
			],

			// numerals

			[
				".rrr.",
				"r...r",
				"r...r",
				"r...r",
				".rrr.",
			],
			[
				"..r..",
				".rr..",
				"..r..",
				"..r..",
				"rrrrr",
			],
			[
				".rrr.",
				"r...r",
				"...r.",
				"..r..",
				"rrrrr",
			],
			[
				".rrr.",
				"r...r",
				"...r.",
				"r...r",
				".rrr.",
			],
			[
				"r...r",
				"r...r",
				"rrrrr",
				"....r",
				"....r",
			],
			[
				"rrrrr",
				"r....",
				".rrr.",
				"....r",
				"rrrr.",
			],

			[
				".rrr.",
				"r....",
				"rrrr.",
				"r...r",
				".rrr.",
			],
			[
				"rrrrr",
				"...r.",
				"..rr.",
				".r...",
				"r....",
			],
			[
				".rrr.",
				"r...r",
				".rrr.",
				"r...r",
				".rrr.",
			],
			[
				".rrr.",
				"r...r",
				".rrrr",
				"....r",
				".rrr.",
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
				"..r..",
				"..r..",
				"..r..",
				".....",
				"..r..",
			],
			[
				".rr..",
				"..rr.",
				"...rr",
				"..rr.",
				".rr..",
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

		var activityDefns = this.universe_ActivityDefns();

		Camera.initializeStatic();

		var entityDefns = this.universe_EntityDefns();

		var venueDefns = this.universe_VenueDefns();

		var venueSizeInPixels = new Coords(600, 600);
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

				var venueName = "Venue_" + venuePos.toString();

				var venue = new Venue
				(
					venueName,
					venueDefn0.name,
					venueSizeInPixels,
					// entities
					[
						/*
						font.buildEntityForText
						(
							venueName, 
							new Coords
							(
								venueSizeInPixelsHalf.x,
								venueSizeInPixelsHalf.y + font.characterSize.y * 4
							)
						),
						*/
						Entity.fromDefn
						(
							"Text" + venueName,
							new EntityDefn
							(
								".text",
								[
									new BodyDefn(new Coords(0, 0)),
									new DrawableDefn(new VisualText(venueName)),
								]
							),
							[
								new Body(new Location(venueSizeInPixelsHalf.clone())),
							] // properties
						),

						// sun

						new Entity
						(
							"Sun", 
							entityDefns["Sun"].name, 
							[ 
								new Body(new Location(venueSizeInPixelsHalf.clone())) 
							]
						),

						// portals

						new Entity
						(
							"PortalWest", 
							entityDefns["Portal"].name, 
							[
								new Body(new Location(new Coords(.05 * venueSizeInPixels.x, venueSizeInPixelsHalf.y))),
								new PortalData
								(
									"Venue_" + venuePosWest.toString(),
									new Coords(.9 * venueSizeInPixels.x, venueSizeInPixelsHalf.y)
								),
							]
						),

						new Entity
						(
							"PortalEast", 
							entityDefns["Portal"].name, 
							[
								new Body(new Location(new Coords(.95 * venueSizeInPixels.x, venueSizeInPixelsHalf.y))),
								new PortalData
								(
									"Venue_" + venuePosEast.toString(),
									new Coords(.1 * venueSizeInPixels.x, venueSizeInPixelsHalf.y)
								),
							]
						),

						new Entity
						(
							"PortalNorth", 
							entityDefns["Portal"].name, 
							[
								new Body(new Location(new Coords(venueSizeInPixelsHalf.x, .05 * venueSizeInPixels.y))),
								new PortalData
								(
									"Venue_" + venuePosNorth.toString(),
									new Coords(venueSizeInPixelsHalf.x, .9 * venueSizeInPixels.y)
								),
							]
						),

						new Entity
						(
							"PortalEast", 
							entityDefns["Portal"].name, 
							[
								new Body(new Location(new Coords(venueSizeInPixelsHalf.x, .95 * venueSizeInPixels.y))),
								new PortalData
								(
									"Venue_" + venuePosSouth.toString(),
									new Coords(venueSizeInPixelsHalf.x, .1 * venueSizeInPixels.y)
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
							new Planet(Color.Instances.Orange)
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
					var pos = new Coords().randomize().multiply(venueSizeInPixels).round();
					var entityEnemy = new Entity("Enemy" + e, entityDefns["Enemy"].name, [ new Body(new Location(pos)) ]);
					venue.entitiesToSpawn.push(entityEnemy);
				}

				if (venuePos.x == 0 && venuePos.y == 0)
				{
					var entityPlayer = new Entity("Player", entityDefns["Player"].name, [ new Body(new Location(new Coords(100, 100))) ] );
					venue.entitiesToSpawn.push(entityPlayer);

					// friendlies

					var entityFriendly = new Entity("Friendly0", entityDefns["Friendly"].name, [ new Body(new Location(new Coords(350, 50))) ] );
					venue.entitiesToSpawn.push(entityFriendly);
				}

				venues.push(venue);

			}  // end for sizeInVenues.x

		} // end for sizeInVenues.y
	
		var universe = new Universe
		(
			"UniverseGrid" + sizeInVenues.toString(),
			font,
			activityDefns,
			entityDefns,
			venueDefns, 
			venues
		);

		return universe;
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
				var inputBindings = Globals.Instance.venueCurrent.defn().inputBindingSet.bindings; 

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

	Demo.prototype.universe_EntityDefns = function()
	{
		var imageHelper = new ImageHelper();

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
						AnimationDefnSet.buildFromImage(imageMoverProjectile)
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
				new DrawableDefn
				(
					imagePlanet
				),
				new PlanetDefn(),
			]
		);

		var entityDefnPortal = new EntityDefn
		(
			"Portal",
			[
				new BodyDefn(new Coords(19, 19)), // sizeInPixels
				new DrawableDefn
				(
					new AnimationRun
					(
						AnimationDefnSet.buildFromImages("Portal", imagesForPortal)
					)
				),
				new PortalDefn(),
			]
		);		

		var entityDefnSun = new EntityDefn
		(
			"Sun",
			[
				new BodyDefn(new Coords(20, 20)), // sizeInPixels
				new DrawableDefn
				(
					new AnimationRun
					(
						AnimationDefnSet.buildFromImages("Sun", imagesForSun)
					)
				),
				new SunDefn(),
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
						AnimationDefnSet.buildFromImages
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
						AnimationDefnSet.buildFromImages
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
			var entityOtherProperties = entityOther.defn().properties;
			if (entityOtherProperties["Enemy"] != null)
			{
				entityThis.killable.integrity = 0;

				var venue = entityThis.body.loc.venue;

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
				// todo
			}
			else if (entityOtherProperties["Portal"] != null)
			{
				var portal = entityOther;
				var venue = entityThis.body.loc.venue;	

				venue.entitiesToRemove.push(entityThis);

				var portalData = portal.portal;
				var destinationVenueName = portalData.destinationVenueName;
				var universe = Globals.Instance.universe;
				var destinationVenue = universe.venues[destinationVenueName];
	
				destinationVenue.entitiesToSpawn.push(entityThis);
				entityThis.body.loc.pos.overwriteWith(portalData.destinationPos);
				Globals.Instance.venueNext = destinationVenue;
			}
		}


		var entityDefnPlayer = new EntityDefn
		(
			"Player", 	
			[
				new ActorDefn("UserInputAccept"),
				new BodyDefn(new Coords(9, 9)), // sizeInPixels	
				new CollidableDefn
				(
					[ "Enemy", "Planet", "Portal" ],
					playerCollide
				),
				new ControllableDefn
				(
					// buildControlForEntityAndVenue
					function(entity, venue)
					{
						var returnValue = new ControlContainer
						(
							"containerPlayer",
							new Coords(64, 64), // size
							new Coords(8, 8), // pos
							// children
							[
								new ControlText
								(
									"textPlayer",
									new Coords(8, 8), // pos
									"[Player]"
								),
							]
						);

						return returnValue;
					}
				),
				new DrawableDefn
				(
					AnimationDefnSet.fromImagesForHeadings
					(
						"Player", imagesForPlayerClockwise
					).toAnimationRun()
				),
				new KillableDefn(1), // integrityMax
				new MoverDefn(1, 2, 8), // mass, forcePerTick, speedMax
				new PlayerDefn(),
			]
		);

		var entityDefns =
		[
			Camera.EntityDefn,
			entityDefnPlanet,
			entityDefnPortal,
			entityDefnSun,

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
