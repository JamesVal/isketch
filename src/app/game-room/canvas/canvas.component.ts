import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { DrawingBrushManager } from './brush';
import { DrawCoordinate, RGB } from './misc';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  ctx: any;
  drawingCanvas: any;
  color: string;
  drawingBrush: DrawingBrushManager = new DrawingBrushManager();

  setBrush(type: number): void {
    this.drawingBrush.setBrushType(type);
  }

  mouseLeave($event): void {
    this.drawingBrush.endDraw();
  }

  mouseDown($event): void {
    this.drawingBrush.startDraw($event);
  }

  mouseMove($event): void {
    this.drawingBrush.draw($event);
  }

  mouseUp($event): void {
    this.drawingBrush.endDraw();
  }

  initializeCanvas(): void {
    this.ctx.globalAlpha = 1.0;
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0,0,this.drawingCanvas.width, this.drawingCanvas.height);
  }

  clearCanvas(): void {
    this.initializeCanvas();
  }

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.drawingCanvas = document.getElementById("drawingCanvas");
    this.ctx = this.drawingCanvas.getContext("2d");
    this.initializeCanvas();
    this.drawingBrush.setup();
  }

}
