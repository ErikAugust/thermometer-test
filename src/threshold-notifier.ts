
import { Thermometer } from './thermometer';
import { Threshold, Direction } from './threshold';

export class ThresholdNotifier {
  private thermometer: Thermometer;
  private thresholds: Threshold[] = [];
  private previousTemperatureCelsius: number | null = null;

  constructor(thermometer: Thermometer) {
    this.thermometer = thermometer;
  }

  public addThreshold(threshold: Threshold): void {
    this.thresholds.push(threshold);
  }

  public updateTemperature(newTemperatureCelsius: number): void {
    this.previousTemperatureCelsius = this.thermometer.getTemperatureCelsius();
    this.thermometer.updateTemperature(newTemperatureCelsius);
    this.checkThresholds();
  }

  private checkThresholds(): void {
    const currentTemp = this.thermometer.getTemperatureCelsius();
    const previousTemp = this.previousTemperatureCelsius;

    if (previousTemp === null) {
      return; // No previous temperature to compare
    }

    for (const threshold of this.thresholds) {
      // Reset notified flag if temperature moves away from threshold
      if (threshold.notified && !threshold.isWithin(currentTemp)) {
        threshold.notified = false;
      }

      if (!threshold.notified) {
        let crossingOccurred = false;
        let direction: Direction = 'rising';

        const prevAbove = threshold.isAbove(previousTemp);
        const currWithin = threshold.isWithin(currentTemp);
        const prevBelow = threshold.isBelow(previousTemp);

        if (prevAbove && currWithin) {
          // Crossed threshold from above
          crossingOccurred = true;
          direction = 'falling';
        } else if (prevBelow && currWithin) {
          // Crossed threshold from below
          crossingOccurred = true;
          direction = 'rising';
        }

        if (
          crossingOccurred &&
          (threshold.direction === direction || threshold.direction === 'both')
        ) {
          // Notify the caller
          threshold.callback(currentTemp);
          threshold.notified = true;
        }
      }
    }
  }
}