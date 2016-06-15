
function Heading()
{}
{
	// constants

	Heading.NumberOfHeadings = 8;
	Heading.RadiansInCircle = 2 * Math.PI;
	Heading.RadiansPerHeading = 
		Heading.RadiansInCircle 
		/ Heading.NumberOfHeadings;

	// static methods

	Heading.fromCoords = function(coordsToConvert, numberOfHeadings)
	{
		var angleInRadians = Math.atan2
		(
			coordsToConvert.y, coordsToConvert.x
		);

		if (coordsToConvert.y < 0)
		{
			angleInRadians += Heading.RadiansInCircle;
		}

		var heading = Math.round
		(
			angleInRadians 
			* numberOfHeadings 
			/ Heading.RadiansInCircle
		);

		if (heading == Heading.NumberOfHeadings)
		{
			heading = 0;
		}

		return heading;
	}
}
