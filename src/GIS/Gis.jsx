import { useRef, useEffect } from 'react';
import { loadModules } from 'esri-loader';
import { baseTrackPopUpTemplate, gmtClassBreaksRenderer } from '../Template/Popup';
import './Gis.css';

const Gis = () => {
    const mapRef = useRef(null);
    const viewRef = useRef(null); // Reference for the MapView

    useEffect(() => {
        // Prevent multiple map initializations
        if (viewRef.current) return;

        loadModules([
            'esri/views/MapView',
            'esri/Map',
            'esri/layers/FeatureLayer',
            'esri/widgets/BasemapGallery',
            'esri/widgets/Expand',
            'esri/widgets/LayerList'
        ]).then(
            ([MapView, Map, FeatureLayer, BasemapGallery, Expand, LayerList]) => {
                const map = new Map({
                    basemap: 'streets-vector',
                });

                const view = new MapView({
                    container: mapRef.current,
                    map: map,
                    center: [78.9629, 20.5937], // Center on India
                    zoom: 5,
                });

                // Define Feature Layer with optimizations
                const featureLayerTracks = new FeatureLayer({
                    url: '',
                    title: '',
                    renderer: gmtClassBreaksRenderer,
                    popupTemplate: baseTrackPopUpTemplate,
                    outFields: ["objectid"
                        //  "lroute", "railway", "division","section ", "routeclass ","from_km",
                        // "from_met", "rollin_gyrmn","rollin_gyrmn_year","rollin_gyrmn_month","accumulated_gmt","rail_section",
                        // "grade_of_steel"
                    ],
                });

                // Add the layers to the map
                map.addMany([featureLayerTracks]);

                // Basemap Gallery widget
                const basemapGallery = new BasemapGallery({
                    view: view,
                });

                // Wrap Basemap Gallery in Expand widget
                const basemapExpand = new Expand({
                    view: view,
                    content: basemapGallery,
                    expandIconClass: "esri-icon-basemap",
                    expanded: false,
                });

                // Add the Basemap Gallery button to the top-right corner
                view.ui.add(basemapExpand, 'top-right');

                // LayerList widget to toggle visibility
                const layerList = new LayerList({
                    view: view, // Bind to the view
                    listItemCreatedFunction: (event) => {
                        const item = event.item;
                        item.visible = item.layer.visible;
                    }
                });

                const layerListExpand = new Expand({
                    view: view,
                    content: layerList,
                    expandIconClass: "esri-icon-layers",
                    expanded: false,
                });

                // Add LayerList to the top-left corner
                view.ui.add(layerListExpand, 'top-left');

                // Optional: Add click event listener to handle custom popup behavior
                view.on("click", (event) => {
                    view.hitTest(event).then((response) => {
                        if (response.results.length > 0) {
                            const result = response.results[0];
                            const clickedLayer = result.graphic.layer;
                            if (clickedLayer === featureLayerTracks) {
                                view.popup.open({
                                    title: "Track Info",
                                    location: event.mapPoint,
                                    content: result.graphic.attributes,
                                });
                            } 
                        }
                    });
                });

                viewRef.current = view;
            }
        ).catch((err) => console.error("ArcGIS module loading error: ", err));

        // Cleanup function to destroy the map view on unmount
        return () => {
            if (viewRef.current) {
                viewRef.current.destroy();
                viewRef.current = null;
            }
        };
    }, []);

    return (
        <div>
            <div id="mapDiv" style={{ height: '97vh', width: '100%' }} ref={mapRef}></div>
        </div>
    );
};

export default Gis;
