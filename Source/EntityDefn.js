
function EntityDefn
(
	name,
	properties
)
{
	this.name = name;
	this.properties = properties;

	for (var i = 0; i < this.properties.length; i++)
	{
		var property = this.properties[i];
		var propertyName = Entity.propertyName(property);
		this.properties[propertyName] = property;
		this[propertyName.toLowerCase()] = property;
	}
}
