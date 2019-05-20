import { DrawCoordinate, RGB } from './misc';

export class DrawingBrushManager {
  currentBrush: any;
  pencilBrush : PencilBrush = new PencilBrush();
  fillBrush : FillBrush = new FillBrush();
  eraserBrush : EraserBrush = new EraserBrush();

  constructor() {
    this.currentBrush = this.pencilBrush;
  }

  setBrushType(type: number): void {
    switch (type) {
      case 0:
        this.currentBrush = this.pencilBrush;
        break;
      case 1:
        this.currentBrush = this.fillBrush;
        break;
      case 2:
        this.currentBrush = this.eraserBrush;
        break;
      default:
        this.currentBrush = this.pencilBrush;
        break;
    }
  }

  draw(): void {
    this.currentBrush.draw();
  }

  setup(): void {
    this.currentBrush.setup();
  }
}

abstract class Brush {
  type: number;
  color: RGB;
  ctx: any;
  drawingCanvas: any;
  offsetRect: any;
  currentCoordinate: DrawCoordinate = new DrawCoordinate();

  setup(): void {
    this.drawingCanvas = document.getElementById("drawingCanvas");
    this.ctx = this.drawingCanvas.getContext("2d");
    this.offsetRect = this.drawingCanvas.getBoundingClientRect();
    console.log("brush setup", this.drawingCanvas);

    // JJV DEBUG TEST
    this.ctx.globalAlpha = 1.0;
    this.ctx.strokeStyle = "#ccffcc";
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(100, 100);
    for (let i = 101; i <= 500; i++ ) {
      this.ctx.lineTo(i, i);
      this.ctx.stroke();
    }
  }

  abstract draw(): void;
}

export class PencilBrush extends Brush {
  constructor() {
    super();
  }

  draw(): void {
    console.log("pencil draw");
  }
}

export class FillBrush extends Brush {
  constructor() {
    super();
  }

  draw(): void {
    console.log("fill draw");
  }
}

export class EraserBrush extends Brush {
  constructor() {
    super();
  }

  draw(): void {
    console.log("eraser draw");
  }
}