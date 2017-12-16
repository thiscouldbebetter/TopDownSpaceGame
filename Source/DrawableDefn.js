
function DrawableDefn(visual)
{
	this.visual = visual;
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
		var drawLoc = display.drawLoc.overwriteWith
		(
			entity.body.loc
		);
		var drawPos = drawLoc.pos;
 		drawPos.subtract
 		(
			camera.body.loc.pos
		).add
		(
			camera.camera.viewSizeHalf
		);
		visual.draw
		(
			universe, display, entity, drawLoc
		);
	}
}
