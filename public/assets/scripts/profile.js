const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#post-name").value.trim();
  const description = document.querySelector("#post-desc").value.trim();

  ///console.log(name, description);

  if (name && description) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ name, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create post");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete post");
    }
  }
};

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);

const postList = document.querySelector(".project-list");
if (postList) {
  postList.addEventListener("click", delButtonHandler);
}
