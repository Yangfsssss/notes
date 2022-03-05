/** Item29: 宽进严出，Be Liberal in What You Accept and Strict in What You Produce */

//Liberal inputs and outputs:
declare function setCamera(camera: CameraOptions): void;
declare function viewportForBounds(bounds: LngLatBounds): CameraOptions;

interface CameraOptions {
  center: LngLat;
  zoom?: number;
  bearing?: number;
  pitch?: number;
}

type LngLat = { lng: number; lat: number } | { lon: number; lat: number } | [number, number];
type LngLatBounds = { northeast: LngLat; southwest: LngLat } | [LngLat, LngLat] | [number, number, number, number];

//Liberal inputs and strict outputs:
interface LngLat1 {
  lng: number;
  lat: number;
}

type LngLatLike = LngLat1 | { lng: number; lat: number } | [number, number];

interface Camera {
  center: LngLat1;
  zoom: number;
  bearing: number;
  pitch: number;
}

interface CameraOptions1 extends Omit<Partial<Camera>, 'center'> {
  center?: LngLatLike;
}

type LngLatBounds1 =
  | { northeast: LngLatLike; southwest: LngLatLike }
  | [LngLatLike, LngLatLike]
  | [number, number, number, number];

declare function setCamera1(camera: CameraOptions1): void;
declare function viewportForBounds1(bounds: LngLatBounds1): Camera;

//Things to Remember
//• Input types tend to be broader than output types. Optional properties and union
//types are more common in parameter types than return types.
//• To reuse types between parameters and return types, introduce a canonical form
//(for return types) and a looser form (for parameters).
