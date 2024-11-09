import { Threshold, Direction } from '../threshold';

describe('Threshold Class', () => {
  let callback: jest.Mock;

  beforeEach(() => {
    callback = jest.fn();
  });

  test('should initialize with given parameters', () => {
    const threshold = new Threshold(0, 'falling', 0.5, callback);
    expect(threshold.temperatureCelsius).toBe(0);
    expect(threshold.direction).toBe('falling');
    expect(threshold.tolerance).toBe(0.5);
    expect(threshold.callback).toBe(callback);
    expect(threshold.notified).toBe(false);
  });

});