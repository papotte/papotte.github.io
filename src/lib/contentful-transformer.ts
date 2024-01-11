import { Geolocator } from '@lib/geolocation';
import NodeGeolocation from 'nodejs-geolocation';

import type { ContentfulData } from '@/model';

const locales = 'en-US';
const localeOptions: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: 'short',
};

export const dataTransformer = (gelocator: Geolocator) => {
	return async <T extends ContentfulData>({ fields: contentfulData }: any): Promise<T> => {
		const resultingData = { ...contentfulData };
		if (contentfulData?.startDate) {
			resultingData.startDate = new Date(contentfulData.startDate);
			resultingData.start = resultingData.startDate.toLocaleDateString(locales, localeOptions);
		}
		if (contentfulData?.endDate) {
			resultingData.endDate = new Date(contentfulData.endDate);
			resultingData.end = resultingData.endDate.toLocaleDateString(locales, localeOptions);
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
