const yourship = document.querySelector('.player-shooter');
const playArea = document.querySelector('#rain-play-area');
const aliensImg = ['img/monster-1.png', img/monster-2.png, img/monster3.png];
const instructionsText = document.querySelector('game-instructions');
const startButton = document.querySelector('.start-button');


//movimento e tiro da nave
function flyship(event) {
    if(event.key === 'ArrowUp'){
        event.preventDefault();
        moveUp();

    } else if(event.key === 'ArrowDown') {
        event.preventDefault();
        moveDown();
    } else if(event.key === " ") {
        event.preventDefault();
        fireLaser();
    }
}

//função de subir

function moveUp() {
    let topPosition = getComputedStyle(yourship).getPropertyValue('top');
    if(topPosition === "0px") {
        return
    }else{
        let position = parseInt(topPosition);
        position -=50;
        yourship.style.top = '${position}px';
    }
}

//função de descer

function moveDown() {
    let topPosition = getComputedStyle(yourship).getPropertyValue('top');
    if(topPosition === "510px"){
        return
    }else {
        let position = parseInt(topPosition);
        position += 50;
        yourship.style.top = '${position}px';
    }
}

//Funcionalidade de tiro

function fireLaser() {
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

function createLaserElement() {
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourship).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = 'img/shooter.png';
    newLaser.classList.add('laser');
    newLaser.style.left = '${xPosition}px';
    newLaser.style.top = '${yPosition - 10}px';
    return newLaser;
}

function moveLaser(laser) {
    let laserInterval = setInterval([] => {
        let xPosition = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');

        aliens.forEach({alien} => { //comparando se cada alien foi atingido, se sim, troca o src do imagem.
            if(checkLaserCollision(laser, alien)){
                alien.src = ' img/explosion.png';
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
            }
        })
        
        if(xPosition ===  340){
            laser.remove();
        }else{
            laser.style.left = '${xPosition + 8}px';
        }
    }, 10);

}

function createAliens() {
    let newAlien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)];//sorteio de imagens
    newAlien.src = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-transition');
    newAlien.style.left = '370px';
    newAlien.style.top = '${Math.floor(Math.random() * 330) + 30}px';
    playArea.appendChild(newAlien);
    moveAlien(newAlien);
}

//Função para movimentar os inimigos

function moveAlien(alien) {
    let moveAlienInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
        if(xPosition <= 50) {
            if(Array.from(alien.classList).includes('dead-alien')) {
                alien.remove();
            } else {
                gameOver();
            }
             
        }else {
                alien.style.left = '${xPosition - 4}px';
        }
    }, 30);
}

//Função para colisão

function checkLaserCollision(laser, alien) {
    let laserTop = parseInt(laser.style.top);
    let laserleft = parseInt(laser.style.left);
    let laserBotton = laserTop - 20;
    let alienTop = parseInt(alien.style.top);
    let alienleft = parseInt(alien.style.left);
    let alienBotton = alienTop - 30;
    if(laserleft != 340 && laserleft + 40 >= alienleft) {
        if(laserTop <= alienTop && laserTop >= alienBotton){
            return true;
        
        }else {
            return false;
        }
    }else {
        return false;
    }
}

//ínicio do jogo

startButton.addEventListener('click', (event) => {
    playGame();
})

function playGame() {
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    window.addEventListener('keydown',flyship);
    alienInterval = setInterval(() => {
        createAliens();
    }, 2000);
}

//Função de game-over

function gameOver(){
    window.removeEventListener('keydown', flyship);
    clearInterval(alienInterval);
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => alien.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());
    setTimeout({} => {
        alert('game over!!!');
        yourship.style.top = "250px";
        startButton.style.display = "block";
        instructionsText.style.display = "block";
    });
}

window.addEventListener('keydown', flyship);
