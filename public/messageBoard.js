export class messageBoard {
  constructor() {
    this.domObj = document.createElement('span');
    this.domObj.setAttribute('class', 'message-overlay');
    this.domObj.innerHTML = 'click anywhere to start';
  }

  hide() {
    this.domObj.style.display = 'none';
  }

  displayMessage(msg) {
    this.domObj.style.display = 'default';
    this.domObj.innerHTML = msg;
  }

  announceLoss() {
    this.domObj.style.setProperty('background-color', 'rgba(255, 87, 87, 0.8)');
    this.domObj.style.display = 'block';
    this.domObj.innerHTML = 'YOU LOST';
  }

  announceVictory() {
    this.domObj.style.setProperty('background-color', 'rgba(142, 243, 112, 0.8)');
    this.domObj.style.display = 'block';
    this.domObj.innerHTML = 'YOU WON';
  }
}