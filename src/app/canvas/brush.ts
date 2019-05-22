import { DrawCoordinate, RGB } from './misc';

export class DrawingBrushManager {
  currentBrush: any;
  brushType: Number = 0;
  pencilBrush : PencilBrush = new PencilBrush();
  fillBrush : FillBrush = new FillBrush();
  eraserBrush : EraserBrush = new EraserBrush();

  constructor() {
    this.currentBrush = this.pencilBrush;
  }

  setBrushType(type: number): void {
    this.brushType = type;
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

  setup(): void {
    this.pencilBrush.setup();
    this.fillBrush.setup();
    this.eraserBrush.setup();
  }

  startDraw($event): void {
    this.currentBrush.startDraw($event);
  }

  draw($event): void {
    this.currentBrush.draw($event);
  }

  endDraw(): void {
    this.currentBrush.endDraw();
  }
}

abstract class Brush {
  color: RGB;
  ctx: any;
  drawingCanvas: any;
  offsetRect: any;
  allowDraw: boolean = false;
  currentCoordinate: DrawCoordinate = new DrawCoordinate();

  setup(): void {
    this.drawingCanvas = document.getElementById("drawingCanvas");
    this.ctx = this.drawingCanvas.getContext("2d");
    this.offsetRect = this.drawingCanvas.getBoundingClientRect();
  }

  startDraw($event): void {
    this.allowDraw = true;
  }

  abstract draw($event): void;

  endDraw(): void {
    this.allowDraw = false;
  }
}

class PencilBrush extends Brush {
  constructor() {
    super();
  }

  startDraw($event): void {
    super.startDraw($event);

    this.ctx.globalAlpha = 1.0;
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo($event.clientX - this.offsetRect.left, $event.clientY - this.offsetRect.top)
    this.draw($event);
  }

  draw($event): void {
    if (!this.allowDraw) return;

    this.currentCoordinate.setCoordinate($event.clientX, $event.clientY);
    this.ctx.lineTo(this.currentCoordinate.getX() - this.offsetRect.left, this.currentCoordinate.getY() - this.offsetRect.top);
    this.ctx.stroke();
  }
}

class FillBrush extends Brush {
  pixelArray: any;

  getColorIndicesForCoord(x: number, y: number) {
    var red = Math.floor(y) * (700 * 4) + Math.floor(x) * 4;
    return [red, red + 1, red + 2, red + 3];
  }

  pixelInRange(pixelColor: RGB, originalColor: RGB) {
    if (
      ((pixelColor.red >= (originalColor.red - 16)) && (pixelColor.red <= (originalColor.red + 16))) && 
      ((pixelColor.green >= (originalColor.green - 16)) && (pixelColor.green <= (originalColor.green + 16))) &&
      ((pixelColor.blue >= (originalColor.blue - 16)) && (pixelColor.blue <= (originalColor.blue + 16)))
    ) {
      return true;
    } else {
      return false;
    }
  }

  colorPixelSet(startPixel: DrawCoordinate, newColor: RGB, originalColor: RGB) {
    var nextPixels = [];
    var currentPixels = [startPixel];
    var nextMapping = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ];

    while (true) {
      nextPixels = [];

      for (let currIdx = 0; currIdx < currentPixels.length; currIdx++) {
        var [redIndex, greenIndex, blueIndex, alphaIndex] = this.getColorIndicesForCoord(currentPixels[currIdx].getX() - this.offsetRect.left, currentPixels[currIdx].getY() - this.offsetRect.top);
        
        if ((this.pixelArray.data[redIndex] == newColor.red) && (this.pixelArray.data[greenIndex] == newColor.green) && (this.pixelArray.data[blueIndex] == newColor.blue)) continue;

        this.pixelArray.data[redIndex] = newColor.red;
        this.pixelArray.data[greenIndex] = newColor.green;
        this.pixelArray.data[blueIndex] = newColor.blue;

        for (let nextIdx = 0; nextIdx < nextMapping.length; nextIdx++) {       
          var [redIndex, greenIndex, blueIndex] = this.getColorIndicesForCoord(currentPixels[currIdx].getX() - this.offsetRect.left + nextMapping[nextIdx][0], currentPixels[currIdx].getY() - this.offsetRect.top + nextMapping[nextIdx][1]);

          if (this.pixelInRange({red: this.pixelArray.data[redIndex], green: this.pixelArray.data[greenIndex], blue: this.pixelArray.data[blueIndex]}, originalColor)) {
            var pixelToAdd = new DrawCoordinate();
            pixelToAdd.setCoordinate(currentPixels[currIdx].getX() + nextMapping[nextIdx][0], currentPixels[currIdx].getY() + nextMapping[nextIdx][1]);
            nextPixels.push(pixelToAdd);
          }
        }
      }
      if (nextPixels.length == 0) break;
      currentPixels = nextPixels;
    }

  }

  fillAreaWithColor(startPixel: DrawCoordinate, newColor: RGB, originalColor: RGB): void {
    this.pixelArray = this.ctx.getImageData(0, 0, 700, 700);
    this.colorPixelSet(startPixel, newColor, originalColor);
    this.ctx.putImageData(this.pixelArray, 0, 0);
  }

  constructor() {
    super();
  }

  startDraw($event): void {   
    var pixel = this.ctx.getImageData($event.clientX - this.offsetRect.left, $event.clientY - this.offsetRect.top, 1, 1);
    var data = pixel.data;
    var startPixel = new DrawCoordinate();
    startPixel.setCoordinate($event.clientX, $event.clientY);
    this.fillAreaWithColor(startPixel, {red: 255, green: 0, blue: 0}, {red: data[0], green: data[1], blue: data[2]});
  }

  draw($event): void {
  }
}

class EraserBrush extends Brush {
  constructor() {
    super();
  }

  draw(): void {
  }
}