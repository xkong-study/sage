import { FeatureCollection, LineString, Polygon, Position } from "geojson";
import { Step } from "../types";
import {
  lineIntersect,
  lineString,
  point,
  pointToLineDistance,
} from "@turf/turf";
import polyline from "@mapbox/polyline";

export const classNames = (...classes: string[]) =>
  classes.filter(Boolean).join(" ");

export function flattenSteps(arr: any, level = 0): Step[] {
  if (arr.length === 0) {
    return [];
  }
  if (level === 0) {
    return arr;
  }
  let newArr: any = [];
  arr.forEach((el: any) => {
    if (el.steps) {
      newArr = newArr.concat(flattenSteps(el.steps, level - 1));
    } else {
      newArr.push(el);
    }
  });
  return newArr;
}

export const getStopsNearAccidents = (
  routeFeatures: FeatureCollection,
  accidentsPolygons: FeatureCollection<Polygon>
): Position[][] => {
  let lineStringFeatures = routeFeatures?.features.filter(
    (feature) => feature.geometry.type === "LineString"
  ) as unknown as LineString[];
  let polygonFeatures = accidentsPolygons?.features ?? [];
  let allIntersections: any[] = [];
  for (let line of lineStringFeatures) {
    let intersectingPoints: any[] = [];
    for (let polygon of polygonFeatures) {
      let intersection = lineIntersect(line, polygon);
      if (intersection.features.length > 0) {
        intersectingPoints.push([intersection.features, polygon]);
      }
    }
    if (intersectingPoints.length > 0) {
      allIntersections.push(intersectingPoints);
    }
  }
  allIntersections = allIntersections.flat();

  const intersections = allIntersections.map((featureArray) => {
    return [
      featureArray[0].map((feature: any) => feature.geometry.coordinates),
      featureArray[1],
    ];
  });
  return intersections;
};

export function getSmallestPolyLineAlongPolygon({
  from_point,
  to_point,
  polygon,
}: any) {
  const polygonCoords = polygon.geometry.coordinates[0];
  const lines = [];
  for (let i = 0; i < polygonCoords.length - 1; i++) {
    const line = lineString([polygonCoords[i], polygonCoords[i + 1]]);
    lines.push(line);
  }
  const linesWithDistances = lines.map((line) => {
    const distanceFromStart = pointToLineDistance(point(from_point), line);
    const distanceFromEnd = pointToLineDistance(point(to_point), line);
    return {
      line,
      distanceFromStart,
      distanceFromEnd,
    };
  });
  let finalLine = [];
  let foundFirst = false;
  for (let i = 0; i < linesWithDistances.length; i++) {
    const line = linesWithDistances[i];
    if (line.distanceFromStart < 0.001) {
      foundFirst = true;
      finalLine.push(from_point);
    }
    if (foundFirst) {
      if (line.distanceFromEnd < 0.001) {
        finalLine.push(to_point);
        break;
      }
      finalLine.push(line.line.geometry.coordinates[1]);
    }
  }

  // swap the coordinates
  finalLine = finalLine.map((coord) => [coord[1], coord[0]]);
  return polyline.encode(finalLine as any);
}
