
const client_id = 'your ACCESS_KEY';

const likesCounter = document.querySelector|('.likes-counter');
const likeBtn = document.querySelector|('.like-btn');
const prevBtn = document.querySelector|('.prev-btn');

const photoEl = document.querySelector('.photo');
const imgContainer = document.querySelector('.img-container');
const photo = document.querySelector('.img');
const author = document.querySelector('.author');

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

    photo.src  = photoURL;
    author.textContent = `Author: ${authorName } (@${authorUsername})`;
    

    } catch (err) {
      throw err;
    }  
  }

window.onload = getImagesFetch;
