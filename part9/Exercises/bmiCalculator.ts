interface Properties {
   height: number,
   weight: number
}

const parseQuery = (heightQuery: string, weightQuery: string) : Properties => {
   const height = Number(heightQuery);
   const weight = Number(weightQuery);
   if (isNaN(height) || isNaN(weight)) throw new Error('Provided values were not numbers!');
   if (height <= 0 || weight <= 0) throw new Error('Provided values were not positive!');
   return {height, weight};
};

const calculateBmi = ({height, weight}: Properties) : string => {
   const heightInMeters: number = height / 100;
   const bmi: number = weight / Math.pow(heightInMeters, 2);
   return bmi < 16 ? 'Underweight (Severe thinness)' :
      bmi < 17 ? 'Underweight (Moderate thinness)' :
      bmi < 18.5 ? 'Underweight (Mild thinness)' :
      bmi < 25 ? 'Normal (healthy weight)' :
      bmi < 30 ? 'Overweight (Pre-obese)' :
      bmi < 35 ? 'Obese (Class I)' :
      bmi < 40 ? 'Obese (Class II)' :
      'Obese (Class III)';
};

export { calculateBmi, parseQuery };