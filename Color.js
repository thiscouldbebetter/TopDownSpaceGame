
function Color(name, symbol, componentsRGBA)
{
	this.name = name;
	this.symbol = symbol;
	this.componentsRGBA = componentsRGBA;
	
	this.systemColorRecalculate();
}

{
	// constants
	
	Color.NumberOfComponentsRGB = 3;
	Color.NumberOfComponentsRGBA = 4;
	Color.SystemColorComponentMax = 255;

	// static methods

	Color.getBySymbol = function(symbolToGet)
	{
		var returnValue = Color.Instances._All[symbolToGet];
		return returnValue;
	}

	// methods

	Color.prototype.componentAlpha = function()
	{
		return this.componentsRGBA[3];
	}

	Color.prototype.componentBlue = function()
	{
		return this.componentsRGBA[2];
	}

	Color.prototype.componentGreen = function()
	{
		return this.componentsRGBA[1];
	}

	Color.prototype.componentRed = function()
	{
		return this.componentsRGBA[0];
	}

	Color.prototype.luminance = function()
	{
		var returnValue =  
		(
			this.componentRed()
			+ this.componentGreen()
			+ this.componentBlue()
		) / Color.NumberOfComponentsRGB;

		return returnValue;
	}

	Color.prototype.multiply = function(other)
	{
		var luminance = this.luminance();

		for (var i = 0; i < Color.NumberOfComponentsRGB; i++)
		{
			this.componentsRGBA[i] = other.componentsRGBA[i] * luminance;
		}				

		this.systemColorRecalculate();
	}

	Color.prototype.systemColorRecalculate = function()
	{ 
		this.systemColor = 
			"rgba(" 
			+ Math.floor(this.componentRed() * Color.SystemColorComponentMax) + ","
			+ Math.floor(this.componentGreen() * Color.SystemColorComponentMax) + ","
			+ Math.floor(this.componentBlue() * Color.SystemColorComponentMax) + ","
			+ Math.floor(this.componentAlpha())	
			+ ")";
	}

	Color.prototype.toGray = function()
	{
		var luminance = this.luminance();

		for (var i = 0; i < Color.NumberOfComponentsRGB; i++)
		{
			this.componentsRGBA[i] = luminance;
		}

		this.systemColorRecalculate();

		return this;
	}

	// instances

	Color.Instances = new Color_Instances(); // must defer this?

	function Color_Instances()
	{
		this.Transparent = new Color("Transparent", ".", [0, 0, 0, 0]);

		this.Black 	= new Color("Black", 	"k", [0, 0, 0, 1]);
		this.Blue 	= new Color("Blue", 	"b", [0, 0, 1, 1]);
		this.BlueDark 	= new Color("BlueDark", "B", [0, 0, 0.5, 1]);
		this.Brown	= new Color("Brown", 	"n", [.5, .25, 0, 1]);
		this.Cyan	= new Color("Cyan", 	"c", [0, 1, 1, 1]);
		this.Gray 	= new Color("Gray", 	"a", [0.5, 0.5, 0.5, 1]);
		this.GrayDark 	= new Color("GrayDark", "A", [0.25, 0.25, 0.25, 1]);
		this.Green 	= new Color("Green", 	"g", [0, 1, 0, 1]);
		this.GreenDark 	= new Color("GreenDark","G", [0, 0.5, 0, 1]);
		this.Orange 	= new Color("Orange", 	"o", [1, 0.5, 0, 1]);
		this.Red 	= new Color("Red", 	"r", [1, 0, 0, 1]);
		this.Violet 	= new Color("Violet", 	"v", [1, 0, 1, 1]);
		this.White 	= new Color("White", 	"w", [1, 1, 1, 1]);
		this.Yellow 	= new Color("Yellow", 	"y", [1, 1, 0, 1]);

		this._All = 
		[
			this.Transparent,

			this.Black,
			this.Blue,
			this.BlueDark,
			this.Brown,
			this.Cyan,
			this.Gray,
			this.GrayDark,
			this.Green,
			this.GreenDark,
			this.Orange,
			this.Violet,
			this.Red,
			this.White,
			this.Yellow,
		];

		this._All.addLookups("symbol");
	}	


}
