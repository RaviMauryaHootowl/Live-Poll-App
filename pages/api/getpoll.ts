import { ObjectID } from 'mongodb';
import {NextApiRequest, NextApiResponse} from 'next';
import {connect} from '../../utils/database';

export default async (req : NextApiRequest, res : NextApiResponse) => {
  const {db} = await connect();
  
  const pollid = req.query['q'];
  try{
    const poll = await db.collection("polls").findOne({_id : new ObjectID(pollid.toString())});
    res.json(poll);
  }catch(err){
    res.status(404);
    res.json({});
  };
}

//5f788b8e68c8e11fc4b4791a