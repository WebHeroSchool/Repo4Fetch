const userPhoto = document.querySelector('.user__photo');
const userName = document.querySelector('.user__nickname');
const userBio = document.querySelector('.user__description');
const url = window.location.search;
const params = new URLSearchParams(url);
// console.log(params.get("name"));
// console.log("url", url);

let nickName = prompt('Enter Your NickName', 'Icreateacoolname');
if (!nickName) {
    nickName = 'Icreateacoolname';
}


// let getnickName = params.get("name");

const delay = ms => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  })
}

async function getResponse() {
  await delay(2000);
  let response = await fetch(`https://api.github.com/users/${nickName}`);
  return response.json();
} //получает запров в виде json файла

async function getUserData() {
  try {
    const content = await getResponse();

    if (content.name) {
      userName.append(content.name);
    }else {
      userName.append(' ' + 'Информация о пользователе недоступна!');
    }

    if (content.bio) {
      userBio.append(content.bio);
    }else {
      userBio.append(' ' + 'Информация о пользователе недоступна!');
    }

    let photo = new Image(300, 400);
    photo.src = content.avatar_url;
    userPhoto.append(photo);

    let link = content.html_url;
    userName.onclick = () => window.location.assign(link);
    userName.style.cursor = 'pointer';
  }
  catch {
    console.error(error);
  }
}//дожидается конца работы getResponse и работает с данными

async function getDate() {
  await delay(2000);
  console.log (new Date());
}

getUserData();
getDate();

