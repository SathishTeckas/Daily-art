import { NextResponse } from 'next/server';
import { countVotesAndUpdateBattle } from '../../utils/countVotesAndBattles';
export async function GET() {
    try {
      console.log("called");
        await countVotesAndUpdateBattle();
        return NextResponse.json({ ok: true });
    } catch (error) {
      return NextResponse.json({ ok: false });
    }
}
