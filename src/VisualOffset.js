
function VisualOffset(visual, offset)
{
	this.visual = visual;
	this.offset = offset;

	this.posAbsolute = new Coords();
}

{	
	VisualOffset.prototype.drawAtPos = function(pos)
	{
		this.visual.drawAtPos
		(
			this.posAbsolute.overwriteWith
			(
				this.offset
			).add
			(
				pos
			)
		);
	}
	
	VisualOffset.prototype.drawForEntity = function(entity)
	{
		this.drawAtPos(entity.body.loc.pos);
	}
	
	VisualOffset.prototype.update = function()
	{
		// do nothing
	}
}
