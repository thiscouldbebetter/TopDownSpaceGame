
function CollidableDefn(propertyNamesCollidedWith, collide)
{
	this.propertyNamesCollidedWith = propertyNamesCollidedWith;
	this.collide = collide;
}

{
	CollidableDefn.prototype.propertyName = function() { return "Collidable"; }

	CollidableDefn.prototype.updateEntityForVenue = function(entity, venue)
	{
		var collisionHelper = Globals.Instance.collisionHelper;

		var collidableThis = entity;
		var colliderThis = collidableThis.bounds();

		for (var i = 0; i < this.propertyNamesCollidedWith.length; i++)
		{
			var propertyName = this.propertyNamesCollidedWith[i];
			var entitiesToCollideWith = venue.entitiesByPropertyName[propertyName];

			for (var j = 0; j < entitiesToCollideWith.length; j++)
			{
				var collidableOther = entitiesToCollideWith[j];
				if (collidableOther != collidableThis)	
				{
					var colliderOther = collidableOther.bounds();

					var doEntitiesCollide = collisionHelper.doCollidersCollide
					(
						colliderThis, colliderOther
					);

					if (doEntitiesCollide == true)
					{	
						collidableThis.defn().collidable.collide
						(
							collidableThis, collidableOther
						);
						collidableOther.defn().collidable.collide
						(
							collidableOther, collidableThis
						);
					}
				}	
			}
		}
	}
}
