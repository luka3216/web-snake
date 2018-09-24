import {point} from './snake.js'

export class food {
  constructor(snakegame) {
    this.snakegame = snakegame;
    this.domObj = document.createElement('span');
    this.domObj.setAttribute('class', 'snake-food');
    this.domObj.style.position = 'absolute';
    this.relocate();
  }

  getspan() {
    return this.domObj;
  }

  relocate() {
    do {
      this.point = new point(
         Math.floor(Math.random() * this.snakegame.width),
         Math.floor(Math.random() * this.snakegame.height)
      );
    } while (this.blockshere())

    this.snakegame.updateDomElement(this);
  }

  blockshere() {
    let block = this.snakegame.head;
    while (block != null) {
      if (block.point.equalTo(this.point))
        return true;
      block = block.next;

    }
    return false;
  }
}