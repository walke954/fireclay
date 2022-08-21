const {Point, Line, Ray, Segment, Polygon, Circle, AABB} = require('../../src');

describe('Polygon', () => {
  it('should not contain point', () => {
    const py = new Polygon(
      new Point(3, 36),
      new Point(5, 28),
      new Point(1, 32),
    );
    const pt = new Point(3, 5);

    const bool = py.containsPoint(pt);
    expect(bool).toBe(false);
  });
});
