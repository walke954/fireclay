const {
  Point,
  Line,
  Ray,
  Segment,
  Polygon,
  AABB,
  Circle,
  SpaceTree
} = require('../src');

// beforeEach(() => {
//   tree = new Tree();

//   const objs = {
//     lines: {
//       '0': new Line(4, 5, 16),
//       '1': new Line(17, 3, 10),
//       '2': new Line(2, 3, 100),
//       '3': new Line(8, 4, 200),
//       '4': new Line(1, -1, 36),
//       '5': new Line(1, -1, 5)
//     },
//     polygons: {

//     },
//     aabbs: {

//     },
//     circles: {

//     }
//   };
// });

describe('SpaceTree', () => {
  it('should add and find points', () => {
    const tree = new SpaceTree(0, 0, 40, 40, 2);
    const points = {
      '0': new Point(3, 37),
      '1': new Point(15, 16),
      '2': new Point(23, 8),
      // '3': new Point(39, 2),
      // '4': new Point(32, 35),
      // '5': new Point(2, 4)
    };

    Object.values(points).forEach((pt) => {
      tree.add(pt);
    });

    const vals = tree.search(new AABB(0, 0, 40, 40));
    console.log('')
    console.log(vals)
  });

    // it('should not intersect point', () => {
      
    // });
});
