// src/hooks/useAuthStatus.js
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

/**
 * Custom hook to track the authentication status of the current user.
 * @returns {object} An object containing:
 * - currentUser: The Firebase User object if logged in, otherwise null.
 * - loading: A boolean indicating if the authentication state is still being determined.
 */
const useAuthStatus = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged is a Firebase listener that gets called whenever
    // the user's sign-in state changes.
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return { currentUser, loading };
};

export default useAuthStatus;