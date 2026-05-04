import { IconMap, buttonColorLookup } from '@lib/style-helper';
import { expect, it } from 'vitest';

it('should have button styles', () => {
	expect(buttonColorLookup).toBeDefined();
	expect(buttonColorLookup.primary).toMatch('badge-primary');
	expect(buttonColorLookup.accent).toMatch('badge-accent');
	expect(buttonColorLookup.blue).toMatch('badge-info');
	expect(buttonColorLookup.red).toMatch('badge-error');
});

it('should have icon map', () => {
	expect(IconMap).toBeDefined();
	expect(IconMap.Email).toBeDefined();
	expect(IconMap.phone).toBeDefined();
	expect(IconMap.website).toBeDefined();
	expect(IconMap.github).toBeDefined();
	expect(IconMap.linkedin).toBeDefined();
	expect(IconMap.facebook).toBeDefined();
	expect(IconMap.twitter).toBeDefined();
	expect(IconMap.instagram).toBeDefined();
	expect(IconMap.telegram).toBeDefined();
});
