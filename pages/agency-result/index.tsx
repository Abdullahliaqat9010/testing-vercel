import React, { useEffect, useState } from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HeaderContainer from "../../containers/Header";
import FooterContainer from "../../containers/Footer";
import { Button, InputGroup, FormControl, ListGroup } from "react-bootstrap";
import { Pagination } from "antd";
import goAhead from "../../assets/images/compare-agency/go-ahead.svg";
import reviewImage from "../../assets/images/compare-agency/reviews-image.png";
import locationImage from "../../assets/images/compare-agency/location-image.png";
import homeImage from "../../assets/images/compare-agency/home-image.png";
import compareAgencyImage from "../../assets/images/compare-agency/agency-main-page-image.jpg";
import StarRatingComponent from "react-star-rating-component";
import RatingStar from "../../assets/images/rating/full-star.svg";
import RatingStarEmpty from "../../assets/images/rating/star.svg";
import openArrow from "../../assets/images/compare-agency/open-arrow.svg";
import closeArrow from "../../assets/images/compare-agency/closed-arrow.svg";
import mapImage from "../../assets/images/compare-agency/map-image.png";
import blueStar from "../../assets/images/compare-agency/blue-star.svg";
import LogoImage from "../../assets/images/default-logo-image.png";
import Link from "next/link";
import BlueGoAhead from "../../assets/images/blue-goAhead.svg";
import ContactAgentModal from "../../containers/Modals/ContactAgentModal";
import { getAgenciesByAddress, getLimitedAgenciesByAddress } from "../../network-requests";
import Loading from "../../components/Loading"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../types/state";
import { getAutocompleteItemsAction, clearAutocompleteItems } from "../../actions";
import Mapbox3dMap from "../../components/3dMap"
import styled from "styled-components"
import { useRouter } from "next/router";


