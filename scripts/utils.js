const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about-me");

const profilePopup = document.querySelector(".profile-popup");
const profilePopupCloseButton = profilePopup.querySelector(
  ".profile-popup__close-button"
);

const cardPopup = document.querySelector(".card-popup");
const cardPopupCloseButton = cardPopup.querySelector(
  ".card-popup__close-button"
);

const profileForm = document.querySelector(".profile-form");
const nameInput = profileForm.querySelector(".profile-form__name");
const aboutInput = profileForm.querySelector(".profile-form__about-me");

function openPopup(popup) {
  popup.classList.remove("popup-hidden");
  window.addEventListener("keydown", popupCloseByEscape);
  window.addEventListener("mousedown", closePopupTarget);
}

function closePopup(popup) {
  popup.classList.add("popup-hidden");
  window.removeEventListener("keydown", popupCloseByEscape);
  window.removeEventListener("mousedown", closePopupTarget);
}

function closePopupTarget(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

function popupCloseByEscape(evt) {
  const popupList = Array.from(document.querySelectorAll(".popup"));
  if (evt.key === "Escape") {
    popupList.forEach((element) => {
      closePopup(element);
    });
  }
}

export function openProfilePopup() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openPopup(profilePopup);
}

function editProfile() {
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
}

profilePopupCloseButton.addEventListener("click", () => {
  closePopup(profilePopup);
});

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  editProfile();
  closePopup(profilePopup);
});

cardPopupCloseButton.addEventListener("click", () => {
  closePopup(cardPopup);
});

export { openPopup, closePopup };
