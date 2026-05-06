import { getPersonalData } from '@lib/contentful';

export async function getContent() {
	console.log('[Content] Loading personal data...');
	const fetchStart = Date.now();
	const personalData = await getPersonalData();
	console.log(`[Content] Personal data loaded in ${Date.now() - fetchStart}ms`);

	return {
		// Personal information --> #hero section
		name: personalData.displayName,
		contactInfo: personalData.contact,
		designation: personalData.title,
		pronouns: personalData.pronouns,
		website: personalData.website,
		avatar: personalData.avatar,
		data: personalData,

		// About
		about: personalData.bio,

		// Work Experience --> #work section
		work: personalData.experience,

		// Projects --> #project section
		projects: personalData.projects,

		// Education --> #education section
		education: personalData.education,

		// Contact --> #contact section
		contact: [
			{
				source_name: 'Email',
				source: personalData.contact.email,
			},
		],

		socialLinks: personalData.socialMedia,

		// Certifications --> #certificate section
		certificates: (personalData.credentials ?? []).map((item) => ({
			title: item.name,
			issued: '',
			org: '',
			description: item.description,
			url: '',
			icon: item.icon,
		})),

		// Blogs --> #blogs section
		blogs: [] as Array<{
			title: string;
			date: string;
			description: string;
			url: string;
			publisher: string;
		}>,

		// Achievements --> #achievement section
		achievements: [] as Array<{
			title: string;
			year: string;
			description: string;
		}>,

		interests: personalData.interests,
		capabilities: personalData.capabilities ?? [],
		credentials: personalData.credentials ?? [],
		technicalInterests: personalData.technicalInterests,
		skills: personalData.skills,
		languages: personalData.languages,
	};
}

export type Content = Awaited<ReturnType<typeof getContent>>;
