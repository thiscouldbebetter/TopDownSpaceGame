
function VisualText(dataSource)
{
	this.dataSource = dataSource;
	
	// working variables
	this.characterPos = new Coords();
	this.textSizeInPixelsHalf = new Coords();
}
{	
	// instance methods
	
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
	
	VisualText.prototype.drawForEntityAtOffset = function(entity, offset)
	{		
		var text = this.textForEntity(entity).toUpperCase();
		
		var font = Globals.Instance.universe.font;
		var characterSize = font.characterSize;
		var display = Globals.Instance.display;
		var numberOfCharacters = text.length;
		
		this.textSizeInPixelsHalf.overwriteWith
		(
			characterSize
		);
		this.textSizeInPixelsHalf.x *= numberOfCharacters;
		this.textSizeInPixelsHalf.divideScalar(2);
		
		var venue = entity.body.loc.venue;
		var camera = venue.camera;
		
		this.characterPos.overwriteWith
		(
			entity.body.loc.pos
		).subtract
		(
			this.textSizeInPixelsHalf
		).add
		(
			offset
		).subtract
		(
			camera.body.loc.pos
		).add
		(
			camera.camera.viewSizeInPixelsHalf
		);

		for (var i = 0; i < numberOfCharacters; i++)
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

				this.characterPos.x += characterSize.x;

				display.drawImageAtPos(characterImage, this.characterPos)
			}
		}
	}

	VisualText.prototype.update = function()
	{
		// do nothing
	}
}
