
class MoverDefn
{
	constructor(massBase, force, speedMax)
	{
		this.massBase = massBase;
		this.force = force;
		this.speedMax = speedMax;
	}

	updateForTimerTick(universeWorldPlaceEntities)
	{
		var place = universeWorldPlaceEntities.place;
		var mover = universeWorldPlaceEntities.entity;

		var moverMass = 1; // todo
		var moverLoc = mover.locatable().loc;

		var accelToAdd = moverLoc.force.clone().divideScalar(moverMass);
		moverLoc.accel.add(accelToAdd);

		moverLoc.vel.add(moverLoc.accel);
		var moverSpeedMax = mover.propertyByName(MoverDefn.name).speedMax;
		if (moverLoc.vel.magnitude() > moverSpeedMax)
		{
			moverLoc.vel.normalize().multiplyScalar(moverSpeedMax);
		}

		moverLoc.pos.add(moverLoc.vel);

		moverLoc.pos.trimToRangeMax(place.size);

		moverLoc.accel.clear();
		moverLoc.force.clear();
	}
}
