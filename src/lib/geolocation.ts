/* eslint-disable @typescript-eslint/no-explicit-any */
import NodeGeolocation from 'nodejs-geolocation';

type Position = { lat: number; lon: number };
const geo = new NodeGeolocation('Geolocation');

geo.geocodingOptions = {
	service: 'Nominatim',
	key: '',
};
export const Geolocation = {
	getAddress: async ({ lat, lon }: Position): Promise<any> => {
		const { address } = await geo.getReverseGeocoding({ lat, lon });
		return address;
	},
};
