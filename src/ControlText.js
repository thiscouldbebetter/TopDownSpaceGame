
function ControlText(name, pos, text)
{
	this.name = name;
	this.pos = pos;
	this.text = text;
}

{
	ControlText.prototype.draw = function()
	{
		var display = Globals.Instance.display;

		display.drawText(this.text, this.pos, "White");
	}
}
