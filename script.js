//default
const defaultCat = document.getElementById("lottie-home");
const pawPath = "https://assets2.lottiefiles.com/packages/lf20_ypqxhono.json";
const button = document.querySelector("button");
const viewWidth = window.innerWidth;
const PAW_CURSOR = "fa-paw.png";
const randomDuration = Math.floor(Math.random() * 4) + 2;
const randomX = Math.floor(Math.random() * 100) + 100;

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
  showDefaultCat();
  setCursor();
  hideButton().then(() => {
    window.addEventListener("click", handleWindowClick);
  });//prevent event fire if button is still visible 
}

function handleWindowClick(e) {
  createCatAnim(e.clientX, e.clientY);
}

function createCatAnim(x, y) {
  const catContainer = document.createElement("div");
  catContainer.style.cssText = `position: absolute; width: 150px; left: ${x}px; top: ${y}px`;
  document.body.appendChild(catContainer);

  const animalArray = ['https://assets4.lottiefiles.com/datafiles/SCyXtpEBCwgeaNi/data.json', 'https://assets4.lottiefiles.com/packages/lf20_8nP71q.json', 'https://lottie.host/0af5520b-743c-4545-bbca-9ca7517e20bb/HYiQlMsf2M.json','https://lottie.host/61cf7177-1b86-4781-9110-c920f4ce0ed4/5Hxcmw1OeB.json', 'https://assets3.lottiefiles.com/packages/lf20_kehwtvbf.json', 'https://lottie.host/6c5eb6c0-5646-44aa-b4c2-884d6b4d7a21/2oKWmSB1en.json','https://assets3.lottiefiles.com/packages/lf20_xBGyhl.json']

  //can you also get animation time of each items in array? 
  const randomIndex = Math.floor(Math.random() * animalArray.length);
  
  const catAnim = lottie.loadAnimation({
    container: catContainer,
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: animalArray[randomIndex]
  });
 
  const isLeftSide = x < viewWidth / 2;
  const direction = isLeftSide ? 1 : -1;
  moveCat(catContainer, direction);

  if (!isLeftSide) {
    catContainer.style.transform = "rotateY(180deg)";
  }

}


function showDefaultCat() {
  const defaultAnim = lottie.loadAnimation({
    container: defaultCat,
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: 'https://lottie.host/0af5520b-743c-4545-bbca-9ca7517e20bb/HYiQlMsf2M.json',
  });

  //set initial position
  defaultCat.style.cssText = `position: absolute; width: 150px; left: ${
    viewWidth / 2
  }px`;

  defaultAnim.play();

  moveCat(defaultCat, 1);
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

const moveCat = (element, int) => {
  gsap.to(element, {
    duration: randomDuration,
    x: randomX * int,
    onComplete: () => gsap.to(element, { opacity: 0 }),
  });
};
