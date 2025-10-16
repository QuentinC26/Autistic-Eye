import { createContext, useState } from "react";

// Creating a context is used to easily share important data everywhere your application
// Creates a new context called AuthContext
export const AuthContext = createContext();

// AuthProvider is used to remember that the user is logged in, no matter where they go in the app.
export function AuthProvider({ children }) {
  // Stores the logged in user (null = no one is logged in)
  const [user, setUser] = useState(null); 

  return (
    // This "Provider" component shares the 'user' state and the 'setUser' function with all the components inside it (children).
    <AuthContext.Provider value={{ user, setUser }}>
    {/* Show the components you put inside <AuthProvider> */}
      {children}
    </AuthContext.Provider>
  );
}
