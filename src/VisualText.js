
function VisualText(text)
{
	this.text = text.toUpperCase();
}

{
	VisualText.prototype.clone = function()
	{
		return this;
	}

	VisualText.prototype.drawAtPos = function(pos)
	{
		var font = Globals.Instance.universe.font;
		var characterSize = font.characterSize;
		var characterPos = pos.clone();
		var display = Globals.Instance.display;

		for (var i = 0; i < this.text.length; i++)
		{
			var character = this.text[i];
			var characterIndex = font.charactersAvailable.indexOf
			(
				character
			);

			if (characterIndex >= 0)
			{
				var characterImage = font.characterImages
				[
					characterIndex
				];

				characterPos.x = pos.x + i * characterSize.x;

				display.drawImageAtPos(characterImage, characterPos)
			}
		}
	}

	VisualText.prototype.update = function()
	{
		// do nothing
	}
}
