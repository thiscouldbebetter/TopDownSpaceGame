
function ControlText(name, entity, pos, dataSourceText)
{
	this.name = name;
	this.entity = entity;
	this.pos = pos;
	this.dataSourceText = dataSourceText;
}

{
	ControlText.prototype.draw = function()
	{
		var display = Globals.Instance.display;

		var textToDraw = this.dataSourceText.evaluate(this.entity);

		display.drawText
		(
			textToDraw,
			this.pos, 
			"White" // hack
		);
	}
}
