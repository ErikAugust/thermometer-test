import { Thermometer } from '../thermometer';

describe('Thermometer', () => {
  test('should initialize with default temperature of 0°C', () => {
    const thermometer = new Thermometer();
    expect(thermometer.getTemperatureCelsius()).toBe(0);
    expect(thermometer.getTemperatureFahrenheit()).toBe(32);
  });

  test('should update temperature and provide readings in Celsius and Fahrenheit', () => {
    const thermometer = new Thermometer();
    thermometer.updateTemperature(25);
    expect(thermometer.getTemperatureCelsius()).toBe(25);
    expect(thermometer.getTemperatureFahrenheit()).toBe(77);
  });
});