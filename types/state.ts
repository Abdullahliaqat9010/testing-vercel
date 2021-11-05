export interface RootState {
	modals: {
		showAgentModal: boolean;
		showSuccessModal: boolean;
		needVerifyEmailModal: boolean;
		remindPasswordModal: boolean;
		changePasswordModal: boolean;
		error: string;
	};
	userInfo: {
		auth: boolean;
		email_verified: boolean;
		id: null | Number;
		firstname: string;
		lastname: string;
		email: string;
		phone_number: string;
		account_type: string;
		t_c: boolean;
		promo_mailing: boolean;
		avatar: string;
	};
	stepsInfo: {
		mainBlocks: boolean;
		goToDashboard: boolean;
		propertyId?: number;
		stepBlock: {
			step: number;
			title: string;
			addressFromStepOne: string;
			additionalAddress: {
				street: string;
				number: string;
				zip: string;
				locality: string;
				country: string;
				city: string;
			};
			selectedProperty: string;
			propertyDetails: {
				livingArea: string;
				landSurface: string;
				numberBedrooms: number;
				facadesNumber: number;
				numberBathrooms: number;
				numberLevels: number;
				numberFloors: number;
				gardenTerrasValue: number;
				elevator: number;
			};
			details: {
				prestige: string;
				condition: string;
				constructionYear: string | number;
				renovationYear: string | number;
				renovationLevel: string;
			};
			utilities: {
				epc: string | number;
				view: "normal" | "enclosed" | "good" | "unique";
				orientation: "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";
				atticValue: string | number;
				cellarValue: string | number;
				elevator: boolean;
				swimmingPool: boolean;
				indoorGarage: number;
				indoorGarageCheck: boolean;
				outdoorGarage: number;
				outdoorGarageCheck: boolean;
				carport: number;
				carportCheck: boolean;
				parking: boolean;
				solarPanels: number;
			};
			personalAccount: {
				accountType: string;
				selectedItem: string;
				selectedResidence: string;
				sellProperty: string;
				howSell: string;
				estimationReason: string;
			};
			location: {
				lat: number | null;
				lng: number | null;
			};
			userData: {
				firstName: string;
				lastName: string;
				email: string;
				password: string;
				promotions: boolean;
				agreement: boolean;
			};
		};
		dataFromMapBox: any; //todo add types
		errors: string;
	};
	agency: {
		agencyInfoList: {
			name: string;
			place_id: string;
			rating: number;
			user_ratings_total: number;
		}[];
		agencyCountPropertiesList: {
			countSold: string;
			company_name: string;
		}[];
		agencySimilarPropertiesList: {
			estates: any[]; //todo add current interface
			name: string;
		}[];
		error: string;
	};
	property: {
		mainPropertyId: number;
	};
}
