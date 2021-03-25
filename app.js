const userPhoto = document.querySelector('.user__photo');
const userName = document.querySelector('.user__nickname');
const userBio = document.querySelector('.user__description');
const cardDiv = document.querySelector('.card');
const dateDiv = document.querySelector('.date');
const url = 'https://api.github.com/users/';
const preloader = document.querySelector('.preloader');
const form = document.getElementById('form');
const usernameInput = document.getElementById("usernameInput");
let usernameInputValue = usernameInput.value;
let nickName = usernameInputValue;

const startPreloader = () => { 
  document.body.classList.remove('loaded_hiding');
  document.body.classList.remove('loaded');
}
async function stopPreloader() { 
  await delay(2000);
  document.body.classList.add('loaded_hiding');
  document.body.classList.add('loaded');
}

const closeInputForm = () => {
    cardDiv.classList.remove('hidden');
    form.classList.remove('form');
    form.classList.add('hidden');
}

const delay = ms => new Promise((resolve) => setTimeout(() => resolve(), ms));

usernameInput.onchange = (event) => {
  usernameInputValue = event.target.value;
  nickName = usernameInputValue; // наверное надо вернуть nickName
}

async function getResponse() {
  try {
      const response = await fetch(`${url}${nickName}`);
      if (!response.ok) {
          throw new Error('не удалось найти такого пользователя');
      }
      return response.json();
  } catch (error) {
      console.log(`Fetch Error: ${error.message} o_O`);
  }
}

async function getDate() {
  await delay(4000);
  return new Date();
}

function getUserData(obj) {
  const {name, bio, avatar_url, html_url} = obj;

  !name ? userName.append(' Информация о пользователе недоступна!') : userName.append(name);
  !bio ? userBio.append(' Информация о пользователе недоступна!') : userBio.append(bio);

  let photo = new Image(300, 400);
  photo.src = avatar_url;
  userPhoto.append(photo);

  let link = html_url;
  userName.onclick = () => window.location.assign(link);
  userName.style.cursor = 'pointer';

  return {name, bio, avatar_url, html_url};
}

stopPreloader();

form.onsubmit = (event) => {
  event.preventDefault();
  startPreloader();
  closeInputForm();


  Promise.all([getResponse(), getDate()])
      .then(([response, date]) => {
          setTimeout(stopPreloader, 2000);
          dateDiv.append(date);
          getUserData(response);
      })
}
