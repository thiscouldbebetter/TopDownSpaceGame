
function Display(sizeInPixels)
{
	this.sizeInPixels = sizeInPixels;

	// temporary variables
	this.drawPos = new Coords();
}

{
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

	Display.prototype.drawRectangle = function(pos, size, systemColorFill, systemColorStroke)
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
			"Black", 
			"Gray"
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
			"DarkBlue",
			"Gray"
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

		this.graphics = canvas.getContext("2d");

		document.body.appendChild(canvas);
	}
}
