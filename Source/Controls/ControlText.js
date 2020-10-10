
class ControlText
{
	constructor(name, entity, pos, dataSourceText)
	{
		this.name = name;
		this.entity = entity;
		this.pos = pos;
		this.dataSourceText = dataSourceText;
	}

	draw(display)
	{
		var textToDraw = this.dataSourceText.get(this.entity);

		display.drawText
		(
			textToDraw, this.pos, "White" // hack
		);
	}
}
