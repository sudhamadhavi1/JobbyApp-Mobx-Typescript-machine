import {observer} from 'mobx-react';
import {AiFillStar} from 'react-icons/ai';
import {IoLocationSharp} from 'react-icons/io5';
import {MdWork} from 'react-icons/md';
import './index.css';

interface SimilarJobItemProps {
  similarJobDetails: {
    companyLogoUrl: string;
    employmentType: string;
    jobDescription: string;
    location: string;
    rating: number;
    title: string;
  };
}

const SimilarJobItem = (props: SimilarJobItemProps) => {
  const {similarJobDetails} = props;
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails;

  return (
    <li>
      <div className="similar-job-bg-container">
        <div className="logo-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="logo"
          />
          <div className="title-rating-container">
            <div>
              <h1 className="title">{title}</h1>
            </div>

            <div className="rating-container">
              <AiFillStar className="star-icon" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <h1>Description</h1>
        <p>{jobDescription}</p>
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
        </div>
      </div>
    </li>
  );
};

export default observer(SimilarJobItem);
