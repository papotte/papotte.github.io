import { formatLongMonthYear } from '@lib/date';

import type { ContentfulData } from '@/model';

export async function TransformData<T extends ContentfulData>({ fields: contentfulData }: any): Promise<T> {
	const resultingData = { ...contentfulData };
	delete (resultingData as { location?: unknown }).location;

	if (contentfulData?.startDate) {
		resultingData.startDate = new Date(contentfulData.startDate);
		resultingData.start = formatLongMonthYear(resultingData.startDate);
	}
	if (contentfulData?.endDate) {
		resultingData.endDate = new Date(contentfulData.endDate);
		resultingData.end = formatLongMonthYear(resultingData.endDate);
	}
	if (contentfulData?.avatar) {
		resultingData.avatar = contentfulData.avatar?.fields?.file.url;
	}
	return resultingData;
}
