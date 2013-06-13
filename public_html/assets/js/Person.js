function Person(id, name)
{
	this.id = id;
	this.name = name;
}


Person.prototype.print = function()
{
	console.log(this.toString());
}


Person.prototype.toString = function()
{
	return this.id + " " + this.name;
}