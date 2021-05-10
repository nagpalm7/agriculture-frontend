import React,{useState} from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';

const RenderMarkers = (markers) => {
  return markers.map(({ latitude, longitude, village_name }, index) => {
    return (
      <Marker
        position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }} >
        <InfoBox options={{ closeBoxURL: ``, enableEventPropagation: true }}> 
        <div style={{ backgroundColor: `white`, opacity: 0.75, padding: `12px` }}>
          <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
          {village_name}
          </div>
        </div>
        </InfoBox>
      </Marker>
    );
  });
};

const MapView = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyAWt5MijImFgX6usJpYghouh-YhQ6WYuEQ&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%`, minHeight: 500 }} />,
  }),
  withScriptjs,
  withGoogleMap,
)((props) => {
  console.log(props);
  const loc = props.locations;

  return (
    <GoogleMap
      defaultZoom={6}
      defaultCenter={{
        lat: props.centerLat,
        lng: props.centerLong,
      }}>
      <MarkerClusterer
        imagePath="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
        maxZoom={14}>
        {RenderMarkers(loc)}
      </MarkerClusterer>
    </GoogleMap>
  );
});

export default MapView;