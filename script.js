const popup = document.querySelector(".popup");
const form = document.querySelector(".profile-form");
const popupCloseButton = document.querySelector(".popup__close-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about-me");
const editButton = document.querySelector(".profile__edit-button");
const popupTitle = form.querySelector(".profile-form__heading");
const editName = form.querySelector(".profile-form__name");
const editAboutMe = form.querySelector(".profile-form__about-me");
const submitProfile = form.querySelector(".profile-form__submit-button");
const DddCardButton = document.querySelector(".profile__add-button");
const cardsContainer = document.querySelector(".cards");
const popupCard = document.querySelector(".popup_card");
const closeImageButton = popupCard.querySelector(".popup__close-button_card");
const popImage = popupCard.querySelector(".popup__image");
const popupLocation = popupCard.querySelector(".popup__location");

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

function clocePopup() {
  popup.classList.add("popup_hidden");
}
function closeImagePopup() {
  popupCard.classList.add("popup_hidden");
}

function editProfile() {
  profileName.textContent = editName.value;
  profileAbout.textContent = editAboutMe.value;
}

function createInitialCard(cardsData) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement
    .querySelector(".card__open-popup")
    .addEventListener("click", () => {
      popupCard.classList.remove("popup_hidden");
      popImage.setAttribute("src", cardsData.link);
      popupLocation.textContent = cardsData.name;
    });
  cardElement.querySelector(".card__image").setAttribute("src", cardsData.link);
  cardElement
    .querySelector(".card__remove-button")
    .addEventListener("click", function () {
      cardElement.remove();
    });
  cardElement.querySelector(".card__location").textContent = cardsData.name;
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like-button_active");
    });

  return cardElement;
}

initialCards.forEach((card) => {
  cardsContainer.append(createInitialCard(card));
});

function addNewCard() {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement
    .querySelector(".card__open-popup")
    .addEventListener("click", () => {
      popupCard.classList.remove("popup_hidden");
      popImage.setAttribute("src", editAboutMe.value);
      popupLocation.textContent = editName.value;
    });
  cardElement
    .querySelector(".card__image")
    .setAttribute("src", editAboutMe.value);
  cardElement
    .querySelector(".card__remove-button")
    .addEventListener("click", function (evt) {
      cardElement.remove();
    });
  cardElement.querySelector(".card__location").textContent = editName.value;
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like-button_active");
    });

  return cardElement;
}

editButton.addEventListener("click", function () {
  popupTitle.textContent = "Edit profile";
  popup.classList.remove("popup_hidden");
  editName.value = profileName.textContent;
  editName.setAttribute("placeholder", "Name");
  editAboutMe.value = profileAbout.textContent;
  editAboutMe.setAttribute("placeholder", "About Me");
});

DddCardButton.addEventListener("click", function () {
  popupTitle.textContent = "New Place";
  popup.classList.remove("popup_hidden");
  editName.setAttribute("placeholder", "Title");
  editName.value = "";
  editAboutMe.setAttribute("placeholder", "Image URL");
  editAboutMe.value = "";
});

popupCloseButton.addEventListener("click", clocePopup);

closeImageButton.addEventListener("click", closeImagePopup);

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (popupTitle.textContent.includes("Edit profile")) {
    editProfile();
  } else {
    cardsContainer.prepend(addNewCard());
  }
  clocePopup();
});
