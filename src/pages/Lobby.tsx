import {
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocData,
} from "reactfire";
import { Game, Member, TopProps } from "../data";

const Lobby = ({ state }: TopProps) => {
  const gameRef = useFirestore().collection("games").doc(state.currentGame);
  const membersRef = gameRef.collection("members");
  const { status, data: game } = useFirestoreDocData<Game>(gameRef);
  const { status: memberStatus, data: members } =
    useFirestoreCollectionData<Member>(membersRef);
  if (status !== "success" || memberStatus !== "success") {
    return <div>loading...</div>;
  }
  const amAdmin = game.admin === state.self.uid;
  return (
    <div>
      <h1>Lobby</h1>
      <h2>code {game.code}</h2>
      {amAdmin && <button>start game</button>}
      <div>
        {Object.values(members).map((member) => (
          <div
            key={member.uid}
            style={{
              backgroundColor: member.isAdmin ? "#ffe70b7f" : "rgba(0,0,0,0)",
            }}
          >
            {member.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lobby;
