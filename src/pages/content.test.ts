import { afterAll, describe, expect, it, vi } from 'vitest';

import type { PersonalData } from '@/model';

import * as content from './content';

vi.mock('@lib/contentful', () => ({
	getPersonalData: vi.fn().mockReturnValue(
		Promise.resolve({
			displayName: 'Test',
			contact: {
				email: 'test@info.com',
			},
		} as PersonalData)
	),
}));

describe('content', () => {
	afterAll(() => {
		vi.resetAllMocks();
	});
	it('should fetch personal data', async () => {
		expect(content.name).toEqual('Test');
		expect(content.contactInfo.email).toEqual('test@info.com');
		expect(content.contact.length).toEqual(1);
		expect(content.contact[0].source).toEqual('test@info.com');
	});
});
