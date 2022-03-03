import { openProfilePopup, openPopup } from "./utils.js";

const formValidationObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const profilePopupOpenButton = document.querySelector(".profile__edit-button");
const cardPopup = document.querySelector(".card-popup");
const cardPopupOpenButton = document.querySelector(".profile__add-button");
const cardForm = document.querySelector(".card-form");

class FormValidator {
  constructor(formSelector) {
    this._formSelector = formSelector;
  }

  _showInputError(formElement, inputElement, errorMessage) {
    this._errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  _hideInputError(formElement, inputElement) {
    this._errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = "";
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
}

class ProfileFormValidator extends FormValidator {
  constructor(formSelector, Validationbject) {
    super(formSelector);
    this._inputSelector = Validationbject.inputSelector;
    this._submitButtonSelector = Validationbject.submitButtonSelector;
    this._inactiveButtonClass = Validationbject.inactiveButtonClass;
    this._inputErrorClass = Validationbject.inputErrorClass;
    this._errorClass = Validationbject.errorClass;
  }
  _setEventListeners(formElement) {
    this._inputList = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = formElement.querySelector(this._submitButtonSelector);

    profilePopupOpenButton.addEventListener("click", () => {
      openProfilePopup();
      super._toggleButtonState(this._inputList, this._buttonElement);
      this._inputList.forEach((inputElement) => {
        super._hideInputError(this._formElement, inputElement);
      });
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }
  enableValidation() {
    this._formElement = document.querySelector(this._formSelector);
    this._setEventListeners(this._formElement);
  }
}

class CardFormValidator extends FormValidator {
  constructor(formSelector, Validationbject) {
    super(formSelector);
    this._inputSelector = Validationbject.inputSelector;
    this._submitButtonSelector = Validationbject.submitButtonSelector;
    this._inactiveButtonClass = Validationbject.inactiveButtonClass;
    this._inputErrorClass = Validationbject.inputErrorClass;
    this._errorClass = Validationbject.errorClass;
  }
  _setEventListeners(formElement) {
    this._inputList = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = formElement.querySelector(this._submitButtonSelector);

    cardPopupOpenButton.addEventListener("click", () => {
      cardForm.reset();
      openPopup(cardPopup);
      super._toggleButtonState(this._inputList, this._buttonElement);
      this._inputList.forEach((inputElement) => {
        super._hideInputError(this._formElement, inputElement);
      });
    });

    profilePopupOpenButton.addEventListener("click", () => {
      openProfilePopup();
      super._toggleButtonState(this._inputList, this._buttonElement);
      this._inputList.forEach((inputElement) => {
        super._hideInputError(this._formElement, inputElement);
      });
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        super._checkInputValidity(formElement, inputElement);
        super._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }
  enableValidation() {
    this._formElement = document.querySelector(this._formSelector);

    this._setEventListeners(this._formElement);
  }
}

const profileFormValidator = new ProfileFormValidator(
  ".profile-form",
  formValidationObject
);

const cardFormValidator = new CardFormValidator(
  ".card-form",
  formValidationObject
);

export { profileFormValidator, cardFormValidator };
