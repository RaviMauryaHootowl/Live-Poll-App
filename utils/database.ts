import {MongoClient} from 'mongodb';

const client = new MongoClient(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connect = async () => {
  if(!client.isConnected()){
    await client.connect();
  }
  const db = client.db("polls");
  return {db, client};
}

export {connect};