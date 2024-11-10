
import { readings } from './data/readings';
import { Thermometer } from './thermometer';
import { Direction, Threshold } from './threshold';
import { ThresholdNotifier } from './threshold-notifier';

const thermometer = new Thermometer();
const notifier = new ThresholdNotifier(thermometer);

const direction: Direction = 'falling';
const freezingThreshold = new Threshold(
  0, // initial temperature
  direction,
  0.5, // tolerance
  (currentTemp) => {
    console.log(`Alert: Temperature moved to ${currentTemp}°C.`);
  }
);

notifier.addThreshold(freezingThreshold);

for (const temp of readings) {
  notifier.updateTemperature(temp);
}