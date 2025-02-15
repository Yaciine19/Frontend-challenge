document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("data.json");
    const data = await response.json();

    const categoriesContainer = document.querySelector(".categories");
    // categoriesContainer.innerHTML = "";

    data.forEach((item) => {
      const categoryHTML = `<div
          class="w-full flex justify-between items-center px-3 py-4 rounded-lg bg-[${getBgColorOfCategory(
            item.category
          )}]/6"
        >
          <div class="flex gap-2">
            <img src=${item.icon} alt="reaction" />
            <p class="text-[${getTextColorOfCategory(item.category)}]">${
        item.category
      }</p>
          </div>
          <div class="font-bold text-[hsl(224,30%,27%)]">
            <span>${item.score}</span>
            <p class="inline opacity-50">/ 100</p>
          </div>
        </div>`;

      categoriesContainer.innerHTML += categoryHTML;
    });
  } catch (error) {
    console.log(error);
  }
});

const getBgColorOfCategory = (category) => {
  const colors = {
    Reaction: "hsl(0,100%,67%)",
    Memory: "hsl(39,100%,56%)",
    Verbal: "hsl(166,100%,37%)",
    Visual: "hsl(234,85%,45%)",
  };
  return colors[category];
};

const getTextColorOfCategory = (category) => {
  return getBgColorOfCategory(category);
};
