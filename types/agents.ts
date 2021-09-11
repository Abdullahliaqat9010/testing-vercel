import { Tracing } from "trace_events";

export interface AgentsItem {
	id: number;
	title: string;
	tag: string;
	url: string;
	agencyAddress: string;
	location: {
		lat: number;
		lng: number;
	};
	place_id?: string;
	rate?: string;
	reviews?: string;
	logo: string;
	logoMobile: string;
	email: string;
	schedule: string;
	website: string;
	phone: string;
	count: number;
	moreInfo: {
		agentName: string;
		agentSurname: string;
		position: string;
		avatar: string;
		desc: string;
	};
}

export interface AgencyProps {
	nearest: number | undefined;
	agency: {
		id: number;
		title: string;
		tag: string;
		agencyAddress: string;
		url: string;
		location: {
			lat: number;
			lng: number;
		};
		rate?: string;
		reviews?: string;
		place_id?: string;
		logo: string;
		logoMobile: string;
		count: number;
		email: string;
		moreInfo: {
			agentName: string;
			agentSurname: string;
			position: string;
			avatar: string;
			desc: string;
		};
	};
	mainProperty: any;
	properties: any[];
}
