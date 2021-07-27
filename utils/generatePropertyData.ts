export const generatePropertyData = (
	addressFromStepOne: string,
	additionalAddress,
	selectedProperty: string,
	propertyDetails,
	details,
	utilities,
	location
) => {
	return {
		search_address: String(addressFromStepOne),
		country: String(additionalAddress.country),
		street: String(additionalAddress.street),
		street_number: String(additionalAddress.number),
		zip: String(additionalAddress.zip),
		locality: String(additionalAddress.locality),
		property_type: String(selectedProperty),
		live_area: Number(propertyDetails.livingArea),
		total_area:
			selectedProperty !== "apartment"
				? Number(propertyDetails.landSurface)
				: undefined,
		bedrooms: Number(propertyDetails.numberBedrooms),
		bathrooms: Number(propertyDetails.numberBathrooms),
		floor: Number(propertyDetails.numberLevels),
		levels: Number(propertyDetails.numberFloors),
		prestige: String(details.prestige),
		facades: Number(propertyDetails.facadesNumber),
		construction_year: Number(details.constructionYear) || undefined,
		terras_size: Number(propertyDetails.gardenTerrasValue) || undefined,
		renov_year: Number(details.renovationYear) || undefined,
		renov_level: Number(details.renovationLevel) || undefined,
		epc: Number(utilities.epc) || undefined,
		view: String(utilities.view),
		orientation_terras: String(utilities.orientation),
		attic: Number(utilities.atticValue) || undefined,
		cellar: Number(utilities.cellarValue) || undefined,
		elevator: Boolean(utilities.elevator),
		pool: Boolean(utilities.swimmingPool),
		indoor_garage: utilities.parking
			? Number(utilities.indoorGarage)
			: undefined,
		outdoor_garage: utilities.parking
			? Number(utilities.outdoorGarage)
			: undefined,
		carport: utilities.parking ? Number(utilities.carport) : undefined,
		solar_panels: Number(utilities.solarPanels),
		state: String(details.condition),
		source: "immoBelgium",
		status: "for_sale",
		lat: String(location.lat),
		lng: String(location.lng),
	};
};
