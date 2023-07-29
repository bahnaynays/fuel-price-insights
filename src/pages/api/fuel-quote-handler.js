import { getDatabase } from "./db";
import { getSession } from 'next-auth/client'

export default async function handler(req,res){

    //check for user session
    const session = await getSession({ req });
    if(!session){
        return res.status(401).json({ error: 'No session exists' });
    }

    if(req.method !== 'POST'){
        return res.status(405).end();
    }

    const{ GallonNeeded, deliveryAddress, deliveryDate, ppg, totalAmountDue } = req.body;

    //come up with some validate form data stuff

    const db = await getDatabase();
    const fuelQuote = db.collection('FUEL');

    const result = await fuelQuotes.insertOne({
        GallonNeeded,
        deliveryAddress,
        deliveryDate,
        ppg,        //maybe comment out ppg and totalAmountDue??
        totalAmountDue,
    });

    res.status(200).json({ id: result.insertedId });
}