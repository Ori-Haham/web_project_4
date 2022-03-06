function openPopup(popup) {
  popup.classList.remove("popup-hidden");
  window.addEventListener("keydown", popupCloseByEscape);
  window.addEventListener("mousedown", closePopupTarget);
}

function closePopup(popup) {
  popup.classList.add("popup-hidden");
  window.removeEventListener("keydown", popupCloseByEscape);
  window.removeEventListener("mousedown", closePopupTarget);
}

function closePopupTarget(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

function popupCloseByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup:not(.popup-hidden)");
    closePopup(openedPopup);
  }
}

export { openPopup, closePopup };
