const {Point, Line, Ray, Segment, Polygon, Circle} = require('../../src');

describe('Point', () => {
  it('should intersect point', () => {
    const pt1 = new Point(3, 6);
    const pt2 = new Point(3, 6);

    const bool = pt1.intersects(pt2);
    expect(bool).toBe(true);

    const [interPt] = pt1.intersects(pt2, true);
    expect(interPt.isPoint).toBe(true);
    expect(interPt.x).toBe(pt1.x);
    expect(interPt.y).toBe(pt1.y);
  });

  it('should not intersect point', () => {
    const pt1 = new Point(3, 6);
    const pt2 = new Point(5, 3);

    const bool = pt1.intersects(pt2);
    expect(bool).toBe(false);

    const interPt = pt1.intersects(pt2, true);
    expect(interPt).toBe(null);
  });

  it('should intersect line', () => {
    const pt = new Point(3, 6);
    const ln = new Line(5, 8, 63);

    const bool = pt.intersects(ln);
    expect(bool).toBe(true);

    const [interPt] = pt.intersects(ln, true);
    expect(interPt.isPoint).toBe(true);
    expect(interPt.x).toBe(pt.x);
    expect(interPt.y).toBe(pt.y);
  });

  it('should not intersect line', () => {
    const pt = new Point(3, 6);
    const ln = new Line(5, 8, 5);

    const bool = pt.intersects(ln);
    expect(bool).toBe(false);

    const interPt = pt.intersects(ln, true);
    expect(interPt).toBe(null);
  });

  it('should intersect ray', () => {
    const pt = new Point(3, 6);
    const origin = new Point(7, 8);
    const ry = new Ray(origin, pt);

    const bool = pt.intersects(ry);
    expect(bool).toBe(true);

    const [interPt] = pt.intersects(ry, true);
    expect(interPt.isPoint).toBe(true);
    expect(interPt.x).toBe(pt.x);
    expect(interPt.y).toBe(pt.y);
  });

  it('should not intersect ray', () => {
    const pt = new Point(3, 6);
    const origin1 = new Point(5, 7);
    const origin2 = new Point(-3, 16);
    const midpoint = new Point(7, 8);
    const ry1 = new Ray(origin1, midpoint);
    const ry2 = new Ray(origin2, midpoint);

    const bool1 = pt.intersects(ry1);
    expect(bool1).toBe(false);
    const bool2 = pt.intersects(ry2);
    expect(bool2).toBe(false);

    const interPt1 = pt.intersects(ry1, true);
    expect(interPt1).toBe(null);
    const interPt2 = pt.intersects(ry2, true);
    expect(interPt2).toBe(null);
  });

  it('should intersect segment', () => {
    const pt = new Point(3, 6);
    const start = new Point(7, 8);
    const end = new Point(1, 5);
    const sg = new Segment(start, end);

    const bool = pt.intersects(sg);
    expect(bool).toBe(true);

    const [interPt] = pt.intersects(sg, true);
    expect(interPt.isPoint).toBe(true);
    expect(interPt.x).toBe(pt.x);
    expect(interPt.y).toBe(pt.y);
  });

  it('should not intersect segment', () => {
    const pt = new Point(3, 6);
    const start = new Point(5, 7);
    const end1 = new Point(7, 8);
    const end2 = new Point(-3, 16);
    const sg1 = new Segment(start, end1);
    const sg2 = new Segment(start, end2);

    const bool1 = pt.intersects(sg1);
    expect(bool1).toBe(false);
    const bool2 = pt.intersects(sg2);
    expect(bool2).toBe(false);

    const interPt1 = pt.intersects(sg1, true);
    expect(interPt1).toBe(null);
    const interPt2 = pt.intersects(sg2, true);
    expect(interPt2).toBe(null);
  });

  it('should intersect polygon', () => {
    const pt = new Point(3, 6);
    const py = new Polygon(
      new Point(7, 8),
      new Point(1, 5),
      new Point(4, -2),
    );

    const bool = pt.intersects(py);
    expect(bool).toBe(true);

    const [interPt] = pt.intersects(py, true);
    expect(interPt.isPoint).toBe(true);
    expect(interPt.x).toBe(pt.x);
    expect(interPt.y).toBe(pt.y);
  });

  it('should not intersect polygon', () => {
    const pt = new Point(3, 6);
    const py = new Polygon(
      new Point(3, 8),
      new Point(1, 5),
      new Point(4, -2),
    );

    const bool = pt.intersects(py);
    expect(bool).toBe(false);

    const interPt = pt.intersects(py, true);
    expect(interPt).toBe(null);
  });

  it('should intersect circle', () => {
    const pt = new Point(3, 6);
    const ce = new Circle(3, 4, 2);

    const bool = pt.intersects(ce);
    expect(bool).toBe(true);

    const [interPt] = pt.intersects(ce, true);
    expect(interPt.isPoint).toBe(true);
    expect(interPt.x).toBe(pt.x);
    expect(interPt.y).toBe(pt.y);
  });

  it('should not intersect circle', () => {
    const pt = new Point(3, 6);
    const ce = new Circle(3, 4, 3);

    const bool = pt.intersects(ce);
    expect(bool).toBe(false);

    const interPt = pt.intersects(ce, true);
    expect(interPt).toBe(null);
  });
});
