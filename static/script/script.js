/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
//-- Script.js ///
// profielen //
const profiles = [
    {name: 'Loempia', image: '/css/img/sang.cv.jpg', food: loempia},
    {name: 'Kaas', image: '/css/img/angelo.jpeg', food: cheese},
    {name: 'Pasta', image: '/css/img/abdel.jpeg',food: spagettie},
  ];
  
  // const profiles = require('./script/profiles');
  // const profiles = require('./static/script/profiles.');
  // console.log('niet verbonden bitch.');
  
  
  let currentProfileIndex = 0;
  
  document.addEventListener('DOMContentLoaded', () => {
    const dislikeButton = document.querySelector('.DisLikeButton');
  
    dislikeButton.addEventListener('click', loadNextProfile);
  
    function loadNextProfile() {
      currentProfileIndex++;
      if (currentProfileIndex >= profiles.length) {
        currentProfileIndex = 0;
      }
  
      const currentProfile = profiles[currentProfileIndex];
  
      const profileImage = document.querySelector('.userimg');
      profileImage.style.backgroundImage = `url(${currentProfile.image})`;
  
      const profileName = document.querySelector('h2');
      profileName.textContent = currentProfile.name;
  
      const profileFood = document.querySelector('p');
      profileFood.textContent = currentProfile.food;
  
      const likeButton = document.querySelector('.LikeButton');
  
      likeButton.value = JSON.stringify(currentProfile); // Converteer het huidige profiel naar een JSON-string en stel het in als de waarde van de like-knop
    }
    
    const likeButton = document.querySelector('.LikeButton');

    likeButton.addEventListener("click", function(event) {
        event.preventDefault();
        let liked = true;
        const currentProfile = profiles[currentProfileIndex];
    
        const requestBody = {
          liked: liked,
          gameName: currentProfile.name,
          gameImage: currentProfile.food,
           };

        // AJAX request    //
        fetch("/topics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"    
          }, 
             body: JSON.stringify(requestBody)
        })  
          .then(() => console.log("ok"))
          .catch(() => console.log("failed"));
      });
    
  });
  
  // -------------------------------------------------------- //
  