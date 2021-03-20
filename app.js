const userPhoto = document.querySelector('.user__photo');
const userName = document.querySelector('.user__nickname');
const userBio = document.querySelector('.user__description');
const url = window.location.search;
const params = new URLSearchParams(url);
console.log(params.get("name"));
console.log("url", url);

let nickName = params.get("name");
if (!nickName) {
    nickName = 'Icreateacoolname';
}

async function getResponse(nickName) {
    const response = await fetch(`https://api.github.com/users/${nickName}`);
    
    const content = await response.json();

    let name;
    let bio;

    if (content.name) {
        name = userName.append(content.name);
    }else {
        userName.innerHTML = 'Информация о пользователе недоступна!';
    }

    if (content.bio) {
        bio = userBio.append(content.bio);
    }else {
        userBio.innerHTML = 'Информация о пользователе недоступна!';
    }


    let photo = new Image(300, 400);
    photo.src = content.avatar_url;
    userPhoto.append(photo);

    let link = content.html_url;
    userName.onclick = () => window.location.assign(link);
    userName.style.cursor = 'pointer';
}


getResponse(nickName);
