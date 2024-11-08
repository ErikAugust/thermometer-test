import { Thermometer } from '../thermometer';

describe('Thermometer', () => {
  test('should initialize with default temperature of 0°C', () => {
    const thermometer = new Thermometer();
    expect(thermometer.getTemperatureCelsius()).toBe(0);
    expect(thermometer.getTemperatureFahrenheit()).toBe(32);
  });
});