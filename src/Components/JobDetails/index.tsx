/* eslint-disable react/jsx-filename-extension */
import Cookies from 'js-cookie';
import {observer} from 'mobx-react';
import {useEffect, useState} from 'react';
import {CgArrowTopRightR} from 'react-icons/cg';
import Loader from 'react-loader-spinner';

import {AiFillStar} from 'react-icons/ai';

import {MdWork} from 'react-icons/md';

import {IoLocationSharp} from 'react-icons/io5';
import jobDetailsStore from '../../store/JobDetailsStore.tsx';
import {
  BackendSimilarJobDataType,
  BackendSkillSetType,
  SimilarJobData,
} from '../../types/Job.ts';
import Header from '../Header/index.tsx';
import SimilarJobItem from '../SimilarJobItem/index.tsx';
import './index.css';

const apiStatusConstants = {
  initial: 'initial',
  inprogress: 'inprogress',
  failure: 'failure',
  success: 'success',
};

interface JobDetailsProps {
  match: {
    params: {
      id: string;
    };
  };
}

const JobDetails = (props: JobDetailsProps) => {
  const {jobData, skillsSet, similarJob} = jobDetailsStore;
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  // const [jobData, setJobData] = useState({});

  const {match} = props;
  const {params} = match;
  const {id} = params;

  const getJobDetails = async (): Promise<void> => {
    setApiStatus(apiStatusConstants.initial);

    const url = `https://apis.ccbp.in/jobs/${id}`;
    const jwtToken = Cookies.get('jwt_token');
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      const data = await response.json();
      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        jobDescription: data.job_details.job_description,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        companyWebsiteUrl: data.job_details.company_website_url,
        lifeAtCompanyDescription: data.job_details.life_at_company.description,
        lifeAtCompanyImageUrl: data.job_details.life_at_company.image_url,
      };
      const skillsUpdatedData = data.job_details.skills.map(
        (each: BackendSkillSetType) => ({
          imageUrl: each.image_url,
          name: each.name,
        }),
      );

      // console.log(updatedData);
      // console.log(skillsUpdatedData);

      const similarjobData = data.similar_jobs.map(
        (each: BackendSimilarJobDataType) => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          rating: each.rating,
          title: each.title,
        }),
      );
      // console.log(similarjobData);
      setApiStatus(apiStatusConstants.success);
      jobDetailsStore.setJobData(updatedData);
      jobDetailsStore.setSimilarJob(similarjobData);
      jobDetailsStore.setSkillSet(skillsUpdatedData);
    } else setApiStatus(apiStatusConstants.failure);
  };

  useEffect(() => {
    getJobDetails();
  }, []);

  const failureView = (): JSX.Element => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={getJobDetails}>
        Retry
      </button>
    </div>
  );

  const loadingView = (): JSX.Element => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  );

  const successView = (): JSX.Element => {
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      companyWebsiteUrl,
      lifeAtCompanyDescription,
      lifeAtCompanyImageUrl,
    } = jobData;
    console.log('Render Success');
    console.log(jobData);

    return (
      <>
        <div className="details-container">
          <div className="title-rating-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo-image"
            />
            <div className="bg-container">
              <h1>{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-salary-container">
            <div className="location-employee-type-container">
              <div className="location-container">
                <IoLocationSharp className="location-icon" />
                <p>{location}</p>
              </div>
              <div className="location-container">
                <MdWork />
                <p>{employmentType}</p>
              </div>
            </div>
            <div>
              <p>{packagePerAnnum}</p>
            </div>
          </div>
          <hr />

          <div>
            <div className="description-visit-container">
              <h1 className="heading-description">Description</h1>
              <a href={companyWebsiteUrl}>
                Visit
                <CgArrowTopRightR />
              </a>
            </div>

            <p>{jobDescription}</p>
          </div>
          <h1 className="heading-description">Skills</h1>

          <ul className="skills-container">
            {skillsSet.map(each => (
              <li className="each-skill-container" key={each.name}>
                <img src={each.imageUrl} alt={each.name} />
                <p>{each.name}</p>
              </li>
            ))}
          </ul>

          <h1 className="heading-description">Life at Company</h1>
          <div className="life-at-company-container">
            <p>{lifeAtCompanyDescription}</p>
            <img src={lifeAtCompanyImageUrl} alt="life at company" />
          </div>
        </div>
        <h1 className="heading-description">Similar Jobs</h1>
        <div>
          <ul className="similar-job-list">
            {similarJob.map((each: SimilarJobData) => (
              <SimilarJobItem similarJobDetails={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    );
  };

  const outputView = (): JSX.Element | null => {
    console.log(apiStatus);
    switch (apiStatus) {
      case apiStatusConstants.success:
        return successView();

      case apiStatusConstants.failure:
        return failureView();
      case apiStatusConstants.inprogress:
        return loadingView();
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-container">{outputView()}</div>
    </div>
  );
};

export default observer(JobDetails);
