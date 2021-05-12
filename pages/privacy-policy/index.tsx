import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import HeaderContainer from '../../containers/Header';

const PrivacyPolicyPage = () => {
  return (
    <>
      <HeaderContainer title='Our privacy policy' />
      <div className="PrivacyPolicy">
        <div className="blue-line"/>
        <div className="main-content">
          <h4>Politique de confidentialité et de cookies</h4>
          <span className="data">Dernière mise à jour 09/04/2021</span>
          <p>
            Cette «Politique de confidentialité et de cookies» régit le traitement de vos données à caractère
            personnel par le responsable du traitement: Winleads, opérant sous le nom “BelgiumImmo”, avec son
            siège social basé au 101, rue des champs, 7100 La Louvière à et numéro BCE 0751 533 333 (ci-après:
            Winleads-BelgiumImmo) ou nos partenaires respectifs.
          </p>
          <p>
            Lisez attentivement cette politique de confidentialité et de cookies. Il contient des informations
            essentielles sur la manière dont vos données à caractère personnel sont traitées et les cookies utilisés.
            En partageant vos données à caractère personnel sur notre site
            Internet <a href='http://www.winleads.eu/' target='_blank'>
            www.winleads.eu</a> ou <a href="https://BelgiumImmo.be" target='_blank'>https://BelgiumImmo.be</a> En nous
            contactant par e-mail / téléphone ou en soumettant une question / plainte, vous déclarez que vous avez lu
            cette politique de confidentialité et de cookies et que vous acceptez expressément son contenu.
          </p>
          {/*SEGMENT 1*/}
          <div className='new-segment'>
            <span>Table des matières</span>
          </div>
          <div>
            <span>Article 1 - Quelles données nous traitons à votre sujet</span>
          </div>
          <div>
            <span>Article 2 - Comment nous utilisons vos données à caractère personnel</span>
          </div>
          <div>
            <span>Article 3 - Qui reçoit vos données à caractère personnel</span>
          </div>
          <div>
            <span>Article 4 - Durée du traitement</span>
          </div>
          <div>
            <span>Article 5 - Vos droits</span>
          </div>
          <div>
            <span>Article 6 - Comment nous protéger vos données à caractère personnel</span>
          </div>
          <div>
            <span>Article 7 - Cookies</span>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, []),
  },
});

export default PrivacyPolicyPage;