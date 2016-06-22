
function Planet(name, color)
{
	this.name = name;
	this.color = color;

	this.itemTradeOffer = ItemTradeOffer.random();
}
{
	Planet.prototype.propertyName = function() { return "Planet"; }

	Planet.prototype.initializeEntityForVenue = function(entity, venue)
	{
		// todo - Move this to PlanetDefn.
		
		entity.drawable.visual = new VisualSet
		(
			[
				entity.drawable.visual,
				new VisualOffset
				(
					new VisualText(new DataSourceLiteral(this.name)),
					new Coords(0, 20)
				),
				new VisualOffset
				(
					new VisualText
					(
						new DataSourceEntity
						(
							function(entity) 
							{
								return entity.planet.itemTradeOffer.toString()
							}
						)
					),
					new Coords(0, 30)
				),				
			]
		);
	}
}
