import './App.css'
// Access the data of the context you created
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Home() {
  // Get the user from the context
  const { user } = useContext(AuthContext);
  return (
    <>
    {/* ? = the condition is True */}
    {/* : = the condition is False */}
     {user ? (
        <div>
        <h3>Bienvenue sur Autistic Eye</h3>
        </div>
        ) : (
         <p>Bienvenue sur Autistic Eye, pour vous inscrire :</p>
      )}
    </>
  )
}

export default Home
