import React, { useState } from 'react'

export const ScoreCard = () => {
  const [team1, setTeam1] = useState(Array(11).fill(''));
  const [team2, setTeam2] = useState(Array(11).fill(''));
  const [isTeamCompleted, setIsTeamCompleted] = useState(false);

  const handleTeamSubmit = () => {

  }

  const handlePlayerSubmit = (team, player, index) => {

  }

  return (
    <div>
      {!isTeamCompleted && (
        <div>
          <form onSubmit={handleTeamSubmit}>
            <div style={{display: 'flex', justifyContent:'center', gap:'10px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1px' }}>
                <div>
                  <h2 className="text-lg font-semibold mb-2">Team 1</h2>
                  {team1.map((player, i) => (
                    <input type="text" value={player} onChange={(e) => handlePlayerSubmit('team1', e.target.value, i)} />
                  ))}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1px' }}>
                <div>
                  <h2 className="text-lg font-semibold mb-2">Team 2</h2>
                  {team2.map((player, i) => (
                    <input type="text" value={player} onChange={(e) => handlePlayerSubmit('team2', e.target.value, i)} />
                  ))}
                </div>
              </div>
            </div>

          </form>
        </div>
      )}
    </div>
  )
}
