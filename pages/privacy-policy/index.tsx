import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import HeaderContainer from '../../containers/Header';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const PrivacyPolicyPage = () => {
  const {t} = useTranslation("privacy-policy")
  return (
    <>
      <HeaderContainer title='Our privacy policy' />
      <div className="PrivacyPolicy">
        <div className="blue-line"/>
        <div className="main-content">
          <h4>{t("title")}</h4>
          <span className="data">{t("updatedDate") }</span>
          {/* <p>
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
          </p> */}
          {/*TOP SEGMENT*/}
          <div className='new-segment'>
            <span>{t("content-title") }</span>
          </div>
          <div>
            <span>{t("artical-one")}</span>
          </div>
          <div>
            <span>{t("artical-two")}</span>
          </div>
          <div>
            <span>{t("artical-three")}</span>
          </div>
          <div>
            <span>{t("artical-four")}</span>
          </div>
          <div>
            <span>{t("artical-five")}</span>
          </div>
          <div>
            <span>{t("artical-six")}</span>
          </div>
          <div>
            <span>{t("artical-seven")}</span>
          </div>
          {/*SEGMENT 1*/}
          <div className='new-segment'>
            <span>{t("artical-one")}</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">1.1</span>
            <div className="double-block__text">
              <span>
                {t("span-artical-one")}
              </span>
              <ul>
                <li>
                  <b>{t("artical-one-li1.b")}</b> {t("artical-one-li1")}
                </li>
                <li>
                  <b>{t("artical-one-li2.b")}</b> {t("artical-one-li2")}
                </li>
                <li>
                  <b>{t("artical-one-li3.b")}</b>{t("artical-one-li3")}
                </li>
                <li>
                  <b>{t("artical-one-li4.b")}</b> {t("artical-one-li4.b")}
                </li>
                <li>
                  <b>{t("artical-one-li5.b")}</b>{t("artical-one-li5.b")}
                </li>
                <li>
                  <b>{t("artical-one-li6.b")}</b> {t("artical-one-li6")}
                </li>
              </ul>
            </div>
          </div>
          {/*SEGMENT 2*/}
          <div className='new-segment'>
            <span>{t("artical-two")}</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">2.1  </span>
            <div className="double-block__text">
            <span>
            {t("artical-two-discription")}
              </span>
              <span>
              {t("span-artical-two")}
              </span>
              <ul>
                <li>
                  <b>{t("artical-two-li1.b")}</b> {t("artical-two-li1")}
                </li>
                <li>
                  <b>{t("artical-two-li2.b")}</b> {t("artical-two-li2")}
                </li>
                <li>
                  <b>{t("artical-two-li3.b")}</b> {t("artical-two-li3")}
                </li>
                <li>
                  <b>{t("artical-two-li4.b")}</b>{t("artical-two-li4")}
                </li>
                <li>
                  <b>{t("artical-two-li5.b")}</b> {t("artical-two-li5")}
                </li>
                <li>
                  <b>{t("artical-two-li6.b")}</b>{t("artical-two-li6")}
                </li>
              </ul>
            </div>
          </div>
          <div className="double-block">
            <span className="double-block__label">2.2 </span>
            <div className="double-block__text">
            <p>
            {t("artical-two.2-description")}
              </p>
              <p>
                {t("artical-two.2-p1")}
              </p>
              <p>
               {t("artical-two.2-p2")}
              </p>
            </div>
          </div>
          {/*SEGMENT 3*/}
          <div className='new-segment'>
            <span>{t("artical-three")}</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">3.1</span>
            <span className="double-block__text">
              {t("artical-three.1-p1")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">3.2</span>
            <span className="double-block__text">
              {t("artical-three.2-p1")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">3.3</span>
            <div className="double-block__text">
              <span>
                {t("artical-three.3-p1")}
              </span>
              <ul>
                <li>
                  {t("artical-three.3-li1")}
                </li>
                <li>{t("artical-three.3-li2")}</li>
                <li>{t("artical-three.3-li3")}</li>
                <li>{t("artical-three.3-li4")}</li>
                <li>{t("artical-three.3-li5")}</li>
                <li>{t("artical-three.3-li6")}</li>
                {/* <li>
                  des prestataires de services tiers, en particulier Hubspot, Chargebee, Quickbooks, Supermetrics,
                  Zoho, Google et Facebook.
                </li> */}
              </ul>
            </div>
          </div>
          <div className="double-block">
            <span className="double-block__label">3.4</span>
            <div className="double-block__text">
              <span>
               {t("artical-three.4")}
              </span>
              <ul>
                <li>
                  {t("artical-three.4-li1")}
                </li>
                <li>
                  {t("artical-three.4-li2")}
                </li>
                <li>
                  {t("artical-three.4-li3")}
                </li>
                <li>
                  {t("artical-three.4-li4")}
                </li>
                <li>
                  {t("artical-three.4-li5")}
                </li>
                <li>
                 {t("artical-three.4-li6")}
                </li>
                <li>
                  {t("artical-three.4-li7")}
                </li>
                <li>
                  {t("artical-three.4-li8")}
                </li>
              </ul>
            </div>
          </div>
          <div className="double-block">
            <span className="double-block__label">3.5</span>
            <span className="double-block__text">{t("artical-three.5")}</span>
          </div>
          {/*SEGMENT 4*/}
          <div className='new-segment'>
            <span>{t("artical-four")}</span>
          </div>
          <p>
            {t("artical-four-p")}
          </p>
          <ul>
            <li>
             {t("artical-four-li1")}
            </li>
            <li>
              {t("artical-four-li2")}
            </li>
            <li>
              {t("artical-four-li3")}
            </li>
            <li>
             {t("artical-four-li4")}
            </li>
            <li>
             {t("artical-four-li5")}
            </li>
          </ul>
          {/*SEGMENT 5*/}
          <div className='new-segment'>
            <span>{t("artical-five")}</span>
          </div>
          <p>
            {t("artical-five-p1")}
          </p>
          <p>
           {t("artical-five-p2")} <a href="mailto:matteo@winleads.be">
            matteo@winleads.be</a>
          </p>
          <p>
           {t("artical-five-p3")}
          </p>
          <p className='mb-0'>{t("artical-five-p4")}</p>
          <p className='mb-0'>{t("artical-five-p5")}</p>
          <p className='mb-0'>{t("artical-five-p6")}</p>
          <p className='mb-0'>
            <a href="mailto:contact@apd-gba.be">{t("artical-five-p7")}</a>
          </p>
          <p>
           {t("artical-five-p8")}
          </p>
          {/*SEGMENT 6*/}
          <div className='new-segment'>
            <span>{t("artical-six")}</span>
          </div>
          <p>
           {t("artical-six-p1")}
          </p>
          <p>
            {t("artical-six-p2")}
          </p>
          {/*SEGMENT 7*/}
          <div className='new-segment'>
            <span>{t("artical-seven")}</span>
          </div>
          <p>
           {t("artical-seven-p1")}
          </p>
          <p>
            {t("artical-seven-p2")}
          </p>
          <p><b>{t("artical-seven-section-one")}</b></p>
          <p>
            {t("artical-seven-section-one-p1")}
          </p>
          <p><b>{t("artical-seven-section-two")}</b></p>
          <p>
           {t("artical-seven-section-two-p1")}
          </p>
          <div>
            <Table responsive bordered>
              <thead>
              <tr>
                <th>{t("artical-seven-section-two-table-cl1")}</th>
                <th>{t("artical-seven-section-two-table-cl2")}</th>
                <th>{t("artical-seven-section-two-table-cl3")}</th>
                <th>{t("artical-seven-section-two-table-cl4")}</th>
              </tr>
              </thead>
              <tbody>
              <tr><td/><td/><td/><td/></tr>
              <tr><td/><td/><td/><td/></tr>
              <tr><td/><td/><td/><td/></tr>
              </tbody>
            </Table>
          </div>
          <p><b>{t("artical-seven-section-three")}</b></p>
          <p>
            {t("artical-seven-section-three-p1")}
          </p>
          <div>
            <Table responsive bordered>
              <thead>
              <tr>
                <th>{t("artical-seven-section-three-table-cl1")}</th>
                <th>{t("artical-seven-section-three-table-cl2")}</th>
                <th>{t("artical-seven-section-three-table-cl3")}</th>
                <th>{t("artical-seven-section-three-table-cl4")}</th>
                <th>{t("artical-seven-section-three-table-cl5")}</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{t("artical-seven-section-three-table-r1c1")}</td>
                <td>{t("artical-seven-section-three-table-r1c2")}</td>
                <td>{t("artical-seven-section-three-table-r1c3")}</td>
                <td>
                 {t("artical-seven-section-three-table-r1c4")}
                </td>
                <td>{t("artical-seven-section-three-table-r1c5")}</td>
              </tr>
              <tr>
                <td>{t("artical-seven-section-three-table-r2c1")}</td>
                <td>{t("artical-seven-section-three-table-r1c2")}</td>
                <td>{t("artical-seven-section-three-table-r1c3")}</td>
                <td>
                  {t("artical-seven-section-three-table-r2c4")}
                </td>
                <td>{t("artical-seven-section-three-table-r2c5")}</td>
              </tr>
              <tr>
                <td>{t("artical-seven-section-three-table-r3c1")}</td>
                <td>{t("artical-seven-section-three-table-r1c2")}</td>
                <td>{t("artical-seven-section-three-table-r1c3")}</td>
                <td>
                  {t("artical-seven-section-three-table-r3c4")}
                </td>
                <td>{t("artical-seven-section-three-table-r3c5")}</td>
              </tr>
              </tbody>
            </Table>
            <p><b>{t("artical-seven-section-four")}</b></p>
            <p>
              {t("artical-seven-section-four-p1")}
            </p>
          </div>
          <div>
            <Table responsive bordered>
              <thead>
              <tr>
                <th>{t("artical-seven-section-four-table-cl1")}</th>
                <th>{t("artical-seven-section-four-table-cl2")}</th>
                <th>{t("artical-seven-section-four-table-cl3")}</th>
                <th>{t("artical-seven-section-four-table-cl4")}</th>
                <th>{t("artical-seven-section-four-table-cl5")}</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{t("artical-seven-section-four-table-r1c1")}</td>
                <td>{t("artical-seven-section-four-table-r1c2")}</td>
                <td>{t("artical-seven-section-four-table-r1c3")}</td>
                <td>{t("artical-seven-section-four-table-r1c4")}</td>
                <td>{t("artical-seven-section-four-table-r1c5")}</td>
              </tr>
              </tbody>
            </Table>
          </div>
          <p><b>{t("artical-seven-section-five-markeeting")}</b></p>
          <p>{t("artical-seven-section-five-markeeting-p1")}
          </p>
          <div>
            <Table responsive bordered>
              <thead>
              <tr>
                <th>{t("artical-seven-section-five-table-cl1")}</th>
                <th>{t("artical-seven-section-four-table-cl2")}</th>
                <th>{t("artical-seven-section-four-table-cl3")}</th>
                <th>{t("artical-seven-section-four-table-cl4")}</th>
                <th>{t("artical-seven-section-four-table-cl5")}</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{t("artical-seven-section-five-table-r1c1")}</td>
                <td>{t("artical-seven-section-five-table-r1c2")}</td>
                <td>{t("artical-seven-section-five-table-r1c3")}</td>
                <td>
                  {t("artical-seven-section-five-table-r1c4")}
                </td>
                <td>{t("artical-seven-section-five-table-r1c5")}</td>
              </tr>
              </tbody>
            </Table>
          </div>
          <p>
            {t("artical-seven-section-five-p1")}
          </p>
          <p>
           {t("artical-seven-section-five-p2")}
          </p>
          <p>
            {t("artical-seven-section-five-p3")}
          </p>
          <p>
            {t("artical-seven-section-five-p4")} <a href='http://www.winleads.eu/' target='_blank'>
            www.winleads.eu</a> {t("of")} <a href="https://BelgiumImmo.be" target='_blank'>https://BelgiumImmo.be</a>
          </p>
          <p>
           {t("artical-seven-section-five-p5")} <a href="http://www.allaboutcookies.org" target='_blank'>http://www.allaboutcookies.org</a>.
          </p>
          <p>
            {t("artical-seven-section-five-p6")} <a href="http://www.youronlinechoices.eu" target='_blank'>http://www.youronlinechoices.eu</a>.
          </p>
          <p> {t("artical-seven-section-five-p7-1")} <a href='http://www.winleads.eu/' target='_blank'>
            www.winleads.eu</a> {t("of")} <a href="https://BelgiumImmo.be" target='_blank'>https://BelgiumImmo.be</a>
            {t("artical-seven-section-five-p7-2")}
            </p>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ["privacy-policy"]),
  },
});

export default PrivacyPolicyPage;