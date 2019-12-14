
function DataSourceLiteral(value)
{
	this.value = value;
}
{
	DataSourceLiteral.prototype.get = function()
	{
		return this.value;
	}
}
