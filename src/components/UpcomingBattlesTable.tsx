import React, { useEffect, useState } from 'react';
import { useFetchArts, ArtData } from '@/hooks/artHooks';
import { useMbWallet } from "@mintbase-js/react";
import Image from 'next/image';
import { useVoting } from '../hooks/useArtVoting';
const UpcomingArtTable: React.FC<{ toggleUploadModal: () => void }> = ({ toggleUploadModal }) => {
  const [upcomingArts, setUpcomingArts] = useState<ArtData[]>([]);
  const { arts, error, loading } = useFetchArts();
  const { isConnected, selector, connect, activeAccountId } = useMbWallet();
  useEffect(() => {
    if (arts) {
      console.log("Upcoming Arts", arts);
      setUpcomingArts(arts);
    }
  }, [arts]);
  if (loading) return <p>Loading battles...</p>;
  if (error) return <p>Error loading battles: {error}</p>;

  return (
    <div className="battle-table mt-8 pb-10 flex flex-col items-center" style={{ width: '100%', gap: 8 }}>
    <div className='battle-table1 pb-10'>
      <h2 className="text-xl font-bold text-black text-center">Upcoming Arts</h2> 
      <div className='flex justify-between items-center'> 
      <div className="add-art-btn text-center py-1"style={{ marginLeft: 'auto' }}> 
      <button onClick={toggleUploadModal} disabled={!isConnected} className={`px-4 py-2 vote-btn text-white rounded ${!isConnected ? 'cursor-not-allowed' : ''}`}>
        Add Artwork
      </button>
    </div>
      </div>
      <BattleTable artData={upcomingArts} />
    </div>
  </div>
  
  );
};


const BattleTable: React.FC<{ artData: ArtData[] }> = ({ artData }) => {
  const { isConnected, selector, connect, activeAccountId } = useMbWallet();
  const {  votes,  fetchVotes,  submitVote,} = useVoting();
  const [success,setSuccess] = useState(false);

  const onVote = async (id: string) => {
    if (!isConnected || !activeAccountId) {
      await connect();
      return;
    }
    if(!id) {
      alert("art  not loaded!");
      return;
    }
    console.log(id);
    const success = await submitVote({
      participantId: activeAccountId,
      artId: id,
    });
    console.log(success);
    if (success) {
      setSuccess(true);
      alert('Vote submitted successfully!');
      location.reload();
    } else {
      alert('Failed to submit vote. Maybe you already voted!');
    }
  };

  return (
      <table className="min-w-full mt-4">
        <thead>
          <tr className="bg-white">
            <th className="px-6 py-3 text-xs text-left" style={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderRight: '1px solid black', color: 'black' }}>Arts</th>
            <th className="px-6 py-3 text-xs text-left" style={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderRight: '1px solid black', color: 'black' }}>Artist Name</th>
            <th className="px-6 py-3 text-xs text-left" style={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5, color: 'black' }}>UpVotes</th>
            <th className="px-6 py-2 text-xs text-left" style={{ borderTopRightRadius: 5, borderBottomRightRadius: 5, color: 'black' }}></th>
          </tr>
        </thead>
        <tbody>
          {artData.slice(-10).map((art, index) => (
            <tr key={index} className="border-b bg-white">
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium" style={{ color: 'black' }}>
                                        <div className="flex justify-center">
                                            <Image
                                                src={art.grayScale}
                                                alt="Art A"
                                                width={100} 
                                                height={100} 
                                                className="sm:w-48 sm:h-48 w-36 h-36"
                                                unoptimized
                                            />
                                        </div>
                                    </td>
              <td className="px-6 py-4 text-xs sm:text-sm font-small break-all" style={{ color: 'black' }}>
            {art.artistId}
          </td>
          <td className="px-6 py-4 text-xs sm:text-sm font-small" style={{ color: 'black' }}>
            {art.upVotes}
          </td>
          <td className="px-6 py-4 text-sm sm:text-sm font-small" style={{ color: 'black', backgroundColor: 'none' }}>
                <button onClick={() => onVote(art._id)} className={`w-full sm:w-auto px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded text-xs sm:text-sm`}>
                  Vote
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
    
  
}

export default UpcomingArtTable;
