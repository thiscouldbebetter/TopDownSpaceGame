
function Font(name, characterSize, charactersAvailable, characterImages)
{
	this.name = name;
	this.characterSize = characterSize;
	this.charactersAvailable = charactersAvailable;
	this.characterImages = characterImages;
}

{
	// methods
	
	Font.prototype.buildEntityForText = function(text, pos, isFloater)
	{
		var characterSize = this.characterSize;

		var messageSizeInPixels = new Coords
		(
			characterSize.x * text.length, 
			characterSize.y
		);

		var messageSizeInPixelsHalf = messageSizeInPixels.clone().divideScalar(2);

		text = text.toUpperCase();

		var entityDefnProperties = 
		[	
			new BodyDefn(messageSizeInPixels),

			new DrawableDefn
			(
				new VisualText(text)
			),
		];

		if (isFloater == true)
		{
			entityDefnProperties.push(new EphemeralDefn(30));
			entityDefnProperties.push(new MoverDefn(1, 1, 1));
		}

		var entityDefn = new EntityDefn
		(
			"Message_" + text,
			entityDefnProperties
		);

		var returnValue = Entity.fromDefn
		(
			"Message_" + text,
			entityDefn,
			[
				new Body(new Location(pos)),
			]
		);

		if (isFloater == true)
		{
			returnValue.body.loc.vel = new Coords(0, -1);
		}

		return returnValue;
	}
}
