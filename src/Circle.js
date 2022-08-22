const Geometry = require('./Geometry.js');
const Shape = require('./Shape.js');
const Point = require('./Point.js');

class Circle extends Shape {
	#r;

	constructor(x, y, r) {
		super(x, y);

		this.#r = r;
	}

	get r() {
		return this.#r;
	}

	get copy() {
		return new Circle(this.x, this.y, this.r);
	}

	get isCircle() {
		return true;
	}

	intersectsPoint(pt, getValues = false) {
		return pt.intersectsCircle(this, getValues);
	}

	intersectsLine(ln, getValues = false) {
		return ln.intersectsCircle(this, getValues);
	}

	intersectsRay(ry, getValues = false) {
		return ry.intersectsCircle(this, getValues);
	}

	intersectsSegment(sg, getValues = false) {
		return sg.intersectsCircle(this, getValues);
	}

	intersectsPolygon(py, getValues = false) {
		return py.intersectsCircle(this, getValues);
	}

	intersectsAABB(bx, getValues = false) {
		this.intersectsPolygon(bx, getValues);
	}

	intersectsCircle(ce, getValues = false) {
		if (this.x === ce.x && this.y === ce.y) {
			return getValues ? null : false;
		}

		const d = Geometry.pythdist(this.x, this.y, ce.x, ce.y);
		if (d >= this.r + ce.r || d <= Math.abs(this.r - ce.r)) {
			return getValues ? null : false;
		}

		if (!getValues) return true;

		const a = ((this.r ** 2) - (ce.r ** 2) + (d ** 2)) / (2 * d);
		const h = Math.sqrt((this.r ** 2) - (a ** 2));

		const mpt = new Point(
			this.x + ((a / d) * (ce.x - this.x)),
			this.y + ((a / d) * (ce.y - this.y))
		);

		return [
			new Point(
				mpt.x + ((h / d) * (ce.y - this.y)),
				mpt.y - ((h / d) * (ce.x - this.x))
			),
			new Point(
				mpt.x - ((h / d) * (ce.y - this.y)),
				mpt.y + ((h / d) * (ce.x - this.x))
			)
		];
	}

	containsPoint(pt) {
		const d = Geometry.pythdist(this.x, this.y, pt.x, pt.y);
		return d < this.r;
	}

	containsSegment(sg) {
		for (let i = 0; i < sg.points.length; i += 1) {
			const pt = sg.points[i];
			const contains = this.containsPoint(pt);
			if (!contains) {
				return false;
			}
		}
		
		return true;
	}

	containsPolygon(py) {
		for (let i = 0; i < py.points.length; i += 1) {
			const pt = py.points[i];
			const d = Geometry.pythdist(this.x, this.y, pt.x, pt.y);
			if (Geometry.greaterThenOrEqualTo(d, this.r)) {
				return false;
			}
		}

		return true;
	}

	containsAABB(bx) {
		this.containsPolygon(bx);
	}

	containsCircle(ce) {
		const d = Geometry.pythdist(this.x, this.y, ce.x, ce.y);
		return d < Math.abs(this.r - ce.r);
	}

	overlapsPoint(pt) {
		return this.intersectsPoint(pt)
			|| this.containsPoint(pt);
	}

	overlapsLine(ln) {
		return this.intersectsLine(ln);
	}

	overlapsRay(ry) {
		return this.intersectsRay(ry);
	}

	overlapsSegment(sg) {
		return this.containsSegment(sg)
			|| this.intersectsSegment(sg);
	}

	overlapsPolygon(py) {
		return py.overlapsCircle(this);
	}

	overlapsAABB(bx) {
		return this.overlapsPolygon(bx);
	}

	overlapsCircle(ce2) {
		return this.containsCircle(ce2)
			|| ce2.containsCircle(this)
			|| this.intersectsCircle(ce2);
	}
}

module.exports = Circle;
