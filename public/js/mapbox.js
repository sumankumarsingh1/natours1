/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
  'pk.eyJ1Ijoic3VtYW5rdW1hcnNpbmdoMSIsImEiOiJja2djczR4djgwdTB1MzBzNXE3N2tiZnhlIn0.Z8KbM4_794LSZf_VAYQ7dQ';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/sumankumarsingh1/ckgcsdx3s122019pe367ii4t4',
    scrollZoom: false
    // center: [-118.113491, 34.111745],
    // zoom: 6,
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();
  locations.forEach((loc) => {
    // Create Marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add Pop Up
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include the current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    }
  });
}
