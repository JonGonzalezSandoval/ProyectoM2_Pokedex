document.addEventListener("DOMContentLoaded", function() {
  const button = document.getElementById("dropdown-button");
  const content = document.getElementById("dropdown-content");
  let isOpen = false;

  button.addEventListener("click", function(event) {
      if (isOpen) {
          content.style.display = "none";
      } else {
          content.style.display = "block";
      }
      isOpen = !isOpen;
      event.stopPropagation();
  });

  // Add click event listener to the document body
  document.body.addEventListener("click", function(event) {
      if (isOpen && event.target !== button && event.target !== content) {
          content.style.display = "none";
          isOpen = false;
      }
  });

  if(localStorage.getItem('SavedToken') !== null){
    localStorage.removeItem('SavedToken')
  }
});

//Change needed. create the listener the moment the pokemon card is created so i can take its pokedex number to set the id when logged
// const pokeballImg = document.getElementById("pokeball-img258");

// let isColored = true; // Assuming the initial state is colored

// pokeballImg.addEventListener("click", function() {
//   if (isColored) {
//       pokeballImg.src = "./media/pokeball_gris.png"; // Change to the grayscale image
//   } else {
//       pokeballImg.src = "./media/pokeball.png"; // Change back to the colored image
//   }
//   isColored = !isColored; // Toggle the state
// });


