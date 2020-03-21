const calculateBmi = (height : number, weight : number) : string => {
  const meter_height = height / 100;
  const BMI = weight / (meter_height * meter_height);
  if (BMI < 15) return "Very severely underweight";
  else if (BMI < 16) return "Severely underweight";
  else if (BMI < 18.5) return "Underweight";
  else if (BMI < 25) return "Normal (healthy weight)";
  else if (BMI < 30) return "Overweight";
  else if (BMI < 35) return "Obese Class I (Moderately obese)";
  else if (BMI < 40) return "Obese Class II (Severely obese)";
  else return "Obese Class III (Very severely obese)";
}

interface Parameters {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): Parameters => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  const height = Number(args[2]);
  const weight = Number(args[3]);
  if (isNaN(height) || isNaN(weight)) throw new Error('Provided values were not numbers!');
  if (height < 10 || weight < 1) throw new Error('Numbers provided not in range!');
  return { height, weight };
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

export {};