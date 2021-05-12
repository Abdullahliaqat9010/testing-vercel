import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import HeaderContainer from '../../containers/Header';

const TermsAndConditionsPage = () => {
  return (
    <>
      <HeaderContainer title='Our terms and conditions' />
      <div className='Terms'>
        <div className="blue-line"/>
        <div className="main-content">
          <h4>CONDITIONS D'UTILISATION POUR LES VENDEURS <span>IMMO BELGIUM</span></h4>
          <span className='data'>(Dernière mise à jour le 27 avril 2021)</span>
          <p>
            Bienvenue sur la plateforme ImmoBelgium, propriété de Winleads SA, immatriculée à la Banque Carrefour
            des Entreprises de Belgique sous le numéro d'entreprise 0751.533.333, ayant son siège social à Rue des
            Champs 101, 7100 La Louvière, Belgique, enregistrée sous le numéro de TVA BE 0751.533.333
            (ci-après «Winleads»).
          </p>
          <p>
            Vous pouvez nous contacter par e-mail à matteo@winleads.eu ou par téléphone au +32492 55 38 70.
          </p>
          <p>
            La plateforme ImmoBelgium est disponible sur www.belgiumimmo.be, ou à toute autre adresse pouvant la
            remplacer (ci-après la «Plateforme»).
          </p>
          <p>
            Ces conditions d'utilisation (ci-après les «Conditions d'utilisation») régissent la relation
            contractuelle entre Winleads et l'Utilisateur ou le Membre et déterminent les conditions dans
            lesquelles les Utilisateurs ou les Membres peuvent accéder et utiliser la Plateforme et les Services
            de Winleads.
          </p>
          {/*SECTION 1*/}
          <div className='new-segment'>
            <span>1. DÉFINITIONS</span>
          </div>
          <p>
            Sauf indication contraire dans les présentes Conditions d'utilisation, les termes en majuscules suivants
            ont les significations respectives données ci-dessous:
          </p>
          <ul>
            <li>
              <b>Contenu:</b> désigne tout contenu publié sur la Plateforme, y compris, mais sans s'y limiter, toutes
              les données du bien immobilier, informations, texte, description, nom, alias, signe, photo, image,
              son, vidéo, logo et tout autre élément fourni par le Courtier, le Membre et/ou l’Utilisateur à Winleads
              ou sur la Plateforme.
            </li>
            <li>
              <b>Membre:</b> désigne tout Utilisateur qui s'est inscrit sur la Plateforme, et dont l'inscription a
              été approuvée par Winleads.
            </li>
            <li>
              <b>Partie:</b> désigne, individuellement ou ensemble, Winleads et / ou lesUtilisateur
            </li>
            <li>
              <b>Services:</b> désigne l'ensemble des services en ligne, qui sont la propriété de Winleads, et
              qui sont mis à disposition de l'Utilisateur ou du Membre via la Plateforme, comme décrit plus en
              détail à l'article 3 des présentes Conditions d'Utilisation.
            </li>
            <li>
              <b>Utilisateur:</b> désigne toute personne qui accède à la Plateforme, que cette personne soit
              Membre ou non.
            </li>
          </ul>
          {/*SECTION 2*/}
          <div className='new-segment'>
            <span>2. APPLICABILITÉ DES CONDITIONS D'UTILISATION</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">2.1</span>
            <span className="double-block__text">
              Ces Conditions d'Utilisation, qui prévalent sur tout autre document, régissent les relations entre
              Winleads et chaque Utilisateur ou Membre.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">2.2</span>
            <span className="double-block__text">
              En visitant la Plateforme et en utilisant les Services, l'Utilisateur ou le Membre accepte expressément,
              sans limitation, d'être légalement lié par toutes les dispositions des Conditions d'utilisation. Si
              l'Utilisateur ou le Membre n'accepte pas les présentes Conditions d'Utilisation, ledit Utilisateur ou
              Membre s'engage à cesser immédiatement de visiter la Plateforme et, le cas échéant, à ne plus s'inscrire
              sur la Plateforme.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">2.3</span>
            <span className="double-block__text">
              Winleads se réserve le droit de modifier ces Conditions d'utilisation à tout moment et d'en informer
              chaque Membre par e-mail. Sauf disposition contraire expresse dans les présentes Conditions
              d'utilisation, les modifications apportées à ces Conditions d'utilisation entreront en vigueur 30
              jours calendaires après leur mise en ligne. Pendant cette période, tout Membre peut notifier à
              Winleads son refus de ces modifications, auquel cas l’inscription (et par conséquent le droit du
              Membre d'utiliser les Services) expirera à la fin de la période de 30 jours calendaires susmentionnée,
              dans les conditions énoncées. à l’article 5 des cConditions d'utilisation. Si le Membre ne s'est pas
              opposé par écrit aux modifications annoncées dans ce délai, le Membre sera réputé avoir accepté les
              modifications.
            </span>
          </div>
          {/*SECTION 3*/}
          <div className='new-segment'>
            <span>3. DESCRIPTION DES SERVICES</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">3.1</span>
            <div className="double-block__text">
              <span>
                Le but de la Plateforme est de mettre en relation des agents immobiliers avec des vendeurs pour la vente
                de biens immobiliers. Les Services offrent aux Utilisateurs la possibilité de:
              </span>
              <ul>
                <li>
                  saisir des informations sur le bien sur la Plateforme et recevoir une estimation du prix de vente
                  du bien sur la base de celle-ci;
                </li>
                <li>
                  contacter un ou plusieurs agents immobiliers sélectionnés par l'Utilisateur;
                </li>
                <li className='mb-0'>
                  réaliser toute une série de recherches nécessaires pour ses demandes de vente immobilière.
                </li>
              </ul>
            </div>
          </div>
          <div className="double-block">
            <span className="double-block__label">3.2</span>
            <span className="double-block__text">
              Le rôle de Winleads se limite à agir en tant qu'intermédiaire entre les agents immobiliers et les
              vendeurs de propriétés. Winleads n'est en aucun cas impliqué dans la vente de la propriété car les
              agents immobiliers et les vendeurs décident uniquement, à leur seule discrétion, de conclure des
              contrats. Winleads ne peut être tenu responsable des actes ou omissions qui pourraient être commis
              par l’agent immobilier ou par les vendeurs sur la Plateforme.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">3.3</span>
            <span className="double-block__text">
              La Plateforme et les Services sont gratuits.
            </span>
          </div>
          {/*SECTION 4*/}
          <div className='new-segment'>
            <span>4. ACCÈS AU SERVICE ET DROIT D'UTILISATION</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">4.1</span>
            <span className="double-block__text">
              Winleads conserve l'entière propriété de la Plateforme à tout moment.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">4.2</span>
            <div className="double-block__text">
              <p>
                L'accès à la Plateforme est accessible à tout Utilisateur, qu'il soit ou non un Membre inscrit.
                Cependant, l'accès à la Plateforme et l'utilisation de toutes ses fonctionnalités nécessitent
                l'inscription préalable de l'Utilisateur en tant que Membre.
              </p>
              <p>
                En outre, le Membre s'engage à ce que les informations fournies lors de l'inscription ne portent pas
                atteinte aux droits de tiers et soient correctes, sincères, complètes et à jour, et s'engage en outre
                à fournir ces informations à une date ultérieure ou à corriger les informations qui sont obsolètes ou
                ne sont plus valides. Winleads se réserve le droit de demander au Membre qui ne respecterait pas les
                conditions de cet article de modifier les informations fournies et ce dans le délai à indiquer par
                Winleads.
              </p>
              <p className='mb-0'>
                Si le Membre ne respecte pas cette obligation, Winleads se réserve le droit de suspendre et / ou de
                fermer le compte du Membre, et de refuser tout accès à la Plateforme ou aux Services. Chaque Membre
                est seul responsable de toutes les conséquences pouvant résulter de la fourniture d'informations
                fausses, invalides ou incorrectes à Winleads et / ou à un autre tiers.
              </p>
            </div>
          </div>
          <div className="double-block">
            <span className="double-block__label">4.3</span>
            <span className="double-block__text">
              Winleads se réserve le droit d'accepter ou de refuser toute demande d'inscription à sa seule discrétion,
              sans aucune responsabilité.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">4.4</span>
            <div className="double-block__text">
              <span>
                Winleads se réserve le droit, à tout moment et à sa seule <b>discrétion</b>:
              </span>
              <ul className='roman-items'>
                <li className='first'>
                  <b>de</b> suspendre ou d'interrompre l'accès à la Plateforme en tout ou en partie, notamment à
                  des fins de maintenance, d'exigences opérationnelles, de choix internes, ou en cas d'urgence;
                </li>
                <li className='second'>
                  <b>mettre</b> à jour les fonctionnalités et les Services disponibles sur la Plateforme;
                </li>
                <li className='third'>
                  <b>pour</b> supprimer ou modifier le Contenu, y compris, mais sans s'y limiter, pour des raisons
                  techniques, commerciales ou pratiques.
                </li>
              </ul>
            </div>
          </div>
          <div className="double-block">
            <span className="double-block__label">4.5</span>
            <div className="double-block__text">
              <p>
                Un Membre souhaitant supprimer son compte peut le faire directement via la Plateforme, ou en adressant
                une demande de suppression à Winleads par email à: <a href="mailto:support@winleads.eu">
                support@winleads.eu</a>.
              </p>
              <p>
                La suppression du compte du Membre entraînera la résiliation immédiate des présentes Conditions
                d'utilisation de plein droit, cette résiliation prenant effet conformément aux dispositions de l'
                article 5.2.
              </p>
            </div>
          </div>
          <div className="double-block">
            <span className="double-block__label">4.6</span>
            <span className="double-block__text">
              Winleads, n'étant qu'un intermédiaire, n'a aucun contrôle sur les informations fournies par les Membres
              et publiées sur la Plateforme. Winleads n'offre aucune garantie d'aucune sorte, la Plateforme et les
              Services sont fournis «tels quels» et «selon disponibilité». De plus, Winleads ne garantit pas que
              l'accès au Service ou à la Plateforme sera ininterrompu ou sans erreur.
            </span>
          </div>
          {/*SECTION 5*/}
          <div className='new-segment'>
            <span>5. DURÉE ET RÉSILIATION DU CONTRAT</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">5.1</span>
            <div className="double-block__text">
              <p>
                Les présentes Conditions d'utilisation entreront en vigueur vis-à-vis de l'Utilisateur lors du premier
                accès de l'Utilisateur à la Plateforme, et elles resteront valables pendant toute la durée de la
                navigation de l'Utilisateur sur la Plateforme.
              </p>
              <p>
                En tant qu'exception à ce qui précède, les présentes Conditions d'utilisation prennent effet
                indéfiniment à l'égard de chaque Membre, lors de l'inscription du Membre, à moins que les présentes
                Conditions d'utilisation ne soient résiliées conformément à l' article 5 des présentes conditions
                d'utilisation.
              </p>
            </div>
          </div>
          <div className="double-block">
            <span className="double-block__label">5.2</span>
            <span className="double-block__text">
              Le droit d'accès à la Plateforme, aux Services et à tous les droits et obligations découlant des
              présentes Conditions d'Utilisation peuvent être résiliés à tout moment par le Membre ou par Winleads,
              sans raison particulière, par e-mail ou via la Plateforme.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">5.3</span>
            <div className="double-block__text">
              <span>
                Sans préjudice d'autres recours et sans être obligé de verser une quelconque indemnité, Winleads se
              réserve le droit de suspendre le droit d'accès à la Plateforme, aux Services et à tous les droits et
              obligations découlant des présentes Conditions d'utilisation avec effet immédiat dans ce qui suit.
              les situations où ces situations sont décrites comme des violations graves:
              </span>
              <ul className='roman-items'>
                <li className='first'>
                  en cas de violation des articles 4.2., 6., 7 et 9; ou
                </li>
                <li className='second'>
                  si les actions de l'Utilisateur sont susceptibles d'entraîner la responsabilité de Winleads; ou
                </li>
                <li className='third'>
                  dans le cas où la conduite du Membre est potentiellement préjudiciable et / ou injuste envers la
                  Plateforme, Winleads et / ou un Membre.
                </li>
              </ul>
            </div>
          </div>
          <div className="double-block">
            <span className="double-block__label">5.4</span>
            <span className="double-block__text">
              Sans préjudice de l'article 5.3, dans le cas où une Partie viole l'une de ses obligations en vertu des
              Conditions d'utilisation, l'autre Partie peut immédiatement et de tous les droits d'accéder à la
              Plateforme, aux Services et à tous les droits et obligations découlant des présentes Conditions
              d’ utilisation résilier de plein droit, après une mise en demeure pour remédier à l'infraction
              concernée qui n'a pas abouti depuis un (1) mois.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">5.5</span>
            <span className="double-block__text">
              En cas de résiliation conformément aux termes du présent article, le compte du Membre sera
              automatiquement fermé, l'accès du Membre à la Plateforme sera désactivé et le Membre n'aura plus
              accès aux Services, le tout à compter de la date d'entrée en vigueur du résiliation comme stipulé
              dans cet article 5.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">5.6</span>
            <span className="double-block__text">
              En cas de résiliation pour quelque raison que ce soit, les parties conviennent expressément que
              les dispositions destinées essentiellement à survivre à la résiliation des présentes Conditions
              d'utilisation, quelle que soit la raison de cette résiliation, resteront en vigueur pendant la durée
              qui s'applique.est sur ces dispositions.
            </span>
          </div>
          {/*SECTION 6*/}
          <div className='new-segment'>
            <span>6. INSCRIPTION</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">6.1</span>
            <span className="double-block__text">
              Afin d'accéder à toutes les fonctionnalités de la Plateforme et des Services, l'Utilisateur doit d'abord
              s'inscrire sur la Plateforme en tant que Membre et fournir toutes les informations demandées.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">6.2</span>
            <span className="double-block__text">
              Le Membre s'engage à ne pas fournir d'informations portant atteinte aux droits de tiers. En outre, le
              Membre s'engage à s'abstenir de s'enregistrer en tant que login / alias, URL, adresse ou autre nom de
              domaine faisant référence en tout ou en partie à un site web externe. Winleads se réserve le droit,
              notamment en cas de litige entre Membres, de demander au Membre qui n'aurait pas respecté les
              dispositions du présent article, de modifier les informations fournies et de le faire dans le délai
              précisé par Winleads.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">6.3</span>
            <span className="double-block__text">
              En outre, le Membre s'engage à ce que les informations qu'il fournit lors de son inscription soient
              correctes, authentiques, complètes et à jour, et s'engage en outre à corriger ces informations
              ultérieurement si les informations sont périmées. Si le Membre ne respecte pas cette obligation,
              Winleads se réserve le droit de suspendre et / ou de fermer le compte du Membre, et de refuser à ce
              Membre tout accès aux Services. Chaque membre est seul responsable de toutes les conséquences pouvant
              résulter de la fourniture d'informations fausses, invalides ou erronées à Winleads et / ou à un autre
              membre.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">6.4</span>
            <span className="double-block__text">
              Chaque Membre s'engage à ne créer et utiliser qu'un seul compte, sauf accord préalable de Winleads. Une
              fois qu'un Membre s'est inscrit, ou pour chaque connexion ultérieure, un Membre peut accéder à son compte
              en entrant son identifiant et son mot de passe. Le login et le mot de passe d'un Membre sont strictement
              personnels. Le Membre s'engage à choisir un mot de passe robuste et à garder ce mot de passe confidentiel.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">6.5</span>
            <span className="double-block__text">
              L'utilisation de la connexion d'un Membre, associée au mot de passe du membre, est une présomption
              suffisante que l'accès et l'utilisation des Services de ce Membre sont ou sont sous le contrôle de ce
              Membre. Dans le cas où un Membre apprend qu'un tiers a eu accès à son compte, le Membre s'engage à
              modifier immédiatement son mot de passe et à en informer immédiatement Winleads par e-mail
              à <a href="mailto:support@winleads.eu">support@winleads.eu</a>.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">6.6</span>
            <span className="double-block__text">
              Le Membre a le devoir d'agir de bonne foi et avec respect dans ses relations avec Winleads et les autres
              Membres et agents immobiliers.
            </span>
          </div>
          {/*SECTION 7*/}
          <div className='new-segment'>
            <span>7. DROITS ET OBLIGATIONS DE L'UTILISATEUR</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">7.1</span>
            <div className="double-block__text">
              <span>
                Le Membre s'engage à s'abstenir d'utiliser la Plateforme et / ou les Services à:
              </span>
              <ul className='roman-items'>
                <li className='first'>
                  <b>d’autres</b> Utilisateurs de la Plateforme pour inciter à ne plus utiliser la Plateforme; ou
                </li>
                <li className='second'>
                  publié du Contenu choquant, inapproprié, obscène, menaçant, insultant, violent, grossier, raciste,
                  diffamatoire, désobligeant, trompeur, discriminatoire, harcelant, embarrassant, pornographique ou
                  pédopornographique, Contenu qui équivaut à une justification de crimes contre l'humanité, Contenu
                  pouvant inciter à la haine raciale, religieuse ou ethnique, à la violence ou au terrorisme, pour
                  publier ou distribuer du contenu qui pourrait porter atteinte à la dignité humaine ou à la vie
                  privée d'une autre personne, du Contenu illégal ou du Contenu qui enfreint la loi applicable; ou
                </li>
                <li className='third'>
                  <b>publier</b> ou distribuer du Contenu qui enfreint les droits de propriété intellectuelle d'un
                  tiers; ou
                </li>
                <li className='fourth'>
                  <b>publier</b> ou distribuer tout Contenu qui pourrait être décrit comme un détournement de fonds,
                  une fraude, un détournement de fonds ou toute autre infraction pénale; ou
                </li>
                <li className='fifth'>
                  <b>transmettre</b> des virus informatiques, des vers, des chevaux de Troie, des bombes logiques
                  ou d'autres programmes malveillants, fichiers ou toute autre forme de logiciels malveillants
                  destinés à endommager, interrompre, suspendre, détruire et / ou limiter les fonctionnalités des
                  équipements informatiques ou de télécommunications; ou
                </li>
                <li className='sixth'>
                  <b>accéder</b>, utiliser ou tenter d'utiliser le compte, le login et / ou le mot de passe d'un
                  autre membre, ou usurper l'identité d'un autre membre de quelque manière que ce soit; ou
                </li>
                <li className='seventh'>
                  <b>usurper</b> l'identité d'une autre personne, d'un Membre ou d'un employé ou représentant de
                  Winleads, insinuer que ses déclarations et commentaires sont soutenus ou approuvés par Winleads
                  et / ou utiliser les Services pour transmettre ou distribuer du Contenu qui pourrait être nuisible
                  en faveur de ou critiquer Winleads de quelque manière que ce soit; ou
                </li>
                <li className='eighth'>
                  <b>utiliser</b> des outils d'exploration de données, des robots ou d'autres outils similaires pour
                  collecter et extraire des données liées à la Plateforme; ou
                </li>
                <li className='ninth'>
                  <b>pour</b> faire quoi que ce soit qui pourrait nuire à l'image et / ou à la réputation de Winleads
                  ou de la Plateforme et / ou constituer des actes de concurrence déloyale ou de free riding envers
                  Winleads, tout autre Membre et / ou des tiers.
                </li>
              </ul>
            </div>
          </div>
          <div className="double-block">
            <span className="double-block__label">7.2</span>
            <span className="double-block__text">
              Plus généralement, chaque Utilisateur s'engage à s'abstenir de tout acte ou action qui pourrait
              autrement porter atteinte aux droits de tiers, aux lois et règlements applicables, et / ou à toute
              disposition contractuelle liant l'Utilisateur.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">7.3</span>
            <div className="double-block__text">
              <span>
                Lorsque des activités sont établies qui enfreignent cet article, ces Conditions d'utilisation ou
                violent la loi ou les droits de tiers, l'accès à la Plateforme et aux Services sera immédiatement
                suspendu et / ou Winleads pourra prendre une ou plusieurs des actions suivantes, en fonction de la
                nature de la violation:
              </span>
              <ul className='roman-items'>
                <li className='first'>
                  d’autres Utilisateurs de la Plateforme pour inciter à ne plus utiliser la Plateforme; ou
                </li>
                <li className='second'>
                  supprimer le Contenu concerné;
                </li>
                <li className='third'>
                  prendre toutes les mesures nécessaires pour mettre fin aux abus;
                </li>
                <li className='fourth'>
                  divulguer les informations personnelles de l'Utilisateur aux autorités compétentes et / ou coopérer
                  avec les autorités compétentes sur demande.
                </li>
              </ul>
              <p>
                Dans ce cas, l'Utilisateur indemnisera et indemnisera également Winleads pour toutes conséquences,
                telles que, mais sans s'y limiter, les réclamations de tiers.
              </p>
            </div>
          </div>
          {/*SECTION 8*/}
          <div className='new-segment'>
            <span>8. Données à caractère personnel</span>
          </div>
          <p>
            Winleads recueille et traite des données à caractère personnel relatives aux Utilisateurs et Membres dans
            le but de gérer la relation avec eux.
          </p>
          <p>
            Les modalités de collecte et de traitement des données à caractère personnel sont décrites dans la
            politique de confidentialité de Winleads, disponible sur la Plateforme.
          </p>
          {/*SECTION 9*/}
          <div className='new-segment'>
            <span>9. Propriété intellectuelle et licences</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">9.1</span>
            <span className="double-block__text">
              Les droits de propriété intellectuelle sur la Plateforme et les Services, y compris dans leurs contenus
              respectifs, textes, logiciels, bases de données, formulaires, noms commerciaux, noms de produits,
              logos, marques, photos, graphiques et illustrations, graphiques, musique, combinaisons de couleurs,
              slogans, les mises en page et mises en page et tout autre élément à protéger sont la propriété exclusive
              de Winleads et / ou de tiers contractuellement associés à Winleads. L'Utilisateur s'engage à ne pas
              copier, supprimer, modifier, exploiter, revendre ou autrement utiliser de quelque manière ou sous
              quelque forme que ce soit tout ou partie des éléments de la Plateforme et des Services.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">9.2</span>
            <span className="double-block__text">
              Sous réserve du respect des présentes Conditions d'utilisation par l'Utilisateur, Winleads accorde une
              licence limitée, personnelle, non exclusive, non transférable et non cessible à l'Utilisateur, sans
              aucune possibilité de sous-licence, pour accéder et utiliser la Plateforme et les Services. L'Utilisateur
              est uniquement autorisé à consulter le Contenu et à imprimer une copie du Contenu sur la Plateforme pour
              un usage strictement personnel, à condition que l'Utilisateur conserve tous les avis de paternité de la
              Plateforme et qu'il ne modifie pas le contenu. Cette licence est accordée pour la durée d'utilisation de
              la Plateforme et des Services. Dans la mesure permise par la loi, tout droit non expressément autorisé
              dans les présentes est expressément réservé par Winleads et / ou ses concédants de licence et partenaires.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">9.3</span>
            <div className="double-block__text">
              <span>
                Nonobstant ce qui précède, tout le Contenu fourni par un Membre est et reste la propriété de ce Membre,
                sous réserve de la licence accordée par le Membre à Winleads.
              </span>
              <p className='mt-3'>Le membre accorde à Winleads:</p>
              <ul className='roman-items'>
                <li className='first'>
                  une licence mondiale gratuite, non exclusive, transférable, sous-licenciable, pour toute la durée
                  des présentes Conditions d'utilisation, pour utiliser, reproduire, afficher, formater, publier et
                  dans le cadre de la création de la Plateforme et les Services disponibles, et pour effectuer tout
                  autre acte ou activité en relation avec un tel affichage, mise en page, utilisation, publication
                  et / ou distribution, qui est nécessaire ou utile dans le cadre de la mise à disposition de la
                  Plateforme et des Services, sur tout autre support (en particulier sur tout matériel ou support
                  numérique, dans tout communiqué de presse ou communiqué de presse financier ou publication, matériel
                  de présentation, matériel promotionnel et / ou publicitaire, site Web), par tout moyen, sans
                  limitation du nombre d'exemplaires, pour à des fins internes, de stockage, de publicité, de promotion,
                  de marketing, de communication, de relations publiques et avec le en vue de la mise en place
                  d'éventuels partenariats ou parrainages avec des partenaires de Winleads. Le Membre reconnaît
                  qu'aucune utilisation de son contenu, faite par Winleads avant la désinscription, la suppression ou
                  la fermeture du compte du Membre, ou la résiliation des présentes conditions d'utilisation, ne peut
                  être contestée par le Membre; et
                </li>
                <li className='second'>
                  une licence mondiale gratuite, non exclusive, transférable, sous-licenciable, pour toute la durée
                  des droits de propriété intellectuelle, pour utiliser, reproduire et afficher le contenu à des fins
                  d'agrégation, de compilation, d'anonymisation et / ou d'utilisation dans toute autre forme ou format
                  qui ne permet pas l'attribution ou l'association avec le Membre, à des fins statistiques, de
                  recherche et d'analyse et aux fins d'amélioration de la Plateforme et / ou des Services.
                </li>
              </ul>
              <p>
                Le Membre garantit qu'il est le propriétaire exclusif, pour la durée des droits accordés à Winleads,
                et pour le monde entier, de tous les droits nécessaires pour exploiter le Contenu tel que prévu aux
                présentes, ou qu'il possède les droits requis sur la licence décrite dans les présentes.
              </p>
              <p>
                Le Membre reconnaît que le Contenu qu'il fournit peut être publié sur la Plateforme et sur des médias
                en ligne ou hors ligne, et est donc accessible au public.
              </p>
            </div>
          </div>
          <div className="double-block">
            <span className="double-block__label">9.4</span>
            <span className="double-block__text">
              La Plateforme, les Services et tous les éléments associés tels que décrits ci-dessus contiennent des
              secrets commerciaux et des informations confidentielles exclusives. Winleads et l'Utilisateur ou Membre
              s'engagent à ne pas divulguer des informations qui ont été expressément désignées comme confidentielles
              par (l'une des) Parties.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">9.5</span>
            <span className="double-block__text">
              À cet égard, l'Utilisateur ou le Membre indemnise Winleads, sur première demande, contre toute
              réclamation ou action qui pourrait être prise ou intentée, pour quelque raison que ce soit, dans
              l'exercice des droits accordés par la présente à Winleads, par une seule personne qui envisagerait
              d'avoir le droit de revendiquer tout ou partie du Contenu fourni par l'Utilisateur ou le Membre.
              L'Utilisateur ou le Membre s'engage à indemniser Winleads dans le cas où un tiers ferait une telle
              réclamation ou entreprendrait une telle action contre Winleads, et à supporter toutes les conséquences,
              y compris les conséquences financières, qui pourraient en découler.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">9.6</span>
            <span className="double-block__text">
              Winleads se réserve le droit, sans préavis ni indemnisation, de modifier ou de supprimer un Contenu
              qui enfreindrait toute disposition des présentes Conditions d'utilisation, ou de résilier ces Conditions
              d'utilisation avec effet immédiat, dans les conditions énoncées à l'article 5.
            </span>
          </div>
          {/*SECTION 10*/}
          <div className='new-segment'>
            <span>10. Responsabilité</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">10.1</span>
            <span className="double-block__text">
              La Plateforme et les Services sont fournis "tels quels" sans aucune forme de garantie. Winleads ne
              garantit pas que la Plateforme et les Services répondent aux exigences de l’Utilisateur, ni qu’ils
              sont ininterrompus ou sans erreur. Dans les limites autorisées par la loi, Winleads décline par la
              présente (pour lui-même et ses fournisseurs) toute autre garantie, expresse ou implicite, verbale ou
              écrite, concernant la Plateforme et les Services, y compris, sans limitation, toutes les garanties de
              propriété implicites, infraction, jouissance paisible, intégration, possibilité de commercialisation
              ou d'adéquation à un objectif spécifique et toutes les garanties découlant d'un plan d'action, d'un mode
              de mise en œuvre ou d'utilisation du commerce.
            </span>
          </div>
          <p>
            Winleads uniquement s'engage à une obligation de moyens en ce qui concerne la mise à disposition de la
            Plateforme et des Services. A moins qu'une erreur sérieuse ou délibérée prouvée ne puisse être imputée
            à Winleads, Winleads ne peut être tenu responsable des dommages qui pourraient être subis par l'Utilisateur
            ou le Membre du fait de l'utilisation ou de l'impossibilité d'utiliser la Plateforme en tout ou en partie.
          </p>
          <div className="double-block">
            <span className="double-block__label">10.2</span>
            <span className="double-block__text">
              Winleads ne peut pas offrir de garantie absolue concernant la qualité de l’information présente sur
              la Plateforme. Il est donc possible que l’information ne soit pas toujours complète, exacte, suffisamment
              précise ou à jour. Par conséquent, Winleads ne pourra pas être tenu responsable des dommages directs ou
              indirects que l’Utilisateur subirait par l’utilisation de la Plateforme. Si certains contenus sont en
              violation avec la loi ou le droit des tiers, nous vous demandons de nous en informer le plus rapidement
              possible à l’adresse matteo@winleads.eu. Tout téléchargement à partir de la Plateforme a toujours lieu
              aux risques de l’Utilisateur. Winleads ne pourra pas être tenu responsable des éventuels dommages,
              directs ou indirects découlant de ces téléchargements, tels qu’une perte de données ou un endommagement
              du système informatique de l’Utilisateur, qui relèvent entièrement de la responsabilité de ce dernier.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">10.3</span>
            <span className="double-block__text">
              Winleads décline toute responsabilité en cas de réutilisation frauduleuse de données à caractère
              personnel de la part de l’Utilisateur violant le Règlement général sur la protection des données
              (n°2016/679).
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">10.4</span>
            <span className="double-block__text">
              Winleads n’est pas tenu responsable en cas de litige entre les deux parties dans le cadre de vente
              immobilière frauduleuse, de réclamation pour vices cachés ou autre type de plaintes de nature équivalente.
              Winleads peut résilier tout contrat avec l’Utilisateur en cas de fait prouvant la culpabilité de
              l’Utilisateur dans le but de préservation de l’image de Winleads.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">10.5</span>
            <span className="double-block__text">
              En aucun cas, Winleads (ou ses fournisseurs) n’est responsable de l’objet des présentes Conditions
              d’utilisation, quelle que soit la forme de sa réclamation ou action (contractuelle, négligence,
              responsabilité objective ou autre), pour (a) des éléments échappant à son contrôle raisonnable, (b)
              perte ou inexactitude de données, perte ou interruption de l'utilisation ou des coûts liés à l'achat
              d'une technologie, de biens ou de services de remplacement, (c) dommages indirects, punitifs, accessoires,
              dépendants, spéciaux, exemplaires ou consécutifs, y compris, sans limitation, perte de ventes, de revenus,
              de bénéfices ou de goodwill, même si Winleads a été informé de la possibilité de tels dommages. Ces
              limitations sont indépendantes de toutes les autres dispositions des présentes Conditions d'utilisation
              et s'appliquent nonobstant l'échec d'une solution proposée dans les présentes.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">10.6</span>
            <span className="double-block__text">
              Les sites Web tiers auxquels la Plateforme peut occasionnellement se lier ou faire référence
              (ou vice versa) ne sont pas exploités, hébergés ou maintenus par elle. Kairos n'est donc pas responsable
              du contenu de ces sites, ni des liens qui y sont contenus ou des modifications et mises à jour apportées
              à ces sites.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">10.7</span>
            <span className="double-block__text">
              Vous vous engagez à dégager de toute responsabilité l’organisation Winleads-ImmoBelgium et ses tiers
              mais également à indemniser Winleads-ImmoBelgium pour toutes pertes, coûts, responsabilités et dépenses
              liés ou résultant de votre violation des présentes Conditions d’utilisation.
            </span>
          </div>
          {/*SECTION 11*/}
          <div className='new-segment'>
            <span>11. Force majeure</span>
          </div>
          <p>
            Aucune des parties n'est responsable du non-respect ou du retard dans l'exécution de ses obligations,
            ni de toute perte, charge ou dommage subi, si cela résulte de circonstances indépendantes de sa volonté
            telles qu'un incendie, une catastrophe naturelle, une intervention gouvernementale ou toute autre cause
            qui échappe au contrôle de l'Utilisateur et de Winleads (et de ses fournisseurs) et si cela a été
            communiqué par écrit à l'autre partie.
          </p>
          {/*SECTION 12*/}
          <div className='new-segment'>
            <span>12. Intégralité - divisibilité</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">12.1</span>
            <span className="double-block__text">
              Les présentes Conditions d'utilisation sont définitives et complètes et remplacent toutes les
              annonces verbales ou écrites, les déclarations de conditions d'utilisation entre les parties.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">12.2</span>
            <span className="double-block__text">
              Dans le cas où une disposition des présentes Conditions d’utilisation serait jugée comme étant illégale,
              nulle ou inapplicable, cette disposition pourra néanmoins être appliquée dans la pleine mesure permise
              par la loi. La partie non applicable devra être considérée comme étant dissociée de ces Conditions
              d’utilisation. Cette dissociation ne devra pas affecter la validité et l’applicabilité de toutes les
              autres dispositions restantes. Winleads se réserve le droit de remplacer la disposition illégale par une
              autre disposition valable et de portée similaire.
            </span>
          </div>
          {/*SECTION 13*/}
          <div className='new-segment'>
            <span>13. Dispositions générales</span>
          </div>
          <div className="double-block">
            <span className="double-block__label">13.1</span>
            <span className="double-block__text">
              Dans le cadre d’un changement de nom, de statut juridique ou toute autre forme de modification légale
              au sein de Winleads, le maintien des activités sera garanti et les présentes Conditions d’utilisation
              resteront effectives. Les changements pouvant s’effectuer au sein du statut légal n’auront pas d’impact
              sur la viabilité des Conditions d’utilisation et des services proposés.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">13.2</span>
            <div className="double-block__text">
              <p>
                Tout avis se fera par écrit et, de préférence, par courrier électronique.
              </p>
              <p>
                Tout avis envoyé par courrier recommandé est réputé avoir été reçu par le destinataire le troisième
                jour de sa mise à la poste et tout avis envoyé par télécopieur est réputé avoir été reçu le jour
                ouvrable suivant sa transmission. L'envoi aux adresses électroniques prévues dans le présent accord
                est réputé constituer une preuve de réception, sauf preuve contraire.
              </p>
            </div>
          </div>
          {/*SECTION 14*/}
          <div className='new-segment'>
            <span>14. Droit applicable - juridiction </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">14.1</span>
            <span className="double-block__text">
              Les présentes Conditions d'utilisation sont régies et interprétées conformément au droit belge.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">14.2</span>
            <span className="double-block__text">
              Les tribunaux de Bruxelles sont seuls compétents pour connaître des litiges relatifs à ces Conditions
              d'utilisation en général, ainsi qu'à leur rédaction, leur mise en œuvre et leur interprétation.
            </span>
          </div>
          <div className="double-block">
            <span className="double-block__label">14.3</span>
            <span className="double-block__text">
              Avant de commencer une procédure, vous vous engagez à d’abord nous informer du différend et collaborer
              dans le but de trouver un accord à l’amiable. Winleads s’engage à ne jamais rompre la communication et
              met en avant la transparence avec ses Utilisateurs. Un médiateur sera nommé d’un commun accord dans le
              but de trouver une solution à l’amiable pouvant déboucher sur la poursuite de la collaboration ou non,
              mais surtout dans but de trouver une solution qui puisse satisfaire les deux parties. Toute poursuite
              devant les juridictions compétentes entamée sans la procédure de médiation mentionnée dans cet article
              pourra être retenue par Winleads contre l’Utilisateur. Winleads s’engage à entamer les procédures de
              médiation dans les 7 jours ouvrables suivant l’accusé de réception de la plainte envoyée à
              l’adresse <a href="mailto:matteo@winleads.eu">matteo@winleads.eu</a>, il s’agit du temps nécessaire
              estimé pour gérer et traiter le dossier de manière optimale. Cette procédure où ensemble, un médiateur
              sera nommé ne sera effective qu’après avoir jugé qu’une solution à l’amiable n’est pas envisageable et
              qu’un intervenant compétent doit être nommé.
            </span>
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

export default TermsAndConditionsPage;