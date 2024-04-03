import * as maptilersdk from "@maptiler/sdk";

const LONGITUDE_RANGE = 360;
const LATITUDE_RANGE = 180;

const getZoomAndCenter = (values, range) => {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const center = (min + max) / 2;
  const zoom = Math.log(range / Math.abs(min - max)) / Math.log(2);

  return [center, zoom];
};

const getMapSettings = (coordinates) => {
  const lngValues = coordinates.map((c) => c[0]);
  const latValues = coordinates.map((c) => c[1]);

  const [lngCenter, lngZoom] = getZoomAndCenter(lngValues, LONGITUDE_RANGE);
  const [latCenter, latZoom] = getZoomAndCenter(latValues, LATITUDE_RANGE);

  return {
    center: [lngCenter, latCenter],
    zoom: Math.min(lngZoom, latZoom),
  };
};

export const loadMap = (area, container) => {
  const fileParsed = JSON.parse(area);
  maptilersdk.config.apiKey = process.env.REACT_APP_MAPTILER_API_KEY;

  const coordinates = fileParsed.geometry.coordinates[0];

  const map = new maptilersdk.Map({
    container,
    style: maptilersdk.MapStyle.STREETS,
    ...getMapSettings(coordinates),
  });

  map.on("load", async function () {
    map.addSource("area", {
      type: "geojson",
      data: fileParsed,
    });

    map.addLayer({
      id: "area",
      type: "fill",
      source: "area",
      paint: {
        "fill-color": "#9988BB",
        "fill-opacity": 0.6,
      },
    });
  });
};
