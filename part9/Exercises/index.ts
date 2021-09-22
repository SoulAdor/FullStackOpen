import express from 'express';
import { calculateBmi, parseQuery } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
   const getProperties = () => {
      const { weight, height } = req.query as { weight: string, height: string };
      return parseQuery(height, weight);
   };
   try {
      const properties = getProperties();
      const {height, weight} = properties;
      res.send({weight, height, bmi: calculateBmi(properties)});
   } catch (error) {
      res.status(400).send({error: "malformed parameters"});
   }
 });

app.post('/calculate', (req, res) => {
   try {
      const { daily_exercises, target } = req.body as { daily_exercises: Array<number>, target: number };
      if (daily_exercises === undefined || target === undefined) throw new Error('parameters missing');
      if (daily_exercises.length == 0 || daily_exercises.some(isNaN) || isNaN(target)) throw new Error('malformed parameters');
      res.send(calculateExercises({dailyExerciseHours : daily_exercises, targetAverageHours : target}));
   } catch (error) {
      if (error instanceof Error) res.status(400).send({error: error.message});
   }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});