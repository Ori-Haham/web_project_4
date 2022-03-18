export class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  open() {
    this._popup.classList.remove("popup-hidden");
    window.addEventListener("keydown", this._handleEscClose);
    this.setEventListeners();
  }

  close() {
    this._popup.classList.add("popup-hidden");
    window.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this._popup.classList.add("popup-hidden");
    }
  };

  setEventListeners() {
    const closeButton = this._popup.querySelector(".popup__close-button");
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target === closeButton ||
        evt.target.classList.contains("popup")
      ) {
        this.close();
      }
    });
  }
}
