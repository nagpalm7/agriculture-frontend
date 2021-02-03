import React from 'react';
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
        position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}>
        <InfoBox options={{ closeBoxURL: ``, enableEventPropagation: true }}>
          <div
            style={{
              backgroundColor: `white`,
              opacity: 0.75,
              padding: `12px`,
            }}>
            <div style={{ fontSize: `16px`, fontColor: `Black` }}>
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
  console.log(props.locations);
  return (
    <GoogleMap
      defaultZoom={7}
      defaultCenter={{ lat: 30.9002697, lng: 75.7165881 }}>
      <MarkerClusterer
        imagePath="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
        gridSize={100}
        zoomOnClick={true}
        maxZoom={10}>
        {RenderMarkers(props.locations)}
      </MarkerClusterer>
    </GoogleMap>
  );
});

export default MapView;
