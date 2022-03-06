/** Item35: 从API和规范而不是从数据中生成类型，Generate Types from APIs and Specs,Not Data */
import { Feature, Geometry } from 'geojson';

interface BoundingBox {
  x: [number, number];
  y: [number, number];
}

function calculateBoundingBox(f: Feature): BoundingBox | null {
  let box: BoundingBox | null = null;

  const helper = (coords: any[]) => {
    // ...
  };

  const geometryHelper = (g: Geometry) => {
    if (geometry.type === 'GeometryCollection') {
      geometry.geometries.forEach(geometryHelper);
    } else {
      helper(geometry.coordinates); // OK
    }
  };

  const { geometry } = f;
  if (geometry) {
    geometryHelper(geometry);
  }
  return box;
}

//Things to Remember
//• Consider generating types for API calls and data formats to get type safety all the way to the edge of your code.
//• Prefer generating code from specs rather than data. Rare cases matter!
