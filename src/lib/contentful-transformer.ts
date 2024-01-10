import { Geolocator } from '@lib/geolocation';
import NodeGeolocation from 'nodejs-geolocation';

import type { ContentfulData } from '@/model';

const locales = 'en-US';
const localeOptions: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: 'short',
};

export const dataTransformer = (gelocator: Geolocator) => {
	return async <T extends ContentfulData>(contentfulData: any): Promise<T> => {
		const resultingData = { ...contentfulData };
		if (contentfulData?.startDate) {
			resultingData.start = new Date(contentfulData.startDate).toLocaleDateString(locales, localeOptions);
			resultingData.startDate = new Date(contentfulData.startDate);
		}
		if (contentfulData?.endDate) {
			resultingData.end = new Date(contentfulData.endDate).toLocaleDateString(locales, localeOptions);
			resultingData.endDate = new Date(contentfulData.endDate);
		}
		if (contentfulData?.location) {
			resultingData.location = await gelocator.getAddress(contentfulData.location);
		}
		if (contentfulData?.avatar) {
			resultingData.avatar = contentfulData.avatar?.fields?.file.url;
		}
		return resultingData;
	};
};

const geolocator = new Geolocator(new NodeGeolocation('Geolocation'));

export const TransformData = dataTransformer(geolocator);
