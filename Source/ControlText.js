
function ControlText(name, entity, pos, dataSourceText)
{
	this.name = name;
	this.entity = entity;
	this.pos = pos;
	this.dataSourceText = dataSourceText;
}

{
	ControlText.prototype.draw = function(display)
	{
		var textToDraw = this.dataSourceText.get(this.entity);

		display.drawText
		(
			textToDraw,
			this.pos,
			"White" // hack
		);
	}
}
