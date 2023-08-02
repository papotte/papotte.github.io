import type { Address } from './Address';
import type { Contact } from './Contact';
import type { Education } from './Education';
import type { Interests } from './Interests';
import type { JobExperience } from './JobExperience';
import type { Language } from './Language';
import type { SocialMedia } from './SocialMedia';
import type { TechnicalSkills } from './TechnicalSkills';

export interface PersonalData {
	name: string;
	displayName: string;
	pronouns: string;
	website: string;
	email: string;
	tagline: string;
	title: string;
	bio: string;
	avatar: string;
	address: Address;
	contact: Contact;
	experience: JobExperience[];
	education: Education[];
	languages: Language[];
	skills: TechnicalSkills[];
	interests: Interests[];
	socialMedia: SocialMedia;
}
