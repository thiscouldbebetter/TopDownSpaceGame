
class VisualRepeating implements VisualBase
{
	cellSize: Coords;
	viewSize: Coords;
	child: any;

	viewSizeInCells: Coords;
	_cellPos: Coords;
	_drawOffset: Coords;
	_drawPosWrapped: Coords;
	_drawablePosToRestore: Coords;

	constructor(cellSize: Coords, viewSize: Coords, child: any)
	{
		this.cellSize = cellSize;
		this.viewSize = viewSize;
		this.child = child;

		this.viewSizeInCells = this.viewSize.clone().divide
		(
			this.cellSize
		);

		this._cellPos = Coords.create();
		this._drawOffset = Coords.create();
		this._drawPosWrapped = Coords.create();
		this._drawablePosToRestore = Coords.create();
	}

	draw(universeWorldPlaceEntities: UniverseWorldPlaceEntities, display: Display): void
	{
		var entity = universeWorldPlaceEntities.entity;

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

					this.child.draw(universeWorldPlaceEntities, display);
				}
			}
		}

		drawPos.overwriteWith(this._drawablePosToRestore);
	}

	// VisualBase.

	clone(): VisualBase { return this; }
	overwriteWith(other: VisualBase): VisualBase { return this; }
	transform(transformToApply: TransformBase): VisualBase { return this; }

}