const LimitedPartner = styled.span`
	background: #FE7F2D;
	border-radius: 8px;
	padding: 4px;
	font-size: 12px;
	line-height: 16px;
	text-align: center;
	color: #FFFFFF;
	width :100px
`;
const compareAgency = () => {
	const router = useRouter()

	const [isLoading, setIsLoading] = useState(true);
	let address = JSON.parse(localStorage.getItem("address"))
	const [open, setOpen] = useState<boolean>(false);
	const [openContactForm, setOpenContactForm] = useState<boolean>(false);
	const [selctedIdex, setSelctedIdex] = useState(-1);
	const [filteredAgencies, setFiltereAgencies] = useState([])
	const [currentPage, setCurrentPage] = useState(1);
	const [markersPerAgency, setMarkersPerAgency] = useState([])
	const [totalPages, setTotalPages] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [activeMarker, setActiveMarker] = useState<string | number>("home");
	const [markers, setMarkers] = useState([
		{
			type: "home",
			position: {
				lat: 4.402771,
				lng: 51.260197,
			},
			id: "home",
		}
	]);
	const dispatch = useDispatch()
	const [value, setValue] = useState("");
	const [dataInfo, setData] = useState({});
	
	if (dataInfo) {
		address = dataInfo
	}
	const { dataFromMapBox } = useSelector((state: RootState) => state.stepsInfo);
	useEffect(() => {
		fetchAll()
	}, [dataInfo])

	const fetchAll = async () => {
		try {
			setIsLoading(true);
			const promises = [getAgencies()];
			await Promise.all(promises);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};
	// const getLimitedAgencies = async () => {
	// 	try {
	// 		const limitedAgecies = await getLimitedAgenciesByAddress(address)

	// 		setLimitedAgencies(limitedAgecies)
	// 		const agenciesMarkes = limitedAgecies.map(agency => {
	// 			const agnecyMarker = {
	// 				type: "agency",
	// 				position: {
	// 					lat: agency?.lat ?? 4.402771,
	// 					lng: agency?.lng ?? 51.260197,
	// 				},
	// 				id: agency?.id,
	// 			}
	// 			const agencyProperties = agency?.properties ?? []
	// 			const markersOfAgency = agencyProperties?.map(property => {
	// 				let marker = {
	// 					type: "property",
	// 					position: {
	// 						lat: property?.lat,
	// 						lng: property?.lng,
	// 					},
	// 					id: property?.id,
	// 				}
	// 				return marker
	// 			})
	// 			return {
	// 				agencyId: agency?.id,
	// 				markers: markersOfAgency.unshift(agnecyMarker)
	// 			}
	// 		})
	// 		setMarkersPerLimitedAgency(agenciesMarkes)

	// 		// 
	// 	} catch (error) {
	// 		console.log(error)
	// 	}

	// }

	const getAgencies = async () => {
		try {
			const agencies = await getAgenciesByAddress(address)
			const limitedAgecies = await getLimitedAgenciesByAddress(address)
			const allAgency = [...agencies, ...limitedAgecies]
			const totalPages = allAgency.length > pageSize ? Math.ceil(allAgency.length / allAgency.length) : 1
			setTotalPages(totalPages)
			setFiltereAgencies(allAgency)
			const agenciesMarkes = allAgency.map(agency => {
				const agnecyMarker = {
					type: "agency",
					position: {
						lat: agency?.lat ?? 4.402771,
						lng: agency?.lng ?? 51.260197,
					},
					id: agency?.id,
				}
				const agencyProperties = agency?.properties ?? []
				const markersOfAgency = agencyProperties.length > 0 && agencyProperties?.map(property => {
					let marker = {
						type: "property",
						position: {
							lat: property?.lat,
							lng: property?.lng,
						},
						id: property?.id,
					}
					return marker
				})
				return {
					agencyId: agency?.id,
					markers: markersOfAgency?.length > 0 ? markersOfAgency.unshift(agnecyMarker) : [agnecyMarker]
				}
			})
			setMarkersPerAgency(agenciesMarkes)

		} catch (error) {
			console.log(error)
		}

	}



	const mapProps = {
		markers: [...markers],
		is3d: false,
		onActiveMarker: (id) => onClickProperty(id),
	};

	const onClickProperty = (propertyId) => {

		setMarkers([]);
	};




	const handleAutocomplete = (el: React.ChangeEvent<HTMLInputElement>) => {
		setValue(el.target.value);
		if (el.target.value.length > 0) {
			dispatch(getAutocompleteItemsAction(el.target.value, el.target.name));
		} else {
			dispatch(clearAutocompleteItems());
		}
	};

	const handleSelectAddress = (addressId: string) => {
		const [currentAddress] = dataFromMapBox.filter(
			(list) => list.id === addressId
		);
		const addressDeStructure = 
		currentAddress.locality.length > 1 ? currentAddress.locality : currentAddress.place+ "," +currentAddress.postcode;
		setValue(addressDeStructure);

		const dataForNextStep = {
			locality:
				currentAddress.locality.length > 1
					? currentAddress.locality
					: currentAddress.place,
			number: currentAddress.number,
			street: currentAddress.street,
			zip: currentAddress.postcode,
			country: currentAddress.country,
		};
		localStorage.setItem("address", JSON.stringify(dataForNextStep))

		setData({ ...dataForNextStep });
		dispatch(clearAutocompleteItems());
	};

	const openDetail = (index) => {
		if (selctedIdex !== index) {
			const expandedAgency = filteredAgencies[index]
			const markersOfAgency = markersPerAgency?.find(agency => agency?.agencyId === expandedAgency?.id)
			setMarkers(markersOfAgency?.markers ?? [])
			setOpen(true);
			setSelctedIdex(index);
		}
		else {
			setOpen(false);
		}
	};

	const goToDetailPage = (index) => {
		const agency = filteredAgencies[index]
		router.push( (agency?.isLimited ? "limited-agency/" : "registered-agency/") + agency?.id)
	}

	const closeContactForm = () => {
		setOpenContactForm(!openContactForm);
	};
	if (isLoading) {
		return <Loading />;
	}
	return (
		<>
			<HeaderContainer title="compare agency result" />
			<div className=" w-100 compare-agency-result">
				<div className="imageContanter d-flex">
					<img
						className="main-image"
						src={compareAgencyImage}
						alt="compareAgencyImage"
					/>
				</div>
				<div className="agency-result-container justify-content-center">
					<div className="result-agency">
						<p>
							We analyze thousands of local agents and find the best to compete
							you!
						</p>
						<div className="search-form d-flex">
							<div className="d-flex flex-collumn">
								<InputGroup>
									<FormControl
										placeholder="  City and State or ZIP"
										name="address"
										onChange={handleAutocomplete}
										value={value}
										autoComplete="off"
									/>
								</InputGroup>
								{dataFromMapBox.length > 0 && (
									<ListGroup as="ul" className="position-absolute" style={{ marginTop: "50px", width: "210px" }}>
										{dataFromMapBox.map((item, index) => (
											<ListGroup.Item className='text-dark' as="li" onClick={() => handleSelectAddress(item.id)} key={index} style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
												{item.locality.length > 0 ? item.locality : item.place + "," + item.postcode}
											</ListGroup.Item>
										))}
									</ListGroup>
								)}
							</div>
							{/* <input type="search" onChange={(e) => fiterAgencies(e.target.value)} placeholder="Search by name"></input> */}
							<Button>
								Search <img src={goAhead} alt="goAhead" />
							</Button>
						</div>
					</div>
					<div className="agency-container">
						{filteredAgencies?.length &&
							filteredAgencies.map((agency, index) => {
								return (
									<div key={index}>
										<div onClick={() => openDetail(index)} className="agency d-flex">
											<div className="image-bassicInfo ">
												<img src={agency?.isLimited ? LogoImage : agency.logo_image} alt="reviewImage" />
												<div className="agency-basicInfo">
													<span className="agency-name">{agency.company_name}</span>
													<p className="rating-row">
														{" "}
														<span className="rating"> 5.6 </span>
														<StarRatingComponent
															name="rate"
															renderStarIcon={(index, value) => (
																<img
																	className="rating-star"
																	src={
																		index <= value
																			? RatingStar
																			: RatingStarEmpty
																	}
																	alt={"RatingStar" + index}
																/>
															)}
															starCount={5}
															value={Number(4)}
														/>{" "}
														<span className="from-totla-reviews ">
															{" "}
															from 120 reviews{" "}
														</span>
													</p>
													{agency?.isLimited && open && selctedIdex === index && (

														<LimitedPartner>Limited Partner</LimitedPartner>
													)}
												</div>
											</div>
											<div className="  sold-by-agency justify-content-between">
												{agency.properties > 0 || agency?.properties_sale > 0? (
													<p>
														<span className="noof-sold"> {agency?.isLimited ? agency?.properties_sale : agency.properties.length} </span>{" "}
														<span className="sold-title">
															Recent sales nearby
														</span>
													</p>
												) : (
													<p className="no-sold-properties">
														No information available
													</p>
												)}
												<img

													src={
														open && selctedIdex === index
															? closeArrow
															: openArrow
													}
													alt="arrows"
												/>
											</div>
										</div>

										{open && selctedIdex === index && (
											<div key={index} className="aency-detail-container">
												<div className="agency-detail-container-left">
													{!agency?.isLimited && (
														<div className="agency-owner-box">
															<img src={mapImage} alt="mapImage" />
															<div>
																<p className="agent-name">{agency.owner?.firstname}</p>
																<p className="agent-title">agency owner</p>
															</div>
														</div>)
													}
													<p className="agency-description">
														During the last 24 months, our agency has sold 39
														properties nearby including 18 similar to yours. Our
														team is at your disposal to manage your project
													</p>
													<Button onClick={()=>  agency?.isLimited ? goToDetailPage(index) : closeContactForm}>
														{agency?.isLimited ? "Agency details" : "Contact Thierry"}
													</Button>
													{!agency?.isLimited && (
														<div className="d-flex">
															<Button onClick={()=> goToDetailPage(index)}>Agency details 
															<img
																className=""
																src={BlueGoAhead}
																alt="BlueGoAhead"
															/>
															</Button>{" "}
															
														</div>
													)}
												</div>
												<div className="agency-map-container">
													<Mapbox3dMap {...mapProps} />
													<div className="map-description">
														<p>
															{" "}
															<span></span> Properties sold by the agency{" "}
														</p>
														<p>
															{" "}
															<img
																className="blue-star"
																src={blueStar}
																alt="blueStar"
															/>{" "}
															agency{" "}
														</p>
													</div>
												</div>
											</div>
										)}
									</div>
								);
							})}

						<div className="w-100 justify-content-center text-center">
							<Pagination
								current={currentPage}
								total={totalPages}
								pageSize={pageSize}
								onChange={(page, _pageSize) => {
									setCurrentPage(page);
									setPageSize(_pageSize);
								}}
								pageSizeOptions={["5", "10", "20", "50"]}
							/>
							{/* <Button   className="load-more">
								<img src={loadMore} alt="loadMore" /> load more{" "}
							</Button> */}
						</div>
					</div>
				</div>
			</div>
			{openContactForm && (
				<ContactAgentModal
					show={true}
					onClose={() => setOpenContactForm(false)}
					// properties={properties}
					agencyOwner={filteredAgencies[selctedIdex]?.owner?.name}
					agencyName={filteredAgencies[selctedIdex]?.company_name}
					agencyId={filteredAgencies[selctedIdex]?.id}
				/>
			)}
			{/* <FooterContainer/> */}
		</>
	);
};

export const getServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale, [
				"dashboard-page",
				"header",
				"footer",
			])),
		},
	};
};

export default compareAgency;
