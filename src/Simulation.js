// application

function Simulation()
{}
{
	Simulation.prototype.main = function()
	{
		var universe = new Demo().universeGrid(new Coords(10, 10));

		Globals.Instance.initialize
		(
			100, //realWorldMillisecondsPerTick,
			new Coords(600, 600), //viewSizeInPixels, 
			universe
		);
	}
}
