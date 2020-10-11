
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
		var drawable = entity.drawable();
		var visual = drawable.visual;
		visual.draw
		(
			universe, world, venue, entity, display
		);
	}
}
