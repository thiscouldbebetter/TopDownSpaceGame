
function Planet(color)
{
	this.color = color;
}

{
	Planet.prototype.propertyName = function() { return "Planet"; }

	Planet.prototype.initializeEntityForVenue = function(entity, venue)
	{
		entity.drawable.visual = new VisualSet
		(
			[
				entity.drawable.visual,
				new VisualText(new DataSourceLiteral("PLANET")),
			]
		);
	}
}
