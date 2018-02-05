
function DrawableDefn(visual)
{
	this.visual = visual;

	this._posToSave = new Coords();
}

{
	DrawableDefn.prototype.propertyName = function() { return "Drawable"; }

	DrawableDefn.prototype.initializeEntityForVenue = function(universe, entity, venue)
	{
		if (entity.drawable == null)
		{
			var visual = entity.defn(universe.world).drawable.visual;
			entity.drawable = new Drawable(visual);
			entity.loc = entity.body.loc;
		}
	}

	DrawableDefn.prototype.updateEntityForVenue = function(universe, entity, venue)
	{
		var display = universe.display;
		var drawable = entity.drawable;
		var visual = drawable.visual;
		visual.draw
		(
			universe, universe.world, display, entity
		);
	}
}
