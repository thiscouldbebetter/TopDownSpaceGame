
function PortalData(destinationVenueName, destinationPos, color)
{
	this.destinationVenueName = destinationVenueName;
	this.destinationPos = destinationPos;
}

{
	PortalData.prototype.propertyName = function() { return "Portal"; }
	
	PortalData.prototype.initializeEntityForVenue = function(entity, venue)
	{		
		entity.drawable.visual = new VisualSet
		(
			"Portal-PlusText",
			[				
				entity.drawable.visual,
				new VisualText("Portal"),
			]
		);
	}
}
