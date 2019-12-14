
function StarsystemDefn(name, inputToActionMappings)
{
	this.name = name;
	this.inputToActionMappings = inputToActionMappings.addLookups("inputName");
}
