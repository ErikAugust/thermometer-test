export class Thermometer {
  private currentTemperatureCelsius: number = 0;

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