const {Point, Line, Ray, Segment, Polygon, Circle} = require('../../src');

describe('Segment', () => {
  it('should intersect point', () => {
    const pt = new Point(3, 6);
    const origin = new Point(7, 8);
    const sg = new Segment(origin, pt);

    const bool = sg.intersectsPoint(pt);
    expect(bool).toBe(true);

    const [interPt] = sg.intersectsPoint(pt, true);
    expect(interPt).toBeInstanceOf(Point);
    expect(interPt.x).toBe(pt.x);
    expect(interPt.y).toBe(pt.y);
  });

  it('should not intersect point', () => {
    const pt = new Point(3, 6);
    const origin1 = new Point(5, 7);
    const origin2 = new Point(-3, 16);
    const midpoint = new Point(7, 8);
    const sg1 = new Segment(origin1, midpoint);
    const sg2 = new Segment(origin2, midpoint);

    const bool1 = sg1.intersectsPoint(pt);
    expect(bool1).toBe(false);
    const bool2 = sg2.intersectsPoint(pt);
    expect(bool2).toBe(false);

    const interPt1 = sg1.intersectsPoint(pt, true);
    expect(interPt1).toBe(null);
    const interPt2 = sg2.intersectsPoint(pt, true);
    expect(interPt2).toBe(null);
  });

  it('should intersect line', () => {
  	const pt = new Point(3, 6);
    const ln = new Line(
      new Point(4, -2),
      new Point(2, 14)
    );
    const sg = new Segment(
      new Point(1, 5),
      new Point(7, 8)
    );

    const bool = sg.intersectsLine(ln);
    expect(bool).toBe(true);

    const [interPt] = sg.intersectsLine(ln, true);
    expect(interPt).toBeInstanceOf(Point);
    expect(interPt.x).toBe(pt.x);
    expect(interPt.y).toBe(pt.y);
  });

  it('should not intersect line', () => {
    const pt = new Point(3, 6);
    const ln = new Line(
      new Point(4, -2),
      new Point(2, 14)
    );
    const sg1 = new Segment(
      new Point(7, 8),
      new Point(13, 11)
    );
    const sg2 = new Segment(
      new Point(4, -1),
      new Point(2, 15)
    );

    const bool1 = sg1.intersectsLine(ln);
    expect(bool1).toBe(false);
    const bool2 = sg2.intersectsLine(ln);
    expect(bool2).toBe(false);

    const interPt1 = sg1.intersectsLine(ln, true);
    expect(interPt1).toBe(null);
    const interPt2 = sg2.intersectsLine(ln, true);
    expect(interPt2).toBe(null);
  });

  it('should intersect ray', () => {
    const pt = new Point(3, 6);
    const ry = new Ray(
      new Point(1, 5),
      new Point(7, 8)
    );
    const sg = new Segment(
      new Point(4, -2),
      new Point(2, 14)
    );

    const bool = sg.intersectsRay(ry);
    expect(bool).toBe(true);

    const [interPt] = sg.intersectsRay(ry, true);
    expect(interPt).toBeInstanceOf(Point);
    expect(interPt.x).toBe(pt.x);
    expect(interPt.y).toBe(pt.y);
  });

  it('should not intersect ray', () => {
    const ry = new Ray(
      new Point(7, 8),
      new Point(10, 10)
    );
    const sg = new Segment(
      new Point(4, -2),
      new Point(2, 14)
    );

    const bool1 = sg.intersectsRay(ry);
    expect(bool1).toBe(false);

    const interPt1 = sg.intersectsRay(ry, true);
    expect(interPt1).toBe(null);
  });

  it('should intersect segment', () => {
    const pt = new Point(3, 6);
    const sg1 = new Segment(
      new Point(1, 5),
      new Point(7, 8)
    );
    const sg2 = new Segment(
    	new Point(4, -2),
    	new Point(2, 14)
    );

    const bool = sg1.intersectsSegment(sg2);
    expect(bool).toBe(true);

    const [interPt] = sg1.intersectsSegment(sg2, true);
    expect(interPt).toBeInstanceOf(Point);
    expect(interPt.x).toBe(pt.x);
    expect(interPt.y).toBe(pt.y);
  });

  it('should not intersect segment', () => {
    const sg1 = new Segment(
      new Point(7, 8),
      new Point(10, 10)
    );
    const sg2 = new Segment(
    	new Point(4, -2),
    	new Point(2, 14)
    );

    const bool1 = sg1.intersectsSegment(sg2);
    expect(bool1).toBe(false);

    const interPt = sg1.intersectsSegment(sg2, true);
    expect(interPt).toBe(null);
  });

  it('should intersect polygon', () => {
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

    const bool = sg.intersectsPolygon(py);
    expect(bool).toBe(true);

    const interPt = sg.intersectsPolygon(py, true);
    expect(interPt.length).toBe(1);
    expect(interPt[0]).toBeInstanceOf(Point);
    expect(interPt[0].x).toBe(pt.x);
    expect(interPt[0].y).toBe(pt.y);
  });

  it('should not intersect polygon', () => {
    const sg = new Segment(
      new Point(2, 9),
      new Point(0, 15)
    );
    const py = new Polygon(
      new Point(7, 8),
      new Point(1, 5),
      new Point(4, -2),
    );

    const bool = sg.intersectsPolygon(py);
    expect(bool).toBe(false);

    const interPt = sg.intersectsPolygon(py, true);
    expect(interPt).toBe(null);
  });

  it('should intersect circle', () => {
  	const pt = new Point(3, 6);
    const sg = new Segment(
    	new Point(4, -2),
    	new Point(2, 14)
    );
    const ce = new Circle(3, 1, 5);

    const bool = sg.intersectsCircle(ce);
    expect(bool).toBe(true);

    const interPt = sg.intersectsCircle(ce, true);
    expect(interPt.length).toBe(1);
    expect(interPt[0]).toBeInstanceOf(Point);
    expect(pt.equals(interPt[0])).toBe(true);
  });

  it('should not intersect circle', () => {
    const sg = new Segment(
    	new Point(3, 6),
    	new Point(7, 8)
    );
    const ce = new Circle(3, 1, 4);

    const bool = sg.intersectsCircle(ce);
    expect(bool).toBe(false);

    const interPt = sg.intersectsCircle(ce, true);
    expect(interPt).toBe(null);
  });
});
