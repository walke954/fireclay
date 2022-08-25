const defaultGetters = [
	['isAABB', false],
	['isArc', false],
	['isCircle', false],
	['isGeometry', true],
	['isLine', false],
	['isLinear', false],
	['isPoint', false],
	['isPolygon', false],
	['isRay', false],
	['isSegment', false],
	['isShape', false],
	['isSpaceTree', false],
];

const defaultMethods = [
	['intersectsAABB', false],
	['intersectsArc', false],
	['intersectsCircle', false],
	['intersectsLine', false],
	['intersectsPoint', false],
	['intersectsPolygon', false],
	['intersectsRay', false],
	['intersectsSegment', false],
	['containsAABB', false],
	['containsArc', false],
	['containsCircle', false],
	['containsLine', false],
	['containsPoint', false],
	['containsPolygon', false],
	['containsRay', false],
	['containsSegment', false],
	['overlapsAABB', false],
	['overlapsArc', false],
	['overlapsCircle', false],
	['overlapsLine', false],
	['overlapsPoint', false],
	['overlapsPolygon', false],
	['overlapsRay', false],
	['overlapsSegment', false],
	['triangulateOutline', []],
	['triangulateFill', []],
];

class Geometry {
	#getGeometryFunc(g, keyword, getValues) {
		if (g.isShape) {
			if (g.isAABB) {
				return this[`${keyword}AABB`](g, getValues);
			}

			if (g.isPolygon) {
				return this[`${keyword}Polygon`](g, getValues);
			}

			if (g.isCircle) {
				return this[`${keyword}Circle`](g, getValues);
			}
		}

		if (g.isLinear) {
			if (g.isLine) {
				return this[`${keyword}Line`](g, getValues);
			}

			if (g.isRay) {
				return this[`${keyword}Ray`](g, getValues);
			}

			if (g.isSegment) {
				return this[`${keyword}Segment`](g, getValues);
			}
		}

		if (g.isPoint) {
			return this[`${keyword}Point`](g, getValues);
		}

		return false;
	}

	intersects(g, getValues = false) {
		return this.#getGeometryFunc(g, 'intersects', getValues);
	}

	contains(g) {
		return this.#getGeometryFunc(g, 'contains');
	}

	overlaps(g) {
		return this.#getGeometryFunc(g, 'overlaps');
	}
}

defaultGetters.forEach(([key, val]) => {
	const descriptor = {
		get: () => val
	};
	Object.defineProperty(Geometry.prototype, key, descriptor);
});

defaultMethods.forEach(([key, val]) => {
	const descriptor = {
		writable: true,
		value: () => val
	};
	Object.defineProperty(Geometry.prototype, key, descriptor);
});

module.exports = Geometry;
