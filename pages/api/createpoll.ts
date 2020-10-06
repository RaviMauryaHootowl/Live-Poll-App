import { ObjectID } from 'mongodb';
import {NextApiRequest, NextApiResponse} from 'next';
import {connect} from '../../utils/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {db} = await connect();
  const reqData = req.body;
  console.log(reqData);
  const result = await db.collection("polls").insertOne(reqData);
  if(result.ops[0]._id){
    res.json({saved : "true", result : result.ops[0]});
  }else{
    res.status(500);
    res.json({saved: "false"});
  }
  
}