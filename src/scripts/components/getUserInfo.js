export default function getUserInfoFromServer() {
  return fetch("https://around.nomoreparties.co/v1/group-12/users/me ", {
    headers: {
      authorization: "37c0271e-6c35-4cdb-bfdd-3d6b737f9411",
    },
  }).then((res) => {
    return res.json();
  });
}

getUserInfoFromServer().then((res) => console.log(res));
