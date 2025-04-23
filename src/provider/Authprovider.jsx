import { createContext, useEffect, useState } from "react";
import supabase from "../supabase/supabaseClient";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New state for error handling

  // Register
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err.message); // Set error message
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login
  const userLogin = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err.message); // Set error message
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUser = async (updateData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.updateUser(updateData);
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err.message); // Set error message
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
  
      // Clear the user from context manually
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  

  // Listen for auth state changes
  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
      } catch (err) {
        setError(err.message); // Set error message on session retrieval failure
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    error, // Include error state in context
    createUser,
    userLogin,
    updateUser,
    setLoading,
    setUser,
    logOut,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
