

import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useEffect, useState } from "react"
import {  getAgencyById } from "../../network-requests";
import { useRouter } from "next/router";
import PortFolio from "../../containers/agency-detaile-page"



const agencyProtfolio = () => {

    const router = useRouter();
    const { id } = router.query;
   

    useEffect(() => {
        _getAgency()
    }, [])


    const [agency, setAgency] = useState(null);
    const _getAgency = async () => {
        try {
            let _agency = await getAgencyById(Number(id));
            setAgency({ ..._agency });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <PortFolio agency={agency} />
    )

}

export const getStaticPaths = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: "blocking", //indicates the type of fallback
    };
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, [
            "header",
            "agency-page",
            "dashboard-page",
            "common",
        ])),
    },
});

export default agencyProtfolio