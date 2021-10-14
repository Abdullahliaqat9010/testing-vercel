import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button, Table, ProgressBar, ListGroup, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import HeaderContainer from "../../containers/Header";
import SearchImage from "../../assets/images/search.svg"
import { CustomScrollbar } from "../../components/Scrollbar";
import HomeownerIcon from "../../assets/images/home-noactive.svg";
import ApartmentImageNoActive from "../../assets/images/apartment-noactive.svg";
import GoogleMap from "../../components/MapboxPriceMap";
import * as province from "../../components/MapboxPriceMap/provinces.json"
import { useTranslation } from "next-i18next";


const priceMap = () => {
    const { t } = useTranslation("steps");

    const citiesData = [
        {
            name: "Schaarbeek",
            zipcode: "1030",
            appartment: 2997.969,
            house: 2307.969,
        },
        {
            name: "Etterbeek",
            zipcode: "1040",
            appartment: 3985.222,
            house: 3138.19,
        },
        {
            name: "Elsene",
            zipcode: "1050",
            appartment: 4650.082,
            house: 4150.082,
        },
        {
            name: "Sint-Gillis",
            zipcode: "1060",
            appartment: 3599.457,
            house: 3099.457,
        },
        {
            name: "Anderlecht",
            zipcode: "1070",
            appartment: 2702.962,
            house: 2261.613,
        },
        {
            name: "Sint-Jans-Molenbeek",
            zipcode: "1080",
            appartment: 2445.93,
            house: 2045.93,
        },
        {
            name: "Koekelberg",
            zipcode: "1081",
            appartment: 2547,
            house: 2215.211,
        },
        {
            name: "Sint-Agatha-Berchem",
            zipcode: "1082",
            appartment: 2798.597,
            house: 2198,
        },
        {
            name: "Ganshoren",
            zipcode: "1083",
            appartment: 2535,
            house: 2448.404,
        },
        {
            name: "Jette",
            zipcode: "1090",
            appartment: 2677,
            house: 2491.727,
        },
        {
            name: "Brussel",
            zipcode: "1130",
            appartment: 2927.171,
            house: 2200.123,
        },
        {
            name: "Evere",
            zipcode: "1140",
            appartment: 3472,
            house: 2444.706,
        },
        {
            name: "Sint-Pieters-Woluwe",
            zipcode: "1150",
            appartment: 4395.506,
            house: 4395.106,
        },
        {
            name: "Oudergem",
            zipcode: "1160",
            appartment: 4339.029,
            house: 4039.029,
        },
        {
            name: "Watermaal-Bosvoorde",
            zipcode: "1170",
            appartment: 3625.068,
            house: 3025.068,
        },
        {
            name: "Ukkel",
            zipcode: "1180",
            appartment: 4075.565,
            house: 3575.565,
        },
        {
            name: "Vorst",
            zipcode: "1190",
            appartment: 2961.572,
            house: 2461.572,
        },
        {
            name: "Sint-Lambrechts-Woluwe",
            zipcode: "1200",
            appartment: 3962.369,
            house: 3362.306,
        },
        {
            name: "Sint-Joost-ten-Node",
            zipcode: "1210",
            appartment: 3026.558,
            house: 2426.158,
        },
        {
            name: "Wavre",
            zipcode: "1300",
            appartment: 2965,
            house: 2356.232,
        },
        {
            name: "La Hulpe",
            zipcode: "1310",
            appartment: 3369,
            house: 2882.427,
        },
        {
            name: "Incourt",
            zipcode: "1315",
            appartment: 2423,
            house: 2061.968,
        },
        {
            name: "Beauvechain",
            zipcode: "1320",
            appartment: 2323.456,
            house: 1623.156,
        },
        {
            name: "Chaumont-Gistoux",
            zipcode: "1325",
            appartment: 3791,
            house: 2454.456,
        },
        {
            name: "Rixensart",
            zipcode: "1330",
            appartment: 3354,
            house: 2768.009,
        },
        {
            name: "Ottignies-Louvain-la-Neuve",
            zipcode: "1340",
            appartment: 3845,
            house: 2508.263,
        },
        {
            name: "Orp-Jauche",
            zipcode: "1350",
            appartment: 2336,
            house: 2018.236513,
        },
        {
            name: "Hélécine",
            zipcode: "1357",
            appartment: 1910.804,
            house: 1310.804,
        },
        {
            name: "Perwez",
            zipcode: "1360",
            appartment: 2830,
            house: 1874.7195,
        },
        {
            name: "Ramillies",
            zipcode: "1367",
            appartment: 1776.786,
            house: 1476.786,
        },
        {
            name: "Jodoigne",
            zipcode: "1370",
            appartment: 2337,
            house: 1578.853997,
        },
        {
            name: "Lasne",
            zipcode: "1380",
            appartment: 3961,
            house: 3488.705661,
        },
        {
            name: "Grez-Doiceau",
            zipcode: "1390",
            appartment: 2996,
            house: 2407.573766,
        },
        {
            name: "Nivelles",
            zipcode: "1400",
            appartment: 2556,
            house: 2057.164699,
        },
        {
            name: "Waterloo",
            zipcode: "1410",
            appartment: 3619,
            house: 3137.223902,
        },
        {
            name: "Braine-l'Alleud",
            zipcode: "1420",
            appartment: 2950,
            house: 2465.927317,
        },
        {
            name: "Rebecq",
            zipcode: "1430",
            appartment: 1889,
            house: 1597.46744,
        },
        {
            name: "Mont-Saint-Guibert",
            zipcode: "1435",
            appartment: 3128,
            house: 2076.775518,
        },
        {
            name: "Braine-le-Château",
            zipcode: "1440",
            appartment: 2313.846,
            house: 2262.132071,
        },
        {
            name: "Chastre",
            zipcode: "1450",
            appartment: 2222.07,
            house: 2015.931373,
        },
        {
            name: "Walhain",
            zipcode: "1457",
            appartment: 3460,
            house: 1953.561617,
        },
        {
            name: "Ittre",
            zipcode: "1460",
            appartment: 2624,
            house: 1928.234201,
        },
        {
            name: "Genappe",
            zipcode: "1470",
            appartment: 2405.853,
            house: 2383.663366,
        },
        {
            name: "Tubize",
            zipcode: "1480",
            appartment: 2141.444,
            house: 2083.333333,
        },
        {
            name: "Court-Saint-Etienne",
            zipcode: "1490",
            appartment: 2749.855,
            house: 2368.20822,
        },
        {
            name: "Villers-la-Ville",
            zipcode: "1495",
            appartment: 2077.16,
            house: 2255.631579,
        },
        {
            name: "Halle",
            zipcode: "1500",
            appartment: 2914,
            house: 2252.518712,
        },
        {
            name: "Herne",
            zipcode: "1540",
            appartment: 1952.678,
            house: 1352.678,
        },
        {
            name: "Bever",
            zipcode: "1547",
            appartment: 1608.748,
            house: 1208.748,
        },
        {
            name: "Hoeilaart",
            zipcode: "1560",
            appartment: 3102,
            house: 2603.868549,
        },
        {
            name: "Galmaarden",
            zipcode: "1570",
            appartment: 2496,
            house: 1843.346906,
        },
        {
            name: "Sint-Pieters-Leeuw",
            zipcode: "1600",
            appartment: 2807,
            house: 2393.951955,
        },
        {
            name: "Drogenbos",
            zipcode: "1620",
            appartment: 2928,
            house: 2587.456456,
        },
        {
            name: "Linkebeek",
            zipcode: "1630",
            appartment: 3103.5,
            house: 2503.5,
        },
        {
            name: "Sint-Genesius-Rode",
            zipcode: "1640",
            appartment: 3323,
            house: 3017.662488,
        },
        {
            name: "Beersel",
            zipcode: "1650",
            appartment: 3346,
            house: 2803.272818,
        },
        {
            name: "Pepingen",
            zipcode: "1670",
            appartment: 2238.685,
            house: 1538.685,
        },
        {
            name: "Dilbeek",
            zipcode: "1700",
            appartment: 3156,
            house: 2397.882425,
        },
        {
            name: "Asse",
            zipcode: "1730",
            appartment: 2697.692,
            house: 2097.363,
        },
        {
            name: "Ternat",
            zipcode: "1740",
            appartment: 2985,
            house: 1988.230897,
        },
        {
            name: "Lennik",
            zipcode: "1741",
            appartment: 1923.155,
            house: 1423.100,
        },
        {
            name: "Opwijk",
            zipcode: "1745",
            appartment: 1948.098,
            house: 1852.835314,
        },
        {
            name: "Gooik",
            zipcode: "1755",
            appartment: 2255.306,
            house: 1828.078215,
        },
        {
            name: "Roosdaal",
            zipcode: "1760",
            appartment: 2936,
            house: 2265.089307,
        },
        {
            name: "Liedekerke",
            zipcode: "1770",
            appartment: 2569,
            house: 1724.61392,
        },
        {
            name: "Wemmel",
            zipcode: "1780",
            appartment: 3163,
            house: 2678.133986,
        },
        {
            name: "Hamme",
            zipcode: "1785",
            appartment: 2538.259,
            house: 2038.111,
        },
        {
            name: "Merchtem",
            zipcode: "1785",
            appartment: 3043,
            house: 2039.821521,
        },
        {
            name: "Affligem",
            zipcode: "1790",
            appartment: 2571,
            house: 1713.360784,
        },
        {
            name: "Vilvoorde",
            zipcode: "1800",
            appartment: 2658.234,
            house: 2258.134,
        },
        {
            name: "Steenokkerzeel",
            zipcode: "1820",
            appartment: 3437,
            house: 2063.286214,
        },
        {
            name: "Londerzeel",
            zipcode: "1840",
            appartment: 2576.919,
            house: 2176.219,
        },
        {
            name: "Grimbergen",
            zipcode: "1850",
            appartment: 3009,
            house: 2189.639344,
        },
        {
            name: "Meise",
            zipcode: "1860",
            appartment: 2552,
            house: 2494.462265,
        },
        {
            name: "Kapelle-op-den-Bos",
            zipcode: "1880",
            appartment: 2795,
            house: 1958.102427,
        },
        {
            name: "Kampenhout",
            zipcode: "1910",
            appartment: 3047,
            house: 2174.134786,
        },
        {
            name: "Zaventem",
            zipcode: "1930",
            appartment: 3467,
            house: 2397.547727,
        },
        {
            name: "Kraainem",
            zipcode: "1950",
            appartment: 4003,
            house: 3352.450657,
        },
        {
            name: "Wezembeek-Oppem",
            zipcode: "1970",
            appartment: 3756,
            house: 3304.367192,
        },
        {
            name: "Zemst",
            zipcode: "1980",
            appartment: 3008,
            house: 2652.337594,
        },
        {
            name: "Antwerpen",
            zipcode: "2000",
            appartment: 4150.217,
            house: 4150.217,
        },
        {
            name: "Zwijndrecht",
            zipcode: "2070",
            appartment: 2545,
            house: 1760.36448,
        },
        {
            name: "Wijnegem",
            zipcode: "2110",
            appartment: 2890.979,
            house: 2390.279,
        },
        {
            name: "Borsbeek",
            zipcode: "2150",
            appartment: 2463.612,
            house: 1890.123,
        },
        {
            name: "Wommelgem",
            zipcode: "2160",
            appartment: 2983,
            house: 1903.979997,
        },
        {
            name: "Herentals",
            zipcode: "2200",
            appartment: 2568,
            house: 1854.81944,
        },
        {
            name: "Heist-op-den-Berg",
            zipcode: "2220",
            appartment: 2302.523,
            house: 1791.262136,
        },
        {
            name: "Herselt",
            zipcode: "2230",
            appartment: 2548,
            house: 1619.757333,
        },
        {
            name: "Hulshout",
            zipcode: "2235",
            appartment: 2885,
            house: 1187.412002,
        },
        {
            name: "Zandhoven",
            zipcode: "2240",
            appartment: 2716,
            house: 2480.737838,
        },
        {
            name: "Olen",
            zipcode: "2250",
            appartment: 2592,
            house: 1942.8753,
        },
        {
            name: "Westerlo",
            zipcode: "2260",
            appartment: 2425,
            house: 1370.1628,
        },
        {
            name: "Herenthout",
            zipcode: "2270",
            appartment: 2633,
            house: 1446.650638,
        },
        {
            name: "Lille",
            zipcode: "2275",
            appartment: 2026,
            house: 1723.328594,
        },
        {
            name: "Grobbendonk",
            zipcode: "2280",
            appartment: 2749,
            house: 1836.481044,
        },
        {
            name: "Vorselaar",
            zipcode: "2290",
            appartment: 2718,
            house: 2080.045153,
        },
        {
            name: "Turnhout",
            zipcode: "2300",
            appartment: 2510,
            house: 1658.758354,
        },
        {
            name: "Rijkevorsel",
            zipcode: "2310",
            appartment: 1951.605,
            house: 1780.941122,
        },
        {
            name: "Hoogstraten",
            zipcode: "2320",
            appartment: 3122,
            house: 2019.766939,
        },
        {
            name: "Merksplas",
            zipcode: "2330",
            appartment: 1586.36,
            house: 1530.618356,
        },
        {
            name: "Beerse",
            zipcode: "2340",
            appartment: 2671,
            house: 1603.227525,
        },
        {
            name: "Vosselaar",
            zipcode: "2350",
            appartment: 2561,
            house: 1911.51083,
        },
        {
            name: "Oud-Turnhout",
            zipcode: "2360",
            appartment: 2680,
            house: 2039.027752,
        },
        {
            name: "Arendonk",
            zipcode: "2370",
            appartment: 2545,
            house: 1676.1528,
        },
        {
            name: "Ravels",
            zipcode: "2380",
            appartment: 1625.316,
            house: 1225.116,
        },
        {
            name: "Baarle-Hertog",
            zipcode: "2387",
            appartment: 2258.918,
            house: 1898.134,
        },
        {
            name: "Malle",
            zipcode: "2390",
            appartment: 2914,
            house: 2050.705329,
        },
        {
            name: "Mol",
            zipcode: "2400",
            appartment: 2413,
            house: 1589.899131,
        },
        {
            name: "Laakdal",
            zipcode: "2430",
            appartment: 2305,
            house: 1532.243676,
        },
        {
            name: "Geel",
            zipcode: "2440",
            appartment: 2337,
            house: 1573.113518,
        },
        {
            name: "Meerhout",
            zipcode: "2450",
            appartment: 2466,
            house: 1785.440485,
        },
        {
            name: "Kasterlee",
            zipcode: "2460",
            appartment: 2415,
            house: 1908.550912,
        },
        {
            name: "Retie",
            zipcode: "2470",
            appartment: 2381,
            house: 1729.249588,
        },
        {
            name: "Dessel",
            zipcode: "2480",
            appartment: 2707,
            house: 1342.324185,
        },
        {
            name: "Balen",
            zipcode: "2490",
            appartment: 2338,
            house: 1474.424059,
        },
        {
            name: "Lier",
            zipcode: "2500",
            appartment: 3242,
            house: 1919.800243,
        },
        {
            name: "Ranst",
            zipcode: "2520",
            appartment: 2326.11,
            house: 2108.50682,
        },
        {
            name: "Boechout",
            zipcode: "2530",
            appartment: 2953,
            house: 2150.557757,
        },
        {
            name: "Hove",
            zipcode: "2540",
            appartment: 3788,
            house: 2204.878044,
        },
        {
            name: "Lint",
            zipcode: "2547",
            appartment: 2967,
            house: 2606.26714,
        },
        {
            name: "Kontich",
            zipcode: "2550",
            appartment: 2997,
            house: 2304.142592,
        },
        {
            name: "Nijlen",
            zipcode: "2560",
            appartment: 2659,
            house: 1927.75102,
        },
        {
            name: "Duffel",
            zipcode: "2570",
            appartment: 2772,
            house: 1879.381288,
        },
        {
            name: "Putte",
            zipcode: "2580",
            appartment: 2874,
            house: 1730.678597,
        },
        {
            name: "Berlaar",
            zipcode: "2590",
            appartment: 2816,
            house: 1578.303159,
        },
        {
            name: "Hemiksem",
            zipcode: "2620",
            appartment: 2415,
            house: 1874.512716,
        },
        {
            name: "Schelle",
            zipcode: "2627",
            appartment: 2455,
            house: 2091.486874,
        },
        {
            name: "Aartselaar",
            zipcode: "2630",
            appartment: 3097,
            house: 2443.330232,
        },
        {
            name: "Mortsel",
            zipcode: "2640",
            appartment: 2810,
            house: 2256.899556,
        },
        {
            name: "Edegem",
            zipcode: "2650",
            appartment: 3082,
            house: 2673.472018,
        },
        {
            name: "Mechelen",
            zipcode: "2800",
            appartment: 3028,
            house: 2202.099902,
        },
        {
            name: "Bonheiden",
            zipcode: "2820",
            appartment: 3469,
            house: 1802.116818,
        },
        {
            name: "Willebroek",
            zipcode: "2830",
            appartment: 2505,
            house: 2033.02311,
        },
        {
            name: "Rumst",
            zipcode: "2840",
            appartment: 2670,
            house: 2131.078973,
        },
        {
            name: "Niel",
            zipcode: "2845",
            appartment: 2743,
            house: 2068.553689,
        },
        {
            name: "Boom",
            zipcode: "2850",
            appartment: 2333,
            house: 1801.877174,
        },
        {
            name: "Sint-Katelijne-Waver",
            zipcode: "2860",
            appartment: 3165,
            house: 2005.486942,
        },
        {
            name: "Puurs",
            zipcode: "2870",
            appartment: 2837,
            house: 1941.003801,
        },
        {
            name: "Bornem",
            zipcode: "2880",
            appartment: 3246,
            house: 2088.605601,
        },
        {
            name: "Sint-Amands",
            zipcode: "2890",
            appartment: 3223.698853,
            house: 1550.398047,
        },
        {
            name: "Schoten",
            zipcode: "2900",
            appartment: 2721.520684,
            house: 2247.644866,
        },
        {
            name: "Essen",
            zipcode: "2910",
            appartment: 2147.727273,
            house: 1853.06038,
        },
        {
            name: "Kalmthout",
            zipcode: "2920",
            appartment: 3116.082215,
            house: 2304.4517,
        },
        {
            name: "Brasschaat",
            zipcode: "2930",
            appartment: 3179.493464,
            house: 2452.945708,
        },
        {
            name: "Stabroek",
            zipcode: "2940",
            appartment: 2755.241515,
            house: 2043.966895,
        },
        {
            name: "Brecht",
            zipcode: "2960",
            appartment: 2999.130791,
            house: 2331.470509,
        },
        {
            name: "Schilde",
            zipcode: "2970",
            appartment: 3275.789865,
            house: 2519.730481,
        },
        {
            name: "Zoersel",
            zipcode: "2980",
            appartment: 3040.728309,
            house: 2007.119712,
        },
        {
            name: "Wuustwezel",
            zipcode: "2990",
            appartment: 2841.454756,
            house: 2530.842786,
        },
        {
            name: "Leuven",
            zipcode: "3000",
            appartment: 5271.661386,
            house: 3463.762218,
        },
        {
            name: "Herent",
            zipcode: "3020",
            appartment: 3196.802156,
            house: 2549.359102,
        },
        {
            name: "Huldenberg",
            zipcode: "3040",
            appartment: 3150,
            house: 2352.802984,
        },
        {
            name: "Oud-Heverlee",
            zipcode: "3050",
            appartment: 4246.568182,
            house: 2383.024454,
        },
        {
            name: "Bertem",
            zipcode: "3060",
            appartment: 3134.537367,
            house: 2151.752334,
        },
        {
            name: "Kortenberg",
            zipcode: "3070",
            appartment: 2793.11521,
            house: 2332.605136,
        },
        {
            name: "Tervuren",
            zipcode: "3080",
            appartment: 5292.067458,
            house: 3035.619567,
        },
        {
            name: "Overijse",
            zipcode: "3090",
            appartment: 3079.949195,
            house: 2693.932179,
        },
        {
            name: "Rotselaar",
            zipcode: "3110",
            appartment: 2935.762235,
            house: 2072.598942,
        },
        {
            name: "Tremelo",
            zipcode: "3120",
            appartment: 3045.408592,
            house: 2259.715592,
        },
        {
            name: "Begijnendijk",
            zipcode: "3130",
            appartment: 3243.892107,
            house: 1493.412913,
        },
        {
            name: "Keerbergen",
            zipcode: "3140",
            appartment: 3233.320671,
            house: 2254.166418,
        },
        {
            name: "Haacht",
            zipcode: "3150",
            appartment: 3008.623253,
            house: 2005.323164,
        },
        {
            name: "Boortmeerbeek",
            zipcode: "3190",
            appartment: 3092.048412,
            house: 1914.955414,
        },
        {
            name: "Aarschot",
            zipcode: "3200",
            appartment: 2667.398044,
            house: 1737.627816,
        },
        {
            name: "Lubbeek",
            zipcode: "3210",
            appartment: 3245.54805,
            house: 2111.639728,
        },
        {
            name: "Holsbeek",
            zipcode: "3220",
            appartment: 2151.862,
            house: 2187.200917,
        },
        {
            name: "Scherpenheuvel-Zichem",
            zipcode: "3270",
            appartment: 2247.789,
            house: 1400.639891,
        },
        {
            name: "Diest",
            zipcode: "3290",
            appartment: 2441.313978,
            house: 1737.766535,
        },
        {
            name: "Tienen",
            zipcode: "3300",
            appartment: 2396.185905,
            house: 1633.395208,
        },
        {
            name: "Hoegaarden",
            zipcode: "3320",
            appartment: 2645.272005,
            house: 1658.535714,
        },
        {
            name: "Linter",
            zipcode: "3350",
            appartment: 2267.44186,
            house: 1763.532084,
        },
        {
            name: "Bierbeek",
            zipcode: "3360",
            appartment: 3733.987938,
            house: 2663.500773,
        },
        {
            name: "Boutersem",
            zipcode: "3370",
            appartment: 2869.384995,
            house: 1935.433619,
        },
        {
            name: "Glabbeek",
            zipcode: "3380",
            appartment: 1885.799,
            house: 1285.349,
        },
        {
            name: "Kapellen",
            zipcode: "3381",
            appartment: 1675.49,
            house: 1365.34,
        },
        {
            name: "Tielt-Winge",
            zipcode: "3390",
            appartment: 2883.34792,
            house: 1857.280429,
        },
        {
            name: "Landen",
            zipcode: "3400",
            appartment: 1927.968361,
            house: 1381.36013,
        },
        {
            name: "Zoutleeuw",
            zipcode: "3440",
            appartment: 1871.581,
            house: 1471.381,
        },
        {
            name: "Geetbets",
            zipcode: "3450",
            appartment: 1578.405,
            house: 1197.234,
        },
        {
            name: "Bekkevoort",
            zipcode: "3460",
            appartment: 2708.405591,
            house: 1747.452183,
        },
        {
            name: "Kortenaken",
            zipcode: "3470",
            appartment: 1941.62,
            house: 1345.134,
        },
        {
            name: "Hasselt",
            zipcode: "3500",
            appartment: 3465.648375,
            house: 1979.490162,
        },
        {
            name: "Zonhoven",
            zipcode: "3520",
            appartment: 2717.819488,
            house: 1442.325533,
        },
        {
            name: "Houthalen-Helchteren",
            zipcode: "3530",
            appartment: 2222.764185,
            house: 1308.731238,
        },
        {
            name: "Herk-de-Stad",
            zipcode: "3540",
            appartment: 2165.403,
            house: 1570.345,
        },
        {
            name: "Halen",
            zipcode: "3545",
            appartment: 2294.236502,
            house: 1454.916305,
        },
        {
            name: "Heusden-Zolder",
            zipcode: "3550",
            appartment: 2147.768847,
            house: 1848.60463,
        },
        {
            name: "Lummen",
            zipcode: "3560",
            appartment: 2611.164239,
            house: 1664.969048,
        },
        {
            name: "Alken",
            zipcode: "3570",
            appartment: 2874.426313,
            house: 1846.530029,
        },
        {
            name: "Beringen",
            zipcode: "3580",
            appartment: 2084.177257,
            house: 1430.955933,
        },
        {
            name: "Bitsingen",
            zipcode: "3581",
            appartment: 1988.465,
            house: 1455.456,
        },
        {
            name: "Diepenbeek",
            zipcode: "3590",
            appartment: 2218.294314,
            house: 1356.820932,
        },
        {
            name: "Genk",
            zipcode: "3600",
            appartment: 2285.786034,
            house: 1464.29513,
        },
        {
            name: "Lanaken",
            zipcode: "3620",
            appartment: 2404.412342,
            house: 1253.960894,
        },
        {
            name: "Maasmechelen",
            zipcode: "3630",
            appartment: 2447.330937,
            house: 1657.08792,
        },
        {
            name: "Kinrooi",
            zipcode: "3640",
            appartment: 2541.666667,
            house: 1237.144638,
        },
        {
            name: "Dilsen-Stokkem",
            zipcode: "3650",
            appartment: 1747.867088,
            house: 1049.859918,
        },
        {
            name: "Opglabbeek",
            zipcode: "3660",
            appartment: 2007.193,
            house: 1640.567,
        },
        {
            name: "As",
            zipcode: "3665",
            appartment: 1174.84,
            house: 840.234,
        },
        {
            name: "Meeuwen-Gruitrode",
            zipcode: "3670",
            appartment: 2082.154,
            house: 1656.567,
        },
        {
            name: "Maaseik",
            zipcode: "3680",
            appartment: 2062.909442,
            house: 1656.797243,
        },
        {
            name: "Zutendaal",
            zipcode: "3690",
            appartment: 2523.586,
            house: 2045.673,
        },
        {
            name: "Tongeren",
            zipcode: "3700",
            appartment: 2636.217092,
            house: 1391.712865,
        },
        {
            name: "Herstappe",
            zipcode: "3717",
            appartment: 2456.61,
            house: 2053.45,
        },
        {
            name: "Kortessem",
            zipcode: "3720",
            appartment: 2141.482225,
            house: 1758.204669,
        },
        {
            name: "Hoeselt",
            zipcode: "3730",
            appartment: 2803.542951,
            house: 938.2779429,
        },
        {
            name: "Bilzen",
            zipcode: "3740",
            appartment: 2744.173146,
            house: 1579.586768,
        },
        {
            name: "Riemst",
            zipcode: "3770",
            appartment: 1582.361,
            house: 1056.234,
        },
        {
            name: "Voeren",
            zipcode: "3790",
            appartment: 1977.27,
            house: 1489.34,
        },
        {
            name: "Sint-Truiden",
            zipcode: "3800",
            appartment: 1877.879013,
            house: 1180.231029,
        },
        {
            name: "Wellen",
            zipcode: "3830",
            appartment: 2111.657,
            house: 1780.456,
        },
        {
            name: "Borgloon",
            zipcode: "3840",
            appartment: 2466.448343,
            house: 1316.384902,
        },
        {
            name: "Heers",
            zipcode: "3870",
            appartment: 2335.877358,
            house: 1346.889466,
        },
        {
            name: "Gingelom",
            zipcode: "3890",
            appartment: 1463.306,
            house: 1056.980,
        },
        {
            name: "Overpelt",
            zipcode: "3900",
            appartment: 2604.150566,
            house: 1476.329849,
        },
        {
            name: "Neerpelt",
            zipcode: "3910",
            appartment: 2014.447,
            house: 1578.890,
        },
        {
            name: "Lommel",
            zipcode: "3920",
            appartment: 2463.198662,
            house: 1541.010598,
        },
        {
            name: "Hamont-Achel",
            zipcode: "3930",
            appartment: 2832.237231,
            house: 1475.561645,
        },
        {
            name: "Hechtel-Eksel",
            zipcode: "3940",
            appartment: 2085.707,
            house: 1607.896,
        },
        {
            name: "Ham",
            zipcode: "3945",
            appartment: 2388.77521,
            house: 1347.609715,
        },
        {
            name: "Bocholt",
            zipcode: "3950",
            appartment: 2228.320262,
            house: 1526.393371,
        },
        {
            name: "Bree",
            zipcode: "3960",
            appartment: 2221.648728,
            house: 1712.512535,
        },
        {
            name: "Leopoldsburg",
            zipcode: "3970",
            appartment: 2000.279389,
            house: 1487.439801,
        },
        {
            name: "Tessenderlo",
            zipcode: "3980",
            appartment: 2487.912973,
            house: 1399.271246,
        },
        {
            name: "Peer",
            zipcode: "3990",
            appartment: 2149.47114,
            house: 1864.359582,
        },
        {
            name: "Liège",
            zipcode: "4000",
            appartment: 2247.798957,
            house: 1592.372013,
        },
        {
            name: "Saint-Nicolas",
            zipcode: "4000",
            appartment: 2179.171,
            house: 1780.145,
        },
        {
            name: "Herstal",
            zipcode: "4040",
            appartment: 1886.316222,
            house: 1381.857645,
        },
        {
            name: "Chaudfontaine",
            zipcode: "4050",
            appartment: 2489.642731,
            house: 1629.671668,
        },
        {
            name: "Seraing",
            zipcode: "4100",
            appartment: 2125.17908,
            house: 1217.215804,
        },
        {
            name: "Jemeppe-sur-Sambre",
            zipcode: "5190",
            appartment: 1353.354,
            house: 1243.453,
        },
        {
            name: "Neupré",
            zipcode: "4120",
            appartment: 1986.88,
            house: 1690.276,
        },
        {
            name: "Esneux",
            zipcode: "4130",
            appartment: 1880,
            house: 1682.855356,
        },
        {
            name: "Sprimont",
            zipcode: "4140",
            appartment: 2741.457178,
            house: 1702.069017,
        },
        {
            name: "Anthisnes",
            zipcode: "4160",
            appartment: 1645.351,
            house: 1270.457,
        },
        {
            name: "Comblain-au-Pont",
            zipcode: "4170",
            appartment: 1062.101,
            house: 690.435,
        },
        {
            name: "Hamoir",
            zipcode: "4180",
            appartment: 1569.767442,
            house: 596.8511609,
        },
        {
            name: "Ferrières",
            zipcode: "4190",
            appartment: 1225.054,
            house: 780.736,
        },
        {
            name: "Burdinne",
            zipcode: "4210",
            appartment: 1723.001,
            house: 1260.587,
        },
        {
            name: "Héron",
            zipcode: "4217",
            appartment: 1733.365,
            house: 1505.765,
        },
        {
            name: "Wasseiges",
            zipcode: "4219",
            appartment: 2823.275736,
            house: 1113.744076,
        },
        {
            name: "Geer",
            zipcode: "4250",
            appartment: 1577.165,
            house: 1250.574,
        },
        {
            name: "Berloz",
            zipcode: "4257",
            appartment: 1937.777778,
            house: 1674.71182,
        },
        {
            name: "Braives",
            zipcode: "4260",
            appartment: 1461.123,
            house: 1090.876,
        },
        {
            name: "Hannuit",
            zipcode: "4280",
            appartment: 2091.520991,
            house: 1484.878979,
        },
        {
            name: "Lincent",
            zipcode: "4287",
            appartment: 1371.603,
            house: 1008.897,
        },
        {
            name: "Waremme",
            zipcode: "4300",
            appartment: 2158.490575,
            house: 1416.625533,
        },
        {
            name: "Faimes",
            zipcode: "4317",
            appartment: 1469.791051,
            house: 1165.130037,
        },
        {
            name: "Awans",
            zipcode: "4340",
            appartment: 2472.527473,
            house: 1328.29586,
        },
        {
            name: "Fexhe-le-Haut-Clocher",
            zipcode: "4347",
            appartment: 1967.22,
            house: 1590.876,
        },
        {
            name: "Remicourt",
            zipcode: "4350",
            appartment: 1512.953,
            house: 1390.996,
        },
        {
            name: "Donceel",
            zipcode: "4357",
            appartment: 1680.381,
            house: 1280.947,
        },
        {
            name: "Oreye",
            zipcode: "4360",
            appartment: 1918.114,
            house: 1680.234,
        },
        {
            name: "Crisnée",
            zipcode: "4367",
            appartment: 2460.674157,
            house: 2210.989011,
        },
        {
            name: "Flémalle",
            zipcode: "4400",
            appartment: 1699.54023,
            house: 1473.587405,
        },
        {
            name: "Ans",
            zipcode: "4430",
            appartment: 1952.17511,
            house: 1425.977705,
        },
        {
            name: "Juprelle",
            zipcode: "4450",
            appartment: 1728.721279,
            house: 1440.031821,
        },
        {
            name: "Grâce-Hollogne",
            zipcode: "4460",
            appartment: 2295,
            house: 1554.807264,
        },
        {
            name: "Saint-Georges-sur-Meuse",
            zipcode: "4470",
            appartment: 2196.202532,
            house: 1194.147264,
        },
        {
            name: "Engis",
            zipcode: "4480",
            appartment: 1818.333333,
            house: 1153.846154,
        },
        {
            name: "Huy",
            zipcode: "4500",
            appartment: 1995.112073,
            house: 1204.390094,
        },
        {
            name: "Wanze",
            zipcode: "4520",
            appartment: 1969.078144,
            house: 1440.465898,
        },
        {
            name: "Villers-le-Bouillet",
            zipcode: "4530",
            appartment: 1368.671,
            house: 980.123,
        },
        {
            name: "Verlaine",
            zipcode: "4537",
            appartment: 1124.202,
            house: 890.897,
        },
        {
            name: "Amay",
            zipcode: "4540",
            appartment: 2039.448847,
            house: 1296.244556,
        },
        {
            name: "Nandrin",
            zipcode: "4550",
            appartment: 1734.059,
            house: 1309.343,
        },
        {
            name: "Tinlot",
            zipcode: "4557",
            appartment: 1726.448,
            house: 1480.756,
        },
        {
            name: "Clavier",
            zipcode: "4560",
            appartment: 1520.498363,
            house: 967.2806227,
        },
        {
            name: "Marchin",
            zipcode: "4570",
            appartment: 1300,
            house: 1567.60166,
        },
        {
            name: "Modave",
            zipcode: "4577",
            appartment: 1360.753,
            house: 1090.564,
        },
        {
            name: "Ouffet",
            zipcode: "4590",
            appartment: 2186.397195,
            house: 1256.349065,
        },
        {
            name: "Visé",
            zipcode: "4600",
            appartment: 2907.673363,
            house: 1074.252592,
        },
        {
            name: "Dalhem",
            zipcode: "4607",
            appartment: 2545.17083,
            house: 1528.22602,
        },
        {
            name: "Beyne-Heusay",
            zipcode: "4610",
            appartment: 2063.712375,
            house: 1561.185869,
        },
        {
            name: "Fléron",
            zipcode: "4620",
            appartment: 2131.604002,
            house: 2436.965812,
        },
        {
            name: "Soumagne",
            zipcode: "4630",
            appartment: 2383.200146,
            house: 1444.7781,
        },
        {
            name: "Herve",
            zipcode: "4650",
            appartment: 2453.703704,
            house: 1476.281033,
        },
        {
            name: "Blégny",
            zipcode: "4670",
            appartment: 1572.909,
            house: 1200.361,
        },
        {
            name: "Oupeye",
            zipcode: "4680",
            appartment: 1993.557578,
            house: 1435.478375,
        },
        {
            name: "Eupen",
            zipcode: "4700",
            appartment: 2964.340903,
            house: 1780.104583,
        },
        {
            name: "Lontzen",
            zipcode: "4710",
            appartment: 1807.884,
            house: 1309.435,
        },
        {
            name: "Kelmis",
            zipcode: "4720",
            appartment: 1563.036,
            house: 1290.234,
        },
        {
            name: "Raeren",
            zipcode: "4730",
            appartment: 1368.581,
            house: 990.476,
        },
        {
            name: "Bütgenbach",
            zipcode: "4750",
            appartment: 1202.358,
            house: 890.271,
        },
        {
            name: "Büllingen",
            zipcode: "4760",
            appartment: 793.9627,
            house: 450.352,
        },
        {
            name: "Amel",
            zipcode: "4770",
            appartment: 612.2153,
            house: 380.372,
        },
        {
            name: "Sankt Vith",
            zipcode: "4780",
            appartment: 2236.198,
            house: 1820.215,
        },
        {
            name: "Burg-Reuland",
            zipcode: "4790",
            appartment: 1165.945,
            house: 890.122,
        },
        {
            name: "Verviers",
            zipcode: "4800",
            appartment: 1728.170305,
            house: 1053.547153,
        },
        {
            name: "Dison",
            zipcode: "4820",
            appartment: 1131.578947,
            house: 1074.217803,
        },
        {
            name: "Limbourg",
            zipcode: "4830",
            appartment: 1564.903,
            house: 1220.121,
        },
        {
            name: "Baelen",
            zipcode: "4837",
            appartment: 1912.461,
            house: 1520.211,
        },
        {
            name: "Welkenraedt",
            zipcode: "4840",
            appartment: 3157.56475,
            house: 1861.201057,
        },
        {
            name: "Jalhay",
            zipcode: "4845",
            appartment: 2492.622536,
            house: 2119.207232,
        },
        {
            name: "Plombières",
            zipcode: "4850",
            appartment: 2385.648,
            house: 1890.811,
        },
        {
            name: "Pepinster",
            zipcode: "4860",
            appartment: 1425.355,
            house: 1002.121,
        },
        {
            name: "Trooz",
            zipcode: "4870",
            appartment: 2105.358368,
            house: 1452.286998,
        },
        {
            name: "Olne",
            zipcode: "4877",
            appartment: 1439.789,
            house: 1010.121,
        },
        {
            name: "Aubel",
            zipcode: "4880",
            appartment: 2441.351,
            house: 1980.214,
        },
        {
            name: "Thimister-Clermont",
            zipcode: "4890",
            appartment: 1942.445,
            house: 1620.121,
        },
        {
            name: "Spa",
            zipcode: "4900",
            appartment: 2843.265547,
            house: 1439.986093,
        },
        {
            name: "Theux",
            zipcode: "4910",
            appartment: 1543.098818,
            house: 1285.46852,
        },
        {
            name: "Aywaille",
            zipcode: "4920",
            appartment: 1990.858021,
            house: 1336.191226,
        },
        {
            name: "Weismes",
            zipcode: "4950",
            appartment: 2257.948567,
            house: 1170.112601,
        },
        {
            name: "Malmedy",
            zipcode: "4960",
            appartment: 2165.908506,
            house: 1350.184849,
        },
        {
            name: "Stavelot",
            zipcode: "4970",
            appartment: 2242.907319,
            house: 1152.538939,
        },
        {
            name: "Trois-Ponts",
            zipcode: "4980",
            appartment: 1920.438,
            house: 1403.232,
        },
        {
            name: "Stoumont",
            zipcode: "4987",
            appartment: 1148.409,
            house: 890.121,
        },
        {
            name: "Lierneux",
            zipcode: "4990",
            appartment: 2553.383193,
            house: 1265.121949,
        },
        {
            name: "Namur",
            zipcode: "5000",
            appartment: 2793.953285,
            house: 1845.267821,
        },
        {
            name: "Gembloux",
            zipcode: "5030",
            appartment: 2516.650824,
            house: 1944.314894,
        },
        {
            name: "Sambreville",
            zipcode: "5060",
            appartment: 2067.617535,
            house: 1330.790062,
        },
        {
            name: "Fosses-la-Ville",
            zipcode: "5070",
            appartment: 1418.543,
            house: 1021.121,
        },
        {
            name: "La Bruyère",
            zipcode: "5080",
            appartment: 1466.352,
            house: 1012.121,
        },
        {
            name: "Sombreffe",
            zipcode: "5140",
            appartment: 1640.963,
            house: 1407.176,
        },
        {
            name: "Floreffe",
            zipcode: "5150",
            appartment: 1126.308,
            house: 890.214,
        },
        {
            name: "Profondeville",
            zipcode: "5170",
            appartment: 2428.571429,
            house: 2385.353618,
        },
        {
            name: "Andenne",
            zipcode: "5300",
            appartment: 2191.21,
            house: 1809.287,
        },
        {
            name: "Eghezée",
            zipcode: "5310",
            appartment: 2220.033,
            house: 1920.215,
        },
        {
            name: "Assesse",
            zipcode: "5330",
            appartment: 2003.528,
            house: 1720.212,
        },
        {
            name: "Gesves",
            zipcode: "5340",
            appartment: 2174.264,
            house: 1920.212,
        },
        {
            name: "Ohey",
            zipcode: "5350",
            appartment: 2092.045455,
            house: 1511.295114,
        },
        {
            name: "Hamois",
            zipcode: "5360",
            appartment: 962.7399,
            house: 590.45,
        },
        {
            name: "Havelange",
            zipcode: "5370",
            appartment: 1748.761,
            house: 1220.212,
        },
        {
            name: "Somme-Leuze",
            zipcode: "5377",
            appartment: 1729.25,
            house: 1290.126,
        },
        {
            name: "Fernlemont",
            zipcode: "5380",
            appartment: 1963.247,
            house: 1629.121,
        },
        {
            name: "Dinant",
            zipcode: "5500",
            appartment: 1964.440915,
            house: 1225.776001,
        },
        {
            name: "Onhaye",
            zipcode: "5520",
            appartment: 2335.86,
            house: 2012.23,
        },
        {
            name: "Yvoir",
            zipcode: "5530",
            appartment: 1835.862,
            house: 1489.902,
        },
        {
            name: "Anhée",
            zipcode: "5537",
            appartment: 1569.894,
            house: 1189.121,
        },
        {
            name: "Hastière",
            zipcode: "5540",
            appartment: 1184.248,
            house: 670.211,
        },
        {
            name: "Vresse-sur-Semois",
            zipcode: "5550",
            appartment: 1036.618,
            house: 560.211,
        },
        {
            name: "Bièvre",
            zipcode: "5555",
            appartment: 1735.294118,
            house: 526.510319,
        },
        {
            name: "Houyet",
            zipcode: "5560",
            appartment: 1664.727,
            house: 1278.121,
        },
        {
            name: "Beauraing",
            zipcode: "5570",
            appartment: 1193.532,
            house: 678.018,
        },
        {
            name: "Gedinne",
            zipcode: "5575",
            appartment: 1036.248,
            house: 670.725,
        },
        {
            name: "Rochefort",
            zipcode: "5580",
            appartment: 1805.358966,
            house: 1550.862119,
        },
        {
            name: "Ciney",
            zipcode: "5590",
            appartment: 2147.877139,
            house: 1370.021161,
        },
        {
            name: "Philippeville",
            zipcode: "5600",
            appartment: 1262.696,
            house: 890.121,
        },
        {
            name: "Cerfontaine",
            zipcode: "5630",
            appartment: 984.8914,
            house: 450.453,
        },
        {
            name: "Mettet",
            zipcode: "5640",
            appartment: 1833.333333,
            house: 1015.724161,
        },
        {
            name: "Walcourt",
            zipcode: "5650",
            appartment: 963.8709,
            house: 460.123,
        },
        {
            name: "Couvin",
            zipcode: "5660",
            appartment: 978.6088,
            house: 560.456,
        },
        {
            name: "Viroinval",
            zipcode: "5670",
            appartment: 809.9088,
            house: 490.343,
        },
        {
            name: "Doische",
            zipcode: "5680",
            appartment: 969.6314,
            house: 560.345,
        },
        {
            name: "Charleroi",
            zipcode: "6000",
            appartment: 1404.820302,
            house: 1107.708913,
        },
        {
            name: "Marche-en-Famenne",
            zipcode: "6900",
            appartment: 2315.051,
            house: 1909.345,
        },
        {
            name: "Montigny-le-Tilleul",
            zipcode: "6110",
            appartment: 2086.33086,
            house: 1497.674238,
        },
        {
            name: "Ham-sur-Heure-Nalinnes",
            zipcode: "6120",
            appartment: 1428.793,
            house: 1007.213,
        },
        {
            name: "Fontaine-l'Evêque",
            zipcode: "6140",
            appartment: 1094.972,
            house: 790.354,
        },
        {
            name: "Anderlues",
            zipcode: "6150",
            appartment: 2073.089969,
            house: 1068.918914,
        },
        {
            name: "Courcelles",
            zipcode: "6180",
            appartment: 1593.182132,
            house: 1169.7567,
        },
        {
            name: "Châtelet",
            zipcode: "6200",
            appartment: 1099.194,
            house: 670.234,
        },
        {
            name: "Les Bons Villers",
            zipcode: "6210",
            appartment: 2250,
            house: 1530.501761,
        },
        {
            name: "Fleurus",
            zipcode: "6220",
            appartment: 2171.446571,
            house: 1176.437892,
        },
        {
            name: "Pont-à-Celles",
            zipcode: "6230",
            appartment: 2279.313398,
            house: 1296.588623,
        },
        {
            name: "Farciennes",
            zipcode: "6240",
            appartment: 1089.916,
            house: 780.334,
        },
        {
            name: "Aiseau-Presles",
            zipcode: "6250",
            appartment: 1294.736,
            house: 560.343,
        },
        {
            name: "Gerpinnes",
            zipcode: "6280",
            appartment: 2343.457448,
            house: 1780.253307,
        },
        {
            name: "Froidchapelle",
            zipcode: "6440",
            appartment: 1894.253,
            house: 1380.121,
        },
        {
            name: "Chimay",
            zipcode: "6460",
            appartment: 1061.823,
            house: 780.221,
        },
        {
            name: "Sivry-Rance",
            zipcode: "6470",
            appartment: 823.3049,
            house: 560.345,
        },
        {
            name: "Beaumont",
            zipcode: "6500",
            appartment: 1879.9,
            house: 1619.353523,
        },
        {
            name: "Thuin",
            zipcode: "6530",
            appartment: 1530.804,
            house: 1190.211,
        },
        {
            name: "Lobbes",
            zipcode: "6540",
            appartment: 1006.101,
            house: 790.112,
        },
        {
            name: "Erquelinnes",
            zipcode: "6560",
            appartment: 1822.774245,
            house: 890.924497,
        },
        {
            name: "Merbes-le-Château",
            zipcode: "6567",
            appartment: 1244.916,
            house: 890.211,
        },
        {
            name: "Momignies",
            zipcode: "6590",
            appartment: 859.9965,
            house: 450.354,
        },
        {
            name: "Bastogne",
            zipcode: "6600",
            appartment: 2400.681937,
            house: 1184.897093,
        },
        {
            name: "Martelange",
            zipcode: "6630",
            appartment: 937.5,
            house: 1778.56649,
        },
        {
            name: "Fauvillers",
            zipcode: "6637",
            appartment: 865.488,
            house: 560.363,
        },
        {
            name: "Vaux-sur-Sûre",
            zipcode: "6640",
            appartment: 1600.566,
            house: 1228.222,
        },
        {
            name: "Houffalize",
            zipcode: "6660",
            appartment: 921.9215,
            house: 459.784,
        },
        {
            name: "Gouvy",
            zipcode: "6670",
            appartment: 1997.773,
            house: 1527.521,
        },
        {
            name: "Sainte-Ode",
            zipcode: "6680",
            appartment: 815.2426,
            house: 413.141,
        },
        {
            name: "Bertogne",
            zipcode: "6687",
            appartment: 750.4847,
            house: 450.132,
        },
        {
            name: "Vielsalm",
            zipcode: "6690",
            appartment: 1142.857143,
            house: 993.6770514,
        },
        {
            name: "Arlon",
            zipcode: "6700",
            appartment: 2341.094852,
            house: 1934.385388,
        },
        {
            name: "Attert",
            zipcode: "6717",
            appartment: 2073.099,
            house: 1890.245,
        },
        {
            name: "Habay",
            zipcode: "6720",
            appartment: 1661.092,
            house: 1220.125,
        },
        {
            name: "Tintigny",
            zipcode: "6730",
            appartment: 1504.332,
            house: 1203.342,
        },
        {
            name: "Etalle",
            zipcode: "6740",
            appartment: 1909.463,
            house: 1580.121,
        },
        {
            name: "Saint-Léger",
            zipcode: "6747",
            appartment: 1266.167,
            house: 990.214,
        },
        {
            name: "Musson",
            zipcode: "6750",
            appartment: 1554.225,
            house: 1279.121,
        },
        {
            name: "Virton",
            zipcode: "6760",
            appartment: 1591.695,
            house: 1102.121,
        },
        {
            name: "Rouvroy",
            zipcode: "6767",
            appartment: 1257.608,
            house: 980.211,
        },
        {
            name: "Meix-Devant-Virton",
            zipcode: "6769",
            appartment: 815.8824,
            house: 561.121,
        },
        {
            name: "Messancy",
            zipcode: "6780",
            appartment: 2555.753968,
            house: 1920.855436,
        },
        {
            name: "Aubange",
            zipcode: "6790",
            appartment: 2040.526889,
            house: 1598.005702,
        },
        {
            name: "Libramont-Chevigny",
            zipcode: "6800",
            appartment: 2353.49014,
            house: 1355.684461,
        },
        {
            name: "Chiny",
            zipcode: "6810",
            appartment: 1890.607,
            house: 1590.121,
        },
        {
            name: "Florennes",
            zipcode: "5620",
            appartment: 1458.762,
            house: 1010.141,
        },
        {
            name: "Florenville",
            zipcode: "6820",
            appartment: 2509.633548,
            house: 798.1302711,
        },
        {
            name: "Bouillon",
            zipcode: "6830",
            appartment: 1303.461,
            house: 1204.451,
        },
        {
            name: "Neufchâteau",
            zipcode: "6840",
            appartment: 1444.431,
            house: 1240.141,
        },
        {
            name: "Paliseul",
            zipcode: "6850",
            appartment: 1173.097,
            house: 980.145,
        },
        {
            name: "Léglise",
            zipcode: "6860",
            appartment: 2165.47619,
            house: 2434.456929,
        },
        {
            name: "Saint-Hubert",
            zipcode: "6870",
            appartment: 1067.438,
            house: 780.089,
        },
        {
            name: "Bertrix",
            zipcode: "6880",
            appartment: 1928.628674,
            house: 1044.514824,
        },
        {
            name: "Herbeumont",
            zipcode: "6887",
            appartment: 793.4151,
            house: 490.7676,
        },
        {
            name: "Libin",
            zipcode: "6890",
            appartment: 2803.658537,
            house: 1761.480977,
        },
        {
            name: "Wellin",
            zipcode: "6920",
            appartment: 1169.733,
            house: 950.34,
        },
        {
            name: "Tellin",
            zipcode: "6927",
            appartment: 1305.919,
            house: 1021.212,
        },
        {
            name: "Daverdisse",
            zipcode: "6929",
            appartment: 566.3046,
            house: 340.232,
        },
        {
            name: "Durbuy",
            zipcode: "6940",
            appartment: 2903.911814,
            house: 1882.90237,
        },
        {
            name: "Nassogne",
            zipcode: "6950",
            appartment: 1479.943,
            house: 1020.121,
        },
        {
            name: "Manhay",
            zipcode: "6960",
            appartment: 1285.31,
            house: 980.212,
        },
        {
            name: "Tenneville",
            zipcode: "6970",
            appartment: 1080.714,
            house: 890.234,
        },
        {
            name: "La Roche-en-Ardenne",
            zipcode: "6980",
            appartment: 2125,
            house: 1336.812807,
        },
        {
            name: "Rendeux",
            zipcode: "6987",
            appartment: 2193.788,
            house: 1890.354,
        },
        {
            name: "Hotton",
            zipcode: "6990",
            appartment: 1431.979,
            house: 1020.121,
        },
        {
            name: "Erezée",
            zipcode: "6997",
            appartment: 1347.461,
            house: 1020.212,
        },
        {
            name: "Mons",
            zipcode: "7000",
            appartment: 2191.558448,
            house: 1441.4327,
        },
        {
            name: "Saint-Ghislain",
            zipcode: "7330",
            appartment: 1993.204,
            house: 1504.353,
        },
        {
            name: "Gent",
            zipcode: "9000",
            appartment: 2226.10,
            house: 1958.23,
        },
        {
            name: "Quévy",
            zipcode: "7040",
            appartment: 1263.611,
            house: 980.124,
        },
        {
            name: "Jurbise",
            zipcode: "7050",
            appartment: 2376.845589,
            house: 1474.237918,
        },
        {
            name: "Soignies",
            zipcode: "7060",
            appartment: 2382.604455,
            house: 1581.791834,
        },
        {
            name: "Le Roeulx",
            zipcode: "7070",
            appartment: 1875,
            house: 1626.392965,
        },
        {
            name: "Frameries",
            zipcode: "7080",
            appartment: 2121.898549,
            house: 950.9910415,
        },
        {
            name: "Braine-le-Comte",
            zipcode: "7090",
            appartment: 2287.850571,
            house: 1602.062399,
        },
        {
            name: "La Louvière",
            zipcode: "7100",
            appartment: 1687.384204,
            house: 1746.670479,
        },
        {
            name: "Estinnes",
            zipcode: "7120",
            appartment: 1052.241,
            house: 780.135,
        },
        {
            name: "Binche",
            zipcode: "7130",
            appartment: 1563.893938,
            house: 1153.571865,
        },
        {
            name: "Morlanwelz",
            zipcode: "7140",
            appartment: 1350.364964,
            house: 1223.894398,
        },
        {
            name: "Chapelle-lez-Herlaimont",
            zipcode: "7160",
            appartment: 1619.72675,
            house: 926.479336,
        },
        {
            name: "Manage",
            zipcode: "7170",
            appartment: 1876.857501,
            house: 1274.58789,
        },
        {
            name: "Seneffe",
            zipcode: "7180",
            appartment: 2124.24,
            house: 1890.215,
        },
        {
            name: "Écaussinnes",
            zipcode: "7190",
            appartment: 1667.107,
            house: 1208.121,
        },
        {
            name: "Boussu",
            zipcode: "7300",
            appartment: 1575.298016,
            house: 1042.979745,
        },
        {
            name: "Bernissart",
            zipcode: "7320",
            appartment: 1927.338866,
            house: 816.614708,
        },
        {
            name: "Colfontaine",
            zipcode: "7340",
            appartment: 1027.39726,
            house: 879.4219094,
        },
        {
            name: "Hensies",
            zipcode: "7350",
            appartment: 1124.692,
            house: 890.235,
        },
        {
            name: "Dour",
            zipcode: "7370",
            appartment: 1795.074233,
            house: 845.006263,
        },
        {
            name: "Quiévrain",
            zipcode: "7380",
            appartment: 1796.319069,
            house: 760.4515467,
        },
        {
            name: "Honnelles",
            zipcode: "7387",
            appartment: 1204.43,
            house: 850.325,
        },
        {
            name: "Quaregnon",
            zipcode: "7390",
            appartment: 1714.459975,
            house: 857.0956195,
        },
        {
            name: "Tournai",
            zipcode: "7500",
            appartment: 1949.761,
            house: 1620.211,
        },
        {
            name: "Péruwelz",
            zipcode: "7600",
            appartment: 1886.302294,
            house: 986.8421053,
        },
        {
            name: "Rumes",
            zipcode: "7610",
            appartment: 1483.473,
            house: 1190.121,
        },
        {
            name: "Brunehaut",
            zipcode: "7620",
            appartment: 933.174,
            house: 670.121,
        },
        {
            name: "Antoing",
            zipcode: "7640",
            appartment: 1768.237,
            house: 1340.235,
        },
        {
            name: "Mouscron",
            zipcode: "7700",
            appartment: 1719.202372,
            house: 1380.694397,
        },
        {
            name: "Estaimpuis",
            zipcode: "7730",
            appartment: 1622.052,
            house: 1290.121,
        },
        {
            name: "Pecq",
            zipcode: "7740",
            appartment: 1842.823,
            house: 1520.122,
        },
        {
            name: "Mont-de-l'Enclus",
            zipcode: "7750",
            appartment: 3085.185185,
            house: 1798.613628,
        },
        {
            name: "Celles",
            zipcode: "7760",
            appartment: 1866.011,
            house: 1520.237,
        },
        {
            name: "Comines-Warneton",
            zipcode: "7780",
            appartment: 1446.024,
            house: 1090.121,
        },
        {
            name: "Ath",
            zipcode: "7800",
            appartment: 2166.558694,
            house: 1528.125489,
        },
        {
            name: "Silly",
            zipcode: "7830",
            appartment: 1684.675,
            house: 1420.211,
        },
        {
            name: "Enghien",
            zipcode: "7850",
            appartment: 2368.334643,
            house: 1776.706256,
        },
        {
            name: "Lessines",
            zipcode: "7860",
            appartment: 1501.875027,
            house: 1089.789667,
        },
        {
            name: "Lens",
            zipcode: "7870",
            appartment: 1339.104,
            house: 990.122,
        },
        {
            name: "Flobecq",
            zipcode: "7880",
            appartment: 1166.464,
            house: 871.12,
        },
        {
            name: "Ellezelles",
            zipcode: "7890",
            appartment: 1808.080808,
            house: 1409.94382,
        },
        {
            name: "Leuze-en-Hainaut",
            zipcode: "7900",
            appartment: 1772.439859,
            house: 843.748265,
        },
        {
            name: "Frasnes-lez-Anvaing",
            zipcode: "7910",
            appartment: 2403.422,
            house: 1890.121,
        },
        {
            name: "Brugelette",
            zipcode: "7940",
            appartment: 1478.78,
            house: 1100.121,
        },
        {
            name: "Chièvres",
            zipcode: "7950",
            appartment: 2336.26008,
            house: 762.2322222,
        },
        {
            name: "Beloeil",
            zipcode: "7970",
            appartment: 1081.879,
            house: 890.1212,
        },
        {
            name: "Brugge",
            zipcode: "8000",
            appartment: 3148.721,
            house: 279.1210,
        },
        {
            name: "Oostkamp",
            zipcode: "8020",
            appartment: 2721.708741,
            house: 1723.457416,
        },
        {
            name: "Zedelgem",
            zipcode: "8210",
            appartment: 2944.164,
            house: 2467.1210,
        },
        {
            name: "Knokke-Heist",
            zipcode: "8300",
            appartment: 9395.657679,
            house: 5665.347713,
        },
        {
            name: "Damme",
            zipcode: "8340",
            appartment: 2235.406,
            house: 1902.210,
        },
        {
            name: "Blankenberge",
            zipcode: "8370",
            appartment: 3234.158739,
            house: 1851.736669,
        },
        {
            name: "Zuienkerke",
            zipcode: "8377",
            appartment: 2114.486,
            house: 1590.6780,
        },
        {
            name: "Oostende",
            zipcode: "8400",
            appartment: 3307.447,
            house: 2901.1210,
        },
        {
            name: "De Haan",
            zipcode: "8420",
            appartment: 4377.977002,
            house: 2199.864223,
        },
        {
            name: "Middelkerke",
            zipcode: "8430",
            appartment: 3599.333923,
            house: 2161.67819,
        },
        {
            name: "Bredene",
            zipcode: "8450",
            appartment: 2861.248163,
            house: 1832.399733,
        },
        {
            name: "Oudenburg",
            zipcode: "8460",
            appartment: 2290.598291,
            house: 1664.752779,
        },
        {
            name: "Gistel",
            zipcode: "8470",
            appartment: 2844.429735,
            house: 1618.112843,
        },
        {
            name: "Ichtegem",
            zipcode: "8480",
            appartment: 2137.040149,
            house: 1331.604978,
        },
        {
            name: "Jabbeke",
            zipcode: "8490",
            appartment: 2550.137,
            house: 2082.0210,
        },
        {
            name: "Kortrijk",
            zipcode: "8500",
            appartment: 3398.470872,
            house: 1741.537488,
        },
        {
            name: "Kuurne",
            zipcode: "8520",
            appartment: 2156.668938,
            house: 1402.173633,
        },
        {
            name: "Harelbeke",
            zipcode: "8530",
            appartment: 2523.853563,
            house: 1493.243946,
        },
        {
            name: "Deerlijk",
            zipcode: "8540",
            appartment: 2565.984008,
            house: 1609.705822,
        },
        {
            name: "Zwevegem",
            zipcode: "8550",
            appartment: 2669.008266,
            house: 1325.557768,
        },
        {
            name: "Wevelgem",
            zipcode: "8560",
            appartment: 2501.591528,
            house: 1432.664438,
        },
        {
            name: "Anzegem",
            zipcode: "8570",
            appartment: 2527.101063,
            house: 1945.467376,
        },
        {
            name: "Avelgem",
            zipcode: "8580",
            appartment: 2257.619003,
            house: 1302.520134,
        },
        {
            name: "Spiere-Helkijn",
            zipcode: "8587",
            appartment: 2109.33,
            house: 1729.210,
        },
        {
            name: "Diksmuide",
            zipcode: "8600",
            appartment: 2587.777429,
            house: 1422.531307,
        },
        {
            name: "Kortemark",
            zipcode: "8610",
            appartment: 2693.704335,
            house: 1243.963842,
        },
        {
            name: "Nieuwpoort",
            zipcode: "8620",
            appartment: 4740.524622,
            house: 2334.902961,
        },
        {
            name: "Veurne",
            zipcode: "8630",
            appartment: 2985.308317,
            house: 1530.309224,
        },
        {
            name: "Vleteren",
            zipcode: "8640",
            appartment: 1053.871,
            house: 890.160,
        },
        {
            name: "Lo-Reninge",
            zipcode: "8647",
            appartment: 1689.35,
            house: 1390.2110,
        },
        {
            name: "Houthulst",
            zipcode: "8650",
            appartment: 2165.220883,
            house: 1211.76537,
        },
        {
            name: "De Panne",
            zipcode: "8660",
            appartment: 2972.880372,
            house: 3412.143018,
        },
        {
            name: "Koksijde",
            zipcode: "8670",
            appartment: 3980.817085,
            house: 2447.410435,
        },
        {
            name: "Koekelare",
            zipcode: "8680",
            appartment: 874.9532,
            house: 680.1910,
        },
        {
            name: "Alveringem",
            zipcode: "8690",
            appartment: 1071.226,
            house: 679.210,
        },
        {
            name: "Tielt",
            zipcode: "8700",
            appartment: 2918.069355,
            house: 1276.871864,
        },
        {
            name: "Wielsbeke",
            zipcode: "8710",
            appartment: 2588.96138,
            house: 1532.368021,
        },
        {
            name: "Dentergem",
            zipcode: "8720",
            appartment: 1467.511,
            house: 1191.2110,
        },
        {
            name: "Beernem",
            zipcode: "8730",
            appartment: 2438.312721,
            house: 1763.257823,
        },
        {
            name: "Pittem",
            zipcode: "8740",
            appartment: 2575.471935,
            house: 1629.068643,
        },
        {
            name: "Wingene",
            zipcode: "8750",
            appartment: 2514.888356,
            house: 1362.425197,
        },
        {
            name: "Ruiselede",
            zipcode: "8755",
            appartment: 1656.457,
            house: 1390.120,
        },
        {
            name: "Meulebeke",
            zipcode: "8760",
            appartment: 2592.493041,
            house: 1428.765213,
        },
        {
            name: "Ingelmunster",
            zipcode: "8770",
            appartment: 2592.493041,
            house: 1428.765213,
        },
        {
            name: "Oostrozebeke",
            zipcode: "8780",
            appartment: 2746.471729,
            house: 1662.308146,
        },
        {
            name: "Waregem",
            zipcode: "8790",
            appartment: 2860.399913,
            house: 1785.307838,
        },
        {
            name: "Beveren",
            zipcode: "8791",
            appartment: 1902.074,
            house: 1678.210,
        },
        {
            name: "Roeselare",
            zipcode: "8800",
            appartment: 2465.198633,
            house: 1631.115663,
        },
        {
            name: "Lichtervelde",
            zipcode: "8810",
            appartment: 2608.799328,
            house: 1682.018474,
        },
        {
            name: "Torhout",
            zipcode: "8820",
            appartment: 2255.237803,
            house: 1454.269951,
        },
        {
            name: "Hooglede",
            zipcode: "8830",
            appartment: 1836.34,
            house: 1670.900,
        },
        {
            name: "Staden",
            zipcode: "8840",
            appartment: 2316.853763,
            house: 1066.336109,
        },
        {
            name: "Ardooie",
            zipcode: "8850",
            appartment: 2449.060112,
            house: 1411.604521,
        },
        {
            name: "Lendelede",
            zipcode: "8860",
            appartment: 1934.165203,
            house: 1385.20976,
        },
        {
            name: "Izegem",
            zipcode: "8870",
            appartment: 2291.927849,
            house: 1307.406444,
        },
        {
            name: "Ledegem",
            zipcode: "8880",
            appartment: 1459.742,
            house: 1167.900,
        },
        {
            name: "Moorslede",
            zipcode: "8890",
            appartment: 2140.833,
            house: 1790.600,
        },
        {
            name: "Ieper",
            zipcode: "8900",
            appartment: 2826.101,
            house: 2490.890,
        },
        {
            name: "Langemark-Poelkapelle",
            zipcode: "8920",
            appartment: 1340.286,
            house: 1190.5140,
        },
        {
            name: "Menen",
            zipcode: "8930",
            appartment: 2231.749239,
            house: 1249.059583,
        },
        {
            name: "Wervik",
            zipcode: "8940",
            appartment: 1185.992,
            house: 780.460,
        },
        {
            name: "Heuvelland",
            zipcode: "8950",
            appartment: 1920.886,
            house: 1960.121,
        },
        {
            name: "Mesen",
            zipcode: "8957",
            appartment: 1740.34,
            house: 1356.45,
        },
        {
            name: "Poperinge",
            zipcode: "8970",
            appartment: 2370.217272,
            house: 1313.18531,
        },
        {
            name: "Zonnebeke",
            zipcode: "8980",
            appartment: 2131.122694,
            house: 1531.926151,
        },
        {
            name: "Zelzate",
            zipcode: "9060",
            appartment: 2513.624096,
            house: 1532.812939,
        },
        {
            name: "Destelbergen",
            zipcode: "9070",
            appartment: 3440.266568,
            house: 2179.519641,
        },
        {
            name: "Lochristi",
            zipcode: "9080",
            appartment: 2857.511434,
            house: 2196.213524,
        },
        {
            name: "Melle",
            zipcode: "9090",
            appartment: 3142.712478,
            house: 2058.984055,
        },
        {
            name: "Sint-Niklaas",
            zipcode: "9100",
            appartment: 2759.589327,
            house: 1792.643829,
        },
        {
            name: "Temse",
            zipcode: "9140",
            appartment: 2693.456157,
            house: 1795.204689,
        },
        {
            name: "Kruibeke",
            zipcode: "9150",
            appartment: 2245.863095,
            house: 1438.748412,
        },
        {
            name: "Lokeren",
            zipcode: "9160",
            appartment: 2622.49953,
            house: 1881.782937,
        },
        {
            name: "Sint-Gillis-Waas",
            zipcode: "9170",
            appartment: 2151.717101,
            house: 1940.728111,
        },
        {
            name: "Wachtebeke",
            zipcode: "9185",
            appartment: 2453.072417,
            house: 1285.520131,
        },
        {
            name: "Stekene",
            zipcode: "9190",
            appartment: 2670.79003,
            house: 1533.414293,
        },
        {
            name: "Dendermonde",
            zipcode: "9200",
            appartment: 2611.692885,
            house: 1778.540878,
        },
        {
            name: "Wetteren",
            zipcode: "9230",
            appartment: 2625.979086,
            house: 1684.204588,
        },
        {
            name: "Zele",
            zipcode: "9240",
            appartment: 2666.814253,
            house: 1563.907003,
        },
        {
            name: "Waasmunster",
            zipcode: "9250",
            appartment: 3627.605108,
            house: 1884.138451,
        },
        {
            name: "Buggenhout",
            zipcode: "9255",
            appartment: 3062.121715,
            house: 1997.761651,
        },
        {
            name: "Wichelen",
            zipcode: "9260",
            appartment: 2221.889769,
            house: 1886.222368,
        },
        {
            name: "Laarne",
            zipcode: "9270",
            appartment: 2849.663224,
            house: 1861.812912,
        },
        {
            name: "Lebbeke",
            zipcode: "9280",
            appartment: 2390.484358,
            house: 1517.130258,
        },
        {
            name: "Berlare",
            zipcode: "9290",
            appartment: 2842.902268,
            house: 2039.411085,
        },
        {
            name: "Aalst",
            zipcode: "9300",
            appartment: 2672.321402,
            house: 1676.864392,
        },
        {
            name: "Nieuwerkerken",
            zipcode: "9320",
            appartment: 1871.081,
            house: 1492.120,
        },
        {
            name: "Lede",
            zipcode: "9340",
            appartment: 2630.835054,
            house: 1600.708482,
        },
        {
            name: "Ninove",
            zipcode: "9400",
            appartment: 2627.989862,
            house: 1714.994489,
        },
        {
            name: "Erpe-Mere",
            zipcode: "9420",
            appartment: 2426.582921,
            house: 1787.903697,
        },
        {
            name: "Haaltert",
            zipcode: "9450",
            appartment: 2434.010548,
            house: 1465.548155,
        },
        {
            name: "Denderleeuw",
            zipcode: "9470",
            appartment: 2502.681713,
            house: 1714.250148,
        },
        {
            name: "Geraardsbergen",
            zipcode: "9500",
            appartment: 2462.56244,
            house: 1462.38842,
        },
        {
            name: "Moerbeke",
            zipcode: "9500",
            appartment: 1682.39,
            house: 1289.2180,
        },
        {
            name: "Sint-Lievens-Houtem",
            zipcode: "9520",
            appartment: 2993.682065,
            house: 1347.366108,
        },
        {
            name: "Herzele",
            zipcode: "9550",
            appartment: 2424.845608,
            house: 1572.292107,
        },
        {
            name: "Lierde",
            zipcode: "9570",
            appartment: 1442.346,
            house: 1000.210,
        },
        {
            name: "Ronse",
            zipcode: "9600",
            appartment: 2440.880823,
            house: 1420.756958,
        },
        {
            name: "Zottegem",
            zipcode: "9620",
            appartment: 2205.941063,
            house: 1767.023973,
        },
        {
            name: "Sint-Martens-Latem",
            zipcode: "9630",
            appartment: 1790,
            house: 1280.2110,
        },
        {
            name: "Zwalm",
            zipcode: "9630",
            appartment: 2500,
            house: 1543.112001,
        },
        {
            name: "Brakel",
            zipcode: "9660",
            appartment: 1888.559107,
            house: 1719.088889,
        },
        {
            name: "Horebeke",
            zipcode: "9667",
            appartment: 2401.07,
            house: 2032.230,
        },
        {
            name: "Maarkedal",
            zipcode: "9680",
            appartment: 1578.682,
            house: 1121.120,
        },
        {
            name: "Kluisbergen",
            zipcode: "9690",
            appartment: 2192.653142,
            house: 1455.460555,
        },
        {
            name: "Oudenaarde",
            zipcode: "9700",
            appartment: 2719.120035,
            house: 1694.129528,
        },
        {
            name: "Zingem",
            zipcode: "9750",
            appartment: 2358.681,
            house: 2103.230,
        },
        {
            name: "Kruishoutem",
            zipcode: "9770",
            appartment: 2627.139721,
            house: 2493.403694,
        },
        {
            name: "Wortegem-Petegem",
            zipcode: "9790",
            appartment: 2022.598,
            house: 1800.121,
        },
        {
            name: "Deinze",
            zipcode: "9800",
            appartment: 3047.356867,
            house: 1638.844611,
        },
        {
            name: "Nazareth",
            zipcode: "9810",
            appartment: 2361.111111,
            house: 2351.115132,
        },
        {
            name: "Merelbeke",
            zipcode: "9820",
            appartment: 3272.009159,
            house: 2035.662234,
        },
        {
            name: "De Pinte",
            zipcode: "9840",
            appartment: 4085.753779,
            house: 2767.871932,
        },
        {
            name: "Nevele",
            zipcode: "9850",
            appartment: 2754.899,
            house: 2452.230,
        },
        {
            name: "Oosterzele",
            zipcode: "9860",
            appartment: 2145.197,
            house: 1903.230,
        },
        {
            name: "Machelen",
            zipcode: "9870",
            appartment: 2039.402,
            house: 1583.220,
        },
        {
            name: "Zulte",
            zipcode: "9870",
            appartment: 2249.617098,
            house: 1660.632771,
        },
        {
            name: "Aalter",
            zipcode: "9880",
            appartment: 2715.56667,
            house: 1727.962611,
        },
        {
            name: "Gavere",
            zipcode: "9890",
            appartment: 2254.38,
            house: 2810.121,
        },
        {
            name: "Eeklo",
            zipcode: "9900",
            appartment: 2427.01653,
            house: 1616.476611,
        },
        {
            name: "Knesselare",
            zipcode: "9910",
            appartment: 2371.562,
            house: 1798.230,
        },
        {
            name: "Lovendegem",
            zipcode: "9920",
            appartment: 1743.38,
            house: 1289.210,
        },
        {
            name: "Zomergem",
            zipcode: "9930",
            appartment: 2566.816095,
            house: 1609.966861,
        },
        {
            name: "Evergem",
            zipcode: "9940",
            appartment: 2842.407249,
            house: 1902.049165,
        },
        {
            name: "Waarschoot",
            zipcode: "9950",
            appartment: 2862.753399,
            house: 993.4819859,
        },
        {
            name: "Assenede",
            zipcode: "9960",
            appartment: 2257.841,
            house: 2002.320,
        },
        {
            name: "Kaprijke",
            zipcode: "9970",
            appartment: 1996.877,
            house: 1721.210,
        },
        {
            name: "Sint-Laureins",
            zipcode: "9980",
            appartment: 2822.639818,
            house: 1334.99377,
        },
        {
            name: "Maldegem",
            zipcode: "9990",
            appartment: 2590.142069,
            house: 1738.406956,
        }
    ]
    const [cityPriceMap, setCityPriceMap] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState<string>("price");
    const [cityAndPricesData, setCityAndPricesData] = useState(citiesData)
    const [updatesearch, setCity] = useState([]);
    const [textToSearch, setTextToSearch] = useState("")
    const [selectedCity, setSelectedCity] = useState(false)
    const [markers, setMarkers] = useState([]);
    const [prices, setPrices] = useState({
        name: "",
        zipcode: "",
        appartment: 0,
        house: 0,
    })




    const gotoCityData = (index) => {
        let getObj = cityAndPricesData[index]
        setPrices(getObj)
        setCityPriceMap(!cityPriceMap)

    }
    useEffect(() => {

    }, [cityAndPricesData])

    const mapProps = {
        markers: markers,
    };


    useEffect(() => {
        const citydata = citiesData;
        const inputValue = textToSearch.trim().toLowerCase();
        const inputLength = inputValue.length;
        const fitertUser = inputLength === 0 ? [] : citydata.filter(city =>
            (city.name.toLowerCase().slice(0, inputLength) === inputValue || city.zipcode.toLowerCase().slice(0, inputLength) === inputValue)
        );
        setCity(fitertUser)
    }, [textToSearch])

    const switchTab = (name: string) => {
        setActiveTab(name);
    };

    const progressBarStyle = {
        height: "5px"
    }

    const onSuggesstionClick = (index) => {
        const cityName = updatesearch[index].name
        const zipcode = updatesearch[index].zipcode
        const _provinces = province as any
        const getRegion = _provinces?.default?.features.find(feature => feature.properties.NAME_4.toLocaleLowerCase() === cityName.toLocaleLowerCase())
        const region = getRegion.geometry.coordinates[0]
        const boundries = region[0]
        const getLatLong = boundries[0]
        const position = {
            type: "home",
            position: {
                lat: getLatLong[0],
                lng: getLatLong[1],
            },
            id: "home",
        }
        setMarkers([{ ...position }])
        setTextToSearch(cityName + ' ' + zipcode)
        setSelectedCity(true)
        setCity([])
    }




    const filterCities = (value) => {
        setSelectedCity(false)
        setTextToSearch(value)

    }


    return (
        <>
            <HeaderContainer title="price pam" />
            <div className=" price-map-main">
                <div className="search-area d-flex mb-3">
                    <input type="search" value={textToSearch} onChange={(el) => filterCities(el.target.value)} placeholder="Ex : “10 rue dy Chateau”, “Paris 15”, “69002”..." />
                    <ListGroup as="ul" id="navbar-example2" className="position-absolute" style={{ marginTop: "45px", width: "calc(48.533% - 58px)" }}>

                        {!selectedCity && updatesearch.map((cityData, index) => {
                            return (
                                <ListGroup.Item key={index} as="li" style={{ cursor: 'pointer' }} onClick={() => onSuggesstionClick(index)}><a className="text-dark" href={"#" + cityData.name}>{cityData.name} {cityData.zipcode}</a></ListGroup.Item>
                            )
                        })}
                    </ListGroup>

                    <Button className="search-button"  > <img src={SearchImage} alt="SearchImage" /> </Button>
                </div>
                <div className="pricr-map-setting d-flex" >
                    <div className="price-content-view">

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
                                                        <span>Appartment</span>
                                                    </div>
                                                </div>
                                                <div className="prices-block ">
                                                    <span> {activeTab === "price" ? "Prix m2 moyen" : "Loyer mensuel"} </span>
                                                    <p> {activeTab === "price" ? prices.house.toFixed(2) : prices.house.toFixed(2)} € </p>
                                                    <span className="price">{activeTab === "price" ? "de 1 789 € à 4 041 €" : "de 1 289 € à 4 041 €"} </span>

                                                    <span >Indice de cinfiance</span>
                                                    <span><p style={{ paddingTop: "10px", fontSize: "14px", lineHeight: "19px", fontWeight: 400, color: "var(--colorGrayTwo)" }}>Indice de cinfiance</p></span>
                                                    <ProgressBar now={60} variant="warning" min={0} max={100} style={progressBarStyle} />
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center main-block">
                                                <div className="text-center home-type" >
                                                    <div>
                                                        <img src={HomeownerIcon} alt="HomeownerIcon" /><br></br>
                                                        <span>House</span>
                                                    </div>

                                                </div>
                                                <div className="prices-block">
                                                    <span> {activeTab === "price" ? "Prix m2 moyen" : "Loyer mensuel"} </span>
                                                    <p> {activeTab === "price" ? prices.appartment.toFixed(2) : prices.appartment.toFixed(2)} € </p>
                                                    <span className="price">{activeTab === "price" ? "de 1 789 € à 4 041 €" : "de 1 289 € à 4 041 €"} </span>
                                                    <span><p style={{ paddingTop: "10px", fontSize: "14px", lineHeight: "19px", fontWeight: 400, color: "var(--colorGrayTwo)" }}>Indice de cinfiance</p></span>
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
                            <div className="city-price-block">
                                <p>Le prix du m² dans les grandes villes de France</p>

                                <Table cellSpacing="0" cellPadding="1" width="300">

                                    <thead>
                                        <tr>
                                            <th>Ville</th>
                                            <th>Prix m² moyen appartement</th>
                                            <th>Prix m² moyen maison</th>
                                        </tr>
                                    </thead>
                                    <tbody data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0" className="scrollspy-example" >
                                        {cityAndPricesData.map((city, index) => {
                                            return (
                                                <tr id={city.name} key={index} onClick={() => gotoCityData(index)}>
                                                    <td className="city-name" style={{ textAlign: "left" }}>{city.name} {city.zipcode}</td>
                                                    <td>{city.appartment.toFixed(2)}</td>
                                                    <td>{city.house.toFixed(2)}</td>
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
                            <GoogleMap {...mapProps} />
                        </CustomScrollbar>
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