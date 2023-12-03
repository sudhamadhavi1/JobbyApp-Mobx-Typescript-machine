/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-filename-extension */
import Cookies from 'js-cookie';
import {observer} from 'mobx-react';
import {useEffect, useState} from 'react';
import {BsSearch} from 'react-icons/bs';
import Loader from 'react-loader-spinner';
import {
  apiStatusConstants,
  employmentTypesList,
  salaryRangesList,
} from '../../constants/constants.ts';
import jobListStore from '../../store/JobFilterStore.tsx';
import {
  BackendEachJobType,
  EmploymentType,
  Job,
  SalaryRangeType,
} from '../../types/Job.ts';
import Header from '../Header/index.tsx';
import JobItem from '../JobItem/index.tsx';
import Profile from '../Profile/index.tsx';
import './index.css';

const Jobs = () => {
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
    // const apiUrl = `https://apis.ccbp.in/jobs?employment_type=""&minimum_package=""&search=""`;
    // console.log(apiUrl);

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
      const formattedData: Job[] = data.jobs.map(
        (each: BackendEachJobType) => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          packagePerAnnum: each.package_per_annum,
          rating: each.rating,
          title: each.title,
        }),
      );
      jobListStore.setFilteredJobsList(formattedData);
      setApiStatus(apiStatusConstants.success);
    } else {
      setApiStatus(apiStatusConstants.failure);
    }
  };
  // Writing getJobsList seperately as it need to be called when we clcik retry button

  useEffect(() => {
    getJobsList();
  }, [stringResult, selectedSalaryRange, searchInput]);

  const renderFailureView = () => (
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

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  );

  const renderSuccessView = () => {
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
  const outputView = () => {
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
    const itemCheckedStatus = event.target.checked;
    const checkedItemValue = event.target.value;
    console.log(itemCheckedStatus);
    console.log(checkedItemValue);
    let checkedItemList: string[];
    if (itemCheckedStatus) {
      checkedItemList = [...tempCheckedEmployeeList, checkedItemValue];
    } else {
      checkedItemList = tempCheckedEmployeeList.filter(
        each => each !== checkedItemValue,
      );
    }
    console.log(checkedItemList);

    const checkedItemsString = checkedItemList.join();
    jobListStore.setCheckedEmployementTypeList(checkedItemList);
    jobListStore.setStringResult(checkedItemsString);
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
              {salaryRangesList.map((each: SalaryRangeType) => (
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
};

export default observer(Jobs);
