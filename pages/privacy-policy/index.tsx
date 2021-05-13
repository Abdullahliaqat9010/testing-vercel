import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import HeaderContainer from '../../containers/Header';
import { Table } from 'react-bootstrap';

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
          {/*TOP SEGMENT*/}
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
          {/*SEGMENT 1*/}
          <div className='new-segment'>
            <span>Article 1	Quelles données nous traitons à votre sujet</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">1.1</span>
            <div className="double-block__text">
              <span>
                Winleads-BelgiumImmo traite les données à caractère personnel suivantes dans le cadre de ses activités:
              </span>
              <ul>
                <li>
                  <b>Cookies et pixels</b> - Chaque fois que vous utilisez notre site web ou notre application,
                  différentes informations personnelles vous concernant peuvent être recueillies par le biais de
                  cookies et de technologies similaires, en particulier votre adresse IP, lieu, âge, sexe, type
                  d’appareil et votre comportement de navigation;
                </li>
                <li>
                  <b>Données des agents immobilier</b> - Lorsque vous utilisez les fonctionnalités de notre site web,
                  remplissez le formulaire de contact ou que vous demandez une service, nous pouvons recueillir les
                  données suivantes à votre sujet: vos nom, prénom, adresse, adresse électronique, numéro de téléphone,
                  nom de votre société, votre siège social, numéro de TVA, le numéro de votre compte bancaire, le numéro
                  de votre carte de crédit, la région dans laquelle vous opérez et toute autre information que vous nous
                  fournissez;
                </li>
                <li>
                  <b>Données des vendeurs (potentiels) de biens immobiliers</b> - Lorsque vous utilisez les
                  fonctionnalités de notre site web, remplissez le formulaire de contact ou que vous demandez une
                  service (comme une évaluation de la valeur de votre bien immobilier), nous pouvons recueillir les
                  données à caractère personnel suivantes: vos nom, prénom, numéro de téléphone, adresse, adresse
                  électronique, détails concernant la vente/l’achat de la maison;
                </li>
                <li>
                  <b>Données sur les biens immobiliers vendus</b> - le prix de vente effectif, le prix de vente publié,
                  la surface habitable, la surface non habitable, le nombre de salles de bain, le nombre de chambres,
                  le nombre de garages (extérieur ou intérieur), l'ascenseur, le nombre de façades, le nombre d'étages
                  (ou à quel étage si appartement), l'adresse, les photos, la description, la valeur EPC, l'année de
                  construction, l'année de rénovation, l'état de la maison, l'orientation de la terrasse/du jardin, la
                  piscine, les panneaux solaires, le prestige, la cave, la surface de toutes les pièces, etc.
                </li>
                <li>
                  <b>Données des fournisseurs</b> - Si vous êtes un fournisseur (potentiel), nous traiterons les données
                  à caractère personnel suivantes à votre sujet: vos nom, prénom, adresse, adresse électronique, numéro
                  de téléphone, nom commercial, numéro de TVA, siège social, numéro de votre compte bancaire et toute
                  autre donnée que vous nous fournissez;
                </li>
                <li>
                  <b>Données de communication</b> - Si vous nous appelez, nous envoyer un courriel ou remplissez un
                  formulaire de contact, nous pouvons recueillir les données à caractère personnel suivantes: vos nom
                  et prénom, adresse électronique, votre numéro de téléphone, ainsi que les données que vous fournissez
                  vous-même.
                </li>
              </ul>
            </div>
          </div>
          {/*SEGMENT 2*/}
          <div className='new-segment'>
            <span>Article 2	Comment nous utilisons vos données à caractère personnel</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">2.1</span>
            <div className="double-block__text">
              <span>
                Winleads-BelgiumImmo utilisera uniquement vos données à caractère personnel que pour:
              </span>
              <ul>
                <li>
                  <b>Cookies et pixels</b> - maintenir et améliorer notre site web et notre application et pour
                  inclure des données à caractère personnel dans les statistiques sur la base juridique de votre
                  consentement explicite et préalable;
                </li>
                <li>
                  <b>Données des agents immobilier</b> - gérer votre compte sur notre site Web et pour la livraison et
                  la facturation des services que vous avez commandés, sur la base juridique de la nécessité d’exécuter
                  un contrat que vous avez demandé et de pouvoir tenir nos comptes, la base juridique étant une
                  obligation légale;
                </li>
                <li>
                  <b>Données des vendeurs (potentiels) de biens immobiliers</b> - pouvoir générer des prospects en tant
                  que sous-traitant pour le compte de nos clients (agents immobiliers), pour collecter des données de
                  contact de notre propre initiative en tant que sous-traitant et les transmettre ensuite à des tiers
                  et pour la livraison des services que vous avez demandé, avec votre consentement explicite et
                  préalable comme base juridique;
                </li>
                <li>
                  <b>Données sur les biens immobiliers vendus</b> - le bon fonctionnement de la calculatrice en ligne,
                  pour être en mesure d'estimer la valeur d'une propriété et pour ermettre aux agents d'exporter des
                  rapports de marché concurrentiels contenant des données sur leurs maisons vendues et celles d'autres
                  agents, avec le consentement explicite et préalable comme base juridique;
                </li>
                <li>
                  <b>Données des fournisseurs</b> - vous envoyer une demande de devis, passer une commande, payer vos
                  factures et communiquer avec vous, sur la base juridique de la nécessité d’exécuter un contrat et de
                  pouvoir tenir nos comptes, la base juridique étant une obligation légale;
                </li>
                <li>
                  <b>Données de communication</b> - pouvoir répondre à la question que vous avez posée sur la base
                  juridique de votre consentement explicite et préalable en ligne et notre intérêt légitime à vous
                  contacter par téléphone.
                </li>
              </ul>
            </div>
          </div>
          <div className="double-block">
            <span className="double-block__label">2.2</span>
            <div className="double-block__text">
              <p>
                Nous utilisons également vos données à caractère personnel pour le marketing direct, les newsletters,
                les promotions et les promotions, dont la base juridique est notre intérêt légitime à l'égard des
                clients existants, ou votre consentement préalable explicite dans tous les autres cas.
              </p>
              <p>
                Si vous ne souhaitez plus recevoir de telles communications et que nous cessons de traiter vos données
                à caractère personnel à des fins de marketing direct, vous pouvez le faire sans frais et sans avoir à
                donner de raison en cliquant sur le lien dans chacun de nos mailings directs.ou par en nous contactant
                directement par e-mail ou par téléphone.
              </p>
            </div>
          </div>
          {/*SEGMENT 3*/}
          <div className='new-segment'>
            <span>Article 3	Qui reçoit vos données à caractère personnel</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">3.1</span>
            <span className="double-block__text">
              Les agents immobiliers s'appuient sur Winleads-BelgiumImmo en tant que fournisseur de services tiers
              pour entrer en contact avec des vendeurs (potentiels) et faire calculer la valeur des biens immobiliers
              par le calculateur. Dans ce cas, Winleads-BelgiumImmo est un sous-traitant au sens du RGPD et ne traitera
              vos données à caractère personnel que conformément aux instructions des agents immobiliers.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">3.2</span>
            <span className="double-block__text">
              Si un agent immobilier annule son abonnement à Winleads-BelgiumImmo, Winleads-BelgiumImmo reçoit une
              copie des données sur les biens immobiliers vendus, que l'agent immobilier a partagées avec Winleads
              pendant son abonnement. Dans ce cas, Winleads est le responsable du traitement des données.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">3.3</span>
            <div className="double-block__text">
              <span>
                Winleads-BelgiumImmo peut partager vos données à caractère personnel avec:
              </span>
              <ul>
                <li>
                  les autorités gouvernementales, les tribunaux et les forces de police sur la base d'une décision de
                  justice ou pour se conformer à d'autres lois ou réglementations obligatoires,
                </li>
                <li>des institutions financières,</li>
                <li>des travailleurs indépendants externes</li>
                <li>le comptable</li>
                <li>des agents immobiliers qui ont souscrit à Winleads-BelgiumImmo</li>
                <li>les services de paiement, en particulier PayPal</li>
                <li>
                  des prestataires de services tiers, en particulier Hubspot, Chargebee, Quickbooks, Supermetrics,
                  Zoho, Google et Facebook.
                </li>
              </ul>
            </div>
          </div>
          <div className="double-block">
            <span className="double-block__label">3.4</span>
            <div className="double-block__text">
              <span>
                Winleads-BelgiumImmo fait appel régulièrement à des tiers qui stockent des données à caractère
                personnel en dehors de l’Espace économique européen. Ce faisant, nous prenons toutes les mesures
                possibles afin de garantir la sécurité de vos données à caractère personnel et exigeons de ces tiers
                qu’ils traitent vos données de matière aussi sûre que nous le faisons nous-mêmes:
              </span>
              <ul>
                <li>
                  Zoho (Etats-Unis) a un accord commercial de groupe basé sur les clauses contractuelles types de la
                  Commission européenne,
                </li>
                <li>
                  au sein du groupe Paypal, ils existent des règles d’entreprise contraignantes,
                </li>
                <li>
                  Winleads-BelgiumImmo a conclu un accord de traitement avec chaque freelance (Inde) sur la base des
                  clauses contractuelles types de la Commission européenne,
                </li>
                <li>
                  un accord de traitement a été conclu avec Supermetrics (Etats-Unis) sur la base des clauses
                  contractuelles types de la Commission européenne
                </li>
                <li>
                  un accord de traitement a été conclu avec Facebook (Etats-Unis) sur la base des clauses contractuelles
                  types de la Commission européenne.
                </li>
                <li>
                  un accord de traitement a été conclu avec Hubspot (Etats-Unis) sur la base des clauses contractuelles
                  types de la Commission européenne.
                </li>
                <li>
                  un accord de traitement a été conclu avec Chargebee (Etats-Unis) sur la base des clauses
                  contractuelles types de la Commission européenne.
                </li>
                <li>
                  un accord de traitement a été conclu avec Quickbooks (Etats-Unis) sur la base des clauses
                  contractuelles types de la Commission européenne.
                </li>
              </ul>
            </div>
          </div>
          <div className="double-block">
            <span className="double-block__label">3.5</span>
            <span className="double-block__text">
              Si nous cessons nos activités ou les transférons à quelqu’un d’autre, par exemple parce que nous
              faisons faillite ou vendons notre entreprise, cela pourrait signifier que vos données à caractères
              personnel seront transférées à des tiers qui reprendront tout ou partie de notre entreprise. Dans ce cas,
              nous vous informerons toujours à l’avance, dans la mesure du possible, mais vous comprenez que cela ne
              sera pas toujours possible d’un point de vue technique ou commercial.
            </span>
          </div>
          {/*SEGMENT 4*/}
          <div className='new-segment'>
            <span>Article 4	Durée du traitement</span>
          </div>
          <p>
            Nous conserverons vos données à caractère personnel aussi longtemps que cela sera nécessaire,
            conformément aux objectifs du traitement et aux prescriptions légales:
          </p>
          <ul>
            <li>
              Les données des clients sont conservées pendant la durée de la relation avec ce client et pendant
              cinq ans au maximum par la suite. En raison d’obligations légales, nous conservons certaines données
              comptables pendant dix ans;
            </li>
            <li>
              Les données des fournisseurs sont conservées pendant la relation avec le fournisseur et pendant cinq
              ans au maximum par la suite, sauf opposition du fournisseur. En raison d’obligations légales, nous
              conservons certaines données comptables pendant dix ans;
            </li>
            <li>
              Les données de communication sont conservées aussi longtemps que nécessaire pour répondre à la
              question ou à la demande et pendant cinq ans au maximum par la suite;
            </li>
            <li>
              Les données sur les biens immobiliers vendus sont conservées pendant dix ans, sauf opposition du
              fournisseur.
            </li>
          </ul>
          {/*SEGMENT 5*/}
          <div className='new-segment'>
            <span>Article 5	Vos droits</span>
          </div>
          <p>
            Vous avez le droit d’accéder à tout moment et gratuitement à vos données à caractère personnel et à la
            manière dont nous les utilisons. Vous avez le droit de nous demander de rectifier, de compléter ou
            d’effacer vos données à caractère personnel. Dans un certain nombre de cas énumérés dans le RGDP,
            vous pouvez également nous demander de limiter le traitement de vos données à caractère personnel.
            Vous avez le droit de vous opposer au traitement de vos données à caractère personnel si vous avez
            des motifs légitimes et impérieux qui dépassent notre intérêt à traiter vos données. Vous avez également
            le droit de vous opposer à tout moment à l’utilisation des données à caractère personnel à des fins de
            marketing direct, même sans donner une raison. Vous avez le droit de demander que vos données à
            caractère personnel vous soient communiquées sous forme numérique et lisible et/ou de les faire
            transmettre à un autre fournisseur de services de votre choix. Dans la mesure où notre traitement est
            fondé sur votre consentement préalable, vous avez le droit de révoquer ce consentement à tout moment.
          </p>
          <p>
            Vous pouvez exercer vos droits par e-mail à , par courrier à <a href="mailto:matteo@winleads.be">
            matteo@winleads.be</a>
          </p>
          <p>
            Vous avez le droit de déposer une plainte auprès de l’Autorité belge de protection des données:
          </p>
          <p className='mb-0'>Rue de la presse 35</p>
          <p className='mb-0'>1000 Bruxelles</p>
          <p className='mb-0'>Tél: +32 (0) 2 274 48 00</p>
          <p className='mb-0'>
            <a href="mailto:contact@apd-gba.be">contact@apd-gba.be</a>
          </p>
          <p>
            Si nécessaire, vous pouvez également vous adresser au tribunal civil pour demander des dommages et
            intérêts.
          </p>
          {/*SEGMENT 6*/}
          <div className='new-segment'>
            <span>Article 6	Comment nous sécurisons vos données à caractère personnel</span>
          </div>
          <p>
            Nous avons pris les mesures de sécurité techniques et organisationnelles appropriées pour garantir la
            sécurité de vos données à caractère personnel. Chacun de nos systèmes est sécurisé avec un login et un mot
            de passe. Les pare-feu, le cryptage des données et les logiciels antivirus sont toujours à jour.
          </p>
          <p>
            En aucun cas, Winleads-BelgiumImmo, opérant sous le nom “Immo-Belgium’peut être tenue responsable de tout
            dommage direct ou indirect résultant de l’utilisation fautive ou illégale de votre données à caractère
            personnel par des tiers.
          </p>
          {/*SEGMENT 7*/}
          <div className='new-segment'>
            <span>Article 7	Cookies</span>
          </div>
          <p>
            Notre site web utilise des cookies et des technologies similaires. Cela nous aide à vous offrir une
            meilleure expérience d’utilisation quand vous visitez notre site web et nous permet également d’optimiser
            notre site web. Nous ne plaçons que les cookies strictement nécessaires sans votre consentement préalable.
            Pour tous les autres cookies, nous vous demandons votre consentement préalable.
          </p>
          <p>
            La liste des cookies ci-dessous vous donne un aperçu des cookies que notre site web utilise.
          </p>
          <p><b>Liste de</b></p>
          <p>
            Un cookie est un petit fichier texte contenant des données qu’un site web (lorsqu’un utilisateur le visite)
            souhaite stocker sur votre appareil afin de mémoriser des informations qui vous concernent, telles que
            votre préférence linguistique ou vos informations de connexion. Ces cookies sont placés par nos soins et
            sont appelés cookies internes. Nous utilisons également des cookies externes, c’est-à-dire des cookies
            provenant d’un domaine différent de celui où vous vous trouvez. Nous utilisons des cookies et d’autres
            technologies de tracking aux fins suivantes:
          </p>
          <p><b>Cookies strictement nécessaires</b></p>
          <p>
            Ces cookies ne stockent aucune information personnelle identifiable, mais sont nécessaires au
            fonctionnement de notre site web et ne peuvent être désactivés pour cette raison. Dans la plupart des cas,
            ces cookies ne sont utilisés que lorsque vous demandez un service, par exemple pour enregistrer vos
            paramètres de confidentialité, vous connecter à notre site web ou remplir une fiche. Vous pouvez configurer
            votre navigateur pour qu’il bloque ces cookies ou vous en avertisse, mais certaines parties de notre site
            web ne fonctionneront pas.
          </p>
          <div>
            <Table responsive bordered>
              <thead>
              <tr>
                <th>Nom</th>
                <th>Origine</th>
                <th>Fonction</th>
                <th>Temps de rétention</th>
              </tr>
              </thead>
              <tbody>
              <tr><td/><td/><td/><td/></tr>
              <tr><td/><td/><td/><td/></tr>
              <tr><td/><td/><td/><td/></tr>
              </tbody>
            </Table>
          </div>
          <p><b>Cookies analytiques</b></p>
          <p>
            Ces cookies nous permettent de compter les visiteurs et leur origine afin de pouvoir analyser et améliorer
            les performances de notre site web. Ils nous aident à comprendre quelles sont les pages les plus et les
            moins populaires et comment les visiteurs se déplacent sur le site. Toutes les informations collectées par
            ces cookies sont agrégées et donc anonymes. Si vous n’autorisez pas ces cookies, nous ne saurons pas quand
            vous avez visité notre site.
          </p>
          <div>
            <Table responsive bordered>
              <thead>
              <tr>
                <th>Nom</th>
                <th>Domaine</th>
                <th>Origine</th>
                <th>Fonction</th>
                <th>Temps de rétention</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>rétention _ga</td>
                <td>.winleads.eu</td>
                <td>Google Analytics</td>
                <td>
                  Ce cookie est utilisé pour distinguer les utilisateurs uniques en attribuant un numéro généré
                  aléatoirement comme identifiant client. Il est inclus dans chaque demande de page sur un site et
                  utilisé pour calculer les données de visiteur, de session et de campagne pour les rapports analytiques
                  des sites.
                </td>
                <td>2 ans</td>
              </tr>
              <tr>
                <td>_gat</td>
                <td>.winleads.eu</td>
                <td>Google Analytics</td>
                <td>
                  Ce cookie est utilisé pour supprimer les requêtes à Google Analytics afin d'augmenter l'efficacité
                  des appels réseau
                </td>
                <td>Jusqu'à la fin de la session</td>
              </tr>
              <tr>
                <td>_gid</td>
                <td>.winleads.eu</td>
                <td>Google Analytics</td>
                <td>
                  Ce cookie semble stocker et mettre à jour une valeur unique pour chaque page visitée.
                </td>
                <td>1 jour</td>
              </tr>
              </tbody>
            </Table>
            <p><b>Cookies fonctionnels</b></p>
            <p>
              Ces cookies permettent à notre site web d’offrir des fonctionnalités supplémentaires et des paramètres
              personnels. Elles peuvent être fixées par nous ou par des fournisseurs de services que nous avons placés
              sur nos pages. Si vous n’autorisez pas ces cookies, ces services ou certains d’entre eux ne peuvent pas
              fonctionner correctement.
            </p>
          </div>
          <div>
            <Table responsive bordered>
              <thead>
              <tr>
                <th>Nom</th>
                <th>Domaine</th>
                <th>Origine</th>
                <th>Fonction</th>
                <th>Temps de rétention</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>rétention __cfduid</td>
                <td>.winleads.eu</td>
                <td>Cloudflare</td>
                <td>Ce cookie est utilisé pour identifier un trafic Web fiable.</td>
                <td>1 mois</td>
              </tr>
              </tbody>
            </Table>
          </div>
          <p><b>Marketing cookies</b></p>
          <p>
            Les marketing cookies sont placés à des fins de marketing et sont utilisés pour suivre votre comportement
            sur Internet après que vous avez visité notre site et/ou pour vous montrer des publicités personnalisées.
            Ces cookies peuvent être placés sur notre site web par nous ou par des tiers. C’est à vous qu’il revient
            de donner l’autorisation de placer ces marketing cookies.
          </p>
          <div>
            <Table responsive bordered>
              <thead>
              <tr>
                <th>Nom</th>
                <th>Domaine</th>
                <th>Origine</th>
                <th>Fonction</th>
                <th>Temps de rétention</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>rétention _fbp</td>
                <td>.winleads.eu</td>
                <td>Facebook</td>
                <td>
                  Ce cookie est utilisé par Facebook pour fournir une gamme de produits publicitaires, tels que les
                  enchères en temps réel d'annonceurs tiers.
                </td>
                <td>3 mois</td>
              </tr>
              </tbody>
            </Table>
          </div>
          <p>
            Si vous constatez que d’autres cookies sont placés sur notre site web, nous vous remercions de nous en
            informer immédiatement afin que nous puissions apporter les modifications nécessaires.
          </p>
          <p>
            Nous vous donnerons autant d’informations que possible sur les cookies placés par des tiers. Toutefois, si
            vous souhaitez en savoir plus, veuillez vous référer aux déclarations de confidentialité de ces parties
            sur leurs sites web respectifs. Veuillez noter que nous n’avons aucune influence sur le contenu de ces
            déclarations, ni sur le contenu des cookies de ces tiers.
          </p>
          <p>
            Lors de votre première visite sur notre site web, il vous sera demandé d’accepter nos cookies. Vous pouvez
            gérer vos choix à tout moment par la suite.
          </p>
          <p>
            Si vous avez d’autres questions ou commentaires concernant le traitement de vos données à caractère 
            personnel, veuillez nous contacter par courriel à matteo@winleads.eu, par courrier à l’adresse 101, 
            rue des champs, 7100 La Louvière (BE) ou via les formulaires de contact sur notre site 
            Web <a href='http://www.winleads.eu/' target='_blank'>
            www.winleads.eu</a> ou <a href="https://BelgiumImmo.be" target='_blank'>https://BelgiumImmo.be</a>
          </p>
          <p>
            Vous trouverez également de plus amples informations sur les cookies à l’adresse
            suivante: <a href="http://www.allaboutcookies.org" target='_blank'>http://www.allaboutcookies.org</a>.
          </p>
          <p>
            Pour plus d’informations sur la publicité comportementale en ligne et la protection de la vie privée en
            ligne, voir: <a href="http://www.youronlinechoices.eu" target='_blank'>http://www.youronlinechoices.eu</a>.
          </p>
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