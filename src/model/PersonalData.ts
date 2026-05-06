import type { Document as ContentfulDocument } from '@contentful/rich-text-types';

import type { Capability } from './Capability';
import type { Contact } from './Contact';
import type { Credential } from './Credential';
import type { Education } from './Education';
import type { Interests } from './Interests';
import type { JobExperience } from './JobExperience';
import type { Language } from './Language';
import type { Project } from './Project';
import type { SocialMedia } from './SocialMedia';
import type { TechnicalInterest } from './TechnicalInterest';
import type { TechnicalSkills } from './TechnicalSkills';
import type { AvatarEntity } from './common';

export interface PersonalData extends AvatarEntity {
	name: string;
	displayName: string;
	pronouns: string;
	website: string;
	email: string;
	tagline: string;
	title: string;
	bio: ContentfulDocument;
	shortBio?: ContentfulDocument;
	avatar: string;
	contact: Contact;
	experience: JobExperience[];
	education: Education[];
	projects: Project[];
	languages: Language[];
	skills: TechnicalSkills[];
	interests: Interests[];
	technicalInterests: TechnicalInterest[];
	capabilities?: Capability[];
	credentials?: Credential[];
	socialMedia: SocialMedia;
}
