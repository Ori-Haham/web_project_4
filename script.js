let profileForm = document.querySelector('.profile-form-container');
let profileEditButton = document.querySelector('.profile__edit-button');
let formCloseButton = document.querySelector('.profile-form__close-button');
let pageOverlay = document.querySelector('.page');
let profileName = document.querySelector('.profile__name').textContent = `Jacques Cousteau`;
let profileAbout = document.querySelector('.profile__about-me').textContent =`Explorer`;
let aboutMe = document.querySelector('.profile-form__about-me').value = `Explorer`;
let editName = document.querySelector('.profile-form__name').value = `Jacques Cousteau`;

function popupForm() {
  profileForm.classList.toggle('profile-form-container_display_hidden');
  pageOverlay.classList.toggle('overlay');
};

profileEditButton.addEventListener('click', popupForm);
formCloseButton.addEventListener('click', popupForm);

function editProfile(event) {
    let aboutMe = document.querySelector('.profile-form__about-me').value;
    let editName = document.querySelector('.profile-form__name').value;
    document.querySelector('.profile__name').innerHTML = editName;
    document.querySelector('.profile__about-me').innerHTML = aboutMe;
    popupForm()
    event.preventDefault()
};
let formSubmit = document.querySelector('.profile-form__submit-button');
formSubmit.addEventListener('click', editProfile);
