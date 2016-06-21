
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

		display.drawText
		(
			this.dataSourceText.evaluate(this.entity), 
			this.pos, 
			"White" // hack
		);
	}
}
