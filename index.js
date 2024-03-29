const client_id = "your ACCESS_KEY";

const imgContainer = document.querySelector(".img-container");
const photo = document.querySelector(".img");
const author = document.querySelector(".author");
const likesCounter = document.querySelector(".likes-counter");
const likeBtn = document.querySelector(".like-btn");
const prevBtn = document.querySelector(".prev-btn");

let history = JSON.parse(localStorage.getItem("history")) || [];
let liked = false;
let likedPhotos = JSON.parse(localStorage.getItem("likedImages")) || [];

// Получить данные с сервера
async function getImagesFetch() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${client_id}`
    );
    if (!response.ok) {
      throw new Error("Сервер встал");
    }

    const requestedData = await response.json();
    console.log(requestedData);

    const photoURL = requestedData.urls.small;
    const authorName = requestedData.user.name;
    const authorUsername = requestedData.user.username;

    photo.src = photoURL;
    author.textContent = `Photo by ${authorName} (@${authorUsername})`;

    // Добавить фото в историю
    history.unshift({ photoURL, authorName, authorUsername });
    localStorage.setItem("history", JSON.stringify(history));

    // Предыдущее фото
    prevBtn.addEventListener("click", () => {
      if (history.length > 1) {
        history.shift();
        const prevImage = history[0];

        photo.src = prevImage.photoURL;
        author.textContent = `Photo by ${prevImage.authorName} (@${prevImage.authorUsername})`;
      } else {
        alert("No previous images");
      }
    });

    // Если не лайк - удалить фото из списка
    liked = likedPhotos.includes(photoURL);
    changeLikeBtn();
  } catch (err) {
    throw err;
  }
}

// Смена вида сердечка при лайке
function changeLikeBtn() {
  likeBtn.textContent = liked ? "❤️️" : "♡";
}

likeBtn.addEventListener("click", () => {
  liked = !liked;
  changeLikeBtn();
  if (liked) {
    likesCounter.textContent = parseInt(likesCounter.textContent) + 1;
    likedPhotos.push(photo.src);
  } else {
    likesCounter.textContent = parseInt(likesCounter.textContent) - 1;
    likedPhotos.push(photo.src);
  }
  localStorage.setItem("likedPhotos", JSON.stringify(likedPhotos));
});

window.onload = getImagesFetch;
