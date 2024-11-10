
import { readings } from './data/readings';
import { Thermometer } from './thermometer';
import { Direction, Threshold } from './threshold';
import { ThresholdNotifier } from './threshold-notifier';

const thermometer = new Thermometer();
const notifier = new ThresholdNotifier(thermometer);

const direction: Direction = 'falling';
const freezingThreshold = new Threshold(
  0, // initial temperature
  direction, // direction
  0.5, // tolerance
  (currentTemp) => {
    console.log(`Threshold reached: Temperature ${direction} to ${currentTemp}°C.`);
  }
);

// Add the threshold to the notifier
notifier.addThreshold(freezingThreshold);

// Update the notifier with the readings
for (const temp of readings) {
  notifier.updateTemperature(temp);
}