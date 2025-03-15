const itemsContainer = document.querySelector(".items");
const items = document.querySelectorAll(".item");

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

items.forEach((item) => {
  item.addEventListener("mousedown", (e) => {
    selectedCube = item;
    const rect = item.getBoundingClientRect();
    
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    selectedCube.style.position = "absolute";
    selectedCube.style.zIndex = "1000";
    selectedCube.style.cursor = "grabbing";
    selectedCube.classList.add("dragging");
  });

  document.addEventListener("mousemove", (e) => {
    if (!selectedCube) return;

    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    // Get container bounds
    const containerRect = itemsContainer.getBoundingClientRect();
    const cubeRect = selectedCube.getBoundingClientRect();

    // Ensure the cube stays inside the container
    if (newX < containerRect.left) newX = containerRect.left;
    if (newY < containerRect.top) newY = containerRect.top;
    if (newX + cubeRect.width > containerRect.right) newX = containerRect.right - cubeRect.width;
    if (newY + cubeRect.height > containerRect.bottom) newY = containerRect.bottom - cubeRect.height;

    selectedCube.style.left = `${newX}px`;
    selectedCube.style.top = `${newY}px`;
  });

  document.addEventListener("mouseup", () => {
    if (selectedCube) {
      selectedCube.style.zIndex = "1";
      selectedCube.style.cursor = "grab";
      selectedCube.classList.remove("dragging");
      selectedCube = null;
    }
  });
});
