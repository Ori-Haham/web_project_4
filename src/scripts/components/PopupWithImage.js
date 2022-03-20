import { Popup } from "./Popup.js";
import { imagePopupImage, imagePopupLocation } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open = ({ src, alt }) => {
    super.open();
    imagePopupImage.src = src;
    imagePopupImage.alt = alt;
    imagePopupLocation.textContent = alt;
  };
}
