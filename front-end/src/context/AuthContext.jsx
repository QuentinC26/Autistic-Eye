import { createContext, useState, useEffect } from "react";

// Creating a context is used to easily share important data everywhere your application
// Creates a new context called AuthContext
export const AuthContext = createContext();

// AuthProvider is used to remember that the user is logged in, no matter where they go in the app.
export function AuthProvider({ children }) {
  // Stores the logged in user (null = no one is logged in)
  const [user, setUser] = useState(null);
  // Store the authentication token (JWT) of the logged in user. (null = not logged in)
  const [accessToken, setAccessToken] = useState(null);
  // Indicates that data is loading
  const [loading, setLoading] = useState(true);

  // Run this code once when the component starts
  useEffect(() => {
  // Checks if there is a user already stored in localStorage
  const storedUser = localStorage.getItem('user');
  // Checks if there is already a token saved in localStorage
  const storedToken = localStorage.getItem('accessToken');
   if (storedUser && storedToken && storedToken !== "undefined") {
    setUser(JSON.parse(storedUser));
    setAccessToken(storedToken);
  }
  // Called when loading is complete
  setLoading(false);
  // The code inside only executes once, at the beginning
  }, []);

  // Create a function that receives the logged in user and token information (userData)
  const loginUser = (userData, token) => {
    setUser(userData);
    setAccessToken(token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('accessToken', token);
  };

  const logoutUser = () => {
    // setUser(null) tells React: "There are no more logged in users."
    setUser(null);
    // setToken(null) tells React: "There are no more tokens."
    setAccessToken(null);
    // Delete the user from localStorage
    localStorage.removeItem('user');
    // Delete the token from localStorage
    localStorage.removeItem('accessToken');
};

  return (
    // This "Provider" component shares the 'user' and 'accesToken' state, the 'loginUser' and 'logoutUser' functions and loading variable with all the components inside it (children).
    <AuthContext.Provider value={{ user, accessToken, loginUser, logoutUser, loading}}>
    {/* Show the components you put inside <AuthProvider> */}
      {children}
    </AuthContext.Provider>
  );
}
