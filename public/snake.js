import { block } from './block.js';
import { food } from './food.js';
import { messageBoard } from './messageBoard.js'

export class snake {
  constructor(
    blockSize /*block size in pixels */,
    width, /* numbers of block spaces in one row */
    height, /* numbers of block spaces in one column */
    frameTime,
    minFrameTime,
    updateRate
  ) {
    this.blockSize = blockSize;
    this.width = width;
    this.height = height;

    this.snakediv = document.createElement('div');
    this.snakediv.setAttribute('class', 'snake');
    this.snakediv.style.setProperty('--snake-block-size', blockSize + 'px');
    this.snakediv.style.setProperty('--snake-num-blocks-w', width);
    this.snakediv.style.setProperty('--snake-num-blocks-h', height);
    document.body.appendChild(this.snakediv);

    this.msgBoard = new messageBoard();
    this.snakediv.appendChild(this.msgBoard.domObj);

    window.addEventListener('click', (ev) => { this.startgame(ev) })
    window.addEventListener('keydown', (ev) => { this.changedirection(ev.key) })

    this.initBaseSnake();

    this.direction = { x: 1, y: 0 };
    this.lastdirection = this.direction;
    this.updateFrameTime(frameTime, updateRate);
    this.minFrameTime = minFrameTime;
    this.updateRate = updateRate;

    this.food = new food(this);
    this.snakediv.appendChild(this.food.getspan());
  }

  initBaseSnake() {
    this.head = new block(new point(this.width / 2 - 1, this.height / 2 - 1), this);
    let second = new block(new point(this.width / 2 - 2, this.height / 2 - 1), this);
    this.last = new block(new point(this.width / 2 - 3, this.height / 2 - 1), this);

    this.head.next = second;
    second.next = this.last;

    this.snakediv.appendChild(this.head.getspan());
    this.snakediv.appendChild(second.getspan());
    this.snakediv.appendChild(this.last.getspan());

    this.spaceLeft = this.width * this.height - 3;
  }

  startgame(event) {
    if (!this.active) {
      this.active = true;
      this.msgBoard.hide();
      this.move();
    } else {
      this.processClick(event);
    }
  }

  processClick(event) {
    let midX = window.innerWidth / 2;
    let y = event.clientX * (window.innerHeight / window.innerWidth);
    let keyEquivalent;
    if (event.clientX > midX) {
      if (event.clientY < y) {
        if (event.clientY > window.innerHeight - y)
        keyEquivalent = 'ArrowRight';
        else 
        keyEquivalent = 'ArrowUp';
      }
      else 
      keyEquivalent = 'ArrowDown';
    }
    if (event.clientX <= midX) {
      if (event.clientY < window.innerHeight - y) {
        if (event.clientY > y)
        keyEquivalent = 'ArrowLeft';
        else 
        keyEquivalent = 'ArrowUp';
      }
      else 
      keyEquivalent = 'ArrowDown';
    }
    this.changedirection(keyEquivalent);
  }

  func(x) {
    k = window.innerHeight / window.innerWidth;
    y = x * k;
  }

  updateFrameTime(newtime) {
    this.frametime = newtime;
    this.snakediv.style.setProperty('--snake-tick-time', Math.floor(newtime) + 'ms');
  }

  move() {
    setTimeout(() => {
      if (!this.nextDirection) {
        if (this.lastdirection.x + this.direction.x != 0 /*true if opposite direction*/)
          this.nextDirection = this.direction;
        else
          this.nextDirection = this.lastdirection;
      }

      let newPoint = new point(this.head.point.x + this.nextDirection.x, this.head.point.y + this.nextDirection.y);
      if (newPoint.exceedsBoundaries(this.width, this.height)) {
        this.signifyCollision();
        this.msgBoard.announceLoss();
        return;
      }

      let oldLastCoordinates = this.repositionSnake(newPoint, this.head);

      if (newPoint.equalTo(this.food.point)) {
        this.last.next = new block(oldLastCoordinates, this);
        this.last = this.last.next;
        this.snakediv.appendChild(this.last.getspan());
        if (--this.spaceLeft == 0) {
          this.msgBoard.announceVictory();
          return;
        }
        this.food.relocate();
        this.updateFrameTime(Math.max(this.minFrameTime, this.frametime * this.updateRate));
      } else if (this.head.point.hitABlock(this.head.next)) {
        this.msgBoard.announceLoss();
        this.signifyCollision();
        return;
      }

      this.move();
      this.lastdirection = this.nextDirection;
      this.nextDirection = null;
    }, this.frametime);
  }

  repositionSnake(newPoint, head) {
    let cur = head;
    let nextPoint;
    while (cur != null) {
      nextPoint = cur.point;
      cur.point = newPoint;
      this.updateDomElement(cur);
      newPoint = nextPoint;
      cur = cur.next;
    }
    return nextPoint;
  }

  changedirection(key) {
    if (key === 'ArrowUp') {
      this.direction = { x: 0, y: -1 };
      if (this.lastdirection.y != 1 && this.nextDirection == null)
        this.nextDirection = this.direction;
    }
    else if (key === 'ArrowLeft') {
      this.direction = { x: -1, y: 0 };
      if (this.lastdirection.x != 1 && this.nextDirection == null)
        this.nextDirection = this.direction;
    }
    else if (key === 'ArrowRight') {
      this.direction = { x: 1, y: 0 };
      if (this.lastdirection.x != -1 && this.nextDirection == null)
        this.nextDirection = this.direction;
    }
    else if (key === 'ArrowDown') {
      this.direction = { x: 0, y: 1 };
      if (this.lastdirection.y != -1 && this.nextDirection == null)
        this.nextDirection = this.direction;
    }
  }

  updateDomElement(elem) {
   // elem.domObj.style.setProperty('transform', 'translate(' + elem.point.x * this.blockSize + 'px, ' + elem.point.y * this.blockSize + 'px)');
   elem.domObj.style.setProperty('--x',  elem.point.x * this.blockSize + 'px');
   elem.domObj.style.setProperty('--y',  elem.point.y * this.blockSize + 'px');
   
  }

  signifyCollision() {
    this.head.domObj.style.zIndex = 1;
    this.head.domObj.style.setProperty('background-color', 'rgb(255, 87, 87)');
  }

}

export class point {
  constructor(x, y) {
    this.x = Math.floor(x);
    this.y = Math.floor(y);
  }

  equalTo(other) {
    return this.x === other.x && this.y == other.y;
  }

  exceedsBoundaries(width, height) {
    if (this.y < 0 || this.y >= height || this.x < 0 || this.x >= width) {
      return true;
    }
    return false;
  }

  hitABlock(block) {
    while (block != null) {
      if (block.point.x == this.x && block.point.y == this.y) {
        return true;
      }
      block = block.next;
    }
    return false;
  }
}