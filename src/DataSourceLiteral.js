
function DataSourceLiteral(value)
{
	this.value = value;
}
{
	DataSourceLiteral.prototype.evaluate = function()
	{
		return this.value;
	}
}
