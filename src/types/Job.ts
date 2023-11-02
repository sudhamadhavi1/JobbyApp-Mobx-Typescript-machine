export interface Job {
  companyLogoUrl: string;
  employmentType: string;
  id: string;
  jobDescription: string;
  location: string;
  packagePerAnnum: string;
  rating: number;
  title: string;
}

export interface JobDataType {
  companyLogoUrl: string;
  employmentType: string;
  jobDescription: string;
  location: string;
  packagePerAnnum: string;
  rating: string;
  title: string;
  companyWebsiteUrl: string;
  lifeAtCompanyDescription: string;
  lifeAtCompanyImageUrl: string;
}

export interface SkillSetType {
  imageUrl: string;
  name: string;
}

export interface SimilarJobData {
  companyLogoUrl: string;
  employmentType: string;
  id: string;
  jobDescription: string;
  location: string;
  rating: string;
  title: string;
}

export interface InitialSimilarJobData {
  company_logo_url: string;
  employment_type: string;
  id: string;
  job_description: string;
  location: string;
  rating: string;
  title: string;
}

export interface InitialSkillSetType {
  image_url: string;
  name: string;
}

export interface EachJob {
  company_logo_url: string;
  employment_type: string;
  id: string;
  job_description: string;
  location: string;
  package_per_annum: string;
  rating: number;
  title: string;
}
