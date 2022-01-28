let popup = document.querySelector(".popup");
let form = document.querySelector(".profile-form");
let popupClose = document.querySelector(".popup__close-button");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about-me");
let editButton = document.querySelector(".profile__edit-button");
let editName = form.querySelector(".profile-form__name");
let editAboutMe = form.querySelector(".profile-form__about-me");
let submitProfile = form.querySelector(".profile-form__submit-button");
let cardsContainer = document.querySelector(".cards");

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

function createCard(cardsData) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").setAttribute("src", cardsData.link);
  cardElement.querySelector(".card__location").textContent = cardsData.name;

  return cardElement;
}

initialCards.forEach((card) => {
  cardsContainer.append(createCard(card));
});
