const PRECISION = 10; // precision when comparing numbers
const ERROR = 1 / (10 ** PRECISION);

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

	get isAABB() {
		return false;
	}

	get isArc() {
		return false;
	}

	get isCircle() {
		return false;
	}

	get isGeometry() {
		return true;
	}

	get isLine() {
		return false;
	}

	get isLinear() {
		return false;
	}

	get isPoint() {
		return false;
	}

	get isPolygon() {
		return false;
	}

	get isRay() {
		return false;
	}

	get isSegment() {
		return false;
	}

	get isShape() {
		return false;
	}

	get isSpaceTree() {
		return false;
	}

	intersectsAABB(g) {
		return false;
	}

	intersectsArc(g) {
		return false;
	}

	intersectsCircle(g) {
		return false;
	}

	intersectsLine(g) {
		return false;
	}

	intersectsPoint(g) {
		return false;
	}

	intersectsPolygon(g) {
		return false;
	}

	intersectsRay(g) {
		return false;
	}

	intersectsSegment(g) {
		return false;
	}

	intersects(g, getValues = false) {
		if (g.isShape) {
			if (g.isAABB) {
				return this.intersectsAABB(g, getValues);
			}

			if (g.isPolygon) {
				return this.intersectsPolygon(g, getValues);
			}

			if (g.isCircle) {
				return this.intersectsCircle(g, getValues);
			}
		}

		if (g.isLinear) {
			if (g.isLine) {
				return this.intersectsLine(g, getValues);
			}

			if (g.isRay) {
				return this.intersectsRay(g, getValues);
			}

			if (g.isSegment) {
				return this.intersectsSegment(g, getValues);
			}
		}

		if (g.isPoint) {
			return this.intersectsPoint(g, getValues);
		}

		return false;
	}

	containsAABB(g) {
		return false;
	}

	containsArc(g) {
		return false;
	}

	containsCircle(g) {
		return false;
	}

	containsLine(g) {
		return false;
	}

	containsPoint(g) {
		return false;
	}

	containsPolygon(g) {
		return false;
	}

	containsRay(g) {
		return false;
	}

	containsSegment(g) {
		return false;
	}

	contains(g) {
		if (g.isShape) {
			if (g.isAABB) {
				return this.containsAABB(g);
			}

			if (g.isPolygon) {
				return this.containsPolygon(g);
			}

			if (g.isCircle) {
				return this.containsCircle(g);
			}
		}

		if (g.isLinear) {
			if (g.isLine) {
				return this.containsLine(g);
			}

			if (g.isRay) {
				return this.containsRay(g);
			}

			if (g.isSegment) {
				return this.containsSegment(g);
			}
		}

		if (g.isPoint) {
			return this.containsPoint(g);
		}

		return false;
	}

	overlapsAABB(g) {
		return false;
	}

	overlapsArc(g) {
		return false;
	}

	overlapsCircle(g) {
		return false;
	}

	overlapsLine(g) {
		return false;
	}

	overlapsPoint(g) {
		return false;
	}

	overlapsPolygon(g) {
		return false;
	}

	overlapsRay(g) {
		return false;
	}

	overlapsSegment(g) {
		return false;
	}

	overlaps(g) {
		if (g.isShape) {
			if (g.isAABB) {
				return this.overlapsAABB(g);
			}

			if (g.isPolygon) {
				return this.overlapsPolygon(g);
			}

			if (g.isCircle) {
				return this.overlapsCircle(g);
			}
		}

		if (g.isLinear) {
			if (g.isLine) {
				return this.overlapsLine(g);
			}

			if (g.isRay) {
				return this.overlapsRay(g);
			}

			if (g.isSegment) {
				return this.overlapsSegment(g);
			}
		}

		if (g.isPoint) {
			return this.overlapsPoint(g);
		}

		return false;
	}
}

module.exports = Geometry;
