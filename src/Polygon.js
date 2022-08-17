var Shape = require('./Shape.js');
var Point = require('./Point.js');
var Ray = require('./Ray.js');
var Segment = require('./Segment.js');

class Polygon extends Shape {
	#points;
	#segments;

	constructor(...args) {
		const [x, y] = args
			.reduce((pos, pt) => [pos[0] + pt.x, pos[1] + pt.y], [0, 0])
			.map(v => v / args.length);

		super(x, y);

		if (args.length === 1) {
			const [py] = args;

			this.#points = py.points;
			this.#segments = py.segments;
			return;
		}

		let points = null;
		if (Array.isArray(args[0])) {
			points = args[0];
		} else {
			points = args;
		}

		this.#points = points.map(pt => pt.copy);

		const segments = [];
		points.forEach((pt, i) => {
			const nextPt = i === points.length - 1
				? points[0]
				: points[i + 1];

			const s = new Segment(pt, nextPt);
			segments.push(s);
		});

		this.#segments = segments;
	}

	get points() {
		return this.#points.map(pt => pt.copy);
	}

	get segments() {
		return this.#segments.map(sg => sg.copy);
	}

	get copy() {
		return new Polygon(this);
	}

	get isPolygon() {
		return true;
	}

	intersectsPoint(pt, getValues = false) {
		return pt.intersectsPolygon(this, getValues);
	}

	intersectsLine(ln, getValues = false) {
		return ln.intersectsPolygon(this, getValues);
	}

	intersectsRay(ry, getValues = false) {
		return ry.intersectsPolygon(this, getValues);
	}

	intersectsSegment(sg, getValues = false) {
		return sg.intersectsPolygon(this, getValues);
	}

	intersectsPolygon(py, getValues = false) {
		const points = [];
		for (let i = 0; i < this.segments.length; i += 1) {
			const s1 = this.segments[i];
			for (let j = 0; j < py.segments.length; j += 1) {
				const s2 = py.segments[j];
				let pt = s1.intersectsSegment(s2, true);
				if (pt) {
					if (!getValues) return true;
					points.push(...pt);
				}
			}
		}

		if (!getValues) {
			return false;
		}

		return points.length ? points : null;
	}

	intersectsAABB(bx, getValues = false) {
		this.intersectsPolygon(bx, getValues);
	}

	intersectsCircle(ce, getValues = false) {
		const points = [];

		for (let i = 0; i < this.segments.length; i += 1) {
			const sg = this.segments[i];
			const pts = sg.intersectsCircle(ce, true);
			if (pts) {
				if (!getValues) return true;
				points.push(...pts);
			}
		}

		if (!getValues) {
			return false;
		}

		return points.length ? points : null;
	}

	containsPoint(pt) {
		let ry = null;
		for (let i = 0; i < this.segments.length; i += 1) {
			const mpt = this.segments[i].midpoint;
			ry = new Ray(pt, mpt);

			let intersects = false;
			for (let j = 0; j < this.points.length; j += 1) {
				const pt2 = this.points[j];
				if (!!pt2.intersectsRay(ry)) {
					intersects = true;
					break;
				}
			}

			if (!intersects) break;
		}

		// find number of intersects
		const count = this.segments.reduce((c, sg) => {
			return ry.intersectsSegment(sg) ? c + 1 : c;
		}, 0);

		return count % 2 !== 0;
	}

	containsSegment(sg) {
		const intersects = sg.intersectsPolygon(this);
		if (intersects) {
			return false;
		}

		const pt = sg.midpoint;
		return this.containsPoint(pt);
	}

	containsPolygon(py) {
		const intersects = this.intersectsPolygon(py);
		if (intersects) {
			return false;
		}

		const pt = py.points[0];
		return this.containsPoint(pt);
	}

	containsCircle(ce) {
		const intersects = this.intersectsCircle(ce);
		if (intersects) {
			return false;
		}

		const pt = new Point(ce.x, ce.y);
		return this.containsPoint(pt);
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
		const intersects = sg.intersectsPolygon(this);
		if (intersects) {
			return true;
		}

		const pt = sg.midpoint;
		return this.containsPoint(pt);
	}

	overlapsPolygon(py2) {
		const intersects = this.intersectsPolygon(py2);
		if (intersects) {
			return true;
		}

		let pt = py2.points[0];
		const contains = this.containsPoint(pt);
		if (contains) {
			return true;
		}

		pt = py.points[0];
		return py2.containsPoint(pt);
	}

	overlapsCircle(ce) {
		const intersects = this.intersectsCircle(ce);
		if (intersects) {
			return true;
		}

		let pt = new Point(ce.x, ce.y);
		const contains = this.containsPoint(pt);
		if (contains) {
			return true;
		}

		pt = this.points[0];
		return ce.containsPoint(pt);
	}
}

module.exports = Polygon;
