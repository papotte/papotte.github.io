import { TransformData, dataTransformer } from '@lib/contentful-transformer';
import type { Geolocator } from '@lib/geolocation';
import { describe, expect, test } from 'vitest';

import type { Address, AvatarEntity, DatedEntity, LocatedEntity, Position } from '@/model';

const fakeGeolocatorWith: (x: Partial<Address>) => Geolocator = (x) =>
	({
		getAddress: async (_position: Position): Promise<Address> => {
			return x as Address;
		},
	}) as unknown as Geolocator;

describe('contentful-transformer', () => {
	test('Transform location', async () => {
		const input = {
			fields: {
				location: {
					lat: 52.52,
					lon: 13.40495,
				},
			},
		};

		const result = await dataTransformer(fakeGeolocatorWith({ city: 'Test City' }))<LocatedEntity>(input);

		expect(result.location?.city).eq('Test City');
	});

	test('Transform start date', async () => {
		const input = {
			fields: {
				startDate: '2020-01-01',
			},
		};

		const result = await TransformData<DatedEntity>(input);

		expect(result.startDate).toBeInstanceOf(Date);

		expect(result.start).eq('Jan 2020');
	});
	test('Transform end date', async () => {
		const input = {
			fields: {
				endDate: '2022-01-01',
			},
		};

		const result = await TransformData<DatedEntity>(input);

		expect(result.endDate).toBeInstanceOf(Date);

		expect(result.end).eq('Jan 2022');
	});

	test('Transform avatar', async () => {
		const input = {
			fields: {
				avatar: {
					fields: {
						file: {
							url: 'test.png',
						},
					},
				},
			},
		};

		const result = await TransformData<AvatarEntity>(input);
		expect(result.avatar).eq('test.png');
	});
});
