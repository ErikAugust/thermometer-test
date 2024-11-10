import { Thermometer } from '../thermometer';
import { Threshold, Direction } from '../threshold';
import { ThresholdNotifier } from '../threshold-notifier';

describe('ThresholdNotifier', () => {
  let thermometer: Thermometer;
  let notifier: ThresholdNotifier;
  let callback: jest.Mock;

  beforeEach(() => {
    thermometer = new Thermometer();
    notifier = new ThresholdNotifier(thermometer);
    callback = jest.fn();
  });

  test('should initialize with a thermometer instance', () => {
    expect(notifier).toBeInstanceOf(ThresholdNotifier);
  });

  test('should add thresholds correctly', () => {
    const threshold = new Threshold(0, 'falling', 0.5, callback);
    notifier.addThreshold(threshold);
    // Accessing private property via casting for test purposes
    const thresholds = (notifier as any).thresholds;
    expect(thresholds.length).toBe(1);
    expect(thresholds[0]).toBe(threshold);
  });

  test('should notify when temperature crosses threshold in specified direction', () => {
    const threshold = new Threshold(0, 'falling', 0.5, callback);
    notifier.addThreshold(threshold);

    notifier.updateTemperature(1);
    notifier.updateTemperature(0.4);

    expect(callback).toHaveBeenCalledWith(0.4);
    expect(threshold.notified).toBe(true);
  });

  test('should notify when temperature crosses threshold in specified direction', () => {
    const threshold = new Threshold(0, 'falling', 0.5, callback);
    notifier.addThreshold(threshold);

    notifier.updateTemperature(1);
    notifier.updateTemperature(0.4);

    expect(callback).toHaveBeenCalledWith(0.4);
    expect(threshold.notified).toBe(true);
  });

  test('should not notify again if temperature fluctuates within tolerance', () => {
    const threshold = new Threshold(0, 'both', 0.5, callback);
    notifier.addThreshold(threshold);
  
    // Set initial temperature outside the threshold range
    thermometer.updateTemperature(1); // Outside the threshold
  
    notifier.updateTemperature(0.4);
    notifier.updateTemperature(-0.2);
    notifier.updateTemperature(0.3);
  
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should reset notified flag when temperature moves away beyond tolerance', () => {
    const threshold = new Threshold(0, 'falling', 0.5, callback);
    notifier.addThreshold(threshold);

    notifier.updateTemperature(1);
    notifier.updateTemperature(0.4); // Notification occurs
    expect(callback).toHaveBeenCalledTimes(1);

    notifier.updateTemperature(2);   // Moves away beyond tolerance
    expect(threshold.notified).toBe(false);

    notifier.updateTemperature(0.4); // Notification occurs again
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('should handle multiple thresholds independently', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const threshold1 = new Threshold(0, 'falling', 0.5, callback1);
    const threshold2 = new Threshold(100, 'rising', 1, callback2);

    notifier.addThreshold(threshold1);
    notifier.addThreshold(threshold2);

    notifier.updateTemperature(101); // Crosses threshold2 from below
    expect(callback2).toHaveBeenCalledWith(101);
    expect(callback1).not.toHaveBeenCalled();

    notifier.updateTemperature(0.4); // Crosses threshold1 from above
    expect(callback1).toHaveBeenCalledWith(0.4);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  test('should not notify when threshold is crossed in the opposite direction', () => {
    const threshold = new Threshold(0, 'falling', 0.5, callback);
    notifier.addThreshold(threshold);

    notifier.updateTemperature(-1);   // Previous temp: 0, Current temp: -1
    notifier.updateTemperature(-0.4); // Previous temp: -1, Current temp: -0.4

    expect(callback).not.toHaveBeenCalled();
  });

  test('should handle no previous temperature gracefully', () => {
    const threshold = new Threshold(0, 'rising', 0.5, callback);
    notifier.addThreshold(threshold);

    notifier.updateTemperature(0.4); // First update, no previous temp
    expect(callback).not.toHaveBeenCalled();
  });

  test('should correctly handle rapid temperature fluctuations', () => {
    const threshold = new Threshold(0, 'both', 0.5, callback);
    notifier.addThreshold(threshold);

    const readings = [1, 0.4, -0.4, 0.6, -0.6, 0.3];
    readings.forEach(temp => notifier.updateTemperature(temp));

    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('should respect direction when crossing threshold multiple times', () => {
    const threshold = new Threshold(0, 'rising', 0.5, callback);
    notifier.addThreshold(threshold);

    notifier.updateTemperature(-1);
    notifier.updateTemperature(0.4); // Should trigger callback
    expect(callback).toHaveBeenCalledWith(0.4);

    notifier.updateTemperature(-1);
    notifier.updateTemperature(0.4); // Should trigger callback again
    expect(callback).toHaveBeenCalledTimes(2);
  });
});