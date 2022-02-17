const profilePopupOpenButton = document.querySelector(".profile__edit-button");
const cardPopupOpenButton = document.querySelector(".profile__add-button");
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
const submitProfileButton = profileForm.querySelector(
  ".profile-form__submit-button"
);

const cardForm = document.querySelector(".card-form");
const placeInput = cardForm.querySelector(".card-form__place");
const urlInput = cardForm.querySelector(".card-form__url");
const submitCardButton = cardForm.querySelector(".card-form__submit-button");

const cardsContainer = document.querySelector(".cards");

const imagePopup = document.querySelector(".image-popup");
const imagePopupCloseButton = imagePopup.querySelector(
  ".image-popup__close-button"
);
const imagepPopupImage = imagePopup.querySelector(".image-popup__image");
const imagePopupLocation = imagePopup.querySelector(".image-popup__location");
const cardTemplate = document.querySelector("#card-template").content;

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

function openPopup(popup) {
  popup.classList.remove("popup-hidden");
}

function closePopup(popup) {
  popup.classList.add("popup-hidden");
}

function closePopupTarget(evt) {
  const popupList = Array.from(document.querySelectorAll(".popup"));
  popupList.forEach(() => {
    if (evt.target.classList.contains("popup")) {
      closePopup(evt.target);
    }
  });
}

function popupCloseByEscape(evt) {
  const popupList = Array.from(document.querySelectorAll(".popup"));
  popupList.forEach((element) => {
    if (evt.key === "Escape") {
      element.classList.add("popup-hidden");
    }
  });
}

function editProfile() {
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
}

function createCard(place, url) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement
    .querySelector(".card__open-popup")
    .addEventListener("click", () => {
      openPopup(imagePopup);
      imagepPopupImage.setAttribute("src", url);
      imagepPopupImage.setAttribute("alt", url);
      imagePopupLocation.textContent = place;
    });
  cardElement.querySelector(".card__image").setAttribute("src", url);
  cardElement.querySelector(".card__image").setAttribute("alt", place);
  cardElement
    .querySelector(".card__remove-button")
    .addEventListener("click", function () {
      cardElement.remove();
    });
  cardElement.querySelector(".card__location").textContent = place;
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like-button_active");
    });

  return cardElement;
}

initialCards.forEach((card) => {
  cardsContainer.append(createCard(card.name, card.link));
});

profilePopupOpenButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  submitProfileButton.classList.remove("popup__button_disabled");
  submitProfileButton.disabled = false;
  openPopup(profilePopup);
});

profilePopupCloseButton.addEventListener("click", () => {
  closePopup(profilePopup);
});

cardPopupOpenButton.addEventListener("click", () => {
  openPopup(cardPopup);
});

cardPopupCloseButton.addEventListener("click", () => {
  closePopup(cardPopup);
});

imagePopupCloseButton.addEventListener("click", () => {
  closePopup(imagePopup);
});

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  editProfile();
  closePopup(profilePopup);
});

cardPopup.addEventListener("submit", (evt) => {
  evt.preventDefault();
  cardsContainer.prepend(createCard(placeInput.value, urlInput.value));
  closePopup(cardPopup);
  cardForm.reset();
});

window.addEventListener("click", closePopupTarget);

window.addEventListener("keydown", popupCloseByEscape);
