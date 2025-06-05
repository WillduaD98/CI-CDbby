import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";

import pythonQuestions from './pythonQuestions.json' with { type: "json" };

export const seedQuestions = async () => {
  try {
    const count = await Question.countDocuments();
    if (count ===0) {
      await cleanDB('Question', 'questions');
      await Question.insertMany(pythonQuestions);
      console.log(`Seed Inserted`)
    }
  } catch (error) {
    console.error('Error seeding questions:', error);
    process.exit(1);
  }
}

db.once('open', async () => {
  await cleanDB('Question', 'questions');

  await Question.insertMany(pythonQuestions);

  console.log('Questions seeded!');
  
});
