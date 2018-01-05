function Star(name, color)
{
	this.name = name;
	this.color = color;
}
{
	Star.prototype.propertyName = function() { return "Star"; }

	Star.prototype.initializeEntityForVenue = function(universe, entity, venue)
	{
		entity.drawable.visual = new VisualGroup
		(
			[
				entity.drawable.visual,
				new VisualOffset
				(
					new VisualText(this.name, "White", "Black"),
					new Coords(0, 20)
				),
			]
		);
	}
}
