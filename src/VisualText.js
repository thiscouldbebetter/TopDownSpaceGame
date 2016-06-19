
function VisualText(text)
{
	this._text = text.toUpperCase();
}

{
	VisualText.prototype.text = function()
	{
			return this._text;
	}
			
	// visual
	
	VisualText.prototype.cloneDeep = function()
	{
		// todo
		return this.cloneShallow();
	}
	
	VisualText.prototype.cloneShallow = function()
	{
		return this;
	}

	VisualText.prototype.drawAtPos = function(pos)
	{
		var font = Globals.Instance.universe.font;
		var characterSize = font.characterSize;
		var characterPos = pos.clone();
		var display = Globals.Instance.display;
		var text = this.text();

		for (var i = 0; i < text.length; i++)
		{
			var character = text[i];
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
