const MAX_GRID = 4;
const GEMS = [
    "/assets/images/gem-1.png",
    "/assets/images/gem-2.png",
    "/assets/images/gem-3.png",
    "/assets/images/gem-4.png",
    "/assets/images/gem-5.png",
    "/assets/images/gem-6.png",
    "/assets/images/gem-7.png",
    "/assets/images/gem-8.png",
];
const ERROR_WAIT_MS = 500;
const COUNT_CONFETTI_START = 10;
const WAIT_BETWEEN_CONFETTI = 4000;
let cubes = [];
let grid = [];
let selectedCube = null;
let isLoading = false;
let timerConfetti;
let gamePlaying = false;
let numberOfAttempts = 0;

(function () {
    setupGame();
})();

function setupGame() {
    resetGame();
    setupGrid();
    setUpRandom();
    gamePlaying = true;
}

function setupGrid() {
    for (let i = 0; i < grid.length; i++) {
        const row = grid[i];
        for (let j = 0; j < MAX_GRID; j++) {
            const { cube, inner, front, back, img } = createCube(row);
            img.src = GEMS[0];
            const newCube = new Cube(cube, inner, front, back, img, 0);
            cubes.push(newCube);

            cube.addEventListener('click', (e) => {
                onClickCard(newCube);
            });
        }
    }
}

function setUpRandom() {
    const alreadyHasValue = [];
    for (let i = 0; i < 8; i++) {
        let random1 = null;
        do {
            random1 = parseInt(Math.random() * cubes.length);
        } while (alreadyHasValue.includes(random1))
        alreadyHasValue.push(random1);

        let random2 = null;
        do {
            random2 = parseInt(Math.random() * cubes.length);
        } while (alreadyHasValue.includes(random2))

        alreadyHasValue.push(random2);
        cubes[random1].setValue(i);
        cubes[random1].setImg(GEMS[i]);
        cubes[random2].setValue(i);
        cubes[random2].setImg(GEMS[i]);
    }
}

function resetGame() {
    hideEndUi();
    const main = document.querySelector("main");
    main.innerHTML = "";
    grid = [];
    cubes = [];
    numberOfAttempts = 0;

    clearInterval(timerConfetti);
    for (let i = 0; i < MAX_GRID; i++) {
        const row = createRow();
        grid.push(row);
    }
}

function createRow() {
    const main = document.querySelector("main");
    const row = document.createElement("div");
    row.classList.add("row");
    main.appendChild(row);
    return row;
}

function createCube(row) {
    const cube = document.createElement("div");
    cube.classList.add("cube");
    const { inner, front, back, img } = createInnerCube(cube);
    row.appendChild(cube);
    return {
        cube: cube,
        inner: inner,
        front: front,
        back: back,
        img: img,
    };
}

function createInnerCube(cube) {
    const inner = document.createElement("div");
    inner.classList.add("inner");
    cube.appendChild(inner);
    const { front, back, img } = createFrontAndBack(inner);
    return {
        inner: inner,
        front: front,
        back: back,
        img,
    };
}

function createFrontAndBack(innerCube) {
    const front = document.createElement("div");
    front.classList.add("front");
    const back = document.createElement("div");
    back.classList.add("back");
    const img = document.createElement("img");
    back.appendChild(img);
    innerCube.appendChild(front);
    innerCube.appendChild(back);

    return {
        front: front,
        back: back,
        img: img,
    };
}

function onClickCard(cube) {
    if (isLoading || cube.isSuccess || cube === selectedCube) return;
    cube.addRotateCube();
    checkSelectedCube(cube);
}

function checkSelectedCube(cube) {
    if (!selectedCube) {
        setSelectedCube(cube);
        return
    }

    if (selectedCube.value === cube.value) {
        onSelectSuccess(cube);
    } else {
        onSelectError(cube);
    }
}

function onSelectSuccess(cube) {
    cube.isSuccess = true;
    selectedCube.isSuccess = true;
    setSelectedCube(null);
    playSuccessAudio();
    checkIfWinGame();
}

function onSelectError(cube) {
    isLoading = true;
    cube.errorAnim();
    numberOfAttempts += 1;
    playErrorAudio();
    setTimeout(() => {
        isLoading = false;
        selectedCube.removeRotateCube();
        cube.removeRotateCube();
        setSelectedCube(null);
    }, ERROR_WAIT_MS);
}

function setSelectedCube(cube) {
    selectedCube = cube;
}

function checkIfWinGame() {
    let isWin = true;
    for (let i = 0; i < cubes.length; i++) {
        if (!cubes[i].isSuccess) {
            isWin = false;
            return
        }
    }

    if (!isWin) {
        return;
    }

    gamePlaying = false;
    showEndUi();
    playConfettiEffect();
}

function playConfettiEffect() {
    playCrowdCheerAudio();
    playFireworksAudio();
    for (let i = 0; i < COUNT_CONFETTI_START; i++) {
        confettiEffect();
    }

    timerConfetti = setInterval(() => {
        playFireworksAudio();
        confettiEffect();
    }, WAIT_BETWEEN_CONFETTI)
}

function confettiEffect() {
    confetti({
        particleCount: 150,
        spread: 360,
        origin: {
            x: Math.random(),
            y: Math.random() - 0.2
        }
    });
}

function hideEndUi() {
    document.querySelector('#play-again').classList.add('d-none');
    document.querySelector('#result').classList.add('d-none');
}

function showResultUi() {
    document.querySelector('#result').innerHTML = `Attempts: ${numberOfAttempts}`;
}

function showEndUi() {
    document.querySelector('#play-again').classList.remove('d-none');
    document.querySelector('#result').classList.remove('d-none');
    showResultUi();
}

function onClickRestart() {
    playClickAudio();
    setupGame();
}