export interface Threshold {
  temperatureCelsius: number;
  direction: 'rising' | 'falling' | 'both';
  tolerance: number;
  notified: boolean;
  callback: (currentTemperatureCelsius: number) => void;
}