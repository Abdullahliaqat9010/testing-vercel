import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button, Table } from "react-bootstrap";
import HeaderContainer from "../../containers/Header";

import SearchImage from "../../assets/images/search.svg"

const priceMap = () => {

    return (
        <>
            <HeaderContainer title="price pam" />
            <div className="w-100 d-flex price-map-main">
                <div className="price-content-view">
                    <div className="d-flex">
                        <input type="search" placeholder="Ex : “10 rue dy Chateau”, “Paris 15”, “69002”..." />
                        <Button  > <img src={SearchImage} alt="SearchImage" /> </Button>
                    </div>
                    <h1>Prix immobilier partout en France</h1>

                    <div className="city-price-block" >
                        <h2>Le prix du m² dans les grandes villes de France</h2>

                        <Table>

                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                            </tbody>

                        </Table>



                    </div>

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