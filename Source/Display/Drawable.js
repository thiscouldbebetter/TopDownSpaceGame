
class Drawable
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

	update(universe, world, venue, entity)
	{
		var display = universe.display;
		var drawable = entity.Drawable;
		var visual = drawable.visual;
		visual.draw
		(
			universe, world, display, null, entity
		);
	}
}
