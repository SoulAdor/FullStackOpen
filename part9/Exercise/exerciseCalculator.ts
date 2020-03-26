type Rating = 1 | 2 | 3;

const ratingDescriptions: { [key in Rating]: string; } = {
  1 : 'very good result',
  2 : 'not too bad but could be better',
  3 : 'too bad',
};

interface Result {
  days: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}

const getRating = (target: number, average: number): Rating => {
  if (average >= target) return 1;
  if (target - average < 1) return 2;
  return 3; 
};

const calculateExercises = (dailyExerciseHours: Array<number>, target: number): Result => {
  const days: number = dailyExerciseHours.length;
  const trainingDays: number = dailyExerciseHours.filter(x => x > 0).length;
  const average: number = dailyExerciseHours.reduce((a, b) => a + b, 0) / days;
  const rating: Rating = getRating (target, average);
  const success: boolean = rating === 1;
  const ratingDescription: string = ratingDescriptions[rating];
  return {days, trainingDays, success, rating, ratingDescription, target, average};
};

interface Parameters {
  dailyExerciseHours: Array<number>;
  target: number;
}

const parseArguments = (args: Array<string>): Parameters => {
  if (args.length < 4) throw new Error('Not enough arguments');
  for (let i = 2; i < args.length; i++)
    if (isNaN(Number(args[i]))) 
      throw new Error('Provided values were not numbers!');

  const target = Number(args[2]);
  const dailyExerciseHours: Array<number> = [];
  for (let i = 3; i < args.length; i++)
    dailyExerciseHours.push(Number(args[i]));
  return { dailyExerciseHours , target };
};

try {
  const { dailyExerciseHours, target } = parseArguments(process.argv);
  console.log(calculateExercises(dailyExerciseHours, target));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

export default calculateExercises;