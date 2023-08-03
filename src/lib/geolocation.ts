import NodeGeolocation from 'nodejs-geolocation';

import type { Address } from '@/model';

type Position = { lat: number; lon: number };
const geo = new NodeGeolocation('Geolocation');

geo.geocodingOptions = {
	service: 'Nominatim',
	key: '',
};
export const Geolocation = {
	getAddress: async ({ lat, lon }: Position): Promise<Address> => {
		const { address } = await geo.getReverseGeocoding({ lat, lon });
		address.city =
			address.city?.replace('Perímetro Urbano ', '') || address.municipality || address.town || address.village;
		return address;
	},
};
