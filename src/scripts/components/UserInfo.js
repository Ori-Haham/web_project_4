import { nameInput, aboutInput } from "../utils/conatants";
export default class UserInfo {
  constructor({ data }) {
    this._name = data.name;
    this._aboutMe = data.aboutMe;
  }

  getUserInfo() {
    const userInfo = {};

    userInfo.namee = this._name.textContent;
    userInfo.aboutMe = this._aboutMe.textContent;

    return userInfo;
  }

  setUserInfo(name, aboutMe) {
    nameInput.value = name.textContent;
    aboutInput.value = aboutMe.textContent;
  }
}
