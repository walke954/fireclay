const {Point, Line, Ray, Segment, Polygon, Circle} = require('../../src');

describe('Circle', () => {
  it('should intersect point', () => {
    const pt = new Point(3, 6);
    const ce = new Circle(3, 4, 2);

    const bool = ce.intersectsPoint(pt);
    expect(bool).toBe(true);

    const [interPt] = ce.intersectsPoint(pt, true);
    expect(interPt).toBeInstanceOf(Point);
    expect(interPt.x).toBe(pt.x);
    expect(interPt.y).toBe(pt.y);
  });

  it('should not intersect point', () => {
    const pt = new Point(3, 6);
    const ce = new Circle(3, 4, 3);

    const bool = ce.intersectsPoint(pt);
    expect(bool).toBe(false);

    const interPt = ce.intersectsPoint(pt, true);
    expect(interPt).toBe(null);
  });

  it('should intersect line', () => {
  	const pt1 = new Point(3.738461538461537, 0.09230769230769198);
    const pt2 = new Point(3, 6);
    const ln = new Line(
      new Point(4, -2),
      new Point(2, 14)
    );
    const ce = new Circle(3, 3, 3);

    const bool = ce.intersectsLine(ln);
    expect(bool).toBe(true);

    const [interPt1, interPt2] = ce.intersectsLine(ln, true);
    expect(interPt1).toBeInstanceOf(Point);
    expect(pt1.equals(interPt1)).toBe(true);
    expect(interPt2).toBeInstanceOf(Point);
    expect(pt2.equals(interPt2)).toBe(true)
  });

  it('should not intersect line', () => {
    const ln = new Line(
      new Point(4, -2),
      new Point(7, 8)
    );
    const ce = new Circle(3, 4, 2);

    const bool = ce.intersectsLine(ln);
    expect(bool).toBe(false);

    const interPt = ce.intersectsLine(ln, true);
    expect(interPt).toBe(null);
  });

  it('should intersect ray', () => {
    const pt = new Point(3, 6);
    const ry = new Ray(
      new Point(4, -2),
      new Point(2, 14)
    );
    const ce = new Circle(3, 1, 5);

    const bool = ce.intersectsRay(ry);
    expect(bool).toBe(true);

    const interPt = ce.intersectsRay(ry, true);
    expect(interPt.length).toBe(1);
    expect(interPt[0]).toBeInstanceOf(Point);
    expect(pt.equals(interPt[0])).toBe(true);
  });

  it('should not intersect ray', () => {
    const ry = new Ray(
      new Point(3, 6),
      new Point(7, 8)
    );
    const ce = new Circle(3, 1, 4);

    const bool = ce.intersectsRay(ry);
    expect(bool).toBe(false);

    const interPt = ce.intersectsRay(ry, true);
    expect(interPt).toBe(null);
  });

  it('should intersect segment', () => {
    const pt = new Point(3, 6);
    const sg = new Segment(
      new Point(4, -2),
      new Point(2, 14)
    );
    const ce = new Circle(3, 1, 5);

    const bool = ce.intersectsSegment(sg);
    expect(bool).toBe(true);

    const interPt = ce.intersectsSegment(sg, true);
    expect(interPt.length).toBe(1);
    expect(interPt[0]).toBeInstanceOf(Point);
    expect(pt.equals(interPt[0])).toBe(true);
  });

  it('should not intersect segment', () => {
    const sg = new Segment(
      new Point(3, 6),
      new Point(7, 8)
    );
    const ce = new Circle(3, 1, 4);

    const bool = ce.intersectsSegment(sg);
    expect(bool).toBe(false);

    const interPt = ce.intersectsSegment(sg, true);
    expect(interPt).toBe(null);
  });

  it('should intersect polygon', () => {
    const pt1 = new Point(8, 5);
    const pt2 = new Point(4, 1);
    const py = new Polygon(
      new Point(3, 6),
      new Point(13, 4),
      new Point(5, -4),
    );
    const ce = new Circle(4, 5, 4);

    const bool = ce.intersectsPolygon(py);
    expect(bool).toBe(true);

    const interPt = ce.intersectsPolygon(py, true);
    expect(interPt.length).toBe(2);
    expect(interPt[0]).toBeInstanceOf(Point);
    expect(pt1.equals(interPt[0])).toBe(true);
    expect(interPt[1]).toBeInstanceOf(Point);
    expect(pt2.equals(interPt[1])).toBe(true);
  });

  it('should not intersect polygon', () => {
    const py = new Polygon(
      new Point(3, 6),
      new Point(6, 4),
      new Point(5, 2),
    );
    const ce = new Circle(4, 5, 4);

    const bool = ce.intersectsPolygon(py);
    expect(bool).toBe(false);

    const interPt = ce.intersectsPolygon(py, true);
    expect(interPt).toBe(null);
  });

  it('should intersect circle', () => {
    const pt1 = new Point(4, 1);
    const pt2 = new Point(0, 5);
    const ce1 = new Circle(0, 1, 4);
    const ce2 = new Circle(4, 5, 4);

    const bool = ce1.intersectsCircle(ce2);
    expect(bool).toBe(true);

    const interPt = ce1.intersectsCircle(ce2, true);
    expect(interPt.length).toBe(2);
    expect(interPt[0]).toBeInstanceOf(Point);
    expect(pt1.equals(interPt[0])).toBe(true);
    expect(interPt[1]).toBeInstanceOf(Point);
    expect(pt2.equals(interPt[1])).toBe(true);
  });

  it('should not intersect circle', () => {
    const ce1 = new Circle(0, -4, 3);
    const ce2 = new Circle(4, 5, 4);

    const bool = ce1.intersectsCircle(ce2);
    expect(bool).toBe(false);

    const interPt = ce1.intersectsCircle(ce2, true);
    expect(interPt).toBe(null);
  });
});
