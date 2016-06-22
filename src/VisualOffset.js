
function VisualOffset(visual, offset)
{
	this.visual = visual;
	this.offset = offset;

	this.posAbsolute = new Coords();
}

{
	VisualOffset.prototype.cloneShallow = function()
	{
			return this;
	}
		
	VisualOffset.prototype.drawForEntityAtOffset = function(entity, offset)
	{
		this.visual.drawForEntityAtOffset
		(
			entity, 
			this.posAbsolute.overwriteWith
			(
				this.offset
			).add
			(
				offset
			)
		);
	}
	
	VisualOffset.prototype.update = function()
	{
		// do nothing
	}
}
