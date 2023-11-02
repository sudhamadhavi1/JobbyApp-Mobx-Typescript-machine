/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-filename-extension */
import Cookies from 'js-cookie';
import {observer} from 'mobx-react';
import {useEffect, useState} from 'react';
import {BsSearch} from 'react-icons/bs';
import Loader from 'react-loader-spinner';
import jobListStore from '../../store/JobListStore.tsx';
import {EachJob, Job} from '../../types/Job.ts';
import Header from '../Header/index.tsx';
import JobItem from '../JobItem/index.tsx';
import Profile from '../Profile/index.tsx';
import './index.css';

interface EmploymentType {
  label: string;
  employmentTypeId: string;
}

interface SalaryRange {
  salaryRangeId: string;
  label: string;
}

const apiStatusConstants = {
  initial: 'initial',
  inprogress: 'inprogress',
  failure: 'failure',
  success: 'success',
};

const employmentTypesList: EmploymentType[] = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
];

const salaryRangesList: SalaryRange[] = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
];

const Jobs = observer(() => {
  const {
    searchInput,
    selectedSalaryRange,
    filteredJobsList,
    stringResult,
    tempCheckedEmployeeList,
    tempsearchInput,
  } = jobListStore;
  const [apiStatus, setApiStatus] = useState<string>(
    apiStatusConstants.initial,
  );

  const getJobsList = async (): Promise<void> => {
    setApiStatus(apiStatusConstants.inprogress);

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${stringResult}&minimum_package=${selectedSalaryRange}&search=${searchInput}`;

    const jwtToken = Cookies.get('jwt_token');

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };
    const response = await fetch(apiUrl, options);
    if (response.ok === true) {
      const data = await response.json();
      const formattedData = data.jobs.map((each: EachJob) => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }));
      jobListStore.setFilteredJobsList(formattedData);

      setApiStatus(apiStatusConstants.success);
    } else {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  useEffect(() => {
    getJobsList();
  }, [stringResult, selectedSalaryRange, searchInput]);

  const renderFailureView = (): JSX.Element => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={getJobsList}>
        Retry
      </button>
    </div>
  );

  const renderLoadingView = (): JSX.Element => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  );

  const renderSuccessView = (): JSX.Element => {
    if (filteredJobsList.length <= 0) {
      return (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters</p>
        </div>
      );
    }

    return (
      <div>
        <ul className="job-list-container">
          {filteredJobsList.map((each: Job) => (
            <JobItem jobItemDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    );
  };
  const outputView = (): JSX.Element | null => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView();

      case apiStatusConstants.failure:
        return renderFailureView();

      case apiStatusConstants.inprogress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  const onChangeSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    jobListStore.setTempSearchInput(event.target.value);
  };

  const onClickCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const tempCheckStatus = event.target.checked;
    const tempValue = event.target.value;
    let updateCheckList: string[];
    if (tempCheckStatus) {
      updateCheckList = [...tempCheckedEmployeeList, tempValue];
    } else {
      updateCheckList = tempCheckedEmployeeList.filter(
        each => each !== tempValue,
      );
    }

    const tempCheckString = updateCheckList.join();
    jobListStore.setTempCheckedEmployeeList(updateCheckList);
    jobListStore.setStringResult(tempCheckString);
  };

  const onChangeRadio = (event: React.ChangeEvent<HTMLInputElement>): void => {
    jobListStore.setSelectedSalaryRange(event.target.value);
  };

  const onClickSearch = (): void => {
    jobListStore.setSearchInput(tempsearchInput);
  };

  return (
    <div>
      <Header />
      <div className="job-container">
        <div className="profile-filters-container">
          <Profile />
          <div className="employement-container">
            <hr className="line" />
            <h1 className="heading-filter">Type of Employment</h1>
            <ul className="filter-container">
              {employmentTypesList.map((each: EmploymentType) => (
                <li key={each.label}>
                  <label>
                    <input
                      type="checkbox"
                      value={each.employmentTypeId}
                      onChange={onClickCheckbox}
                    />
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <hr className="line" />
            <h1 className="heading-filter">Salary Range</h1>
            <ul className="filter-container">
              {salaryRangesList.map((each: SalaryRange) => (
                <li key={each.salaryRangeId}>
                  <label>
                    <input
                      type="radio"
                      value={each.salaryRangeId}
                      onChange={onChangeRadio}
                      name="salary"
                    />
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="search-jobs-container">
            <input
              type="search"
              onChange={onChangeSearchInput}
              placeholder="Search"
              value={tempsearchInput}
              className="input-search"
            />

            <button
              type="button"
              onClick={onClickSearch}
              data-testid="searchButton"
              className="search-button"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>

          {outputView()}
        </div>
      </div>
    </div>
  );
});

export default Jobs;
