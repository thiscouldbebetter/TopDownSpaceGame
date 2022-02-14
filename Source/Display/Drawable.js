
class Drawable2
{
	constructor(visual)
	{
		this.visual = visual;

		this._posToSave = new Coords();
	}

	initialize(universe, world, venue, entity)
	{
		// Do nothing.
	}

	update(universeWorldPlaceEntities)
	{
		var universe = universeWorldPlaceEntities.universe;
		var entity = universeWorldPlaceEntities.entity;

		var display = universe.display;
		var drawable = entity.drawable();
		var visual = drawable.visual;
		visual.draw
		(
			universeWorldPlaceEntities, display
		);
	}
}
