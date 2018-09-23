export class block {
  constructor(point, snakegame) {
    this.point = point;
    this.domObj = document.createElement('span');
    this.domObj.setAttribute('class', 'snake-block');
    this.snakegame = snakegame;;
    this.snakegame.updateDomElement(this);
  }

  getspan() {
    return this.domObj;
  }

  checkblockcollision() {
    let head = this.snakegame.head;
    let block = this.snakegame.head.next;
    while (block != null) {
      if (block.point.x == head.point.x && block.point.y == head.point.y)
        return true;
      block = block.next;
    }
    return false;
  }

  reposition(newPoint, head) {
    let cur = head;
    while (cur != null) {
      let nextPoint = cur.point;
      cur.point = newPoint;
      this.snakegame.updateDomElement(cur);
      newPoint = nextPoint;
      cur = cur.next;
    }

    if (this.checkblockcollision()) {
      return 'hitblock';
    }
    return 'fine';
  }
}