export default function handler(req, res) {
    console.log("Calledddd");
    res.status(200).end('Hello Cron!');
  }