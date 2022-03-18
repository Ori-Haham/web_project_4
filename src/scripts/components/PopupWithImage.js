import { Popup } from "./Popup.js";
import { imagepPopupImage, imagePopupLocation } from "../utils/conatants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(evt) {
    super.open();
    imagepPopupImage.src = evt.target.src;
    imagepPopupImage.alt = evt.target.alt;
    imagePopupLocation.textContent = evt.target.alt;
  }
}
