import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  if (isNaN(height) || isNaN(weight) || height < 10 || weight < 1){
    res.status(400).send({ error: "malformatted parameters" });
  }
  return res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight)
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body = req.body;
  if (!body.hasOwnProperty('target') || !body.hasOwnProperty('daily_exercises')) {
    res.status(400).send({ error: "parameters missing" });
  }

  // Check target
  const target : number = body.target;
  if (typeof target !== "number") {
    res.status(400).send({ error: "malformatted parameters" });
  }

  // Check daily exercises
  const daily_exercises : Array <number> = body.daily_exercises;
  if (!Array.isArray(daily_exercises)) {
    res.status(400).send({ error: "malformatted parameters" });
  }
  const number_NaN = daily_exercises.filter (daily_exercise  => typeof daily_exercise !== "number").length;
  if (number_NaN > 0) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  return res.json(calculateExercises(daily_exercises, target));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});