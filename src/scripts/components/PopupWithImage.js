import { Popup } from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupImage, popupLocation) {
    super(popupSelector);
    this._popupImage = popupImage;
    this._popupLocation = popupLocation;
  }
  open = ({ src, alt }) => {
    super.open();
    this._popupImage.src = src;
    this._popupImage.alt = alt;
    this._popupLocation.textContent = alt;
  };
}
