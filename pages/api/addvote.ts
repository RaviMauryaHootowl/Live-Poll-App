import { ObjectID } from 'mongodb';
import {NextApiRequest, NextApiResponse} from 'next';
import {connect} from '../../utils/database';

export default async (req : NextApiRequest, res : NextApiResponse) => {
  const {db} = await connect();
  
  const pollid = req.query['q'];
  const optionNumber = req.query['option'];
  const optionQuery = `options.${optionNumber}.votings`;
  console.log(pollid);
  
  
  await db.collection("polls").updateOne(
    {_id : new ObjectID(pollid.toString())},
    {$push : {[optionQuery] : {"a": "a"}}}
  );

  const poll = await db.collection("polls").findOne({_id : new ObjectID(pollid.toString())});
  res.json(poll);
}

//5f788b8e68c8e11fc4b4791a