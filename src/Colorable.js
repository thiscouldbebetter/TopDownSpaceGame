function Colorable()
{
	// static class
}
{
	Colorable.colorMany = function(colorablesToColor, color)
	{
		for (var i = 0; i < colorablesToColor.length; i++)
		{
			var colorableToColor = colorablesToColor[i];
			colorableToColor.toColor(color);
		}
	}
}
