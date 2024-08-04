
class MoverDefn implements EntityPropertyBase
{
	massBase: number;
	force: number;
	speedMax: number;

	constructor
	(
		massBase: number,
		force: number,
		speedMax: number
	)
	{
		this.massBase = massBase;
		this.force = force;
		this.speedMax = speedMax;
	}

	static fromEntity(entity: Entity): MoverDefn
	{
		return entity.propertyByName(MoverDefn.name) as MoverDefn;
	}

	// EntityPropertyBase.

	equals(other: MoverDefn): boolean { return false; }
	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	initialize(uwpe: UniverseWorldPlaceEntities): void {}
	propertyName(): string { return MoverDefn.name; }

	updateForTimerTick(universeWorldPlaceEntities: UniverseWorldPlaceEntities): void
	{
		var place = universeWorldPlaceEntities.place;
		var mover = universeWorldPlaceEntities.entity;

		var moverMass = 1; // todo
		var moverLoc = mover.locatable().loc;

		var accelToAdd = moverLoc.force.clone().divideScalar(moverMass);
		moverLoc.accel.add(accelToAdd);

		moverLoc.vel.add(moverLoc.accel);
		var moverSpeedMax = MoverDefn.fromEntity(mover).speedMax;
		if (moverLoc.vel.magnitude() > moverSpeedMax)
		{
			moverLoc.vel.normalize().multiplyScalar(moverSpeedMax);
		}

		moverLoc.pos.add(moverLoc.vel);

		moverLoc.pos.trimToRangeMax(place.size() );

		moverLoc.accel.clear();
		moverLoc.force.clear();
	}
}
