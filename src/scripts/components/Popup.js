export class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  open() {
    this._popup.classList.remove("popup-hidden");
    this.setEventListeners();
  }

  close() {
    this._popup.classList.add("popup-hidden");
    this.removeEventListeners();
  }

  setEventListeners() {
    window.addEventListener("keydown", this._handleEscClose);
    this._popup.addEventListener("mousedown", this._handleMouseDown);
  }

  removeEventListeners() {
    window.removeEventListener("keydown", this._handleEscClose);
    this._popup.removeEventListener("mousedown", this._handleMouseDown);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this._popup.classList.add("popup-hidden");
    }
  };

  _handleMouseDown = (evt) => {
    const closeButton = this._popup.querySelector(".popup__close-button");
    if (evt.target === closeButton || evt.target.classList.contains("popup")) {
      this.close();
    }
  };
}
