import { getPersonalData } from '@lib/contentful';

import type { PersonalData } from '@/model';

console.log('[Content] Starting to fetch personal data...');
const fetchStart = Date.now();
const personalData: PersonalData = await getPersonalData();
console.log(`[Content] Personal data fetched successfully in ${Date.now() - fetchStart}ms`);

// Personal Information --> #hero section
export const name = personalData.displayName;
export const contactInfo = personalData.contact;
export const designation = personalData.title;
export const location = personalData.location;
export const pronouns = personalData.pronouns;
export const website = personalData.website;
export const avatar = personalData.avatar;

export const data = personalData;

// About
export const about = personalData.bio;
// Work Experience --> #work section
export const work = personalData.experience;

// Projects --> #project section
export const projects = personalData.projects;

// Education --> #education section
export const education = personalData.education;

// Contact --> #contact section
export const contact = [
	{
		source_name: 'Email',
		source: personalData.contact.email,
	},
];

export const socialLinks = personalData.socialMedia;

// Certifications --> #certificate section

export const certificates = [];

// Blogs --> #blogs section
export const blogs = [];

// Achievements --> #achievement section
export const achievements = [];

export const interests = personalData.interests;

export const skills = personalData.skills;

export const languages = personalData.languages;
