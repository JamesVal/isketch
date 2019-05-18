import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

class DrawCoordinate {
  m_x: number;
  m_y: number;

  setCoordinate(x: number, y: number): void {
    this.m_x = x;
    this.m_y = y;
  }

  getX(): number {
    return this.m_x;
  }

  getY(): number {
    return this.m_y;
  }
}

interface RGB {
  red: number;  
  green: number;  
  blue: number;  
}

class Brush {
  type: number;
  color: RGB;
}

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  allowDraw: boolean = false;
  ctx: any;
  drawingCanvas: any;
  offsetRect: any;
  brushType: number = 0;
  brushColor: RGB;
  pixelArray: any;
  lastCoordinate: DrawCoordinate = new DrawCoordinate();
  currentCoordinate: DrawCoordinate = new DrawCoordinate();

  getColorIndicesForCoord(x: number, y: number) {
    const red = y * (700 * 4) + x * 4;
    return [red, red + 1, red + 2, red + 3];
  }

  async colorPixelSet(startPixel: DrawCoordinate, newColor: RGB, originalColor: RGB) {
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
          var [redIndex, greenIndex, blueIndex, alphaIndex] = this.getColorIndicesForCoord(currentPixels[currIdx].getX() - this.offsetRect.left + nextMapping[nextIdx][0], currentPixels[currIdx].getY() - this.offsetRect.top + nextMapping[nextIdx][1]);

          if ((this.pixelArray.data[redIndex] == originalColor.red) && (this.pixelArray.data[greenIndex] == originalColor.green) && (this.pixelArray.data[blueIndex] == originalColor.blue)) {
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

  fillAreaWithColor(startPixel: DrawCoordinate, newColor: RGB, originaColor: RGB): void {
    this.pixelArray = this.ctx.getImageData(0, 0, 700, 700);
    console.log(this.pixelArray);
    this.colorPixelSet(startPixel, newColor, originaColor);
    this.ctx.putImageData(this.pixelArray, 0, 0);

    // Color Check
    /*
    for (let i = 0; i < this.pixelArray.data.length; i+4) {
      if ((this.pixelArray.data[i] != 255) && (this.pixelArray.data[i] != 0)) console.log(this.pixelArray.data[i]);
    }
    */
  }

  setBrush(type: number): void {
    this.brushType = type;
  }

  mouseOver($event): void {
    console.log("mouseover?");
  }

  mouseLeave($event): void {
    console.log("mouseleave?", $event );
  }

  mouseUp($event): void {
    this.allowDraw = false;
  }

  mouseDown($event): void {
    this.allowDraw = true;
    if (this.brushType == 0) this.lastCoordinate.setCoordinate($event.clientX, $event.clientY);
    if (this.brushType == 1) {
      var pixel = this.ctx.getImageData($event.clientX - this.offsetRect.left, $event.clientY - this.offsetRect.top, 1, 1);
      var data = pixel.data;
      var startPixel = new DrawCoordinate();
      startPixel.setCoordinate($event.clientX, $event.clientY);
      this.fillAreaWithColor(startPixel, {red: 255, green: 0, blue: 0}, {red: data[0], green: data[1], blue: data[2]});
    }
  }

  mouseMove($event): void {

    if (this.brushType == 1) return;

    console.log("mouseMove", $event);

    if (!this.allowDraw) return;

    this.currentCoordinate.setCoordinate($event.clientX, $event.clientY);
    
    this.ctx.globalAlpha = 1.0;
    this.ctx.strokeStyle = "#ccffcc";
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastCoordinate.getX() - this.offsetRect.left, this.lastCoordinate.getY() - this.offsetRect.top);
    this.ctx.lineTo(this.currentCoordinate.getX() - this.offsetRect.left, this.currentCoordinate.getY() - this.offsetRect.top);
    this.ctx.stroke();
    this.lastCoordinate.setCoordinate(this.currentCoordinate.getX(), this.currentCoordinate.getY());;
  }

  iniitializeCanvas(): void {
    this.ctx.globalAlpha = 1.0;
    //ctx.fillStyle = "#00004d";
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0,0,this.drawingCanvas.width, this.drawingCanvas.height);

    /* JJV DEBUG - trying things */
    this.lastCoordinate.setCoordinate(0, 0);
  }

  clearCanvas(): void {
    this.iniitializeCanvas();
  }

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.drawingCanvas = document.getElementById("drawingCanvas");
    this.ctx = this.drawingCanvas.getContext("2d");
    this.offsetRect = this.drawingCanvas.getBoundingClientRect();
    this.iniitializeCanvas();
  }

}
