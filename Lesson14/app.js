const DomElement = function (selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width  = width;
  this.bg = bg;
  this.fontSize = fontSize;
};

DomElement.prototype.createEl = function (str = '') {
  if (this.selector[0] === '.') {
      let crDiv = document.createElement('div');
      crDiv.classList = this.selector.slice(1);
      crDiv.innerText = str;
      crDiv.style.cssText = `
        height: ${this.height};
        width: ${this.width};
        background: ${this.bg};
        font-size: ${this.fontSize};
        `;
      document.body.append(crDiv);
  } else if (this.selector[0] === '#') {
      let crP = document.createElement('p');
      crP.id = this.selector.slice(1);
      crP.innerText = str;
      crP.style.cssText = `
        height: ${this.height};
        width: ${this.width};
        background: ${this.bg};
        font-size: ${this.fontSize};
        `;
      document.body.append(crP);
  }
};

let square = new DomElement('.square', '100px', '100px', 'yellow');

document.addEventListener('DOMContentLoaded', square.createEl());

let squareEl = document.querySelector('.square');
squareEl.style.position = 'absolute';

document.addEventListener('keydown', (e) => {
  e.preventDefault;
  if (e.key === 'ArrowDown') {
    squareEl.style.top = (parseInt(getComputedStyle(squareEl).top, 10) + 10) + 'px';
  } else if (e.key === 'ArrowUp') {
    squareEl.style.top = (parseInt(getComputedStyle(squareEl).top, 10) - 10) + 'px';
  } else if (e.key === 'ArrowLeft') {
    squareEl.style.left =  (parseInt(getComputedStyle(squareEl).left, 10) - 10) + 'px';
  } else if (e.key === 'ArrowRight') {
    squareEl.style.left = (parseInt(getComputedStyle(squareEl).left, 10) + 10) + 'px';
  };
});