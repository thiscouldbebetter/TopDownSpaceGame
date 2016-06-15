
function ControlContainer(name, size, pos, children)
{
	this.name = name;
	this.size = size;
	this.pos = pos;
	this.children = children;

	for (var i = 0; i < this.children.length; i++)
	{
		var child = this.children[i];
		child.pos.add(this.pos);
	}
}

{
	ControlContainer.prototype.draw = function()
	{
		var display = Globals.Instance.display;

		display.drawRectangle(this.pos, this.size, "Blue", "Gray");

		for (var i = 0; i < this.children.length; i++)
		{
			var child = this.children[i];
			child.draw();
		}
	}
}
