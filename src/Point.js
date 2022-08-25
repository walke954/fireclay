const Geometry = require('./Geometry.js');
const Util = require('./Util.js');
const Linear = require('./Linear.js');

class Point extends Geometry {
	constructor(x, y) {
		super();

		this.x = x;
		this.y = y;
	}

	get copy() {
		return new Point(this.x, this.y);
	}

	get isPoint() {
		return true;
	}

	equals(pt) {
		return Util.equalTo(this.x, pt.x) && Util.equalTo(this.y, pt.y);
	}

	intersectsPoint(pt2, getValues = false) {
		const intersects = this.equals(pt2);
		if (!getValues) return intersects;
		return intersects ? [pt2.copy] : null;
	}

	intersectsLine(ln, getValues = false) {
		const intersects = Util.equalTo((ln.a * this.x) + (ln.b * this.y), ln.c);
		if (!getValues) return intersects;
		return intersects ? [this.copy] : null;
	}

	intersectsRay(ry, getValues = false) {
		let interPt = this.intersectsLine(ry, true);
		if (interPt === null) {
			return getValues ? null : false;
		}

		interPt = interPt[0];

		const interX = ry.signX < 0
			? Util.greaterThenOrEqualTo(ry.origin.x, interPt.x)
			: Util.lessThenOrEqualTo(ry.origin.x, interPt.x);

		const interY = ry.signY < 0
			? Util.greaterThenOrEqualTo(ry.origin.y, interPt.y)
			: Util.lessThenOrEqualTo(ry.origin.y, interPt.y);

		const intersects = interX && interY;

		if (!getValues) return intersects;
		return intersects ? [interPt] : null;
	}

	intersectsSegment(sg, getValues = false) {
		let interPt = this.intersectsLine(sg, true);
		if (interPt === null) {
			return getValues ? null : false;
		}

		interPt = interPt[0].copy;

		const interX =
			Util.greaterThenOrEqualTo(interPt.x, sg.minX)
			&& Util.lessThenOrEqualTo(interPt.x, sg.maxX);
		const interY =
			Util.greaterThenOrEqualTo(interPt.y, sg.minY)
			&& Util.lessThenOrEqualTo(interPt.y, sg.maxY);

		const intersects = interX && interY;

		if (!getValues) return intersects;
		return intersects ? [interPt] : null;
	}

	intersectsPolygon(py, getValues = false) {
		let points = [];

		for (let i = 0; i < py.segments.length; i += 1) {
			const sg = py.segments[i];
			let interPt = this.intersectsSegment(sg, true);
			if (interPt) {
				points.push(...interPt);
				if (!getValues) break;
			}
		}

		if (getValues) {
			if (points.length) {
				return points;
			}
			return null;
		}

		return !!points.length;
	}

	intersectsAABB(bx, getValues = false) {
		this.intersectsPolygon(bx, getValues);
	}

	intersectsCircle(ce, getValues = false) {
		const d = Util.pythdist(ce.x, ce.y, this.x, this.y);
		const intersects = Util.equalTo(d, ce.r);
		if (getValues) {
			return intersects ? [this.copy] : null;
		}
		return intersects;
	}

	overlapsPoint(pt) {
		return this.intersectsPoint(pt);
	}

	overlapsLine(ln) {
		return this.intersectsLine(ln);
	}

	overlapsRay(ry) {
		return this.intersectsRay(ry);
	}

	overlapsSegment(sg) {
		return this.intersectsSegment(sg);
	}

	overlapsPolygon(py) {
		return py.overlapsPoint(this);
	}

	overlapsAABB(bx) {
		const interX = Util.lessThenOrEqualTo(bx.x, this.x)
			&& Util.greaterThenOrEqualTo(bx.x + bx.w, this.x);
		const interY = Util.lessThenOrEqualTo(bx.y, this.y)
			&& Util.greaterThenOrEqualTo(bx.y + bx.h, this.y);
		return interX && interY;
	}

	overlapsCircle(ce) {
		return ce.overlapsPoint(this);
	}
}

module.exports = Point;
