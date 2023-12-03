import {action, makeObservable, observable} from 'mobx';
import {ProfileType} from '../types/profile.ts';

class Profile {
  profileDetails: ProfileType = {
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

  setProfileDetails(profileDetails: ProfileType) {
    this.profileDetails = profileDetails;
  }
}
const profileStore = new Profile();

export default profileStore;
