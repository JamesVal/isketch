export interface RGB {
  red: number;  
  green: number;  
  blue: number;  
}

export class DrawCoordinate {
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