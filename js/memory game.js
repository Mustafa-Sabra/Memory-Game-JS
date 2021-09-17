document.querySelector(".control-button span").onclick = function () {
  let userName = prompt("What's Your Name ?");

  if (userName == null || userName == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = userName;
  }

  document.querySelector(".control-button").remove();
};

let duration = 1000;

let blocksContainer = document.querySelector(".blocks-container");

let blocksArray = Array.from(blocksContainer.children);

let indexArray = [...Array(blocksArray.length).keys()];

shuffling(indexArray);

blocksArray.forEach((block, index) => {
  block.style.order = indexArray[index];

  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

function shuffling(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");

  let flipedBlockArray = blocksArray.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  if (flipedBlockArray.length === 2) {
    stopClicking();

    checkFlipped(flipedBlockArray[0], flipedBlockArray[1]);
  }
}

function stopClicking() {
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

function checkFlipped(firstBlock, secondBlock) {
  let tries = document.querySelector(".no-tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}
