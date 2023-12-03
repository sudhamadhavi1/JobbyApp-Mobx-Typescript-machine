import {observer} from 'mobx-react';
import {useEffect, useState} from 'react';

import Cookies from 'js-cookie';
import Loader from 'react-loader-spinner';
import profileStore from '../../store/Profile.tsx';
import {ProfileType} from '../../types/profile.ts';

import './index.css';

const apiStatusConstantsProfile = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const Profile = () => {
  const [apiStatusProfile, setApisStatusProfile] = useState<string>(
    apiStatusConstantsProfile.initial,
  );

  const getProfile = async (): Promise<void> => {
    setApisStatusProfile(apiStatusConstantsProfile.inProgress);
    const jwtToken = Cookies.get('jwt_token');

    const apiUrl = 'https://apis.ccbp.in/profile';

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };
    const response = await fetch(apiUrl, options);
    if (response.ok === true) {
      const fetchedProfile = await response.json();

      const profile = fetchedProfile.profile_details;
      const updatedData: ProfileType = {
        name: profile.name,
        profileImageUrl: profile.profile_image_url,
        shortBio: profile.short_bio,
      };

      profileStore.setProfileDetails(updatedData);
      setApisStatusProfile(apiStatusConstantsProfile.success);
    } else {
      setApisStatusProfile(apiStatusConstantsProfile.failure);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const renderSuccessProfileView = () => {
    const {name, profileImageUrl, shortBio} = profileStore.profileDetails;
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="heading">{name}</h1>
        <p className="shortBio">{shortBio}</p>
      </div>
    );
  };

  const renderProfileFailureView = () => (
    <div>
      <button type="button" onClick={getProfile}>
        Retry
      </button>
    </div>
  );

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  );

  switch (apiStatusProfile) {
    case apiStatusConstantsProfile.success:
      return renderSuccessProfileView();
    case apiStatusConstantsProfile.failure:
      return renderProfileFailureView();
    case apiStatusConstantsProfile.inProgress:
      return renderLoadingView();
    default:
      return null;
  }
};

export default observer(Profile);
