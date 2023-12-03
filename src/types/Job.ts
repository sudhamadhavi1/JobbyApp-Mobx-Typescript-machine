interface CommonJobProps {
  companyLogoUrl: string;
  employmentType: string;
  id: string;
  jobDescription: string;
  location: string;
  rating: number;
  title: string;
}

export interface SimilarJobData extends CommonJobProps {}

export interface Job extends CommonJobProps {
  packagePerAnnum: string;
}

export interface InitialJobDetailsDataType {
  companyLogoUrl: string;
  employmentType: string;
  packagePerAnnum: string;
  jobDescription: string;
  location: string;
  rating: number;
  title: string;
  companyWebsiteUrl: string;
  lifeAtCompanyDescription: string;
  lifeAtCompanyImageUrl: string;
}

// export type JobDetailsDataType = Omit<CommonJobProps, 'id'> & {
//   packagePerAnnum: string;
//   companyWebsiteUrl: string;
//   lifeAtCompanyDescription: string;
//   lifeAtCompanyImageUrl: string;
// };

export interface JobDetailsDataType {
  companyLogoUrl: string;
  employmentType: string;
  packagePerAnnum: string;
  jobDescription: string;
  location: string;
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

interface CommonBackendJobProps {
  company_logo_url: string;
  employment_type: string;
  id: string;
  job_description: string;
  location: string;
  rating: number;
  title: string;
}

export interface BackendSimilarJobDataType extends CommonBackendJobProps {}

export interface BackendEachJobType extends CommonBackendJobProps {
  package_per_annum: string;
}

export interface BackendSkillSetType {
  image_url: string;
  name: string;
}

export interface EmploymentType {
  label: string;
  employmentTypeId: string;
}

export interface SalaryRangeType {
  salaryRangeId: string;
  label: string;
}
