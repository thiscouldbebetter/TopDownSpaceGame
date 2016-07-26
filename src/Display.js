
function Display(sizeInPixels)
{
	this.sizeInPixels = sizeInPixels;
	this.fontHeightInPixels = 10; // hack

	// temporary variables
	this.drawPos = new Coords();
}

{
	Display.prototype.clear = function(colorBorder, colorBack)
	{
		this.drawRectangle
		(
			Coords.Instances.Zeroes, 
			this.sizeInPixels, 
			(colorBorder == null ? "Gray" : colorBorder), 
			(colorBack == null ? "White" : colorBack)
		);
	}

	Display.prototype.drawControlButton = function(control)
	{
		var pos = control.pos;
		var size = control.size;

		var colorsForeAndBack;

		if (control.isHighlighted == true)
		{
			colorsForeAndBack = ["White", "Gray"];
		}
		else
		{
			colorsForeAndBack = ["Gray", "White"];
		}

		this.drawRectangle
		(
			pos, size, 
			colorsForeAndBack[0], colorsForeAndBack[1]
		)

		var text = control.text;

		var textWidth = this.graphics.measureText(text).width;
		var textMarginLeft = (size.x - textWidth) / 2;
		var textHeight = this.fontHeightInPixels;
		var textMarginTop = (size.y - textHeight) / 2;

		this.graphics.fillStyle = colorsForeAndBack[0];
		this.graphics.fillText
		(
			text,
			pos.x + textMarginLeft,
			pos.y + textMarginTop + textHeight
		);
	}

	Display.prototype.drawControlContainer = function(container)
	{
		var pos = container.pos
		var size = container.size;

		this.drawRectangle
		(
			pos, size, "Gray", "White"
		)

		var children = container.children;
		for (var i = 0; i < children.length; i++)
		{
			var child = children[i];
			child.draw();
		}
	}

	Display.prototype.drawControlImage = function(controlImage)
	{
		var pos = controlImage.pos
		var size = controlImage.size;

		this.drawRectangle
		(
			pos, size, "Gray", "White"
		)

		this.graphics.drawImage
		(
			controlImage.systemImage,
			pos.x, pos.y,
			this.sizeInPixels.x, this.sizeInPixels.y
		);
	}

	Display.prototype.drawControlLabel = function(control)
	{
		var pos = control.pos;
		var size = control.size;
		var text = control.text;

		var textHeight = this.fontHeightInPixels;

		var textMargins;

		if (control.isTextCentered == true)
		{
			var textWidth = this.graphics.measureText(text).width;
			textMargins = new Coords
			(
				(size.x - textWidth) / 2,
				(size.y - textHeight) / 2
			);
		}
		else
		{
			textMargins = new Coords
			(
				2,
				(size.y - textHeight) / 2
			);
		}

		this.graphics.fillStyle = "Gray";
		this.graphics.fillText
		(
			text,
			pos.x + textMargins.x ,
			pos.y + textMargins.y + textHeight
		);				
	}

	Display.prototype.drawControlList = function(list)
	{
		var pos = list.pos
		var size = list.size;

		this.drawRectangle
		(
			pos, size, "Gray", "White"
		);

		this.graphics.fillStyle = "Gray";
		var itemSizeY = list.itemSpacing;
		var textMarginLeft = 2;
		var itemPosY = pos.y;

		var items = list.items();

		var numberOfItemsVisible = Math.floor(size.y / itemSizeY);
		var indexStart = list.indexOfFirstItemVisible;
		var indexEnd = indexStart + numberOfItemsVisible - 1;
		if (indexEnd >= items.length)
		{
			indexEnd = items.length - 1;
		}

		for (var i = indexStart; i <= indexEnd; i++)
		{
			if (i == list.indexOfItemSelected)
			{
				this.graphics.strokeRect
				(
					pos.x + textMarginLeft, 
					itemPosY,
					size.x - textMarginLeft * 2,
					itemSizeY
				)
			}

			var item = items[i];
			var text = DataBinding.get
			(
				item, list.bindingExpressionForItemText
			);

			itemPosY += itemSizeY;

			this.graphics.fillText
			(
				text,
				pos.x + textMarginLeft,
				itemPosY
			);			
		}
	}

	Display.prototype.drawControlSelect = function(control)
	{
		var pos = control.pos;
		var size = control.size;

		var colorsForeAndBack = ["Gray", "White"];

		this.drawRectangle
		(
			pos, size, 
			colorsForeAndBack[0], colorsForeAndBack[1]
		)

		var text = control.optionSelected().text;

		var textWidth = this.graphics.measureText(text).width;
		var textMarginLeft = (control.size.x - textWidth) / 2;
		var textHeight = this.fontHeightInPixels;
		var textMarginTop = (control.size.y - textHeight) / 2;

		this.graphics.fillStyle = colorsForeAndBack[0];
		this.graphics.fillText
		(
			text,
			pos.x + textMarginLeft,
			pos.y + textMarginTop + textHeight
		);
	}

	Display.prototype.drawControlTextBox = function(control)
	{
		var pos = control.pos;
		var size = control.size;

		var text = control.text;
		var colorsForeAndBack;

		if (control.isHighlighted == true)
		{
			colorsForeAndBack = ["White", "Gray"];
			text += "|";
		}
		else
		{
			colorsForeAndBack = ["Gray", "White"];
		}

		this.drawRectangle
		(
			pos, size, 
			colorsForeAndBack[0], colorsForeAndBack[1]
		)

		var textWidth = this.graphics.measureText(text).width;
		var textMarginLeft = (size.x - textWidth) / 2;
		var textHeight = this.fontHeightInPixels;		
		var textMarginTop = (size.y - textHeight) / 2;

		this.graphics.fillStyle = colorsForeAndBack[0];
		this.graphics.fillText
		(
			text,
			pos.x + textMarginLeft ,
			pos.y + textMarginTop + textHeight
		);				
	}
		
	Display.prototype.drawImageAtPos = function(imageToDraw, pos)
	{
		this.drawPos.overwriteWith
		(
			pos
		).subtract
		(
			imageToDraw.sizeInPixelsHalf
		);

		this.graphics.drawImage
		(
			imageToDraw.systemImage, 
			this.drawPos.x, this.drawPos.y
		);
	}

	Display.prototype.drawRectangle = function
	(
		pos, size, systemColorStroke, systemColorFill
	)
	{
		this.graphics.fillStyle = systemColorFill;
		this.graphics.fillRect(pos.x, pos.y, size.x, size.y);

		this.graphics.strokeStyle = systemColorStroke;
		this.graphics.strokeRect(pos.x, pos.y, size.x, size.y);

	}

	Display.prototype.drawText = function(text, pos, systemColor)
	{
		this.graphics.fillStyle = systemColor;
		this.graphics.strokeStyle = systemColor;
		this.graphics.fillText(text, pos.x, pos.y);
		this.graphics.strokeText(text, pos.x, pos.y);
	}

	Display.prototype.drawVenue = function(venue)
	{
		this.drawRectangle
		(
			Coords.Instances.Zeroes, 
			venue.sizeInPixels, 
			"Gray", 
			"Black"
		);
		
		this.drawVenue_Map(venue);
	}
	
	Display.prototype.drawVenue_Map = function(venue)
	{
		var scaleFactor = 16;
		var mapSizeInPixels = venue.sizeInPixels.clone().divideScalar
		(
			scaleFactor
		);
		var mapPosInPixels = new Coords
		(
			this.sizeInPixels.x - mapSizeInPixels.x - 10,
			10 // hack
		);
		
		this.drawRectangle
		(
			mapPosInPixels,
			mapSizeInPixels,
			"Gray",
			"DarkBlue"
		);
	
		var stars = venue.stars();
		for (var i = 0; i < stars.length; i++)
		{
				var star = stars[i];
				this.drawVenue_Map_Blip(star.body.loc.pos, scaleFactor, mapPosInPixels, "Yellow");
		}
		
		var planets = venue.planets();
		for (var i = 0; i < planets.length; i++)
		{
			var planet = planets[i];
			this.drawVenue_Map_Blip(planet.body.loc.pos, scaleFactor, mapPosInPixels, "Cyan");
		}
				
		var portals = venue.portals();
		for (var i = 0; i < portals.length; i++)
		{
			var portal = portals[i];
			this.drawVenue_Map_Blip(portal.body.loc.pos, scaleFactor, mapPosInPixels, "Violet");
		}
		
		var enemies = venue.enemies();
		for (var i = 0; i < enemies.length; i++)
		{
			var enemy = enemies[i];
			this.drawVenue_Map_Blip(enemy.body.loc.pos, scaleFactor, mapPosInPixels, "Red");
		}
		
		var player = venue.players()[0];
		if (player != null)
		{
			this.drawVenue_Map_Blip(player.body.loc.pos, scaleFactor, mapPosInPixels, "Orange");
		}		
	}
	
	Display.prototype.drawVenue_Map_Blip = function(entityPos, scaleFactor, mapPosInPixels, color)
	{
		var drawPos = this.drawPos;
		
		drawPos.overwriteWith
		(
			entityPos
		).divideScalar
		(
			scaleFactor
		).add
		(
			mapPosInPixels
		);
		
		this.drawRectangle
		(
			drawPos,
			Coords.Instances.Ones,
			color,
			color
		);
		
	}

	Display.prototype.initialize = function()
	{
		var canvas = document.createElement("canvas");
		canvas.width = this.sizeInPixels.x;
		canvas.height = this.sizeInPixels.y;
		canvas.font = this.fontHeightInPixels + "px Arial";

		this.graphics = canvas.getContext("2d");

		document.body.appendChild(canvas);
	}
}
