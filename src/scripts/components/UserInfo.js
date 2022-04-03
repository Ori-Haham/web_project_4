export default class UserInfo {
  constructor({ data }) {
    this._nameElement = data.name;
    this._aboutMeElement = data.about;
  }

  getUserInfo() {
    const userInfo = {};

    userInfo.name = this._nameElement;
    userInfo.about = this._aboutMeElement;

    return userInfo;
  }

  setUserInfo(name, about) {
    this._nameElement = name;
    this._aboutMeElement = about;
  }
}
