import Admin from "./Admin"
import Player from "./Player"

export default function Ended({type, gameData}) {
  if (type === 'admin') return <Admin gameData={gameData} />
  if (type === 'player') return <Player gameData={gameData} />
}
