import {action, makeObservable, observable} from 'mobx';

interface ProfileDetails {
  name: string;
  profileImageUrl: string;
  shortBio: string;
}

class Profile {
  profileDetails: ProfileDetails = {
    name: '',
    profileImageUrl: '',
    shortBio: '',
  };

  constructor() {
    makeObservable(this, {
      profileDetails: observable,
      setProfileDetails: action,
    });
  }

  setProfileDetails(profileDetails: ProfileDetails) {
    this.profileDetails = profileDetails;
  }
}
const profileStore = new Profile();

export default profileStore;
