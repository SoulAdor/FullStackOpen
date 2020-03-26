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
  if (!Object.prototype.hasOwnProperty.call(body, 'target') || 
      !Object.prototype.hasOwnProperty.call(body, 'daily_exercises')) {
    res.status(400).send({ error: "parameters missing" });
  }

  // Check target
  const target: number = body.target;
  if (typeof target !== "number") {
    res.status(400).send({ error: "malformatted parameters" });
  }

  // Check daily exercises
  const dailyExerciseHours: Array <number> = body.daily_exercises;
  if (!Array.isArray(dailyExerciseHours)) {
    res.status(400).send({ error: "malformatted parameters" });
  }
  if (dailyExerciseHours.filter (dailyExerciseHour  => typeof dailyExerciseHour !== "number").length > 0) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  return res.json(calculateExercises(dailyExerciseHours, target));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});