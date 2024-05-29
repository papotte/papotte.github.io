import 'dotenv/config';

const baseURL = 'GET https://api.linkedin.com/rest/memberSnapshotData?';
// Find domains here: https://learn.microsoft.com/en-us/linkedin/dma/member-data-portability/shared/snapshot-domain
const params = {
	q: 'criteria',
	domain: 'profile',
};
const token = process.env.LINKEDIN_ACCESS_TOKEN;
const headers = {
	'LinkedIn-Version': '202312',
	Authorization: `Bearer ${token}`,
};

const fetchData = async () => {
	const response = await fetch(baseURL + new URLSearchParams(params), {
		headers,
	});
	console.log(response);
};

fetchData();
