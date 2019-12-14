
function CollidableDefn(propertyNamesCollidedWith, collide)
{
	this.propertyNamesCollidedWith = propertyNamesCollidedWith;
	this.collide = collide;
}

{
	CollidableDefn.prototype.update = function(universe, world, venue, entity)
	{
		var collisionHelper = universe.collisionHelper;

		var collidableThis = entity;
		var colliderThis = collidableThis.bounds(world);

		for (var i = 0; i < this.propertyNamesCollidedWith.length; i++)
		{
			var propertyName = this.propertyNamesCollidedWith[i];
			var entitiesToCollideWith = venue.entitiesByPropertyName[propertyName];

			for (var j = 0; j < entitiesToCollideWith.length; j++)
			{
				var collidableOther = entitiesToCollideWith[j];
				if (collidableOther != collidableThis)
				{
					var colliderOther = collidableOther.bounds(world);

					var doEntitiesCollide = collisionHelper.doCollidersCollide
					(
						colliderThis, colliderOther
					);

					if (doEntitiesCollide == true)
					{
						collidableThis.defn(world).collidable.collide
						(
							universe, world, collidableThis, collidableOther
						);
						collidableOther.defn(world).collidable.collide
						(
							universe, world, collidableOther, collidableThis
						);
					}
				}
			}
		}
	}
}