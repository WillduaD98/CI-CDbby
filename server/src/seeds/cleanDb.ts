import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: keyof typeof models, collectionName: string) => {
  try {
    const model = models[modelName];

    if (!model?.db?.db) {
      throw new Error('Database connection is not properly initialized.');
    }

    const collections = await model.db.db.listCollections({ name: collectionName }).toArray();

    if (collections.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    console.error(`Error cleaning collection "${collectionName}":`, err);
    throw err;
  }
};
