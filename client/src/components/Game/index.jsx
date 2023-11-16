import Waiting from './Waiting'
import Playing from './Playing'
import Ended from './Ended'

export default function Game({type, gameData, refresh}) {
  return (
    <>
      {gameData.status === "waiting" && <Waiting gameData={gameData} type={type} refresh={refresh} />}
      {gameData.status === "playing" && <Playing gameData={gameData} type={type} refresh={refresh} />}
      {gameData.status === "ended" && <Ended gameData={gameData} type={type} refresh={refresh} />}
    </>
  );
}
