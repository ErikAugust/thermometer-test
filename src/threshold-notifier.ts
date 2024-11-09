
import { Thermometer } from './thermometer';
import { Threshold } from './threshold';

export class ThresholdNotifier {
  private thermometer: Thermometer;
  private thresholds: Threshold[] = [];

  constructor(thermometer: Thermometer) {
    this.thermometer = thermometer;
  }

  public addThreshold(threshold: Threshold): void {
    this.thresholds.push(threshold);
  }
}