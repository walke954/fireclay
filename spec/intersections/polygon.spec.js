const {Point, Line, Ray, Segment, Polygon, Circle} = require('../../src');

describe('Polygon', () => {
  it('should intersect point', () => {
    const pt = new Point(3, 6);
    const py = new Polygon(
      new Point(7, 8),
      new Point(1, 5),
      new Point(4, -2),
    );

    const bool = py.intersectsPoint(pt);
    expect(bool).toBe(true);

    const [interPt] = py.intersectsPoint(pt, true);
    expect(interPt).toBeInstanceOf(Point);
    expect(interPt.x).toBe(pt.x);
    expect(interPt.y).toBe(pt.y);
  });

  it('should not intersect point', () => {
    const pt = new Point(3, 6);
    const py = new Polygon(
      new Point(3, 8),
      new Point(1, 5),
      new Point(4, -2),
    );

    const bool = py.intersectsPoint(pt);
    expect(bool).toBe(false);

    const interPt = py.intersectsPoint(pt, true);
    expect(interPt).toBe(null);
  });

  it('should intersect line', () => {
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

    const bool = py.intersectsLine(ln);
    expect(bool).toBe(true);

    const [interPt1, interPt2] = py.intersectsLine(ln, true);
    expect(interPt1).toBeInstanceOf(Point);
    expect(interPt1.x).toBe(pt.x);
    expect(interPt1.y).toBe(pt.y);
    expect(interPt2).toBeInstanceOf(Point);
    expect(interPt2.x).toBe(pt2.x);
    expect(interPt2.y).toBe(pt2.y);
  });

  it('should not intersect line', () => {
    const ln = new Line(
      new Point(2, 14),
      new Point(0, 10)
    );
    const py = new Polygon(
      new Point(3, 8),
      new Point(1, 5),
      new Point(4, -2),
    );

    const bool = py.intersectsLine(ln);
    expect(bool).toBe(false);

    const interPt = py.intersectsLine(ln, true);
    expect(interPt).toBe(null);
  });

  it('should intersect ray', () => {
    const pt = new Point(3, 6);
    const ry = new Ray(
      new Point(4, 3),
      new Point(2, 9)
    );
    const py = new Polygon(
      new Point(7, 8),
      new Point(1, 5),
      new Point(4, -2),
    );

    const bool = py.intersectsRay(ry);
    expect(bool).toBe(true);

    const interPt = py.intersectsRay(ry, true);
    expect(interPt.length).toBe(1);
    expect(interPt[0]).toBeInstanceOf(Point);
    expect(interPt[0].x).toBe(pt.x);
    expect(interPt[0].y).toBe(pt.y);
  });

  it('should not intersect ray', () => {
    const ry = new Ray(
      new Point(2, 9),
      new Point(0, 15)
    );
    const py = new Polygon(
      new Point(7, 8),
      new Point(1, 5),
      new Point(4, -2),
    );

    const bool = py.intersectsRay(ry);
    expect(bool).toBe(false);

    const interPt = py.intersectsRay(ry, true);
    expect(interPt).toBe(null);
  });

  it('should intersect segment', () => {
    const pt = new Point(3, 6);
    const sg = new Segment(
      new Point(4, 3),
      new Point(2, 9)
    );
    const py = new Polygon(
      new Point(7, 8),
      new Point(1, 5),
      new Point(4, -2),
    );

    const bool = py.intersectsSegment(sg);
    expect(bool).toBe(true);

    const interPt = py.intersectsSegment(sg, true);
    expect(interPt.length).toBe(1);
    expect(interPt[0]).toBeInstanceOf(Point);
    expect(interPt[0].x).toBe(pt.x);
    expect(interPt[0].y).toBe(pt.y);
  });

  it('should not intersect segment', () => {
    const sg = new Segment(
      new Point(2, 9),
      new Point(0, 15)
    );
    const py = new Polygon(
      new Point(7, 8),
      new Point(1, 5),
      new Point(4, -2),
    );

    const bool = py.intersectsSegment(sg);
    expect(bool).toBe(false);

    const interPt = py.intersectsSegment(sg, true);
    expect(interPt).toBe(null);
  });

  it('should intersect polygon', () => {
    const pt1 = new Point(4, 1);
    const pt2 = new Point(6, -3);
    const py1 = new Polygon(
      new Point(3, 6),
      new Point(10, 1),
      new Point(5, -4),
    );
    const py2 = new Polygon(
      new Point(2, 2),
      new Point(6, 0),
      new Point(6, -12),
    );

    const bool = py1.intersectsPolygon(py2);
    expect(bool).toBe(true);

    const interPt = py1.intersectsPolygon(py2, true);
    expect(interPt.length).toBe(2);
    expect(interPt[1]).toBeInstanceOf(Point);
    expect(pt1.equals(interPt[0])).toBe(true);
    expect(interPt[0]).toBeInstanceOf(Point);
    expect(pt2.equals(interPt[1])).toBe(true);
  });

  it('should not intersect polygon', () => {
    const py1 = new Polygon(
      new Point(3, 6),
      new Point(10, 1),
      new Point(5, -4),
    );
    const py2 = new Polygon(
      new Point(2, 2),
      new Point(1, -5),
      new Point(6, -12),
    );

    const bool = py1.intersectsPolygon(py2);
    expect(bool).toBe(false);

    const interPt = py1.intersectsPolygon(py2, true);
    expect(interPt).toBe(null);
  });

  it('should intersect circle', () => {
    const pt1 = new Point(8, 5);
    const pt2 = new Point(4, 1);
  	const py = new Polygon(
      new Point(3, 6),
      new Point(13, 4),
      new Point(5, -4),
    );
    const ce = new Circle(4, 5, 4);

    const bool = py.intersectsCircle(ce);
    expect(bool).toBe(true);

    const interPt = py.intersectsCircle(ce, true);
    expect(interPt.length).toBe(2);
    expect(interPt[0]).toBeInstanceOf(Point);
    expect(pt1.equals(interPt[0])).toBe(true);
    expect(interPt[1]).toBeInstanceOf(Point);
    expect(pt2.equals(interPt[1])).toBe(true);
  });

  it('should not intersect circle', () => {
    const py = new Polygon(
      new Point(3, 6),
      new Point(6, 4),
      new Point(5, 2),
    );
    const ce = new Circle(4, 5, 4);

    const bool = py.intersectsCircle(ce);
    expect(bool).toBe(false);

    const interPt = py.intersectsCircle(ce, true);
    expect(interPt).toBe(null);
  });
});
