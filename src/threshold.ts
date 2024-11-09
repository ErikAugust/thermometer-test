export type Direction = 'rising' | 'falling' | 'both';

export class Threshold {
  public temperatureCelsius: number;
  public direction: Direction;
  public tolerance: number;
  public callback: (currentTemperatureCelsius: number) => void;
  public notified: boolean = false;

  constructor(
    temperatureCelsius: number,
    direction: Direction,
    tolerance: number,
    callback: (currentTemperatureCelsius: number) => void
  ) {
    this.temperatureCelsius = temperatureCelsius;
    this.direction = direction;
    this.tolerance = tolerance;
    this.callback = callback;
  }

  public isAbove(temp: number): boolean {
    return temp > this.temperatureCelsius + this.tolerance;
  }

  public isBelow(temp: number): boolean {
    return temp < this.temperatureCelsius - this.tolerance;
  }

  public isWithin(temp: number): boolean {
    return !this.isAbove(temp) && !this.isBelow(temp);
  }
}