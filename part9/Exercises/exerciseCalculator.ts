type Rating = 1 | 2 | 3;

interface Result {
   periodLength: number,
   trainingDays: number,
   success: boolean,
   rating: Rating,
   ratingDescription: string,
   target: number,
   average: number
}

interface Properties {
   dailyExerciseHours: Array<number>,
   targetAverageHours: number
}

const parseParameters = (args: Array<string>): Properties => {
   if (args.length < 4) throw new Error(`Not enough arguments, expected at least 4, given: ${args.length}`);

   const parseHours = (input: string) : number => {
      const value = Number(input);
      if (isNaN(value)) throw new Error('Provided values were not numbers!');
      if (value < 0 || value > 24) throw new Error('Provided values should be between 0 and 24 hours!');
      return value;
   };

   const targetAverageHours = parseHours(args[2]);
   const dailyExerciseHours = args
      .filter((_input, index) => index > 2)
      .map((input) => parseHours(input));
   return {dailyExerciseHours, targetAverageHours};
};

const calculateExercises = ({dailyExerciseHours, targetAverageHours} : Properties) : Result => {
   const periodLength: number = dailyExerciseHours.length;
   const average: number = dailyExerciseHours.reduce((a, b) => a + b) / periodLength;
   const success: boolean = average >= targetAverageHours;
   const trainingDays: number = dailyExerciseHours.filter(hours => hours > 0).length;
   const getRating = (averageExercisedHours : number, targetExercisedHours : number) : Rating =>
      averageExercisedHours >= targetExercisedHours ? 3 :
      targetExercisedHours - averageExercisedHours < 1 ? 2 :
      1;
   const rating: Rating = getRating (average, targetAverageHours);
   const getRatingDescription = (rating : Rating) : string => {
      switch (rating) {
         case 1:
            return 'try harder next time';
         case 2:
            return 'not too bad but could be better';
         case 3:
            return 'very good result';
         default:
            throw new Error('invalid rating');
      }
   };
   const ratingDescription: string = getRatingDescription (rating);
   return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target: targetAverageHours,
      average
   };
};

export { calculateExercises, parseParameters };