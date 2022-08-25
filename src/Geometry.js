const PRECISION = 10; // precision when comparing numbers
const ERROR = 1 / (10 ** PRECISION);

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
	static equalTo(v1, v2) {
		const v = v1 - v2;
		return v <= ERROR / 2 && v >= -ERROR / 2;
	}

	static greaterThen(v1, v2) {
		return v1 > v2 - ERROR;
	}

	static lessThen(v1, v2) {
		return v1 < v2 + ERROR;
	}

	static greaterThenOrEqualTo(v1, v2) {
		return v1 >= v2 - ERROR;
	}

	static lessThenOrEqualTo(v1, v2) {
		return v1 <= v2 + ERROR;
	}

	static pythdist(x1, y1, x2, y2) {
		return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
	}

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
