import {MongoClient} from 'mongodb';

const DATABASE_URL = "mongodb+srv://ravi:ravi@cluster0.kvkuv.mongodb.net/?retryWrites=true&w=majority"
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