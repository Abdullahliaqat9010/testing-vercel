import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import HeaderContainer from '../../containers/Header';

const TermsAndConditionsPage = () => {
  const { t } = useTranslation("terms-condition-page")
  return (
    <>
      <HeaderContainer title='Our terms and conditions' />
      <div className='Terms'>
        <div className="blue-line"/>
        <div className="main-content">
          <h4>{t("h4.title")} <span>{t("span.company-name")}</span></h4>
          <span className='data'>{t("span.updated-date")}</span>
          <p>
           {t("abstract.p1")}
          </p>
          <p>
            {t("abstract.p2")}
          </p>
          <p>
          {t("abstract.p3")}
          </p>
          <p>
          {t("abstract.p4")}
          </p>
          {/*SECTION 1*/}
          <div className='new-segment'>
            <span>{t("span.chepter-one")}</span>
          </div>
          <p>
            {t("chepter-one-p1")}
          </p>
          <ul>
            <li>
              <b>{t("chepter-one-li1.b")}</b> {t("chepter-one-li1")}
            </li>
            <li>
              <b>{t("chepter-one-li2.b")}</b> {t("chepter-one-li2")}
            </li>
            <li>
              <b>{t("chepter-one-li3.b")}</b>{t("chepter-one-li3")}
            </li>
            <li>
              <b>{t("chepter-one-li4.b")}</b> {t("chepter-one-li4")}
            </li>
            <li>
              <b>{t("chepter-one-li5.b")}</b> {t("chepter-one-li5")}
            </li>
          </ul>
          {/*SECTION 2*/}
          <div className='new-segment'>
            <span>{t("span.checpter-two")}</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">2.1</span>
            <span className="double-block__text">
             {t("span.checpter-two-2.1")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">2.2</span>
            <span className="double-block__text">
            {t("span.checpter-two-2.2")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">2.3</span>
            <span className="double-block__text">
            {t("span.checpter-two-2.3")}
            </span>
          </div>
          {/*SECTION 3*/}
          <div className='new-segment'>
            <span>{t("chepter-three")}</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">3.1</span>
            <div className="double-block__text">
              <span>
                {t("span.checpter-three")}
              </span>
              <ul>
                <li>
                  {t("checpter-three-li1")}
                </li>
                <li>
                {t("checpter-three-li2")}
                </li>
                <li className='mb-0'>
                {t("checpter-three-li3")}
                </li>
              </ul>
            </div>
          </div>
          <div className="double-block">
            <span className="double-block__label">3.2</span>
            <span className="double-block__text">
             {t("checpter-three.2")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">3.3</span>
            <span className="double-block__text">
            {t("checpter-three.3")}

            </span>
          </div>
          {/*SECTION 4*/}
          <div className='new-segment'>
            <span>{t("chepter-four")}</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">4.1</span>
            <span className="double-block__text">
              {t("chepter-four")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">4.2</span>
            <div className="double-block__text">
              <p>
                {t("chapter-four.2-p1")}
              </p>
              <p>
              {t("chapter-four.2-p2")}
                
              </p>
              <p className='mb-0'>
                {t("chapter-four.2-p3")}
              </p>
            </div>
          </div>
          <div className="double-block">
            <span className="double-block__label">4.3</span>
            <span className="double-block__text">
             {t("chapter-four.3-p1")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">4.4</span>
            <div className="double-block__text">
              <span>
                {t("span.chapter-four.4")}<b>{t("span.chapter-four.4.b")}</b>:
              </span>
              <ul className='roman-items'>
                <li className='first'>
                  <b>{t("chapter-four.4-li1-b")}</b>{t("chapter-four.4-li1")}
                </li>
                <li className='second'>
                  <b>{t("chapter-four.4-li2-b")}</b> {t("chapter-four.4-li2")}
                </li>
                <li className='third'>
                  <b>{t("chapter-four.4-li3-b")}</b> {t("chapter-four.4-li3")}
                </li>
              </ul>
            </div>
          </div>
          <div className="double-block">
            <span className="double-block__label">4.5</span>
            <div className="double-block__text">
              <p>
                {t("chepter-four.5-p1")} <a href="mailto:support@winleads.eu">
                support@winleads.eu</a>.
              </p>
              <p>
              {t("chepter-four.5-p2")}
              </p>
            </div>
          </div>
          <div className="double-block">
            <span className="double-block__label">4.6</span>
            <span className="double-block__text">
            {t("chepter-four.6")}
            </span>
          </div>
          {/*SECTION 5*/}
          <div className='new-segment'>
            <span>{t("chepter-five")}</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">5.1</span>
            <div className="double-block__text">
              <p>
              {t("chepter-five.1-p1")}
              </p>
              <p>
              {t("chepter-five.1-p2")}
              </p>
            </div>
          </div>
          <div className="double-block">
            <span className="double-block__label">5.2</span>
            <span className="double-block__text">
              {t("chepter-five.2-span")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">5.3</span>
            <div className="double-block__text">
              <span>
              {t("chepter-five.3-span")}
              </span>
              <ul className='roman-items'>
                <li className='first'>
                  {t("chepter-five.3-li1")}
                </li>
                <li className='second'>
                {t("chepter-five.3-li2")}
                </li>
                <li className='third'>
                {t("chepter-five.3-li3")}
                </li>
              </ul>
            </div>
          </div>
          <div className="double-block">
            <span className="double-block__label">5.4</span>
            <span className="double-block__text">
              {t("chepter-five.4-span")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">5.5</span>
            <span className="double-block__text">
            {t("chepter-five.5-span")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">5.6</span>
            <span className="double-block__text">
            {t("chepter-five.6-span")}
            </span>
          </div>
          {/*SECTION 6*/}
          <div className='new-segment'>
            <span>{t("chepter-six")}</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">6.1</span>
            <span className="double-block__text">
            {t("chepter-six.1-span")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">6.2</span>
            <span className="double-block__text">
            {t("chepter-six.2-span")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">6.3</span>
            <span className="double-block__text">
            {t("chepter-six.3-span")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">6.4</span>
            <span className="double-block__text">
            {t("chepter-six.4-span")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">6.5</span>
            <span className="double-block__text">
            {t("chepter-six.5-span")} <a href="mailto:support@winleads.eu">support@winleads.eu</a>.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">6.6</span>
            <span className="double-block__text">
            {t("chepter-six.6-span")}
            </span>
          </div>
          {/*SECTION 7*/}
          <div className='new-segment'>
            <span>{t("chepter-seven")}</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">7.1</span>
            <div className="double-block__text">
              <span>
              {t("chepter-seven.1-span")}
              </span>
              <ul className='roman-items'>
                <li className='first'>
                  <b>{t("chepter-seven.1-li1.b")}</b> {t("chepter-seven.1-li1")}
                </li>
                <li className='second'>
                {t("chepter-seven.1-li2")}
                </li>
                <li className='third'>
                  <b>{t("chepter-seven.1-li3.b")}</b> {t("chepter-seven.1-li3")}
                </li>
                <li className='fourth'>
                  <b>{t("chepter-seven.1-li4.b")}</b> {t("chepter-seven.1-li4")}
                </li>
                <li className='fifth'>
                  <b>{t("chepter-seven.1-li5.b")}</b> {t("chepter-seven.1-li5")}
                </li>
                <li className='sixth'>
                  <b>{t("chepter-seven.1-li6.b")}</b>{t("chepter-seven.1-li6")}
                </li>
                <li className='seventh'>
                  <b>{t("chepter-seven.1-li7.b")}</b> {t("chepter-seven.1-li7")}
                </li>
                <li className='eighth'>
                  <b>{t("chepter-seven.1-li8.b")}</b> {t("chepter-seven.1-li8")}
                </li>
                <li className='ninth'>
                  <b>{t("chepter-seven.1-li9.b")}</b> {t("chepter-seven.1-li9")}
                </li>
              </ul>
            </div>
          </div>
          <div className="double-block">
            <span className="double-block__label">7.2</span>
            <span className="double-block__text">
              {t("chepter-seven.2-span")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">7.3</span>
            <div className="double-block__text">
              <span>
              {t("chepter-seven.3-span")}
              </span>
              <ul className='roman-items'>
                <li className='first'>
                {t("chepter-seven.3-li1")}
                </li>
                <li className='second'>
                {t("chepter-seven.3-li2")}
                </li>
                <li className='third'>
                {t("chepter-seven.3-li3")}
                </li>
                <li className='fourth'>
                {t("chepter-seven.3-li4")}
                </li>
              </ul>
              <p>
              {t("chepter-seven.3-p")}
              </p>
            </div>
          </div>
          {/*SECTION 8*/}
          <div className='new-segment'>
            <span>{t("chepter-eight")}</span>
          </div>
          <p>
          {t("chepter-eight-p1")}
          </p>
          <p>
          {t("chepter-eight-p2")}
          </p>
          {/*SECTION 9*/}
          <div className='new-segment'>
            <span>{t("chepter-nine")}</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">9.1</span>
            <span className="double-block__text">
            {t("chepter-nine.1-span")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">9.2</span>
            <span className="double-block__text">
            {t("chepter-nine.2-span")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">9.3</span>
            <div className="double-block__text">
              <span>
              {t("chepter-nine.3-span")}
              </span>
              <p className='mt-3'>{t("chepter-nine.3-p")}</p>
              <ul className='roman-items'>
                <li className='first'>
                 {t("chepter-nine.3-li1")}
                </li>
                <li className='second'>
                {t("chepter-nine.3-li2")}
                </li>
              </ul>
              <p>
              {t("chepter-nine.3-p2")}
              </p>
              <p>
              {t("chepter-nine.3-p3")}
              </p>
            </div>
          </div>
          <div className="double-block">
            <span className="double-block__label">9.4</span>
            <span className="double-block__text">
            {t("chepter-nine.4-span")}
            
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">9.5</span>
            <span className="double-block__text">
            {t("chepter-nine.5-span")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">9.6</span>
            <span className="double-block__text">
            {t("chepter-nine.6-span")}
            </span>
          </div>
          {/*SECTION 10*/}
          <div className='new-segment'>
            <span>
              {t("chepter-ten")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">10.1</span>
            <span className="double-block__text">
            {t("chepter-ten.1-span")}
            </span>
          </div>
          <p>
          {t("chepter-ten.1-p")}
          </p>
          <div className="double-block">
            <span className="double-block__label">10.2</span>
            <span className="double-block__text">
            {t("chepter-ten.2-span")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">10.3</span>
            <span className="double-block__text">
            {t("chepter-ten.3-span")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">10.4</span>
            <span className="double-block__text">
            {t("chepter-ten.4-span")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">10.5</span>
            <span className="double-block__text">
            {t("chepter-ten.5-span")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">10.6</span>
            <span className="double-block__text">
            {t("chepter-ten.6-span")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">10.7</span>
            <span className="double-block__text">
            {t("chepter-ten.6-span")}
            </span>
          </div>
          {/*SECTION 11*/}
          <div className='new-segment'>
            <span>{t("chepter-eleven")}</span>
          </div>
          <p>
          {t("chepter-eleven-p")}
          </p>
          {/*SECTION 12*/}
          <div className='new-segment'>
            <span>{t("chepter-tweleve")}</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">12.1</span>
            <span className="double-block__text">
            {t("chepter-tweleve.1")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">12.2</span>
            <span className="double-block__text">
            {t("chepter-tweleve.2")}
            </span>
          </div>
          {/*SECTION 13*/}
          <div className='new-segment'>
            <span>{t("chepter-thirteen")}</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">13.1</span>
            <span className="double-block__text">
            {t("chepter-thirteen.1")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">13.2</span>
            <div className="double-block__text">
              <p>
              {t("chepter-thirteen.2-p1")}
              </p>
              <p>
              {t("chepter-thirteen.2-p2")}
              </p>
            </div>
          </div>
          {/*SECTION 14*/}
          <div className='new-segment'>
            <span>{t("chepter-fourteen")} </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">14.1</span>
            <span className="double-block__text">
            {t("chepter-fourteen.1")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">14.2</span>
            <span className="double-block__text">
            {t("chepter-fourteen.2")}
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">14.3</span>
            <span className="double-block__text">
            {t("chepter-fourteen.3.part1")} <a href="mailto:matteo@winleads.eu">matteo@winleads.eu</a>{t("chepter-fourteen.3.part2")}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ["terms-condition-page","header", "comman"]),
  },
});

export default TermsAndConditionsPage;