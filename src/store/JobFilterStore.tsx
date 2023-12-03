import {action, makeObservable, observable} from 'mobx';
import {Job} from '../types/Job.ts';

class JobListStore {
  searchInput: string = '';

  selectedSalaryRange: string = '';

  tempsearchInput: string = '';

  stringResult: string = '';

  tempCheckedEmployeeList: string[] = [];

  filteredJobsList: Job[] = [];

  constructor() {
    makeObservable(this, {
      searchInput: observable,
      selectedSalaryRange: observable,
      filteredJobsList: observable,
      stringResult: observable,
      tempCheckedEmployeeList: observable,
      tempsearchInput: observable,
      setSearchInput: action,
      setSelectedSalaryRange: action,
      setTempSearchInput: action,
      setFilteredJobsList: action,
      setStringResult: action,
      setCheckedEmployementTypeList: action,
    });
  }

  setSearchInput(value: string) {
    this.searchInput = value;
  }

  setSelectedSalaryRange(value: string) {
    this.selectedSalaryRange = value;
  }

  setTempSearchInput(value: string) {
    this.tempsearchInput = value;
  }

  setFilteredJobsList(value: Job[]) {
    this.filteredJobsList = value;
  }

  setStringResult(value: string) {
    this.stringResult = value;
  }

  setCheckedEmployementTypeList(value: string[]) {
    this.tempCheckedEmployeeList = value;
  }
}

const jobListStore = new JobListStore();
export default jobListStore;
