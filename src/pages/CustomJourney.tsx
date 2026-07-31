import { FormEvent, useMemo, useState } from 'react';
import { Check, Compass, Mail, Minus, Plus, Send } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { IMAGES } from '@/data/content';

type Stop = {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
};

const STOPS: Stop[] = [
  { id: 'marrakech', name: 'Marrakech', description: 'Atlas gateway', x: 44.13, y: 51.45 },
  { id: 'ait-ben-haddou', name: 'Aït Ben Haddou', description: 'Kasbah country', x: 50.82, y: 56.84 },
  { id: 'ouarzazate', name: 'Ouarzazate', description: 'Desert gateway', x: 52.68, y: 57.89 },
  { id: 'zagora', name: 'Zagora', description: 'Drâa Valley', x: 60.97, y: 63.45 },
  { id: 'mhamid', name: "M'Hamid", description: 'Last village before the Sahara', x: 61.89, y: 68.15 },
  { id: 'erg-chigaga', name: 'Erg Chigaga', description: 'Wild dunes', x: 57.73, y: 68.12 },
  { id: 'merzouga', name: 'Merzouga', description: 'Erg Chebbi dunes', x: 75.21, y: 56.51 },
];

const INTERESTS = ['Camel trekking', 'Desert camping', '4x4 adventure', 'Nomad culture', 'Stargazing', 'Kasbahs & oases', 'Sandboarding'];

