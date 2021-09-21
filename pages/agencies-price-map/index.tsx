import { serverSideTranslations } from "next-i18next/serverSideTranslations";



const priceMap = () => {

    return (
        <div>asakjshka</div>
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