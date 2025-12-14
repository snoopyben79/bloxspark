document.addEventListener("DOMContentLoaded", () => {
  const catalog = document.querySelector(".catalog");
  const posts = Array.from(catalog.querySelectorAll(".box"));

  posts.sort((a, b) => {
    const dateA = new Date(a.querySelector(".date").dataset.date);
    const dateB = new Date(b.querySelector(".date").dataset.date);
    return dateB - dateA; // newest first
  });

  posts.forEach(post => catalog.appendChild(post));
});
