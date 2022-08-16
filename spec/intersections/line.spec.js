const {Point, Line, Ray, Segment, Polygon, Circle} = require('../../src');

describe('Line', () => {
  it('should intersect point', () => {
    const pt = new Point(3, 6);
    const ln = new Line(5, 8, 63);

    const bool = ln.intersectsPoint(pt);
    expect(bool).toBe(true);

    const [interPt] = ln.intersectsPoint(pt, true);
    expect(interPt).toBeInstanceOf(Point);
    expect(pt.equals(interPt)).toBe(true);
  });

  it('should not intersect point', () => {
    const pt = new Point(3, 6);
    const ln = new Line(5, 8, 5);

    const bool = ln.intersectsPoint(pt);
    expect(bool).toBe(false);

    const interPt = ln.intersectsPoint(pt, true);
    expect(interPt).toBe(null);
  });

  it('should intersect line', () => {
  	const pt = new Point(3, 6);
    const ln1 = new Line(
    	new Point(4, -2),
    	new Point(2, 14)
    );
    const ln2 = new Line(
    	new Point(1, 5),
    	new Point(7, 8)
    );

    const bool = ln1.intersectsLine(ln2);
    expect(bool).toBe(true);

    const [interPt] = ln1.intersectsLine(ln2, true);
    expect(interPt).toBeInstanceOf(Point);
    expect(pt.equals(interPt)).toBe(true);
  });

  it('should not intersect line', () => {
    const ln1 = new Line(5, 8, 63);
    const ln2 = new Line(5, 8, 5);

    const bool = ln1.intersectsLine(ln2);
    expect(bool).toBe(false);

    const interPt = ln1.intersectsLine(ln2, true);
    expect(interPt).toBe(null);
  });

  it('should intersect ray', () => {
    const pt = new Point(3, 6);
    const ln = new Line(
    	new Point(4, -2),
    	new Point(2, 14)
    );
    const ry = new Ray(
    	new Point(1, 5),
    	new Point(7, 8)
    );

    const bool = ln.intersectsRay(ry);
    expect(bool).toBe(true);

    const [interPt] = ln.intersectsRay(ry, true);
    expect(interPt).toBeInstanceOf(Point);
    expect(pt.equals(interPt)).toBe(true);
  });

  it('should not intersect ray', () => {
    const pt = new Point(3, 6);
    const ln = new Line(
    	new Point(4, -2),
    	new Point(2, 14)
    );
    const ry1 = new Ray(
    	new Point(7, 8),
    	new Point(13, 11)
    );
    const ry2 = new Ray(
    	new Point(4, -1),
    	new Point(2, 15)
    );

    const bool1 = ln.intersectsRay(ry1);
    expect(bool1).toBe(false);
    const bool2 = ln.intersectsRay(ry2);
    expect(bool2).toBe(false);

    const interPt1 = ln.intersectsRay(ry1, true);
    expect(interPt1).toBe(null);
    const interPt2 = ln.intersectsRay(ry2, true);
    expect(interPt2).toBe(null);
  });

  it('should intersect segment', () => {
    const pt = new Point(3, 6);
    const ln = new Line(
    	new Point(4, -2),
    	new Point(2, 14)
    );
    const start = new Point(7, 8);
    const end = new Point(1, 5);
    const sg = new Segment(start, end);

    const bool = ln.intersectsSegment(sg);
    expect(bool).toBe(true);

    const [interPt] = ln.intersectsSegment(sg, true);
    expect(interPt).toBeInstanceOf(Point);
    expect(pt.equals(interPt)).toBe(true);
  });

  it('should not intersect segment', () => {
    const ln = new Line(
    	new Point(4, -2),
    	new Point(2, 14)
    );
    const start = new Point(5, 7);
    const end1 = new Point(7, 8);
    const end2 = new Point(3, 16);
    const sg1 = new Segment(start, end1);
    const sg2 = new Segment(start, end2);

    const bool1 = ln.intersectsSegment(sg1);
    expect(bool1).toBe(false);
    const bool2 = ln.intersectsSegment(sg2);
    expect(bool2).toBe(false);

    const interPt1 = ln.intersectsSegment(sg1, true);
    expect(interPt1).toBe(null);
    const interPt2 = ln.intersectsSegment(sg2, true);
    expect(interPt2).toBe(null);
  });

  it('should intersect polygon', () => {
    const pt = new Point(3, 6);
    const pt2 = new Point(4, -2);
    const ln = new Line(
    	new Point(4, -2),
    	new Point(2, 14)
    );
    const py = new Polygon(
      new Point(7, 8),
      new Point(1, 5),
      new Point(4, -2),
    );

    const bool = ln.intersectsPolygon(py);
    expect(bool).toBe(true);

    const [interPt1, interPt2] = ln.intersectsPolygon(py, true);
    expect(interPt1).toBeInstanceOf(Point);
    expect(interPt1.x).toBe(pt.x);
    expect(interPt1.y).toBe(pt.y);
    expect(interPt2).toBeInstanceOf(Point);
    expect(interPt2.x).toBe(pt2.x);
    expect(interPt2.y).toBe(pt2.y);
  });

  it('should not intersect polygon', () => {
    const ln = new Line(
    	new Point(2, 14),
    	new Point(0, 10)
    );
    const py = new Polygon(
      new Point(3, 8),
      new Point(1, 5),
      new Point(4, -2),
    );

    const bool = ln.intersectsPolygon(py);
    expect(bool).toBe(false);

    const interPt = ln.intersectsPolygon(py, true);
    expect(interPt).toBe(null);
  });

  it('should intersect circle', () => {
  	const pt1 = new Point(3.738461538461537, 0.09230769230769198);
  	const pt2 = new Point(3, 6);
    const ln = new Line(
    	new Point(4, -2),
    	new Point(2, 14)
    );
    const ce = new Circle(3, 3, 3);

    const bool = ln.intersectsCircle(ce);
    expect(bool).toBe(true);

    const [interPt1, interPt2] = ln.intersectsCircle(ce, true);
    expect(interPt1).toBeInstanceOf(Point);
    expect(pt1.equals(interPt1)).toBe(true);
    expect(interPt2).toBeInstanceOf(Point);
    expect(pt2.equals(interPt2)).toBe(true);
  });

  it('should not intersect circle', () => {
    const ln = new Line(
    	new Point(4, -2),
    	new Point(7, 8)
    );
    const ce = new Circle(3, 4, 2);

    const bool = ln.intersectsCircle(ce);
    expect(bool).toBe(false);

    const interPt = ln.intersectsCircle(ce, true);
    expect(interPt).toBe(null);
  });
});
