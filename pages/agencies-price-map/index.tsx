import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button, Table, ProgressBar } from "react-bootstrap";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import "mapbox-gl/dist/mapbox-gl.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import HeaderContainer from "../../containers/Header";
import SearchImage from "../../assets/images/search.svg"
import priceMapImage from "../../assets/images/compare-agency/price-map.png";
import { CustomScrollbar } from "../../components/Scrollbar";
import HomeownerIcon from "../../assets/images/home-noactive.svg";
import ApartmentImageNoActive from "../../assets/images/apartment-noactive.svg";

const priceMap = () => {

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYXNocmFmYWxpMTEyMiIsImEiOiJja3Rkd2UzaHUyazg3MnVwZ2w4YjFubTh3In0.XU0TSvROhCasiUBhLaCbiQ';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v10',
            center: [12, 50],
            zoom: 1.6
        });

        // Data: UN Human Development Index 2017 Europe extract
        // Source: https://ourworldindata.org/human-development-index
        const data = [
            { 'code': 'ROU', 'hdi': 0.811 },
            { 'code': 'RUS', 'hdi': 0.816 },
            { 'code': 'SRB', 'hdi': 0.787 },
            { 'code': 'SVK', 'hdi': 0.855 },
            { 'code': 'SVN', 'hdi': 0.896 },
            { 'code': 'ESP', 'hdi': 0.891 },
            { 'code': 'SWE', 'hdi': 0.933 },
            { 'code': 'CHE', 'hdi': 0.944 },
            { 'code': 'HRV', 'hdi': 0.831 },
            { 'code': 'CZE', 'hdi': 0.888 },
            { 'code': 'DNK', 'hdi': 0.929 },
            { 'code': 'EST', 'hdi': 0.871 },
            { 'code': 'FIN', 'hdi': 0.92 },
            { 'code': 'FRA', 'hdi': 0.901 },
            { 'code': 'DEU', 'hdi': 0.936 },
            { 'code': 'GRC', 'hdi': 0.87 },
            { 'code': 'ALB', 'hdi': 0.785 },
            { 'code': 'AND', 'hdi': 0.858 },
            { 'code': 'AUT', 'hdi': 0.908 },
            { 'code': 'BLR', 'hdi': 0.808 },
            { 'code': 'BEL', 'hdi': 0.916 },
            { 'code': 'BIH', 'hdi': 0.768 },
            { 'code': 'BGR', 'hdi': 0.813 },
            { 'code': 'MKD', 'hdi': 0.757 },
            { 'code': 'MLT', 'hdi': 0.878 },
            { 'code': 'MDA', 'hdi': 0.7 },
            { 'code': 'MNE', 'hdi': 0.814 },
            { 'code': 'NLD', 'hdi': 0.931 },
            { 'code': 'NOR', 'hdi': 0.953 },
            { 'code': 'POL', 'hdi': 0.865 },
            { 'code': 'PRT', 'hdi': 0.847 },
            { 'code': 'HUN', 'hdi': 0.838 },
            { 'code': 'ISL', 'hdi': 0.935 },
            { 'code': 'IRL', 'hdi': 0.938 },
            { 'code': 'ITA', 'hdi': 0.88 },
            { 'code': 'LVA', 'hdi': 0.847 },
            { 'code': 'LIE', 'hdi': 0.916 },
            { 'code': 'LTU', 'hdi': 0.858 },
            { 'code': 'LUX', 'hdi': 0.904 },
            { 'code': 'UKR', 'hdi': 0.751 },
            { 'code': 'GBR', 'hdi': 0.922 }
        ];

        map.on('load', () => {
            // Add source for country polygons using the Mapbox Countries tileset
            // The polygons contain an ISO 3166 alpha-3 code which can be used to for joining the data
            // https://docs.mapbox.com/vector-tiles/reference/mapbox-countries-v1
            map.addSource('countries', {
                type: 'vector',
                url: 'mapbox://mapbox.country-boundaries-v1'
            });

            // Build a GL match expression that defines the color for every vector tile feature
            // Use the ISO 3166-1 alpha 3 code as the lookup key for the country shape
            const matchExpression = ['match', ['get', 'iso_3166_1_alpha_3']];

            // Calculate color values for each country based on 'hdi' value
            for (const row of data) {
                // Convert the range of data values to a suitable color
                const green = row['hdi'] * 255;
                const color = `rgb(0, ${green}, 0)`;

                matchExpression.push(row['code'], color);
            }

            // Last value is the default, used where there is no data
            matchExpression.push('rgba(0, 0, 0, 0)');

            // Add layer from the vector tile source to create the choropleth
            // Insert it below the 'admin-1-boundary-bg' layer in the style
            map.addLayer(
                {
                    'id': 'countries-join',
                    'type': 'fill',
                    'source': 'countries',
                    'source-layer': 'country_boundaries',
                    'paint': {
                        'fill-color': matchExpression
                    }
                },
                'admin-1-boundary-bg'
            );
        });
    })

    const [cityPriceMap, setCityPriceMap] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState<string>("price");

    const citiesData = [
        {
            name: "abcd",
            minPrice: 24112,
            maxPrice: 25211,
        },
        {
            name: "abcd",
            minPrice: 24112,
            maxPrice: 25211,
        },
        {
            name: "abcd",
            minPrice: 24112,
            maxPrice: 25211,
        }
    ]

    const gotoCityData = () => {
        setCityPriceMap(!cityPriceMap)

    }



    const switchTab = (name: string) => {
        setActiveTab(name);
    };

    const progressBarStyle = {
        height: "5px"
    }

    return (
        <>
            <HeaderContainer title="price pam" />
            <div className=" d-flex price-map-main">
                <div className="price-content-view">
                    <div className="d-flex mb-3">
                        <input type="search" placeholder="Ex : “10 rue dy Chateau”, “Paris 15”, “69002”..." />
                        <Button className="search-button"  > <img src={SearchImage} alt="SearchImage" /> </Button>
                    </div>
                    <p> {cityPriceMap ? "Prix immobilier dans le Centre-Val de Loire" : "Prix immobilier partout en France"} </p>

                    {cityPriceMap && (
                        <>
                            <span className="city-price-content-span">Estimations de prix MeilleursAgents au 1 juillet 2021. <Link href="#">Comprendre nos prix</Link></span>

                            <div>
                                <div className="city-price-content-map">
                                    <div className="title-block d-flex flex-row">
                                        <span
                                            onClick={() => switchTab("price")}
                                            className={activeTab === "price" ? "active" : "inactive"}
                                        >
                                            Prix au m²
                                        </span>
                                        <span
                                            onClick={() => switchTab("rent")}
                                            className={activeTab === "rent" ? "active" : "inactive"}
                                        >
                                            Loyer au m²
                                        </span>
                                    </div>
                                    <div className=" city-price-date d-flex ">
                                        <div className="d-flex justify-content-center main-block">
                                            <div className="text-center home-type" >
                                                <div>
                                                    <img src={ApartmentImageNoActive} alt="ApartmentImageNoActive" /><br></br>
                                                    <span>APPARTEMENT</span>
                                                </div>
                                            </div>
                                            <div className="prices-block ">
                                                <span> {activeTab === "price" ? "Prix m2 moyen" : "Loyer mensuel"} </span>
                                                <p> {activeTab === "price" ? 1845 : 1335} € </p>
                                                <span className="price">{activeTab === "price" ? "de 1 789 € à 4 041 €" : "de 1 289 € à 4 041 €"} </span>
                                                <br></br>
                                                <span >Indice de cinfiance</span>
                                                <ProgressBar now={60} variant="warning" min={0} max={100} style={progressBarStyle} />
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-center main-block">
                                            <div className="text-center home-type" >
                                                <div>
                                                    <img src={HomeownerIcon} alt="HomeownerIcon" /><br></br>
                                                    <span>APPARTEMENT</span>
                                                </div>

                                            </div>
                                            <div className="prices-block">
                                                <span> {activeTab === "price" ? "Prix m2 moyen" : "Loyer mensuel"} </span>
                                                <p> {activeTab === "price" ? 1845 : 1335} € </p>
                                                <span className="price">{activeTab === "price" ? "de 1 789 € à 4 041 €" : "de 1 289 € à 4 041 €"} </span>
                                                <br></br>
                                                <span >Indice de cinfiance</span>
                                                <ProgressBar now={60} variant="warning" min={0} max={100} style={progressBarStyle} />
                                            </div>
                                        </div>


                                    </div>

                                    <div className="estimate-links-block text-center d-flex flex-column">

                                        <div className="links-block estmates-buttons">
                                            <p>Estimez votre vien en fonction de sec caracteristiques</p>
                                            <Button>Estimer un bien en ligne</Button>
                                        </div>

                                        <div className="links-block get-prices">
                                            <p>Ou obtenez les prix de vente des blens a proximite</p>
                                            <Button>Obtenir les prix de vente</Button>
                                        </div>
                                        <Link href="#">Comparer les professionnels en fonction de leur nombre de ventes</Link>

                                    </div>

                                </div>


                            </div>
                        </>
                    )}
                    {!cityPriceMap && (
                        <div className="city-price-block" >
                            <p>Le prix du m² dans les grandes villes de France</p>

                            <Table>

                                <thead>
                                    <tr>
                                        <th>Ville</th>
                                        <th>Prix m² moyen appartement</th>
                                        <th>Prix m² moyen maison</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {citiesData.map(city => {
                                        return (
                                            <tr onClick={gotoCityData}>
                                                <td className="city-name">{city.name}</td>
                                                <td>{city.minPrice}</td>
                                                <td>{city.maxPrice}</td>
                                            </tr>)
                                    })}
                                </tbody>

                            </Table>



                        </div>

                    )
                    }

                </div>
                <div className="price-map">
                    <CustomScrollbar>
                        <div id="map" style={{ width:"100%" , height:"100vh"}} ></div>
                        {/* <img src={priceMapImage} alt="priceMapImage" /> */}
                    </CustomScrollbar>
                </div>

            </div>
        </>
    )
}

export const getServerSideProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["header", "footer"])),
        },
    };
}


export default priceMap