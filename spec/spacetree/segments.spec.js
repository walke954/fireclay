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

const segments = {
  '0': new Segment(
    new Point(15, 10),
    new Point(2, 5),
  ),
  '1': new Segment(
    new Point(4, 17),
    new Point(22, 15),
  ),
  '2': new Segment(
    new Point(36, 18),
    new Point(28, 31),
  ),
  '3': new Segment(
    new Point(18, 27),
    new Point(32, 4),
  ),
  '4': new Segment(
    new Point(7, 39),
    new Point(3, 9),
  ),
  '5': new Segment(
    new Point(22, 1),
    new Point(39, 10),
  )
}

describe('SpaceTree', () => {
  function segmentTree() {
    const options = {bucketSize: 2};
    const tree = new SpaceTree(0, 0, 40, 40, options);

    Object.values(segments).forEach((sg) => {
      tree.add(sg);
    });

    return tree;
  }

  describe('segments', () => {
    it('should overlap aabb', () => {
      const tree = segmentTree();

      // aabb
      const vals = tree.search(new AABB(10, 10, 20, 20));
      expect(vals.size).toBe(4);

      expect(vals.has(segments['0'])).toBe(true);
      expect(vals.has(segments['1'])).toBe(true);
      expect(vals.has(segments['2'])).toBe(true);
      expect(vals.has(segments['3'])).toBe(true);
    });

    it('should overlap circle', () => {
      const tree = segmentTree();

      // circle
      const vals = tree.search(new Circle(14, 8, 10));
      expect(vals.size).toBe(2);

      expect(vals.has(segments['0'])).toBe(true);
      expect(vals.has(segments['1'])).toBe(true);
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
      expect(vals.size).toBe(5);
      expect(vals.has(segments['0'])).toBe(true);
      expect(vals.has(segments['1'])).toBe(true);
      expect(vals.has(segments['2'])).toBe(true);
      expect(vals.has(segments['3'])).toBe(true);
      expect(vals.has(segments['4'])).toBe(true);
    });

    it('should overlap segment', () => {
      const tree = segmentTree();

      // segment
      const sg = new Segment(
        new Point(1, 3),
        new Point(15, 15)
      );
      const vals = tree.search(sg);

      expect(vals.size).toBe(1);
      expect(vals.has(segments['0'])).toBe(true);
    });

    // it('should overlap ray', () => {
    //   const tree = segmentTree();

    //   // ray
    //   const vals = tree.search(
    //     new Ray(
    //       new Point(1, 3),
    //       new Point(15, 15)
    //     )
    //   );
    //   expect(vals.size).toBe(5);
    //   expect(vals.has(segments['0'])).toBe(true);
    //   expect(vals.has(segments['1'])).toBe(true);
    //   expect(vals.has(segments['2'])).toBe(true);
    //   expect(vals.has(segments['3'])).toBe(true);
    //   expect(vals.has(segments['4'])).toBe(true);
    // });

    // it('should overlap line', () => {
    //   const tree = segmentTree();

    //   // line
    //   const vals = tree.search(
    //     new Line(
    //       new Point(1, 3),
    //       new Point(15, 15)
    //     )
    //   );
    //   expect(vals.size).toBe(5);
    //   expect(vals.has(segments['0'])).toBe(true);
    //   expect(vals.has(segments['1'])).toBe(true);
    //   expect(vals.has(segments['2'])).toBe(true);
    //   expect(vals.has(segments['3'])).toBe(true);
    //   expect(vals.has(segments['4'])).toBe(true);
    // });

    // it('should overlap point', () => {
    //   const tree = segmentTree();

    //   // point
    //   const vals = tree.search(new Point(25.5440414507772, 14.606217616580311));
    //   expect(vals.size).toBe(2);
    //   expect(vals.has(segments['1'])).toBe(true);
    //   expect(vals.has(segments['3'])).toBe(true);
    // });
  });
});
