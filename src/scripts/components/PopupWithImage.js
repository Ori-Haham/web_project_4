import { Popup } from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, PopupImage, PopupLocation) {
    super(popupSelector);
    this._PopupImage = PopupImage;
    this._PopupLocation = PopupLocation;
  }
  open = ({ src, alt }) => {
    super.open();
    this._PopupImage.src = src;
    this._PopupImage.alt = alt;
    this._PopupLocation.textContent = alt;
  };
}
