export default class UserInfo {
  constructor({ data }) {
    this._nameElement = data.name;
    this._aboutMeElement = data.aboutMe;
  }

  getUserInfo() {
    const userInfo = {};

    userInfo.name = this._nameElement.textContent;
    userInfo.aboutMe = this._aboutMeElement.textContent;

    return userInfo;
  }

  setUserInfo(name, aboutMe) {
    this._nameElement.textContent = name;
    this._aboutMeElement.textContent = aboutMe;
  }
}
