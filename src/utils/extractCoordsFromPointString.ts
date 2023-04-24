export type Point = `POINT(${number} ${number})`;

const extractCoordsFromPointString = (point: Point) => {
  const match = /^POINT\((.*)\)/.exec(point);
  if (match) {
    const coords = match[1];

    if (coords) {
      const [latitude, longitude] = coords.split(' ').map(Number);

      if (latitude && longitude) {
        return [latitude, longitude] as const;
      }
    }
  }

  return null;
};

export default extractCoordsFromPointString;
