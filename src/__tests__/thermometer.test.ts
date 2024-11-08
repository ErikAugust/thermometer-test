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

  test('should notify when temperature crosses a defined threshold', () => {
    const thermometer = new Thermometer();
    const callback = jest.fn();
  
    thermometer.addThreshold({
      temperatureCelsius: 0,
      direction: 'falling',
      tolerance: 0.5,
      notified: false,
      callback,
    });
  
    thermometer.updateTemperature(1);
    thermometer.updateTemperature(0.4); // Should trigger callback
  
    expect(callback).toHaveBeenCalledWith(0.4);
  });
});