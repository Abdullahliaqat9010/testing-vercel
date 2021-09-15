import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'

import mapBox from "./mapbox"
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js"
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      long: 4.3524,
      lat: 50.8468,
      markers: [
        {
          // feature for Mapbox SF
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [4.35207, 50.84570]
          },
          'properties': {
            "title": "fashion lace musium"
          }
        },
        {
          // feature for Mapbox DC
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [
              4.3524, 50.8468
            ]
          },
          'properties': {
            "title": "golden pace"
          }
        },
        {
          // feature for Mapbox SF
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [4.3500, 50.8450]
          },
          'properties': {
            "title": "test"
          }
        },
        {
          // feature for Mapbox SF
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [4.35413, 50.84595]
          },
          'properties': {
            "title": "test"
          }
        }
      ]
    }
  }

  componentDidUpdate() {
    console.log("akjd ajkshd ajsd akjsdh ")
  }

  componentDidMount() {
    // var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    const { lat, long, markers } = this.state
    console.log("hajkdhaksdh", lat, long)
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXNocmFmYWxpMTEyMiIsImEiOiJja3Rkd2UzaHUyazg3MnVwZ2w4YjFubTh3In0.XU0TSvROhCasiUBhLaCbiQ';
    var map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v10',

      center: [long, lat],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: 'map',
      antialias: true
    });
    map.addControl(new mapboxgl.NavigationControl());
    map.on('load', () => {
      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;

      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        (error, image) => {
          if (error) throw error;
          map.addImage('custom-marker', image);
          // Add a GeoJSON source with 2 points
          map.addSource('points', {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': markers
            }
          });

          // Add a symbol layer
          map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'points',
            'layout': {
              'icon-image': 'custom-marker',
              // get the title name from the source's "title" property
              'text-field': ['get', 'title'],
              'text-font': [
                'Open Sans Semibold',
                'Arial Unicode MS Bold'
              ],
              'text-offset': [0, 1.25],
              'text-anchor': 'top'
            }
          });
        }
      );



      map.addLayer(
        {
          'id': 'add-3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#aaa',

            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },
        labelLayerId
      );
    });

    map.touchZoomRotate.enable();
    map.touchZoomRotate.enableRotation();
    map.on('click', (e) => {
      console.log("longi", e.lngLat.lng);
      console.log("lat", e.lngLat.lat);
      this.setState({ long: e.lngLat.lng, lat: e.lngLat.lat })
    });
  }

  render() {
    return (
      <>
        <div className="App" style={{ height: "90vh", width: "100%" }} id="map"></div>
      </>
    );
  }

}

export default App;
