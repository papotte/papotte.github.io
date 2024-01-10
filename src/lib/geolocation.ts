import type NodeGeolocation from 'nodejs-geolocation';

import type { Address, Position } from '@/model';

export class Geolocator {
	constructor(private readonly geolocationService: NodeGeolocation) {
		geolocationService.geocodingOptions = {
			service: 'Nominatim',
			key: '',
		};
	}

	public async getAddress({ lat, lon }: Position): Promise<Address> {
		const { address } = await this.geolocationService.getReverseGeocoding({ lat, lon });
		address.city =
			address.city?.replace('Perímetro Urbano ', '') || address.municipality || address.town || address.village;
		return address;
	}
}
