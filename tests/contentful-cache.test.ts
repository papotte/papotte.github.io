import { __resetContentfulCache, getPersonalData } from '@lib/contentful';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import type { ContentfulEntity, PersonalData } from '@/model';

import response from './contentful.mock.json';

const getEntries = vi.fn();

vi.mock('contentful', () => ({
	createClient: vi.fn(() => ({
		getEntries,
	})),
}));

const mockResponse = () => ({
	items: [response as unknown as ContentfulEntity<PersonalData>],
});

describe('getPersonalData cache wrapper', () => {
	beforeEach(() => {
		__resetContentfulCache();
		getEntries.mockReset();
		vi.stubEnv('CONTENTFUL_SPACE_ID', 'test-space');
		vi.stubEnv('CONTENTFUL_PREVIEW_TOKEN', 'preview-token');
		vi.stubEnv('CONTENTFUL_DELIVERY_TOKEN', 'delivery-token');
		vi.stubEnv('NAME', 'Test Name');
	});

	afterEach(() => {
		vi.unstubAllEnvs();
	});

	test('first call fetches from contentful and populates the cache', async () => {
		getEntries.mockResolvedValueOnce(mockResponse());

		const result = await getPersonalData();

		expect(getEntries).toHaveBeenCalledTimes(1);
		expect(result.title).toEqual('Product-Focused Software Engineer');
	});

	test('returns the cached value when the live fetch fails', async () => {
		getEntries.mockResolvedValueOnce(mockResponse());
		const first = await getPersonalData();

		getEntries.mockRejectedValueOnce(new Error('network down'));
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

		const second = await getPersonalData();

		expect(getEntries).toHaveBeenCalledTimes(2);
		expect(second).toBe(first);
		expect(warnSpy).toHaveBeenCalled();

		warnSpy.mockRestore();
	});

	test('rethrows when there is no cache and the fetch fails', async () => {
		getEntries.mockRejectedValueOnce(new Error('network down'));

		await expect(getPersonalData()).rejects.toThrow('network down');
	});

	test('refreshes the cache after a successful refetch', async () => {
		getEntries.mockResolvedValueOnce(mockResponse());
		const first = await getPersonalData();

		const updated = JSON.parse(JSON.stringify(response));
		updated.fields.title = 'Updated Title';
		getEntries.mockResolvedValueOnce({
			items: [updated as unknown as ContentfulEntity<PersonalData>],
		});

		const second = await getPersonalData();

		expect(getEntries).toHaveBeenCalledTimes(2);
		expect(second.title).toEqual('Updated Title');
		expect(first.title).toEqual('Product-Focused Software Engineer');
	});
});
