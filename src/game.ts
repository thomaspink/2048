(function (global, doc) {
  const BG_COLOR = '#fff8dd';
  const GRID_COLOR = '#f7f3e4';

  const cols = 4;
  const rows = 4;
  const gutterSize = 4;
  let biggestCol = 0;
  let sum = 0;

  /** Need key codes */
  enum KeyCodes {
    ArrowLeft = 37,
    ArrowUp = 38,
    ArrowRight = 39,
    ArrowDown = 40,
  }

  function insertRandomCol(field: number[]) {
    const emptyIdx = field.map((c, i) => !c ? i : null).filter(c => c !== null);
    const idx = Math.floor(Math.random() * emptyIdx.length);
    field[emptyIdx[idx]] = 2;
  }

  function updateVars(field: number[]) {
    sum = 0;
    for (let i = 0; i < field.length; i++) {
      const col = field[i];
      if (col > biggestCol) biggestCol = col;
      sum += col;
    }
  }

  function move(field: number[]) {
    for (let i = field.length; i >= 0; --i) {}
  }

  function handleKeydown(evt: KeyboardEvent) {
    switch (evt.keyCode) {
      case KeyCodes.ArrowUp:
        break;
      case KeyCodes.ArrowDown:
        break;
      case KeyCodes.ArrowLeft:
        break;
      case KeyCodes.ArrowRight:
        break;
    }
  }

  function rowColForIndex(idx: number) {
    const row = Math.floor(idx/rows)
    return { row, col: (idx - (row * rows))};
  }

  function draw(el: HTMLCanvasElement,ctx: CanvasRenderingContext2D, field: number[]) {
    const cWidth = el.width;
    const cHeight = el.height;
    const colWidth = (cWidth-((cols+1) * gutterSize))/cols;
    const colHeight = (cHeight-((rows+1) * gutterSize))/rows;
    const fontSize = colHeight / 3;

    console.log(field);

    // Draw the background color
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, cWidth, cHeight);

    // Draw background grid
    ctx.fillStyle = GRID_COLOR;
    // Draw horizontal grid lines
    for (let i = 0; i < cols + 1; i++) {
      ctx.fillRect(i * colWidth + i * gutterSize, 0, gutterSize, cHeight);
    }
    // Draw vertical grid lines
    for (let i = 0; i < rows + 1; i++) {
      ctx.fillRect(0, i * colHeight + i * gutterSize, cWidth, gutterSize);
    }

    for (let i = 0; i < field.length; i++) {
      const no = field[i];
      if (!no) continue;
      const {row, col} = rowColForIndex(i);
      console.log(row, col);

      ctx.fillStyle = '#f1d980';
      const x = col * colWidth + gutterSize * (col + 1);
      const y = row * colHeight + gutterSize * (row + 1);
      ctx.fillRect(x, y, colWidth, colHeight);

      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.font = `${colHeight / 3}px Arial, san-serif`;
      ctx.fillText(no+'', x + (colWidth / 2), y + (colHeight / 2) + (fontSize / 3));
    }
  }

  function main(canvasElementOrId: HTMLCanvasElement | string) {

    let canvasEl: HTMLCanvasElement;
    if (canvasElementOrId instanceof HTMLCanvasElement) {
      canvasEl = canvasElementOrId;
    } else if (typeof canvasElementOrId === 'string') {
      canvasEl = doc.getElementById(canvasElementOrId) as HTMLCanvasElement;
    }

    const canvasCtx = canvasEl.getContext('2d');

    // Create a new field
    const field = (new Array(cols * rows)).fill(0);

    // Insert two random cols
    insertRandomCol(field);
    insertRandomCol(field);

    // Listen to key events on the document
    doc.addEventListener('keydown', ev => handleKeydown(ev));

    draw(canvasEl, canvasCtx, field);
  }

  main('field');
})(window, window.document);
