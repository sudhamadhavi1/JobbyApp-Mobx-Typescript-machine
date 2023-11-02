import {action, makeObservable, observable} from 'mobx';
import {JobDataType, SimilarJobData, SkillSetType} from '../types/Job.ts';

class JobDetailsStore {
  jobData: JobDataType = {
    companyLogoUrl: '',
    employmentType: '',
    jobDescription: '',
    location: '',
    packagePerAnnum: '',
    rating: '',
    title: '',
    companyWebsiteUrl: '',
    lifeAtCompanyDescription: '',
    lifeAtCompanyImageUrl: '',
  };

  skillsSet: SkillSetType[] = [];

  similarJob: SimilarJobData[] = [];

  constructor() {
    makeObservable(this, {
      jobData: observable,
      skillsSet: observable,
      similarJob: observable,

      setJobData: action,
      setSkillSet: action,
      setSimilarJob: action,
    });
  }

  setJobData(jobData: JobDataType) {
    console.log('Setting job data:', jobData);
    this.jobData = jobData;
  }

  setSkillSet(skillsSet: SkillSetType[]) {
    console.log('Setting skill set:', skillsSet);
    this.skillsSet = skillsSet;
  }

  setSimilarJob(similarJob: SimilarJobData[]) {
    console.log('Setting similar jobs:', similarJob);
    this.similarJob = similarJob;
  }
}

const jobDetailsStore = new JobDetailsStore();

export default jobDetailsStore;
