
function Venue(name, defnName, sizeInPixels, entities)
{
	this.name = name;
	this.defnName = defnName;
	this.sizeInPixels = sizeInPixels;
	this.entities = [];

	this.sizeInPixelsHalf = this.sizeInPixels.clone().divideScalar(2);

	this.entitiesByPropertyName = [];
	this.entitiesToSpawn = entities.slice();
	this.entitiesToRemove = [];
}

{
	// instance methods

	Venue.prototype.defn = function()
	{
		return Globals.Instance.universe.venueDefns[this.defnName];
	}

	Venue.prototype.initialize = function()
	{
		var entityDefns = Globals.Instance.universe.entityDefns;

		for (var i = 0; i < entityDefns.length; i++)
		{
			var properties = entityDefns[i].properties;

			for (var c = 0; c < properties.length; c++)
			{
				var property = properties[c];
				var propertyName = property.propertyName();

				if (this.entitiesByPropertyName[propertyName] == null)
				{
					this.entitiesByPropertyName[propertyName] = [];
				}
			}
		}
	
		this.camera = new Camera
		(
			"Camera",
			Camera.ViewSizeStandard
		);
	
		this.camera.entity.body.loc.venue = this;
	
		this.entitiesToSpawn.push(this.camera.entity);

		for (var b = 0; b < this.entities.length; b++)
		{
			var entity = this.entities[b];

			var entityProperties = entity.defn().properties;
			for (var c = 0; c < entityProperties.length; c++)
			{
				var entityProperty = entityProperties[c];

				if (entityProperty.initializeEntityForVenue != null)
				{
					entityProperty.initializeEntityForVenue(entity, this);
				}
			}

			var entityProperties = entity.properties;
			for (var c = 0; c < entityProperties.length; c++)
			{
				var entityProperty = entityProperties[c];

				if (entityProperty.initializeEntityForVenue != null)
				{
					entityProperty.initializeEntityForVenue(entity, this);
				}
			}
		}
	}

	Venue.prototype.update = function()
	{
		Globals.Instance.display.drawVenue(this);

		this.update_EntitiesToSpawn();

		var propertyNames = 
		[
			"Actor",
			"Mover",
			"Collidable",
			"Controllable",
			"Killable",
			"Ephemeral",
			"Drawable",
		];

		var numberOfProperties = propertyNames.length;

		for (var c = 0; c < numberOfProperties; c++)
		{
			var propertyName = propertyNames[c];

			var entitiesWithProperty = this.entitiesByPropertyName[propertyName];

			var numberOfEntitiesWithProperty = entitiesWithProperty.length;

			for (var b = 0; b < numberOfEntitiesWithProperty; b++)
			{
				var entity = entitiesWithProperty[b];

				var property = entity.defn().properties[propertyName];
				
				if (property == null)
				{
					property = entity.properties[propertyName];
				}

				if (property.updateEntityForVenue != null)
				{
					property.updateEntityForVenue(entity, this);
				}
			}
		}

		//this.update_Collidables();

		this.update_EntitiesToRemove();
	}

	Venue.prototype.update_EntitiesToRemove = function()
	{
		for (var i = 0; i < this.entitiesToRemove.length; i++)
		{
			var entityToRemove = this.entitiesToRemove[i];

			this.entities.remove(entityToRemove);

			var entityProperties = entityToRemove.defn().properties;
			for (var c = 0; c < entityProperties.length; c++)
			{
				var entityProperty = entityProperties[c];
				var entityPropertyName = entityProperty.propertyName();
				var entitiesForProperty = this.entitiesByPropertyName[entityPropertyName];
				entitiesForProperty.remove(entityToRemove);
			}
		}

		this.entitiesToRemove.length = 0;
	}

	Venue.prototype.update_EntitiesToSpawn = function()
	{
		for (var i = 0; i < this.entitiesToSpawn.length; i++)
		{
			var entityToSpawn = this.entitiesToSpawn[i];

			this.entities.push(entityToSpawn);		

			var entityToSpawnDefn = entityToSpawn.defn();

			var entityProperties = entityToSpawnDefn.properties;
			for (var c = 0; c < entityProperties.length; c++)
			{
				this.update_EntitiesToSpawn_Spawn(entityToSpawn, entityProperties[c]);
			}

			var entityProperties = entityToSpawn.properties;
			for (var c = 0; c < entityProperties.length; c++)
			{
				this.update_EntitiesToSpawn_Spawn(entityToSpawn, entityProperties[c]);
			}

		}

		this.entitiesToSpawn.length = 0;
	}

	Venue.prototype.update_EntitiesToSpawn_Spawn = function(entity, entityProperty)
	{
		var entityPropertyName = entityProperty.propertyName();
		var entitiesForPropertyName = this.entitiesByPropertyName[entityPropertyName];
		if (entitiesForPropertyName.contains(entity) == false)
		{
			entitiesForPropertyName.push(entity);
		}

		if (entityProperty.initializeEntityForVenue != null)
		{
			entityProperty.initializeEntityForVenue(entity, this);
		}
	}

	/*
	Venue.prototype.update_Collidables = function()
	{
		var enemies = this.enemies();
		var players = this.players();
		var portals = this.portals();
		var projectiles = this.projectiles();

		var collisionHelper = Globals.Instance.collisionHelper;

		var collisionsOfProjectilesAndEnemies = collisionHelper.findCollisionsBetweenEntitiesInSets
		(
			projectiles, 
			enemies
		);			

		var collisionSets = 
		[
			collisionHelper.findCollisionsBetweenEntitiesInSets
			(
				players, 
				portals
			),

			collisionHelper.findCollisionsBetweenEntitiesInSets
			(
				players, 
				enemies
			),

			collisionsOfProjectilesAndEnemies,

		];

		for (var s = 0; s < collisionSets.length; s++)
		{
			var collisions = collisionSets[s];

			var numberOfCollisions = collisions.length;
			for (var c = 0; c < numberOfCollisions; c++)
			{
				var collision = collisions[c];

				var numberOfEntities = collision.entities.length;

				for (var b0 = 0; b0 < numberOfEntities; b0++)
				{
					var entityThis = collision.entities[b0];
					for (var b1 = b0 + 1; b1 < numberOfEntities; b1++)
					{
						var entityOther = collision.entities[b1];

						collisionHelper.collideEntities
						(
							collision, entityThis, entityOther
						);
						collisionHelper.collideEntities
						(
							collision, entityOther, entityThis
						);
					}
				}
			}
		}
	}

	// entities

	Venue.prototype.enemies = function() { return this.entitiesByPropertyName["Enemy"]; }
	Venue.prototype.players = function() { return this.entitiesByPropertyName["Player"]; }
	Venue.prototype.portals = function() { return this.entitiesByPropertyName["Portal"]; }
	Venue.prototype.projectiles = function() { return this.entitiesByPropertyName["Projectile"]; }
	*/

}
