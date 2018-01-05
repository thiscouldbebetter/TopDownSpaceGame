
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
			entity.drawable = new Drawable(visual);//.cloneShallow());
			//entity.drawable.visual.pos = entity.body.loc.pos;
		}
	}

	DrawableDefn.prototype.updateEntityForVenue = function(universe, entity, venue)
	{
		var display = universe.display;
		var visual = entity.drawable.visual;
		var camera = venue.camera;

		var drawPos = entity.body.loc.pos;
		this._posToSave.overwriteWith(drawPos);
 		drawPos.subtract
 		(
			camera.body.loc.pos
		).add
		(
			camera.camera.viewSizeHalf
		);
		visual.draw
		(
			universe, universe.world, display, entity.body
		);
		drawPos.overwriteWith(this._posToSave);
	}
}
