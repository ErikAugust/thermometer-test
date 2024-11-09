
import { Thermometer } from './thermometer';
import { Threshold } from './threshold';

export class ThresholdNotifier {
  private thermometer: Thermometer;

  constructor(thermometer: Thermometer) {
    this.thermometer = thermometer;
  }
}