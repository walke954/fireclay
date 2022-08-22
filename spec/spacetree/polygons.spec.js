const {
  Point,
  Line,
  Ray,
  Segment,
  Polygon,
  AABB,
  Circle,
  SpaceTree
} = require('../../src');

const polygons = {
  '0': new Polygon(
    new Point(5, 10),
    new Point(20, 6),
    new Point(22, 15),
    new Point(5, 11),
  ),
  '1': new Polygon(
    new Point(38, 38),
    new Point(25, 5),
    new Point(8, 1),
    new Point(17, 19),
  ),
  '2': new Polygon(
    new Point(3, 36),
    new Point(5, 28),
    new Point(1, 32),
  ),
  '3': new Polygon(
    new Point(10, 36),
    new Point(22, 39),
    new Point(20, 29),
    new Point(4, 18),
    new Point(18, 32),
  ),
  '4': new Polygon(
    new Point(31, 3),
    new Point(35, 17),
    new Point(38, 17),
  ),
  '5': new Polygon(
    new Point(32, 31),
    new Point(30, 22),
    new Point(39, 24),
    new Point(36, 39),
  )
}

describe('SpaceTree', () => {
  function segmentTree() {
    const options = {bucketSize: 2};
    const tree = new SpaceTree(0, 0, 40, 40, options);

    Object.values(polygons).forEach((sg, i) => {
      tree.add(sg);
    });

    return tree;
  }

  describe('polygons', () => {
    it('should overlap aabb', () => {
      const tree = segmentTree();

      // aabb
      const vals = tree.search(new AABB(10, 10, 20, 20));
      expect(vals.size).toBe(4);

      expect(vals.has(polygons['0'])).toBe(true);
      expect(vals.has(polygons['1'])).toBe(true);
      expect(vals.has(polygons['3'])).toBe(true);
      expect(vals.has(polygons['5'])).toBe(true);
    });

    it('should overlap circle', () => {
      const tree = segmentTree();

      // circle
      const vals = tree.search(new Circle(14, 8, 10));
      expect(vals.size).toBe(2);

      expect(vals.has(polygons['0'])).toBe(true);
      expect(vals.has(polygons['1'])).toBe(true);
    });

    it('should overlap polygon', () => {
      const tree = segmentTree();

      // polygon
      const vals = tree.search(
        new Polygon(
          new Point(10, 5),
          new Point(40, 30),
          new Point(35, 40),
          new Point(5, 25)
        )
      );
      expect(vals.size).toBe(4);
      expect(vals.has(polygons['0'])).toBe(true);
      expect(vals.has(polygons['1'])).toBe(true);
      expect(vals.has(polygons['3'])).toBe(true);
      expect(vals.has(polygons['5'])).toBe(true);
    });

    it('should overlap segment', () => {
      const tree = segmentTree();

      // segment
      const sg = new Segment(
        new Point(1, 3),
        new Point(15, 15)
      );
      const vals = tree.search(sg);

      expect(vals.size).toBe(2);
      expect(vals.has(polygons['0'])).toBe(true);
      expect(vals.has(polygons['1'])).toBe(true);
    });

    it('should overlap ray', () => {
      const tree = segmentTree();

      // ray
      const vals = tree.search(
        new Ray(
          new Point(1, 3),
          new Point(15, 15)
        )
      );

      expect(vals.size).toBe(3);
      expect(vals.has(polygons['0'])).toBe(true);
      expect(vals.has(polygons['1'])).toBe(true);
      expect(vals.has(polygons['5'])).toBe(true);
    });

    it('should overlap line', () => {
      const tree = segmentTree();

      // line
      const vals = tree.search(
        new Line(
          new Point(1, 3),
          new Point(15, 15)
        )
      );
      
      expect(vals.size).toBe(3);
      expect(vals.has(polygons['0'])).toBe(true);
      expect(vals.has(polygons['1'])).toBe(true);
      expect(vals.has(polygons['5'])).toBe(true);
    });

    it('should overlap point', () => {
      const tree = segmentTree();

      // point
      const vals = tree.search(new Point(32, 26));
      expect(vals.size).toBe(2);
      expect(vals.has(polygons['1'])).toBe(true);
      expect(vals.has(polygons['5'])).toBe(true);
    });
  });
});
