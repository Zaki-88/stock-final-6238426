import dbConnect from "@/lib/dbConnect"
import Information from "@/models/Information"

export default async function handler(req, res) {
  await dbConnect();
  console.log("req.method: ", req.method);

  if (req.method === "GET") {
    const docs = await Information.find();
    res.status(200).json(docs);
  } else if (req.method === "POST") {
    // console.log(typeof(req.body))
    console.log("POST", req.body);
    const doc = await Information.create(req.body);
    res.status(201).json(doc);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}