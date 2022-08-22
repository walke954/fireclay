const Geometry = require('./Geometry.js');
const Linear = require('./Linear.js');
const Point = require('./Point.js');
const Line = require('./Line.js');
const Segment = require('./Segment.js');

class Ray extends Linear {
	#origin;
	#signX;
	#signY;

	constructor(...args) {
		if (args.length < 2) {
			const [ry] = args;
			super(ry.a, ry.b, ry.c);

			this.#origin = ry.origin;
			this.#signX = ry.signX;
			this.#signY = ry.signY;
			return;
		}

		const [origin, midpoint] = args;
		super(origin, midpoint);

		this.#origin = origin.copy;
		this.#signX = Math.sign(midpoint.x - origin.x);
		this.#signY = Math.sign(midpoint.y - origin.y);
	}

	get origin() {
		return this.#origin.copy;
	}

	get signX() {
		return this.#signX;
	}

	get signY() {
		return this.#signY;
	}

	get copy() {
		return new Ray(this);
	}

	get line() {
		return new Line(this.a, this.b, this.c);
	}

	get isRay() {
		return true;
	}

	equals(ry) {
		return super.equals(ry)
			&& this.origin.equals(ry.origin)
			&& Geometry.equalTo(this.signX, ry.signX)
			&& Geometry.equalTo(this.signY, ry.signY);
	}

	intersectsPoint(pt, getValues = false) {
		return pt.intersectsRay(this, getValues);
	}

	intersectsLine(ln, getValues = false) {
		return ln.intersectsRay(this, getValues);
	}

	intersectsRay(ry2, getValues = false) {
		const g = this.line.intersectsRay(ry2, true);
		if (!g) {
			return getValues ? null : false;
		}
		if (g.isRay) {
			const signX = Math.sign(g.origin.x - this.origin.x);
			const intersects = this.signX === signX || signX === 0;

			if (!getValues) return intersects;
			if (!intersects) return null;

			if (this.signX === g.signX) {
				return g.copy;
			}

			return new Segment(this.origin, g.origin);
		}
		return this.intersectsPoint(g[0], getValues);
	}

	intersectsSegment(sg, getValues = false) {
		let g = sg.line.intersectsRay(this, true);
		if (!g) {
			return getValues ? null : false;
		}

		g = g[0];
		if (g.isSegment) {
			const noOriginInter =
				Geometry.greaterThen(this.origin.x, g.maxX)
				|| Geometry.lessThen(this.origin.x, g.minX)
			const noIntersect =
				noOriginInter && Math.sign(g.minX - this.origin.x) !== this.signX;

			if (noIntersect) {
				return getValues ? null : false;
			}

			if (!getValues) {
				return true;
			}

			if (noOriginInter) {
				return [sg.copy];
			}

			if (this.signX === -1) {
				const minPt = sg.points.find(pt => pt.x === sg.minX);
				return minPt.equals(this.origin)
					? [this.origin.copy]
					: [new Segment(minPt, this.origin)];
			}

			const maxPt = sg.points.find(pt => pt.x === sg.maxX);
			return maxPt.equals(this.origin)
				? [this.origin.copy]
				: [new Segment(maxPt, this.origin)];
		}

		return g.intersectsSegment(sg, getValues);
	}

	intersectsPolygon(py, getValues = false) {
		const vals = [];

		for (let i = 0; i < py.segments.length; i += 1) {
			const sg = py.segments[i];
			let g = this.intersectsSegment(sg, true);
			if (g) {
				vals.push(...g);
				if (!getValues) break;
			}
		}

		if (!getValues) return !!vals.length;

		return vals.length ? vals : null;
	}

	intersectsAABB(bx, getValues = false) {
		return this.intersectsPolygon(bx, getValues);
	}

	intersectsCircle(ce, getValues = false) {
		let pts = this.line.intersectsCircle(ce, true);
		if (!pts) {
			return getValues ? null : false;
		}
		pts = pts.filter((pt) => pt.intersectsRay(this));

		if (!getValues) {
			return !!pts.length;
		}

		return pts.length ? pts : null;
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
		return this.intersectsPolygon(py);
	}

	overlapsAABB(bx) {
		return this.intersectsPolygon(bx);
	}

	overlapsCircle(ce) {
		return this.intersectsCircle(ce);
	}
}

module.exports = Ray;
