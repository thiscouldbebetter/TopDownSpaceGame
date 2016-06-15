
// tests

function Tests()
{
	// static class
}
{
	Tests.run = function()
	{
		Tests.bounds();
	}

	Tests.bounds = function()
	{
		var bounds0 = new Bounds(new Coords(0, 0), new Coords(1, 1));
		var bounds1 = new Bounds(new Coords(0.1, 0.1), new Coords(0.9, 0.9));
		var bounds2 = new Bounds(new Coords(0.5, 0.5), new Coords(1.5, 1.5));
		var bounds3 = new Bounds(new Coords(2, 2), new Coords(3, 3));

		if (bounds0.overlapWith(bounds1) == false)
		{
			throw "failed"
		}

		if (bounds0.overlapWith(bounds2) == false)
		{
			throw "failed"
		}		

		else if (bounds0.overlapWith(bounds3) == true)
		{
			throw "failed"
		}
		
	}
}
