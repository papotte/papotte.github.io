import type NodeGeolocation from 'nodejs-geolocation';
import type { ReverseGeocodingData } from 'nodejs-geolocation';
import { describe, expect, test } from 'vitest';

import { Geolocator } from './geolocation';

const withReverseGeocoding: (_x: Partial<ReverseGeocodingData>) => NodeGeolocation = (x) =>
	({
		getReverseGeocoding: () => Promise.resolve({ address: x }),
	}) as unknown as NodeGeolocation;

describe('transform data from NodeGeolocation to Address', () => {
	const getGeolocator = (x: Partial<ReverseGeocodingData>) => new Geolocator(withReverseGeocoding(x));

	test('should simplify city names', async () => {
		const geoFn = getGeolocator({
			city: 'Perímetro Urbano Barranquilla',
		});

		const result = await geoFn.getAddress({ lat: 11.0041, lon: -74.8069 });
		expect(result.city).eq('Barranquilla');
	});

	test('should use municipality if city is not defined', async () => {
		const geoFn = getGeolocator({
			municipality: 'Wiesbaden',
		});

		const result = await geoFn.getAddress({ lat: 11.0041, lon: -74.8069 });
		expect(result.city).eq('Wiesbaden');
	});

	test('should use town if city and municipality are not defined', async () => {
		const geoFn = getGeolocator({
			town: 'Supertown',
			village: 'Smurf Village',
		});

		const result = await geoFn.getAddress({ lat: 11.0041, lon: -74.8069 });
		expect(result.city).eq('Supertown');
	});

	test('should use village if city, municipality and town are not defined', async () => {
		const geoFn = getGeolocator({
			village: 'Smurf Village',
		});

		const result = await geoFn.getAddress({ lat: 11.0041, lon: -74.8069 });
		expect(result.city).eq('Smurf Village');
	});
});
