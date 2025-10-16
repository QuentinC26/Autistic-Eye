import { createContext, useState, useEffect } from "react";

// Creating a context is used to easily share important data everywhere your application
// Creates a new context called AuthContext
export const AuthContext = createContext();

// AuthProvider is used to remember that the user is logged in, no matter where they go in the app.
export function AuthProvider({ children }) {
  // Stores the logged in user (null = no one is logged in)
  const [user, setUser] = useState(null);

  // Run this code once when the component starts
  useEffect(() => {
  // Checks if there is a user already stored in localStorage
  const storedUser = localStorage.getItem('user');
  // Checks if a user was found in localStorage
  if (storedUser) {
    // The user in localStorage is in text, we transform it into an object
    setUser(JSON.parse(storedUser));
  }
  // The code inside only executes once, at the beginning
  }, []);

  // Creates a function that receives the logged in user's information (userData)
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return (
    // This "Provider" component shares the 'user' state and the 'setUser' function with all the components inside it (children).
    <AuthContext.Provider value={{ user, setUser }}>
    {/* Show the components you put inside <AuthProvider> */}
      {children}
    </AuthContext.Provider>
  );
}
