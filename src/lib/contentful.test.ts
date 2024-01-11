import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';

import type { ContentfulEntity, PersonalData } from '@/model';

import { parseEntry, parseEntryPropArray, sortByFieldAsc } from './contentful';
import response from './contentful.mock.json';

vi.mock('@lib/geolocation');

describe('contentful', () => {
	let rawData: PersonalData;

	beforeAll(async () => {
		rawData = response.fields as unknown as PersonalData;
	});
	afterAll(() => {
		vi.resetAllMocks();
	});

	test('should parse basic data', async () => {
		const result = await parseEntry(response as unknown as ContentfulEntity<PersonalData>);

		expect(result.title).toEqual('Engineer');
		expect(result.avatar).toEqual('avatar.png');
		expect(result.experience).toHaveLength(1);
		expect(result.education).toHaveLength(2);
		expect(result.languages).toHaveLength(3);
		expect(result.skills).toHaveLength(1);
		expect(result.interests).toHaveLength(6);
		expect(result.projects).toHaveLength(1);
	});

	test('should parse experience', async () => {
		const experience = await parseEntryPropArray(rawData, 'experience');
		expect(experience[0].start).toEqual('Mar 2022');
	});

	test('should parse education', async () => {
		const education = await parseEntryPropArray(rawData, 'education');
		expect(education[0].start).toEqual('Oct 2015');
		expect(education[0].end).toEqual('Jul 2019');
	});

	test('should parse projects', async () => {
		const projects = await parseEntryPropArray(rawData, 'projects');
		expect(projects[0].start).toEqual('Feb 2011');
		expect(projects[0].end).toEqual('Dec 2013');
	});

	test('should sort by custom field', async () => {
		const objectToSort = [
			{ name: 'a', value: 5 },
			{ name: 'b', value: 3 },
			{ name: 'c', value: 7 },
		];

		const result = objectToSort.sort(sortByFieldAsc('value'));
		expect(result[0].name).toEqual('c');
	});

	test('should return error when data is undefined', async () => {
		await expect(
			parseEntry({
				fields: undefined,
			})
		).rejects.toThrowError('Personal data not found');
	});
});
