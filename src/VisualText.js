
function VisualText(dataSource)
{
	this.dataSource = dataSource;
}
{
	VisualText.prototype.textForEntity = function(entity)
	{
		return this.dataSource.evaluate(entity);
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
			this.drawTextAtPos(null, pos);
	}

	VisualText.prototype.drawForEntityAtPos = function(entity, pos)
	{		
		var text = this.textForEntity(entity).toUpperCase();
		
		var font = Globals.Instance.universe.font;
		var characterSize = font.characterSize;
		var characterPos = pos.clone();
		var display = Globals.Instance.display;

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
	
	VisualText.prototype.drawForEntity = function(entity)
	{
		this.drawForEntityAtPos(entity, entity.body.loc.pos);
	}

	VisualText.prototype.update = function()
	{
		// do nothing
	}
}
