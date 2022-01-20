let popup = document.querySelector(".popup");
let form = document.querySelector(".profile-form");
let popupClose = document.querySelector(".popup__close-button");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about-me");
let editButton = document.querySelector(".profile__edit-button");
let editName = form.querySelector(".profile-form__name");
let editAboutMe = form.querySelector(".profile-form__about-me");
let submitProfile = form.querySelector(".profile-form__submit-button");

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
