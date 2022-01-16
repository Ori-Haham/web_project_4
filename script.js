let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");
let popupClose = document.querySelector(".profile-form__close-button");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about-me");
let editName = document.querySelector(".profile-form__name");
let editAboutMe = document.querySelector(".profile-form__about-me");
let form = document.querySelector(".frofile-form");

function openPopup() {
  popup.classList.remove("popup_hidden");
  editName.value = profileName.textContent;
  editAboutMe.value = profileAbout.textContent;
}

function clocePopup() {
  popup.classList.add("popup_hidden");
}

function editProfile(event) {
  event.preventDefault();
  profileName.textContent = editName.value;
  profileAbout.textContent = editAboutMe.value;
  clocePopup();
}

editButton.addEventListener("click", openPopup);
popupClose.addEventListener("click", clocePopup);
form.addEventListener("submit", editProfile);
