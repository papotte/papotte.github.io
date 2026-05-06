import type { ContentfulData } from '@/model';

const locales = 'en-US';
const localeOptions: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: 'short',
};

export async function TransformData<T extends ContentfulData>({ fields: contentfulData }: any): Promise<T> {
	const resultingData = { ...contentfulData };
	delete (resultingData as { location?: unknown }).location;

	if (contentfulData?.startDate) {
		resultingData.startDate = new Date(contentfulData.startDate);
		resultingData.start = resultingData.startDate.toLocaleDateString(locales, localeOptions);
	}
	if (contentfulData?.endDate) {
		resultingData.endDate = new Date(contentfulData.endDate);
		resultingData.end = resultingData.endDate.toLocaleDateString(locales, localeOptions);
	}
	if (contentfulData?.avatar) {
		resultingData.avatar = contentfulData.avatar?.fields?.file.url;
	}
	return resultingData;
}
