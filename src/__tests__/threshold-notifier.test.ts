import { Thermometer } from '../thermometer';
import { Threshold, Direction } from '../threshold';
import { ThresholdNotifier } from '../threshold-notifier';

describe('ThresholdNotifier', () => {
  let thermometer: Thermometer;
  let notifier: ThresholdNotifier;
  let callback: jest.Mock;

  beforeEach(() => {
    thermometer = new Thermometer();
    notifier = new ThresholdNotifier();
    callback = jest.fn();
  });

  test('should initialize with a thermometer instance', () => {
    expect(notifier).toBeInstanceOf(ThresholdNotifier);
  });

});