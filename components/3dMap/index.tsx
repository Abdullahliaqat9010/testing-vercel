import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import "mapbox-gl/dist/mapbox-gl.css";
import geohashpoly from "geohash-poly";

import MarkerHomeIcon from "../../assets/images/marker.svg";
import MarkerAgencyIcon from "../../assets/images/marker-agency.svg";
import MarkerPropertyIcon from "../../assets/images/similar-property-marker.svg";
import MarkerPropertyActiveIcon from "../../assets/images/similar-property-marker-active.svg";
import { config } from "../../config/siteConfigs";

mapboxgl.Marker.prototype.onClick = function (handleClick) {
	this._handleClick = handleClick;
	return this;
};
mapboxgl.Marker.prototype._onMapClick = function (t) {
	const targetElement = t.originalEvent.target;
	const element = this._element;
	if (
		this._handleClick &&
		(targetElement === element || element.contains(targetElement))
	) {
		this.togglePopup();
		this._handleClick();
	}
};

interface MarkerI {
	type: string;
	position: {
		lat: number;
		lng: number;
	};
	id: null | number | string;
}

interface MapProps {
	markers?: MarkerI[];
	onActiveMarker?: (id: any) => void;
}

const Mapbox3dMap = ({
	markers = [],
	onActiveMarker = (id) => null,
}: MapProps) => {
	const [center, setCenter] = useState([
		markers.length > 0 ? markers[0].position.lng : 51.260197,
		markers.length > 0 ? markers[0].position.lat : 4.402771,
	]);

	const mapRef = useRef(null);

	useEffect(() => {
		mapboxgl.accessToken =
			"pk.eyJ1IjoiYXNocmFmYWxpMTEyMiIsImEiOiJja3Rkd2UzaHUyazg3MnVwZ2w4YjFubTh3In0.XU0TSvROhCasiUBhLaCbiQ";

		mapRef.current = new mapboxgl.Map({
			style: "mapbox://styles/mapbox/light-v10",
			center: [...center],
			zoom: 15,
			pitch: 45,
			bearing: -17.6,
			container: "map",
			antialias: true,
		});
		mapRef.current?.addControl(new mapboxgl.NavigationControl());
	}, [mapRef]);

	useEffect(() => {
		var map = mapRef.current;
		if (map) {
			map?.on("load", () => {
				const layers = map?.getStyle().layers;
				const labelLayerId = layers.find(
					(layer) => layer.type === "symbol" && layer.layout["text-field"]
				).id;

				map?.addLayer(
					{
						id: "add-3d-buildings",
						source: "composite",
						"source-layer": "building",
						filter: ["==", "extrude", "true"],
						type: "fill-extrusion",
						minzoom: 15,
						paint: {
							// "fill-extrusion-color": "#ddcfb2",
							"fill-extrusion-color": "#aaa",
							"fill-extrusion-height": [
								"interpolate",
								["linear"],
								["zoom"],
								15,
								0,
								15.05,
								["get", "height"],
							],
							"fill-extrusion-base": [
								"interpolate",
								["linear"],
								["zoom"],
								15,
								0,
								15.05,
								["get", "min_height"],
							],
							"fill-extrusion-opacity": 1,
						},
					},
					labelLayerId
				);
				map.on("idle", (e) => {
					const bounds = map.getBounds();
					const zoomLevel = map.getZoom();

					let hoverId = null;

					if (zoomLevel >= 14) {
						var polygon = [
							[
								[bounds?._ne?.lng, bounds?._ne?.lat],
								[bounds?._sw?.lng, bounds?._ne?.lat],
								[bounds?._sw?.lng, bounds?._sw?.lat],
								[bounds?._ne?.lng, bounds?._sw?.lat],
								[bounds?._ne?.lng, bounds?._ne?.lat],
							],
						];

						geohashpoly(
							{ coords: polygon, precision: 6 },
							function (err, hashes) {
								hashes.map((geohash) => {
									const mapSource = map.getSource(geohash);
									if (!mapSource) {
										map.addSource(geohash, {
											type: "geojson",
											data: `${config.apiDomain}/parcels?geohash=${geohash}`,
										});
										map.addLayer(
											{
												id: geohash,
												type: "fill",
												source: geohash,
												minzoom: 15,

												paint: {
													"fill-color": "#24f262",
													"fill-outline-color": "#b2abab",
													"fill-opacity": [
														"case",
														["boolean", ["feature-state", "hover"], false],
														0.5,
														0.1,
													],
												},

												// layout: {
												// 	visibility: "none",
												// },
											},
											"add-3d-buildings"
										);
										map.on("mousemove", geohash, ({ features }) => {
											map.getCanvas().style.cursor = "pointer";
											// console.log(features);
											if (features.length === 0) return;
											if (hoverId) {
												map.removeFeatureState({
													source: geohash,
													id: `${hoverId}`,
												});
											}
											hoverId = features[0].properties.id;
											map.setFeatureState(
												{
													source: geohash,
													id: `${hoverId}`,
												},
												{
													hover: true,
												}
											);
										});

										map.on("mouseleave", geohash, () => {
											if (hoverId) {
												map.setFeatureState(
													{
														source: geohash,
														id: `${hoverId}`,
													},
													{
														hover: false,
													}
												);
											}

											hoverId = null;
											map.getCanvas().style.cursor = "";
										});
									}
								});
							}
						);
					}
				});
			});

			map?.touchZoomRotate.enable();
			map?.touchZoomRotate.enableRotation();
		}
	}, [mapRef]);

	useEffect(() => {
		var map = mapRef.current;
		map?.flyTo({
			center: [...center],
			zoom: 20,
			essential: true,
		});
	}, [center]);

	useEffect(() => {
		var map = mapRef.current;
		const prevMarkers = document.getElementsByClassName(
			"marker"
		) as unknown as any[];
		for (const marker of prevMarkers) {
			marker?.remove();
		}
		markers.forEach((marker) => {
			var el = document.createElement("img");
			el.src =
				marker.type === "home" ? (
					MarkerHomeIcon
				) : marker.type === "agency" ? (
					<MarkerAgencyIcon />
				) : marker.type === "property" ? (
					MarkerPropertyIcon
				) : (
					MarkerPropertyActiveIcon
				);
			el.className = "marker";

			new mapboxgl.Marker(el)
				.setLngLat([marker.position.lng, marker.position.lat])
				.onClick(() => {
					setActiveMarker(marker);
				})
				.addTo(map);
		});
	}, [markers]);

	useEffect(() => {
		setCenter([
			markers.length > 0 ? markers[0].position.lng : 51.260197,
			markers.length > 0 ? markers[0].position.lat : 4.402771,
		]);
	}, [markers]);

	const setActiveMarker = (marker: MarkerI) => {
		setCenter([marker.position.lng, marker.position.lat]);
		onActiveMarker(marker?.id);
	};

	return (
		<div style={{ height: "100vh", width: "100%" }} ref={mapRef} id="map" />
	);
};

export default Mapbox3dMap;
