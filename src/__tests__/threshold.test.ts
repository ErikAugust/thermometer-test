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

  test('isAbove should return true when temperature is above threshold plus tolerance', () => {
    const threshold = new Threshold(0, 'both', 0.5, callback);
    expect(threshold.isAbove(1)).toBe(true);  // 1 > 0 + 0.5
  });

  test('isAbove should return false when temperature is within threshold plus tolerance', () => {
    const threshold = new Threshold(0, 'both', 0.5, callback);
    expect(threshold.isAbove(0.4)).toBe(false);  // 0.4 ≤ 0 + 0.5
  });

  test('isBelow should return true when temperature is below threshold minus tolerance', () => {
    const threshold = new Threshold(0, 'both', 0.5, callback);
    expect(threshold.isBelow(-1)).toBe(true);  // -1 < 0 - 0.5
  });

  test('isBelow should return false when temperature is within threshold minus tolerance', () => {
    const threshold = new Threshold(0, 'both', 0.5, callback);
    expect(threshold.isBelow(-0.4)).toBe(false);  // -0.4 ≥ 0 - 0.5
  });

});