import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Removed: useNavigate requires a <Router> wrapper

// Use this component to handle user login and token management.
const Login = ({ setAuthToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Removed: const navigate = useNavigate(); 

  // NOTE: This function makes the actual fetch call to your FastAPI /login endpoint.
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // --- ACTUAL API CALL LOGIC ---
    try {
        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                // FastAPI's standard login requires 'application/x-www-form-urlencoded' 
                // for standard forms, but if you use a JSON body in FastAPI (better practice),
                // this header is correct. We'll use JSON for cleaner React code.
                'Content-Type': 'application/json',
            },
            // FastAPI expects 'username' and 'password' in the body
            body: JSON.stringify({ username: email, password }),
        });

        if (!response.ok) {
            // Handle HTTP errors (401 Unauthorized, 403 Forbidden, etc.)
            const errorData = await response.json();
            // Display specific error message from FastAPI if available
            throw new Error(errorData.detail || 'Login failed. Please check your credentials.');
        }

        const data = await response.json();
        const token = data.access_token; // Assuming FastAPI returns { access_token: "..." }

        // 1. Store the token securely (e.g., in localStorage for simplicity in a hackathon)
        localStorage.setItem('authToken', token);
        
        // 2. Update the parent state (App.jsx) to indicate authentication
        if (setAuthToken) {
            setAuthToken(token);
        }
        
        // 3. Removed: navigate('/dashboard'); 
        // Navigation will be handled by the parent component after setAuthToken is called.
        
    } catch (err) {
        setError(err.message || 'An unknown error occurred during login.');
    } finally {
        setLoading(false);
    }
    // -----------------------------
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to DeepSurge
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          Access your CSV visualization dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            
            {/* Error Message Display */}
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                } transition duration-150`}
                disabled={loading}
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6">
             <p className="text-center text-sm text-gray-600">
                Don't have an account? 
                {/* Notice the use of '#register' for basic routing until you implement React Router */}
                <a href="#register" className="font-medium text-indigo-600 hover:text-indigo-500">
                    {' '}Sign up
                </a>
             </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
