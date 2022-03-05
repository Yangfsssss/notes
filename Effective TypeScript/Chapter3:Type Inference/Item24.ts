/** Item24: 在使用别名时要保持一致，Be Consistent in Your Use of Aliases*/
const borough = { name: 'Brooklyn', location: [40.688, -73.979] };
const loc = borough.location;
// 对别名属性上的修改也会在原始值上可见：
loc[0] = 0;
borough.location; // [0,-73.979]

//Suppose you have a data structure that represents a polygon:
interface Coordinate {
  x: number;
  y: number;
}

interface BoundingBox {
  x: [number, number];
  y: [number, number];
}

interface Polygon {
  exterior: Coordinate[];
  holes: Coordinate[][];
  bbox?: BoundingBox;
}

function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
  //Object destructuring syntax rewards consistent naming with a more compact syntax.
  const { bbox } = polygon;
  if (bbox) {
    if (pt.x < bbox.x[0] || pt.x > bbox.x[1] || pt.y < bbox.y[1] || pt.y > bbox.y[1]) {
      return false;
    }
  }
}

//confusions at runtime:
//1,properties and local variables refer to different values:
const polygon: Polygon = {
  exterior: [{ x: 3, y: 5 }],
  holes: [[{ x: 3, y: 5 }]],
};
function calculatePolygonBbox(polygon: Polygon) {
  polygon.bbox = {
    x: [3, 5],
    y: [7, 9],
  };
}
const { bbox: bbox } = polygon;
if (!bbox) {
  calculatePolygonBbox(polygon); // Fills in polygon.bbox
  // Now polygon.bbox and bbox refer to different values!
}

//2,side effect functions change the value of properties but its type remains still:
function fn(p: Polygon) {
  p.bbox = undefined;
}
polygon.bbox; // BoundingBox | undefined
if (polygon.bbox) {
  polygon.bbox; // BoundingBox
  fn(polygon);
  polygon.bbox; // still BoundingBox but the value is actually undefined
}
// factor out a local bbox variable instead of using polygon.bbox:
let { bbox: bbox1 } = polygon;
bbox1;
if (bbox1) {
  bbox1;
  bbox1 = undefined;
  //the type of bbox would remain accurate, but it might no longer be the same value as polygon.box.
  bbox1; // undefined
  polygon.bbox; // {x: [3, 5],y: [7, 9]};
}

//Things to Remember
//• Aliasing can prevent TypeScript from narrowing types. If you create an alias for a variable, use it consistently.
//• Use destructuring syntax to encourage consistent naming.
//• Be aware of how function calls can invalidate type refinements on properties.Trust refinements on local variables more than on properties.
