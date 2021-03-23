const userPhoto = document.querySelector('.user__photo');
const userName = document.querySelector('.user__nickname');
const userBio = document.querySelector('.user__description');
const date = document.querySelector('.date');
// const url = window.location.search;
const url = 'https://api.github.com/users/';
// const params = new URLSearchParams(url);
const preloader = document.querySelector('.preloader');
// console.log(params.get("name"));
// console.log("url", url);

window.onload = function stopPreloader() {
  setTimeout(function () {
    document.body.classList.add('loaded_hiding');
    document.body.classList.add('loaded');
  }, 2000);
}

const input = document.getElementById('input');

input.onkeyup = async function() {
  let nickName =  input.value;
  getResponse(nickName);
}

// let getnickName = params.get("name");

const delay = ms => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  })
}


async function getResponse(nickName) {
  try { 
    let response = await fetch(url+nickName);
    if(response.status >= 400) {
      throw new Error('не удалось найти такого пользователя');
    }
    return response.json();
  }
  catch(e) {
    console.log(`Fetch Error: ${e.message} o_O`);
  }
  
} //получает запров в виде json файла

async function getUserData() {
    const content = await getResponse();
    const{name, bio, avatar_url, html_url} = content;    

    !name ? userName.append(' ' + 'Информация о пользователе недоступна!') : userName.append(name);
    !bio ? userBio.append(' ' + 'Информация о пользователе недоступна!') : userBio.append(bio);      

    let photo = new Image(300, 400);
    photo.src = avatar_url;
    userPhoto.append(photo);

    let link = html_url;
    userName.onclick = () => window.location.assign(link);
    userName.style.cursor = 'pointer';

    return {name, bio, avatar_url, html_url};
}//дожидается конца работы getResponse и работает с данными

async function getDate() {
  await delay(4000);
  const nowDate = new Date()
  date.append(nowDate);
  return nowDate;
}

Promise.all([getUserData(), getDate()])
  .then(([userData, date]) => {
    console.log(userData, date);
  })
    