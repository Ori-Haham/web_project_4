import { initialCards, InitialCard, NewCard } from "./cards.js";
import { closePopup } from "./utils.js";
import { cardFormValidator, profileFormValidator } from "./validate.js";

const cardsContainer = document.querySelector(".cards");
const cardPopup = document.querySelector(".card-popup");

initialCards.forEach((item) => {
  const card = new InitialCard(item, "#card-template");
  const cardElement = card.generateCard();

  cardsContainer.append(cardElement);
});

cardPopup.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const card = new NewCard("#card-template");
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
  closePopup(cardPopup);
});

profileFormValidator.enableValidation();

cardFormValidator.enableValidation();
