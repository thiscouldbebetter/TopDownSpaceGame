
function ImageHelper()
{
	// do nothing
}

{
	// methods

	ImageHelper.prototype.applyColorFunctionToImage = function
	(
		image, nameOfColorFunctionToApply, argumentForColorFunction
	)
	{
		var canvasAndGraphics = this.imageToCanvasAndGraphicsContext(image);
		var canvas = canvasAndGraphics[0];
		var graphics = canvasAndGraphics[1];

		var imageSizeInPixels = image.sizeInPixels;
		var pixelPos = new Coords();
		var pixelColor = new Color("Color", "x", [.1, .2, .3, 1]);

		for (var y = 0; y < imageSizeInPixels.y; y++)
		{
			pixelPos.y = y;

			for (var x = 0; x < imageSizeInPixels.x; x++)
			{
				pixelPos.x = x;

				this.overwriteColorWithPixelFromGraphicsAtPos
				(
					pixelColor, graphics, pixelPos
				);

				pixelColor[nameOfColorFunctionToApply](argumentForColorFunction);

				graphics.fillStyle = pixelColor.systemColor();
				graphics.fillRect(pixelPos.x, pixelPos.y, 1, 1);
			}
		}

		var imageProcessed = this.canvasToImage
		(
			image.name,
			canvas
		);

		image.sourcePath = imageProcessed.sourcePath;
		image.systemImage = imageProcessed.systemImage;

		return image;
	}

	ImageHelper.prototype.buildImageFromStrings = function(name, stringsForPixels)
	{
		return this.buildImageFromStringsScaled
		(
			name, Coords.Instances().Ones, stringsForPixels
		);
	}

	ImageHelper.prototype.buildImagesFromStringArrays = function(name, stringArraysForImagePixels)
	{
		var returnValue = [];

		for (var i = 0; i < stringArraysForImagePixels.length; i++)
		{
			var stringsForImagePixels = stringArraysForImagePixels[i];
			var image = this.buildImageFromStrings(name + i, stringsForImagePixels);
			returnValue.push(image);
		}

		return returnValue;
	}

	ImageHelper.prototype.buildImageFromStringsScaled = function(name, scaleFactor, stringsForPixels)
	{
		var sizeInPixels = new Coords(stringsForPixels[0].length, stringsForPixels.length);

		var canvas = document.createElement("canvas");
		canvas.width = sizeInPixels.x * scaleFactor.x;
		canvas.height = sizeInPixels.y * scaleFactor.y;

		var graphics = canvas.getContext("2d");

		var pixelPos = new Coords(0, 0);
		var colorForPixel = Color.Instances()._Transparent;

		colors = Color.Instances()._All;

		for (var y = 0; y < sizeInPixels.y; y++)
		{
			var stringForPixelRow = stringsForPixels[y];
			pixelPos.y = y * scaleFactor.y;

			for (var x = 0; x < sizeInPixels.x; x++)
			{
				var charForPixel = stringForPixelRow[x];
				pixelPos.x = x * scaleFactor.x;

				colorForPixel = colors[charForPixel];

				graphics.fillStyle = colorForPixel.systemColor();
				graphics.fillRect
				(
					pixelPos.x, pixelPos.y,
					scaleFactor.x, scaleFactor.y
				);
			}
		}

		var returnValue = this.canvasToImage(name, canvas);

		return returnValue;
	}

	ImageHelper.prototype.buildImageFromStringsTiled = function(name, sizeInTiles, stringsForPixels)
	{
		var tileSizeInPixels = new Coords(stringsForPixels[0].length, stringsForPixels.length);

		var canvas = document.createElement("canvas");
		canvas.width = tileSizeInPixels.x * sizeInTiles.x;
		canvas.height = tileSizeInPixels.y * sizeInTiles.y;

		var graphics = canvas.getContext("2d");

		var pixelPos = new Coords(0, 0);
		var colorForPixel = Color.Instances()._Transparent;

		var colors = Color.Instances()._All;

		for (var j = 0; j < sizeInTiles.y; j++)
		{
			for (var i = 0; i < sizeInTiles.x; i++)
			{
				for (var y = 0; y < tileSizeInPixels.y; y++)
				{
					var stringForPixelRow = stringsForPixels[y];
					pixelPos.y = j * tileSizeInPixels.y + y;

					for (var x = 0; x < tileSizeInPixels.x; x++)
					{
						var charForPixel = stringForPixelRow[x];
						pixelPos.x = i * tileSizeInPixels.x + x;

						colorForPixel = colors[charForPixel];

						graphics.fillStyle = colorForPixel.systemColor();
						graphics.fillRect
						(
							pixelPos.x,
							pixelPos.y,
							1,
							1
						);
					}
				}
			}
		}

		var returnValue = this.canvasToImage(name, canvas);

		return returnValue;
	}

	ImageHelper.prototype.canvasToImage = function(name, canvas)
	{
		var imageFromCanvasURL = canvas.toDataURL("image/png");

		var systemImage = document.createElement("img");
		systemImage.width = canvas.width;
		systemImage.height = canvas.height;
		systemImage.src = imageFromCanvasURL;

		var returnValue = Image.fromSystemImage(name, systemImage);

		return returnValue;
	}

	ImageHelper.prototype.imageToCanvasAndGraphicsContext = function(image)
	{
		var canvas = document.createElement("canvas");
		var imageSizeInPixels = image.sizeInPixels;
		canvas.width = imageSizeInPixels.x;
		canvas.height = imageSizeInPixels.y;

		var graphics = canvas.getContext("2d");

		graphics.drawImage
		(
			image.systemImage,
			0, 0
		);

		return [ canvas, graphics ];
	}

	ImageHelper.prototype.overwriteColorWithPixelFromGraphicsAtPos = function(color, graphics, pixelPos)
	{
		var pixelColorAsComponentsRGBA = graphics.getImageData(pixelPos.x, pixelPos.y, 1, 1).data;

		for (var i = 0; i < Color.NumberOfComponentsRGBA; i++)
		{
			color.componentsRGBA[i] =
				pixelColorAsComponentsRGBA[i]
				/ Color.SystemColorComponentMax;
		}

		color._systemColor = null;
	}

	ImageHelper.prototype.sliceImageIntoTiles = function(imageToSlice, sizeInTiles)
	{
		var returnImages = [];

		var systemImageToSlice = imageToSlice.systemImage;

		var imageToSliceSize = new Coords
		(
			systemImageToSlice.width,
			systemImageToSlice.height
		);
		var tileSize = imageToSliceSize.clone().divide(sizeInTiles);

		var tilePos = new Coords(0, 0);
		var sourcePos = new Coords(0, 0);

		for (var y = 0; y < sizeInTiles.y; y++)
		{
			tilePos.y = y;

			var returnImageRow = [];

			for (var x = 0; x < sizeInTiles.x; x++)
			{
				tilePos.x = x;

				var canvas		 = document.createElement("canvas");
				canvas.id		 = "tile_" + x + "_" + y;
				canvas.width		 = tileSize.x;
				canvas.height		 = tileSize.y;
				canvas.style.position	 = "absolute";

				var graphics = canvas.getContext("2d");

				sourcePos.overwriteWith(tilePos).multiply(tileSize);

				graphics.drawImage
				(
					systemImageToSlice,
					sourcePos.x, sourcePos.y, // source pos
					tileSize.x, tileSize.y, // source size
					0, 0, // destination pos
					tileSize.x, tileSize.y // destination size
				);

				var imageFromCanavs = this.canvasToImage("Tile", canvas);

				returnImageRow.push(imageFromCanvas);
			}

			returnImages.push(returnImageRow);
		}

		return returnImages;
	}
}
