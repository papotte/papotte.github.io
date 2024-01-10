import type { Contact } from './Contact';
import type { Education } from './Education';
import type { Interests } from './Interests';
import type { JobExperience } from './JobExperience';
import type { Language } from './Language';
import type { Project } from './Project';
import type { SocialMedia } from './SocialMedia';
import type { TechnicalSkills } from './TechnicalSkills';
import type { AvatarEntity, LocatedEntity } from './common';

export interface PersonalData extends LocatedEntity, AvatarEntity {
	name: string;
	displayName: string;
	pronouns: string;
	website: string;
	email: string;
	tagline: string;
	title: string;
	bio: string;
	avatar: string;
	contact: Contact;
	experience: JobExperience[];
	education: Education[];
	projects: Project[];
	languages: Language[];
	skills: TechnicalSkills[];
	interests: Interests[];
	socialMedia: SocialMedia;
}
