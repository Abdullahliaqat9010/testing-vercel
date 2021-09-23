import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button, Table, ProgressBar } from "react-bootstrap";
import Link from "next/link";
import React, { useState } from "react";
import HeaderContainer from "../../containers/Header";
import SearchImage from "../../assets/images/search.svg"
import priceMapImage from "../../assets/images/compare-agency/price-map.png";

import HomeownerIcon from "../../assets/images/home-noactive.svg";
import ApartmentImageNoActive from "../../assets/images/apartment-noactive.svg";

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const priceMap = () => {

    const [cityPriceMap, setCityPriceMap] = useState<boolean>(true)
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
            <div className="w-100 d-flex price-map-main">
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
                                            onClick={() => switchTab("private")}
                                            className={activeTab === "price" ? "active" : ""}
                                        >
                                            Prix au m²
                                        </span>
                                        <span
                                            onClick={() => switchTab("professional")}
                                            className={activeTab === "rent" ? "active" : ""}
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
                                                <span>Prix m² moyen </span>
                                                <p>1 845 €</p>
                                                <span className="price">de 1 383 € a 2 767 € </span>
                                                <br></br>
                                                <span >Indice de cinfiance</span>
                                                <ProgressBar now={60} variant="warning" min={0} max={100} style={progressBarStyle}/>
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
                                                <span>Prix m² moyen </span>
                                                <p>1 845 €</p>
                                                <span className="price">de 1 383 € a 2 767 € </span>
                                                <br></br>
                                                <span >Indice de cinfiance</span>
                                                <ProgressBar now={60} variant="warning" min={0} max={100} style={progressBarStyle}/>
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
                    <img src={priceMapImage} alt="priceMapImage" />
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