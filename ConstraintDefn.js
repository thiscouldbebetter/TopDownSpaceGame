
function ConstraintDefn(name, methodToRun)
{
	this.name = name;
	this.methodToRun = methodToRun;
}

{
	ConstraintDefn.Instances = new ConstraintDefn_Instances();

	function ConstraintDefn_Instances()
	{
		this.follow = new ConstraintDefn
		(
			"Follow",
			function (constraint)
			{
				var entityConstrained = constraint.entityConstrained;

				// hack
				var entityToFollow = entityConstrained.body.loc.venue.entitiesByPropertyName
				[
					"Player"
				][0];

				entityConstrained.body.loc.pos.overwriteWith
				(
					entityToFollow.body.loc.pos
				);
			}
		)
	}
}
