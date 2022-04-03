export default function updateUserData(name, about) {
  fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
    method: "PATCH",
    headers: {
      authorization: "37c0271e-6c35-4cdb-bfdd-3d6b737f9411",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
}
