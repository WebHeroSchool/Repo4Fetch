const userPhoto = document.querySelector('.user__photo');
const userName = document.querySelector('.user__nickname');
const userBio = document.querySelector('.user__description');

let url = prompt('Enter the link', 'https://api.github.com/users/6thSence');

async function getResponse(url) {
    let response = await fetch(url);
    let content = await response.json();

    let name;
    let bio;

    if (content.name != null) {
        name = userName.append(content.name);
    }else {
        userName.innerHTML = 'Информация о пользователе недоступна!';
    }

    if (content.bio != null) {
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


getResponse(url);
