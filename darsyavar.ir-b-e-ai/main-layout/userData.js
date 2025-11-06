// AuthorFullName
// ProfileName
// UserRole
// ProfileImg

const user = {
  name: "حُدِیث حسین‌پور",
  role: "سرگروه آموزشی",
  img: "../imgs/h0deis.jpg",
};

document.querySelector("#ProfileImg").setAttribute("src", user.img);
document.querySelector("#UserRole").textContent = user.role;
document.querySelector("#ProfileName").textContent = user.name;
document.querySelector("#AuthorFullName").textContent = user.name;