const MOROCCO_PATH =
  'M 38.71 88.05 C 44.59 87.67 38.71 86.44 38.71 85.64 C 38.70 84.84 38.70 84.03 38.70 83.23 C 38.70 82.43 38.70 ' +
  '81.62 38.70 80.82 C 38.70 80.01 38.43 78.93 38.70 78.41 C 38.97 77.88 39.86 77.95 40.31 77.65 C 40.77 77.36 41' +
  '.06 76.97 41.44 76.63 C 41.81 76.29 42.11 75.95 42.56 75.62 C 43.02 75.28 43.62 75.02 44.16 74.64 C 44.69 74.2' +
  '6 45.35 73.61 45.78 73.31 C 46.21 73.02 46.52 73.06 46.75 72.88 C 46.98 72.71 46.95 72.36 47.16 72.27 C 47.36 ' +
  '72.19 47.66 72.42 47.98 72.39 C 48.30 72.36 48.64 72.35 49.08 72.11 C 49.51 71.87 49.85 71.06 50.59 70.95 C 51' +
  '.32 70.85 52.89 71.46 53.47 71.48 C 54.04 71.50 53.67 71.18 54.02 71.08 C 54.37 70.99 55.20 71.00 55.57 70.91 ' +
  'C 55.94 70.82 55.78 70.63 56.25 70.54 C 56.71 70.45 57.86 70.38 58.34 70.39 C 58.83 70.39 58.64 70.61 59.14 70' +
  '.57 C 59.64 70.52 60.89 70.15 61.35 70.13 C 61.80 70.10 61.80 70.26 61.85 70.40 C 61.91 70.55 61.64 70.92 61.6' +
  '8 70.99 C 61.72 71.05 61.98 70.77 62.10 70.79 C 62.22 70.80 62.21 71.01 62.39 71.08 C 62.57 71.16 62.91 71.44 ' +
  '63.18 71.25 C 63.46 71.06 63.76 70.38 64.05 69.94 C 64.34 69.51 64.76 68.96 64.91 68.64 C 65.07 68.31 64.92 68' +
  '.16 64.97 67.98 C 65.03 67.80 64.96 67.81 65.24 67.54 C 65.52 67.27 66.17 66.77 66.63 66.38 C 67.10 65.99 67.3' +
  '5 65.65 68.03 65.22 C 68.71 64.80 70.06 64.24 70.69 63.83 C 71.31 63.41 71.42 63.09 71.78 62.73 C 72.15 62.36 ' +
  '72.50 61.88 72.88 61.63 C 73.26 61.37 73.44 61.33 74.07 61.18 C 74.70 61.02 75.95 60.89 76.64 60.70 C 77.32 60' +
  '.52 77.89 60.21 78.19 60.05 C 78.48 59.89 78.43 59.85 78.41 59.74 C 78.39 59.62 78.12 59.52 78.08 59.34 C 78.0' +
  '3 59.15 78.02 58.88 78.16 58.63 C 78.30 58.38 78.77 58.11 78.90 57.84 C 79.04 57.57 78.99 57.20 78.99 57.01 C ' +
  '78.98 56.83 78.91 56.73 78.87 56.71 C 78.82 56.68 78.83 56.94 78.73 56.86 C 78.62 56.77 78.31 56.41 78.23 56.2' +
  '1 C 78.15 56.02 78.23 55.69 78.23 55.71 C 78.23 55.72 78.25 56.19 78.22 56.31 C 78.18 56.43 78.02 56.40 78.01 ' +
  '56.43 C 78.01 56.46 78.18 56.49 78.17 56.49 C 78.16 56.48 77.99 56.51 77.94 56.39 C 77.90 56.26 77.94 55.86 77' +
  '.90 55.75 C 77.85 55.63 77.73 55.63 77.67 55.71 C 77.60 55.78 77.57 56.11 77.49 56.21 C 77.40 56.30 77.18 56.3' +
  '7 77.14 56.26 C 77.10 56.16 77.26 55.78 77.24 55.58 C 77.23 55.39 77.04 55.21 77.05 55.09 C 77.05 54.96 77.28 ' +
  '54.92 77.29 54.83 C 77.30 54.73 77.11 54.66 77.11 54.52 C 77.12 54.39 77.25 54.09 77.33 54.02 C 77.41 53.94 77' +
  '.46 54.14 77.60 54.08 C 77.73 54.03 78.06 54.13 78.13 53.69 C 78.20 53.24 77.68 51.88 78.03 51.42 C 78.37 50.9' +
  '6 79.48 51.08 80.20 50.91 C 80.93 50.74 81.66 50.57 82.38 50.40 C 83.11 50.23 84.23 50.11 84.56 49.89 C 84.90 ' +
  '49.67 84.52 49.42 84.38 49.08 C 84.25 48.74 83.86 48.20 83.78 47.84 C 83.70 47.49 83.47 47.11 83.90 46.97 C 84' +
  '.34 46.83 85.80 47.05 86.39 46.99 C 86.98 46.92 87.00 46.65 87.43 46.57 C 87.86 46.48 88.59 46.47 88.98 46.49 ' +
  'C 89.36 46.52 89.41 46.74 89.74 46.71 C 90.08 46.69 90.73 46.37 90.99 46.35 C 91.25 46.32 91.18 46.53 91.32 46' +
  '.56 C 91.46 46.59 91.30 46.42 91.82 46.52 C 92.34 46.63 93.51 47.06 94.42 47.18 C 95.32 47.30 96.69 47.30 97.2' +
  '4 47.26 C 97.79 47.22 97.68 47.07 97.73 46.94 C 97.78 46.82 97.70 46.59 97.52 46.51 C 97.33 46.43 96.68 46.52 ' +
  '96.60 46.46 C 96.52 46.40 96.98 46.37 97.05 46.13 C 97.12 45.88 96.95 45.29 97.01 44.99 C 97.07 44.68 97.23 44' +
  '.43 97.40 44.29 C 97.58 44.14 97.78 44.29 98.05 44.12 C 98.31 43.96 99.17 43.72 98.97 43.30 C 98.76 42.88 97.3' +
  '1 41.94 96.81 41.59 C 96.31 41.24 96.31 41.59 95.96 41.19 C 95.61 40.79 94.84 39.53 94.69 39.18 C 94.54 38.83 ' +
  '94.97 39.16 95.06 39.09 C 95.16 39.02 95.22 38.91 95.25 38.75 C 95.29 38.60 95.40 38.37 95.26 38.15 C 95.13 37' +
  '.93 94.70 37.74 94.44 37.41 C 94.18 37.08 93.80 36.51 93.69 36.15 C 93.57 35.80 93.64 35.66 93.74 35.27 C 93.8' +
  '5 34.88 94.21 34.18 94.30 33.83 C 94.39 33.48 94.36 33.39 94.27 33.16 C 94.18 32.94 93.90 32.58 93.76 32.47 C ' +
  '93.63 32.37 93.58 32.56 93.48 32.53 C 93.38 32.49 93.21 32.38 93.17 32.28 C 93.13 32.19 93.15 32.09 93.24 31.9' +
  '8 C 93.33 31.87 93.65 31.85 93.69 31.64 C 93.73 31.43 93.43 31.25 93.46 30.74 C 93.49 30.22 93.86 29.06 93.87 ' +
  '28.55 C 93.87 28.04 93.58 27.99 93.50 27.68 C 93.43 27.37 93.52 26.96 93.41 26.67 C 93.31 26.39 92.83 26.25 92' +
  '.86 25.97 C 92.88 25.69 93.54 25.18 93.57 24.98 C 93.61 24.77 93.29 24.95 93.08 24.76 C 92.87 24.57 92.31 24.1' +
  '8 92.33 23.83 C 92.34 23.48 93.22 22.96 93.17 22.66 C 93.11 22.36 92.19 22.20 91.99 22.05 C 91.78 21.90 92.05 ' +
  '21.85 91.94 21.75 C 91.83 21.64 91.45 21.57 91.34 21.43 C 91.24 21.29 91.41 20.97 91.31 20.89 C 91.21 20.81 91' +
  '.08 21.14 90.76 20.97 C 90.44 20.80 89.63 20.10 89.41 19.86 C 89.18 19.61 89.71 19.65 89.43 19.51 C 89.15 19.3' +
  '6 88.15 18.96 87.73 18.96 C 87.31 18.96 87.19 19.41 86.91 19.50 C 86.64 19.58 86.37 19.53 86.09 19.47 C 85.80 ' +
  '19.40 85.49 19.30 85.19 19.11 C 84.88 18.93 84.24 18.32 84.26 18.34 C 84.28 18.37 85.17 19.07 85.30 19.24 C 85' +
  '.43 19.42 85.21 19.40 85.03 19.38 C 84.85 19.35 84.41 19.25 84.21 19.11 C 84.01 18.97 83.85 18.66 83.82 18.54 ' +
  'C 83.79 18.42 84.04 18.45 84.04 18.38 C 84.03 18.31 83.82 18.17 83.79 18.09 C 83.76 18.02 83.77 17.90 83.84 17' +
  '.93 C 83.92 17.96 84.28 18.33 84.23 18.27 C 84.18 18.21 83.66 17.91 83.56 17.60 C 83.47 17.28 83.67 16.60 83.6' +
  '5 16.37 C 83.63 16.14 83.62 16.01 83.44 16.23 C 83.26 16.45 82.79 17.46 82.58 17.69 C 82.37 17.93 82.32 17.59 ' +
  '82.20 17.66 C 82.07 17.74 82.09 17.98 81.82 18.14 C 81.55 18.29 81.12 18.57 80.60 18.58 C 80.07 18.60 79.16 18' +
  '.38 78.67 18.23 C 78.18 18.07 77.89 17.70 77.66 17.64 C 77.44 17.58 77.39 17.73 77.30 17.84 C 77.21 17.95 77.2' +
  '2 18.19 77.13 18.29 C 77.05 18.39 76.93 18.43 76.78 18.44 C 76.63 18.45 76.37 18.46 76.24 18.36 C 76.10 18.27 ' +
  '76.31 17.87 75.98 17.88 C 75.65 17.88 74.82 18.22 74.25 18.39 C 73.67 18.57 73.05 18.88 72.51 18.91 C 71.97 18' +
  '.94 71.50 18.68 71.00 18.57 C 70.49 18.46 69.97 18.43 69.49 18.23 C 69.01 18.03 68.47 17.65 68.12 17.38 C 67.7' +
  '6 17.10 67.55 16.75 67.34 16.59 C 67.12 16.43 66.95 16.51 66.84 16.40 C 66.73 16.28 66.80 16.07 66.69 15.90 C ' +
  '66.58 15.73 66.34 15.51 66.16 15.39 C 65.98 15.27 65.76 15.30 65.62 15.18 C 65.47 15.07 65.33 14.89 65.29 14.6' +
  '9 C 65.24 14.48 65.39 14.07 65.34 13.96 C 65.29 13.84 65.08 14.01 65.00 13.98 C 64.93 13.95 64.94 14.05 64.91 ' +
  '13.76 C 64.89 13.47 64.91 12.50 64.85 12.23 C 64.79 11.96 64.63 12.21 64.56 12.14 C 64.48 12.07 64.52 11.85 64' +
  '.40 11.81 C 64.27 11.77 64.04 11.77 63.79 11.90 C 63.54 12.03 63.23 12.47 62.90 12.59 C 62.58 12.71 62.11 12.5' +
  '4 61.86 12.63 C 61.61 12.71 61.55 13.06 61.38 13.10 C 61.22 13.15 61.04 12.91 60.85 12.89 C 60.65 12.88 60.40 ' +
  '12.66 60.22 13.00 C 60.03 13.34 59.93 14.33 59.75 14.94 C 59.57 15.55 59.33 16.09 59.12 16.66 C 58.91 17.24 58' +
  '.55 18.11 58.49 18.39 C 58.42 18.67 58.77 18.31 58.74 18.33 C 58.72 18.35 58.55 18.09 58.34 18.50 C 58.12 18.9' +
  '2 57.75 20.04 57.46 20.81 C 57.17 21.57 56.93 22.34 56.59 23.11 C 56.25 23.87 55.81 24.72 55.43 25.38 C 55.05 ' +
  '26.04 54.46 26.79 54.31 27.07 C 54.17 27.35 54.54 27.06 54.54 27.07 C 54.54 27.09 54.39 27.01 54.30 27.15 C 54' +
  '.22 27.29 54.22 27.59 54.02 27.93 C 53.82 28.27 53.24 28.95 53.11 29.18 C 52.98 29.41 53.27 29.29 53.24 29.31 ' +
  'C 53.22 29.33 53.23 29.09 52.96 29.31 C 52.69 29.53 52.15 30.26 51.61 30.63 C 51.07 31.00 50.18 31.29 49.75 31' +
  '.54 C 49.31 31.80 49.18 32.08 49.01 32.18 C 48.83 32.27 48.92 32.00 48.70 32.13 C 48.49 32.25 47.98 32.75 47.7' +
  '2 32.93 C 47.47 33.11 47.27 33.16 47.15 33.19 C 47.04 33.23 47.02 33.16 47.02 33.14 C 47.02 33.12 47.21 33.07 ' +
  '47.15 33.07 C 47.09 33.06 46.94 33.00 46.67 33.13 C 46.41 33.26 46.07 33.60 45.55 33.86 C 45.03 34.11 44.21 34' +
  '.38 43.55 34.63 C 42.88 34.89 41.91 35.21 41.55 35.41 C 41.18 35.62 41.49 35.68 41.33 35.84 C 41.18 36.00 40.8' +
  '7 36.25 40.60 36.36 C 40.34 36.47 40.00 36.36 39.75 36.49 C 39.50 36.63 39.20 37.01 39.09 37.18 C 38.98 37.36 ' +
  '39.28 37.26 39.11 37.56 C 38.94 37.87 38.58 38.44 38.06 39.01 C 37.53 39.58 36.66 40.34 35.96 41.01 C 35.27 41' +
  '.67 34.15 42.55 33.87 43.00 C 33.59 43.46 34.29 43.48 34.29 43.73 C 34.29 43.98 33.94 44.30 33.88 44.50 C 33.8' +
  '1 44.70 33.85 44.80 33.90 44.92 C 33.96 45.05 34.19 44.99 34.20 45.25 C 34.22 45.50 34.11 46.14 34.01 46.44 C ' +
  '33.91 46.73 33.69 46.79 33.59 47.00 C 33.49 47.22 33.65 47.33 33.40 47.71 C 33.15 48.09 32.53 48.75 32.09 49.2' +
  '6 C 31.66 49.78 31.02 50.40 30.78 50.82 C 30.55 51.23 30.88 51.28 30.66 51.75 C 30.44 52.21 29.64 53.26 29.48 ' +
  '53.60 C 29.33 53.94 29.68 53.64 29.74 53.77 C 29.80 53.89 29.88 54.00 29.84 54.38 C 29.80 54.75 29.52 55.54 29' +
  '.50 56.01 C 29.48 56.47 29.71 56.73 29.73 57.16 C 29.75 57.60 29.62 58.32 29.63 58.62 C 29.63 58.92 29.84 58.6' +
  '9 29.77 58.95 C 29.70 59.21 29.31 59.88 29.20 60.17 C 29.09 60.46 29.01 60.58 29.14 60.70 C 29.26 60.83 29.71 ' +
  '60.74 29.96 60.90 C 30.22 61.07 30.51 61.42 30.68 61.68 C 30.85 61.93 30.87 62.27 30.97 62.42 C 31.08 62.57 31' +
  '.28 62.30 31.30 62.60 C 31.32 62.91 31.17 63.69 31.10 64.24 C 31.04 64.79 30.95 65.62 30.91 65.88 C 30.86 66.1' +
  '4 30.87 65.75 30.82 65.78 C 30.78 65.81 30.80 65.73 30.65 66.07 C 30.49 66.40 30.28 67.21 29.90 67.79 C 29.53 ' +
  '68.37 28.79 68.97 28.38 69.55 C 27.97 70.13 27.76 70.69 27.45 71.25 C 27.14 71.82 26.81 72.55 26.52 72.96 C 26' +
  '.22 73.36 26.10 73.21 25.68 73.68 C 25.27 74.14 24.64 75.18 24.01 75.73 C 23.38 76.28 22.62 76.55 21.92 76.96 ' +
  'C 21.22 77.37 20.50 77.64 19.83 78.19 C 19.15 78.75 18.39 79.65 17.87 80.28 C 17.36 80.91 16.99 81.62 16.71 81' +
  '.96 C 16.44 82.30 16.62 82.09 16.20 82.30 C 15.77 82.51 14.85 82.91 14.17 83.21 C 13.50 83.52 12.69 83.92 12.1' +
  '4 84.12 C 11.60 84.33 11.13 84.35 10.88 84.45 C 10.63 84.55 10.66 84.73 10.62 84.73 C 10.59 84.74 11.09 84.46 ' +
  '10.66 84.49 C 10.23 84.53 8.92 84.80 8.06 84.96 C 7.19 85.11 5.97 85.29 5.46 85.43 C 4.95 85.56 5.20 85.43 5.0' +
  '0 85.75 C 4.80 86.08 4.52 87.00 4.25 87.37 C 3.99 87.73 -2.34 87.81 3.40 87.93 C 9.14 88.04 32.82 88.43 38.71 ' +
  '88.05 Z';

