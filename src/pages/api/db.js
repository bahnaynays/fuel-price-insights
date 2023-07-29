import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://fueling:FHdWRObrHCqqZRhD@fuelprice.9ffrxzl.mongodb.net/'; 
const dbName = 'FUEL_PRICE_PROJECT'; 

let cachedClient = null;

export async function connectToDatabase() {
  /*if (cachedClient && cachedClient.isConnected()) {
    return cachedClient;
  }*/

  if (cachedClient){
    return cachedClient;
  }

  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    cachedClient = client;

    return client;
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw error;
  }
}

export async function getDatabase() {
  const client = await connectToDatabase();
  return client.db(dbName);
}

