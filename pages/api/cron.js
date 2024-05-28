import { countVotesAndUpdateBattle } from '../../utils/countVotesAndBattles';
export default async function handler(req, res) {
    console.log("fsdfdsfsdf");
    await countVotesAndUpdateBattle();
    res.status(200).end('Hello Cron!');
  }