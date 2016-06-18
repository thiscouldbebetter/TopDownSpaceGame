
function MoverDefn(massBase, force, speedMax)
{
	this.massBase = massBase;
	this.force = force;
	this.speedMax = speedMax;
}

{
	MoverDefn.prototype.propertyName = function() { return "Mover"; }

	MoverDefn.prototype.updateEntityForVenue = function(entity, venue)
	{
		var mover = entity;

		var moverMass = 1; // todo
		var moverLoc = mover.body.loc;

		var accelToAdd = moverLoc.force.clone().divideScalar(moverMass);
		moverLoc.accel.add(accelToAdd);

		moverLoc.vel.add(moverLoc.accel);
		var moverSpeedMax = mover.defn().mover.speedMax;
		if (moverLoc.vel.magnitude() > moverSpeedMax)
		{
			moverLoc.vel.normalize().multiplyScalar(moverSpeedMax);
		}

		moverLoc.pos.add(moverLoc.vel);

		moverLoc.pos.trimToRange(venue.sizeInPixels);

		moverLoc.accel.clear();
		moverLoc.force.clear();
	}
}
