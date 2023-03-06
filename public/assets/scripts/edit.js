const editFormHandler = async function (event) {
  event.preventDefault();
  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;
  const postId = document.querySelector('input[name="post-id"]').value;
  await fetch(`/api/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  //   document.location.replace("/");
};
const deleteClickHandler = async function () {
  const postId = document.querySelector('input[name="post-id"]').value;
  await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });
  document.location.replace("/");
};
document
  .querySelector("#edit-post-form")
  .addEventListener("submit", editFormHandler);
document
  .querySelector("#delete-btn")
  .addEventListener("click", deleteClickHandler);
