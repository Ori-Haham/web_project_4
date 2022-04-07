import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, form, { handleFormSubmit }) {
    super(popupSelector);
    this._form = document.querySelector(form);
    this._submitButton = this._form.querySelector(".popup__button");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputList = [...this._popup.querySelectorAll(".popup__input")];

    const formValues = {};

    inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  close = () => {
    super.close();
    this._form.reset();
    this.removeEventListeners();
    this._handelNoLoding();
  };

  handelLoading() {
    this._submitButton.textContent = "Saving...";
  }

  _handelNoLoding = () => {
    this._submitButton.textContent = "Saving";
  };

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit);
  };

  removeEventListeners = () => {
    super.removeEventListeners();
    this._form.removeEventListener("submit", this._handleSubmit);
  };

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  };
}
