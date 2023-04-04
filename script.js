//default
const defaultCat = document.getElementById("lottie-home");
const pawPath = "https://assets2.lottiefiles.com/packages/lf20_ypqxhono.json";
const button = document.querySelector("button");
const viewWidth = window.innerWidth;
const PAW_CURSOR = "fa-paw.png";

const animalArray = [
  "https://assets4.lottiefiles.com/datafiles/SCyXtpEBCwgeaNi/data.json",
  "https://assets4.lottiefiles.com/packages/lf20_8nP71q.json",
  "https://lottie.host/0af5520b-743c-4545-bbca-9ca7517e20bb/HYiQlMsf2M.json",
  "https://lottie.host/61cf7177-1b86-4781-9110-c920f4ce0ed4/5Hxcmw1OeB.json",
  "https://assets3.lottiefiles.com/packages/lf20_kehwtvbf.json",
  "https://lottie.host/6c5eb6c0-5646-44aa-b4c2-884d6b4d7a21/2oKWmSB1en.json",
  "https://assets3.lottiefiles.com/packages/lf20_xBGyhl.json",
];

let arrayIndex = 0;
const distanceFactor = 0.01;

//load paw button animation
const pawAnim = lottie.loadAnimation({
  container: button,
  renderer: "svg",
  loop: false,
  autoplay: true,
  path: pawPath,
});

//init
button.addEventListener("click", handleButtonClick);

//functions
function handleButtonClick() {
  setCursor();
  hideButton().then(() => {
    handleWindowClick();
  });
}
function handleWindowClick() {
  window.addEventListener("click", function (e) {
    arrayIndex++;
    createCatAnim(e.clientX, e.clientY);
  });
}
function setCursor() {
  const element = document.body;
  element.style.cursor = `url(${PAW_CURSOR}), auto`;
  button.style.cursor = `url(${PAW_CURSOR}), auto`;
}

function hideButton() {
  return new Promise((resolve) => {
    gsap.to(button, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        button.style.visibility = "hidden";
        resolve();
      },
    });
  });
}

function createCatAnim(x, y) {
  const catContainer = document.createElement("div");
  catContainer.style.cssText = `position: absolute; width: 150px; left: ${x}px; top: ${y}px`;
  document.body.appendChild(catContainer);

  const catAnim = lottie.loadAnimation({
    container: catContainer,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: animalArray[arrayIndex % animalArray.length], //create svg in order
  });

  const isLeftSide = x < viewWidth / 2;
  const direction = isLeftSide ? 1 : -1;
  let distance = Math.abs(viewWidth - x);

  if (!isLeftSide) {
    catContainer.style.transform = "rotateY(180deg)";
    distance = viewWidth - distance + parseInt(catContainer.style.width);
  }

  catAnim.addEventListener("data_ready", function () {
    moveCat(catContainer, distance * direction, distance * distanceFactor);
  });

  arrayIndex %= animalArray.length; //no need to reset arrayIndex, just divide it. result 0 = reset to beginning of array.
}

const moveCat = (element, xVal, dur) => {
  gsap.to(element, {
    x: xVal,
    duration: dur,
  });
};
