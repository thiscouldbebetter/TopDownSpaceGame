
function Collidable(colliderAtRest, propertyNamesCollidedWith, collide)
{
	this.colliderAtRest = colliderAtRest;
	this.propertyNamesCollidedWith = propertyNamesCollidedWith;
	this.collide = collide;

	this.collider = this.colliderAtRest.clone();
}

{
	Collidable.prototype.initialize = function(universe, world, venue, entity)
	{
		this.update_Collider(entity);
	};

	Collidable.prototype.update = function(universe, world, venue, entity)
	{
		var collisionHelper = universe.collisionHelper;

		var colliderThis = this.update_Collider(entity);

		for (var i = 0; i < this.propertyNamesCollidedWith.length; i++)
		{
			var propertyName = this.propertyNamesCollidedWith[i];
			var entitiesToCollideWith = venue.entitiesByPropertyName[propertyName];

			for (var j = 0; j < entitiesToCollideWith.length; j++)
			{
				var entityOther = entitiesToCollideWith[j];
				if (entityOther != entity)
				{
					var colliderOther = this.update_Collider(entityOther);

					var doEntitiesCollide = collisionHelper.doCollidersCollide
					(
						colliderThis, colliderOther
					);

					if (doEntitiesCollide)
					{
						entity.Collidable.collide
						(
							universe, world, entity, entityOther
						);
						entityOther.Collidable.collide
						(
							universe, world, entityOther, entity
						);
					}
				}
			}
		}
	};

	Collidable.prototype.update_Collider = function(entity)
	{
		var collidable = entity.Collidable;
		var collider = collidable.collider;
		var transformTranslate = new Transform_Translate
		(
			entity.Locatable.loc.pos.clone()
		);
		collider.overwriteWith
		(
			collidable.colliderAtRest
		).transform
		(
			transformTranslate
		);
		return collider;
	};
}
