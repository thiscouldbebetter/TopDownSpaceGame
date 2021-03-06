
class VisualRepeating
{
	constructor(cellSize, viewSize, child)
	{
		this.cellSize = cellSize;
		this.viewSize = viewSize;
		this.child = child;

		this.viewSizeInCells = this.viewSize.clone().divide
		(
			this.cellSize
		);

		this._cellPos = new Coords();
		this._drawOffset = new Coords();
		this._drawPosWrapped = new Coords();
		this._drawablePosToRestore = new Coords();
	}

	draw(universe, world, place, entity, display)
	{
		var drawPos = entity.locatable().loc.pos;

		this._drawablePosToRestore.overwriteWith(drawPos);

		var drawPosWrapped = this._drawPosWrapped.overwriteWith
		(
			drawPos
		).wrapToRangeMax(this.cellSize);

		var cellPos = this._cellPos;
		var viewSizeInCells = this.viewSizeInCells;

		for (var z = -1; z < viewSizeInCells.z; z++)
		{
			cellPos.z = z;

			for (var y = -1; y < viewSizeInCells.y; y++)
			{
				cellPos.y = y;

				for (var x = -1; x < viewSizeInCells.x; x++)
				{
					cellPos.x = x;

					drawPos.overwriteWith
					(
						this._drawOffset.overwriteWith(cellPos).multiply
						(
							this.cellSize
						)
					).add
					(
						drawPosWrapped
					);

					this.child.draw(universe, world, place, entity, display);
				}
			}
		}

		drawPos.overwriteWith(this._drawablePosToRestore);
	}
}