const CITY_LABELS: Record<string, { dx: number; dy: number; anchor: 'start' | 'middle' | 'end' }> = {
  marrakech: { dx: 3, dy: 0.8, anchor: 'start' },
  'ait-ben-haddou': { dx: -3, dy: -0.8, anchor: 'end' },
  ouarzazate: { dx: 3, dy: 0.8, anchor: 'start' },
  zagora: { dx: -2.5, dy: 0.8, anchor: 'end' },
  mhamid: { dx: 0, dy: -2.2, anchor: 'middle' },
  'erg-chigaga': { dx: -3, dy: 0.8, anchor: 'end' },
  merzouga: { dx: -3, dy: 0.8, anchor: 'end' },
};

export default function CustomJourney() {
  const [interests, setInterests] = useState<string[]>(['Desert camping']);
  const [sent, setSent] = useState(false);
  const [dayCount, setDayCount] = useState(3);
  const [dayPlans, setDayPlans] = useState(['marrakech', 'ait-ben-haddou', 'erg-chigaga']);

  const toggleInterest = (interest: string) => {
    setInterests((current) => current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest]);
  };

  const setNumberOfDays = (count: number) => {
    const nextCount = Math.max(1, Math.min(14, count));
    setDayCount(nextCount);
    setDayPlans((current) => Array.from({ length: nextCount }, (_, index) => current[index] ?? ''));
  };

  const setDayPlan = (index: number, value: string) => {
    setDayPlans((current) => current.map((plan, planIndex) => planIndex === index ? value : plan));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      'New custom Sahara journey request',
      '',
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone') || 'Not provided'}`,
      `Preferred start date: ${data.get('date') || 'Flexible'}`,
      `Travelers: ${data.get('travelers')}`,
      `Duration: ${data.get('duration')}`,
      `Comfort: ${data.get('comfort')}`,
      `Pickup / meet-up: ${data.get('pickupType')} — ${data.get('pickupLocation') || 'To be confirmed'}`,
      'Day-by-day outline:',
      ...dayPlans.map((id, index) => `Day ${index + 1}: ${STOPS.find((stop) => stop.id === id)?.name ?? 'Open / guide recommendation'}`),
      `Interests: ${interests.join(', ') || 'No preferences selected'}`,
      '',
      `Notes: ${data.get('notes') || 'None'}`,
    ].join('\n');
    window.location.href = `mailto:hello@walkthesahara.com?subject=${encodeURIComponent('Custom Sahara journey request')}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <main className="pt-20">
      <section className="relative overflow-hidden bg-ink-950 py-24 text-sand-50 lg:py-28">
        <div className="absolute inset-0">
          <img src={IMAGES.heroAerial} alt="" className="h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/35" />
        </div>
        <div className="container-x relative z-10 max-w-4xl">
          <SectionHeading light eyebrow="Build your own journey" title="Your Sahara, mapped your way." subtitle="Choose the places, pace, and experiences that matter to you. Our local team will turn them into a considered private itinerary." />
        </div>
      </section>

      <section className="bg-sand-100/50 py-16 lg:py-24">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-sand-200/70 sm:p-10">
                <SectionHeading eyebrow="Tell us the details" title="2. Request your custom itinerary" subtitle="We will reply with a tailored route, availability, and transparent pricing." />
                {sent && <div className="mt-6 rounded-xl bg-oasis-100 p-4 text-sm text-oasis-700">Your email app has opened with the request prepared. Send it there to reach our team.</div>}
                <form onSubmit={submit} className="mt-8 space-y-6">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input label="Your name" name="name" required /><Input label="Email" name="email" type="email" required />
                    <Input label="Phone / WhatsApp" name="phone" type="tel" /><Input label="Preferred start date" name="date" type="date" />
                    <Select label="Travelers" name="travelers" options={['1–2 travelers', '3–4 travelers', '5–8 travelers', '9+ travelers']} /><Select label="Duration" name="duration" options={['2–3 days', '4–5 days', '6–8 days', '9+ days']} />
                  </div>
                  <div className="rounded-2xl bg-sand-100/60 p-5">
                    <h3 className="font-display text-xl text-ink-900">Pickup or meet-up point</h3>
                    <p className="mt-1 text-sm text-ink-600">Tell your guide how the journey should begin.</p>
                    <div className="mt-4 grid gap-5 sm:grid-cols-2"><Select label="Pickup preference" name="pickupType" options={['Pickup from hotel / riad', 'Meet at airport', 'Meet at a chosen location', 'I need a recommendation']} /><Input label="Hotel, airport, or meeting location" name="pickupLocation" placeholder="e.g. Marrakech Menara Airport" /></div>
                  </div>
                  <div className="rounded-2xl bg-sand-100/60 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-4"><div><h3 className="font-display text-xl text-ink-900">Day-by-day itinerary</h3><p className="mt-1 text-sm text-ink-600">Set a destination for each day, or leave it open for our guide to refine. The map updates as you plan.</p></div><div className="flex items-center gap-3"><button type="button" onClick={() => setNumberOfDays(dayCount - 1)} disabled={dayCount === 1} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink-700 disabled:opacity-40"><Minus className="h-4 w-4" /></button><span className="min-w-16 text-center text-sm font-semibold text-ink-800">{dayCount} days</span><button type="button" onClick={() => setNumberOfDays(dayCount + 1)} disabled={dayCount === 14} className="flex h-9 w-9 items-center justify-center rounded-full bg-sand-800 text-white disabled:opacity-40"><Plus className="h-4 w-4" /></button></div></div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">{dayPlans.map((plan, index) => <div key={index} className="flex items-center gap-3 rounded-xl bg-white p-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand-800 text-xs font-semibold text-white">{index + 1}</span><select value={plan} onChange={(event) => setDayPlan(index, event.target.value)} className="min-w-0 flex-1 bg-transparent text-sm text-ink-800 focus:outline-none"><option value="">Guide recommendation</option>{STOPS.map((stop) => <option key={stop.id} value={stop.id}>{stop.name}</option>)}</select></div>)}</div>
                  </div>
                  <Select label="Preferred comfort" name="comfort" options={['Authentic bivouac', 'Comfortable desert camp', 'Luxury camp', 'A mix of both']} />
                  <div><label className="mb-2 block text-sm font-medium text-ink-700">Experiences to include</label><div className="flex flex-wrap gap-2">{INTERESTS.map((interest) => <button type="button" key={interest} onClick={() => toggleInterest(interest)} className={`rounded-full px-4 py-2 text-sm transition-colors ${interests.includes(interest) ? 'bg-sand-800 text-sand-50' : 'bg-sand-100 text-ink-700 hover:bg-sand-200'}`}>{interests.includes(interest) ? <Check className="mr-1 inline h-4 w-4" /> : <Plus className="mr-1 inline h-4 w-4" />}{interest}</button>)}</div></div>
                  <div><label className="mb-1.5 block text-sm font-medium text-ink-700">Anything else we should know?</label><textarea name="notes" rows={5} placeholder="Tell us about your travel style, special occasions, dietary needs, or anything you want to experience." className="w-full rounded-xl border border-sand-200 bg-sand-50/40 px-4 py-3 text-sm text-ink-800 placeholder:text-sand-500 focus:border-sand-400 focus:outline-none focus:ring-2 focus:ring-sand-200" /></div>
                  <button type="submit" className="btn-primary"><Send className="h-4 w-4" />Send custom journey request</button>
                  <p className="flex items-center gap-2 text-xs text-sand-600"><Mail className="h-4 w-4" />This opens your email app with your route and preferences included.</p>
                </form>
              </div>
            </div>

            {/* Live map */}
            <div className="lg:col-span-5">
              <JourneyMap dayPlans={dayPlans} dayCount={dayCount} interests={interests} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function JourneyMap({ dayPlans, dayCount, interests }: { dayPlans: string[]; dayCount: number; interests: string[] }) {
  const routeStops = useMemo(
    () => dayPlans.map((id) => STOPS.find((stop) => stop.id === id)).filter((stop): stop is Stop => Boolean(stop)),
    [dayPlans],
  );
  const points = routeStops.map((stop) => `${stop.x},${stop.y}`).join(' ');

  const dayByStop = useMemo(() => {
    const map = new Map<string, number>();
    dayPlans.forEach((id, index) => { if (id && !map.has(id)) map.set(id, index + 1); });
    return map;
  }, [dayPlans]);

  return (
    <aside className="sticky top-28 max-h-[calc(100vh-7rem)] scrollbar-hide overflow-y-auto rounded-3xl bg-white p-6 shadow-lg shadow-sand-900/10 ring-1 ring-sand-200/60 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow"><span className="hairline" /> Your route</p>
          <h2 className="mt-2 font-display text-2xl font-medium text-ink-900">The journey takes shape</h2>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-oasis-100 px-3 py-1.5 text-xs font-semibold text-oasis-700">
          <span className="h-2 w-2 animate-pulse rounded-full bg-oasis-500" /> Live
        </span>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-2xl bg-sand-100/60">
        <svg viewBox="26 45 56 28" className="block aspect-[2/1] w-full" role="img" aria-label="Detail map of southern Morocco showing your selected route">
          <defs>
            <linearGradient id="africa" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F1E7D3" />
              <stop offset="100%" stopColor="#E8DAC0" />
            </linearGradient>
            <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EAD9B8" />
              <stop offset="100%" stopColor="#DDBF8A" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="100" height="100" fill="url(#africa)" />

          <path d={MOROCCO_PATH} fill="url(#land)" stroke="#C08940" strokeWidth="0.6" strokeLinejoin="round" />

          <g pointerEvents="none" fill="#855529" fontSize="2" fontWeight="500">
            <text x="54.2" y="48.9" textAnchor="middle" fontSize="1.7" opacity="0.8">High Atlas</text>
            <text x="80.9" y="59.5" transform="rotate(-90 80.9 59.5)" textAnchor="middle" fontSize="1.6" opacity="0.8">Algeria</text>
            <text x="46" y="70.8" textAnchor="middle" fontSize="2.2" opacity="0.9">Sahara</text>
          </g>

          {routeStops.length > 1 && (
            <g>
              <path id="routePath" d={`M ${points}`} fill="none" />
              <polyline points={points} fill="none" stroke="#EAD9B8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points={points} fill="none" stroke="#A66F33" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2.2 1.1" className="route-line" />
              <circle r="1.7" fill="#B85F44" stroke="#FBF7F0" strokeWidth="0.7">
                <animateMotion dur="6s" repeatCount="indefinite">
                  <mpath href="#routePath" />
                </animateMotion>
              </circle>
            </g>
          )}

          {STOPS.map((stop) => {
            const day = dayByStop.get(stop.id);
            const label = CITY_LABELS[stop.id];
            return (
              <g key={stop.id}>
                {day ? (
                  <>
                    <circle className="pin-halo" cx={stop.x} cy={stop.y} r="2.7" fill="#A66F33" />
                    <circle cx={stop.x} cy={stop.y} r="2.3" fill="#634022" stroke="#FBF7F0" strokeWidth="0.7" />
                    <text x={stop.x} y={stop.y} dy="0.85" textAnchor="middle" fontSize="2.1" fontWeight="700" fill="#FBF7F0" pointerEvents="none">{day}</text>
                  </>
                ) : (
                  <circle cx={stop.x} cy={stop.y} r="1.4" fill="#EAD9B8" stroke="#855529" strokeWidth="0.5" opacity="0.9" />
                )}
                <text
                  x={stop.x + label.dx}
                  y={stop.y + label.dy}
                  textAnchor={label.anchor}
                  fontSize={day ? 2.3 : 2}
                  fontWeight={day ? 600 : 500}
                  fill={day ? '#422C19' : '#855529'}
                  stroke="#FBF7F0"
                  strokeWidth="0.4"
                  paintOrder="stroke"
                  pointerEvents="none"
                >
                  {stop.name}
                </text>
              </g>
            );
          })}
        </svg>

        <span className="absolute -top-4 -right-4 flex h-12 w-12 animate-float items-center justify-center rounded-full bg-sand-800 text-sand-50 shadow-lg">
          <Compass className="h-6 w-6" strokeWidth={1.5} />
        </span>
        <p className="mt-2 px-1 text-[10px] leading-tight text-sand-400">Map outline: Eric Gaba (Wikimedia Commons), CC BY-SA 3.0 · Simplified and recoloured.</p>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-sand-600">
          <span>Day by day</span>
          <span>{dayCount} days · {routeStops.length} stops</span>
        </div>
        <div className="mt-3 space-y-1.5">
          {Array.from({ length: dayCount }, (_, index) => {
            const stop = STOPS.find((s) => s.id === dayPlans[index]);
            return (
              <div key={index} className="flex items-center gap-3 rounded-xl bg-sand-100/60 px-3 py-2 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sand-800 text-[11px] font-semibold text-sand-50">{index + 1}</span>
                <span className={stop ? 'font-medium text-ink-800' : 'text-sand-600'}>{stop ? stop.name : 'Guide recommendation'}</span>
                {stop && <span className="ml-auto hidden text-xs text-sand-500 sm:block">{stop.description}</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 border-t border-sand-100 pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sand-600">Experiences</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {interests.length ? (
            interests.map((interest) => (
              <span key={interest} className="rounded-full bg-oasis-100 px-3 py-1 text-xs font-medium text-oasis-700">{interest}</span>
            ))
          ) : (
            <span className="text-xs text-sand-500">No experiences selected yet.</span>
          )}
        </div>
      </div>
    </aside>
  );
}

function Input({ label, name, type = 'text', required = false, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return <div><label className="mb-1.5 block text-sm font-medium text-ink-700">{label}</label><input name={name} type={type} required={required} placeholder={placeholder} className="w-full rounded-xl border border-sand-200 bg-sand-50/40 px-4 py-3 text-sm text-ink-800 placeholder:text-sand-500 focus:border-sand-400 focus:outline-none focus:ring-2 focus:ring-sand-200" /></div>;
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return <div><label className="mb-1.5 block text-sm font-medium text-ink-700">{label}</label><select name={name} className="w-full rounded-xl border border-sand-200 bg-sand-50/40 px-4 py-3 text-sm text-ink-800 focus:border-sand-400 focus:outline-none focus:ring-2 focus:ring-sand-200">{options.map((option) => <option key={option}>{option}</option>)}</select></div>;
}
