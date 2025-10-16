import './App.css'
// Access the data of the context you created
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";


function Article() {
   // Get the user from the context
    const { user } = useContext(AuthContext);
    return (
      <>
      {/* ? = the condition is True */}
      {/* : = the condition is False */}
       {user ? (
          <div>
            <h3>Page Article</h3>
          </div>
          ) : (
            // Redirects the user to the Register/Login page
            <Navigate to="/Register_and_login" />
        )}
      </>
  )
}

export default Article
