import { TransformData } from '@lib/contentful-transformer';
import { describe, expect, test } from 'vitest';

import type { AvatarEntity, DatedEntity } from '@/model';

describe('contentful-transformer', () => {
	test('strips location from transformed fields', async () => {
		const input = {
			fields: {
				name: 'Test',
				location: {
					lat: 52.52,
					lon: 13.40495,
					city: 'Berlin',
				},
			},
		};

		const result = await TransformData<{ name?: string; location?: unknown }>(input);
		expect(result).not.toHaveProperty('location');
		expect(result.name).eq('Test');
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
