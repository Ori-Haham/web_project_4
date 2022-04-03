export default function getInitialcardsFromServer() {
  return fetch("https://around.nomoreparties.co/v1/group-12/cards", {
    headers: {
      authorization: "37c0271e-6c35-4cdb-bfdd-3d6b737f9411",
    },
  });
}
