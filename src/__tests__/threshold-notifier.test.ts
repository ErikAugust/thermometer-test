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

});