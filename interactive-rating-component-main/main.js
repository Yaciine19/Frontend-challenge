var ratingStateDiv = document.querySelector(".rating-state");
var thankYouDiv = document.querySelector(".thank-you-state");

var ratings = document.querySelectorAll(".rating-state ul li");
var submitBtn = document.querySelector(".submit-btn");

var stateSpan = document.querySelector(".thank-you-state p span");

let selectedRating;

ratings.forEach((items) => {
  items.addEventListener("click", (e) => {
    for (let i = 0; i < ratings.length; i++) {
      ratings[i].classList.remove("active");
    }
    e.target.classList.add("active");
    selectedRating = e.target.dataset.value;
    stateSpan.innerHTML = selectedRating;
  });
});

submitBtn.addEventListener("click", ShowThankYouState);

function ShowThankYouState() {
  if(!selectedRating) {
    alert('Please select a rating!');
    return;
  }
  ratingStateDiv.style.display = 'none';
  thankYouDiv.style.display = "flex";
}
