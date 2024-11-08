import { Threshold } from './types';

export class Thermometer {
  private currentTemperatureCelsius: number = 0;
  private thresholds: Threshold[] = [];

  public addThreshold(threshold: Threshold): void {
    this.thresholds.push(threshold);
  }

  public updateTemperature(temperatureCelsius: number): void {
    this.currentTemperatureCelsius = temperatureCelsius;
  }

  public getTemperatureCelsius(): number {
    return this.currentTemperatureCelsius;
  }

  public getTemperatureFahrenheit(): number {
    return this.currentTemperatureCelsius * 9 / 5 + 32;
  }

}