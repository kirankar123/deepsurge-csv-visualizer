// import React, { useState } from 'react';

// // This component handles user registration and is part of the required Authentication System.
// const Register = ({ onRegistrationSuccess }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);

//   // NOTE: Replace this mock function with an actual fetch call to your FastAPI /register endpoint.
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);

//     if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//       setLoading(false);
//       return;
//     }

//     // --- ACTUAL API CALL LOGIC GOES HERE ---
//     try {
//         const response = await fetch('http://localhost:8000/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             // FastAPI expects 'username' and 'password' in the body
//             body: JSON.stringify({ username: email, password }), 
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.detail || 'Registration failed. User may already exist.');
//         }

//         // Registration successful
//         setSuccess('Registration successful! Redirecting to login...');
        
//         // Use the callback to handle navigation, likely redirecting to Login
//         if (onRegistrationSuccess) {
//             setTimeout(onRegistrationSuccess, 2000); 
//         }

//     } catch (err) {
//         setError(err.message || 'An unknown error occurred during registration.');
//     } finally {
//         setLoading(false);
//     }
//     // ----------------------------------------
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Create a new account
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600 max-w">
//           Secure access for DeepSurge users
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10 border border-gray-100">
//           <form className="space-y-6" onSubmit={handleRegister}>
            
//             {/* Success/Error Message Display */}
//             {error && (
//               <div className="rounded-md bg-red-50 p-4">
//                 <h3 className="text-sm font-medium text-red-800">{error}</h3>
//               </div>
//             )}
//              {success && (
//               <div className="rounded-md bg-green-50 p-4">
//                 <h3 className="text-sm font-medium text-green-800">{success}</h3>
//               </div>
//             )}

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email address
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="new-password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
//                   disabled={loading}
//                 />
//               </div>
//             </div>
            
//             <div>
//               <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
//                 Confirm Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="confirm-password"
//                   name="confirm-password"
//                   type="password"
//                   required
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
//                   loading
//                     ? 'bg-indigo-400 cursor-not-allowed'
//                     : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
//                 } transition duration-150`}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                 ) : (
//                   'Register Account'
//                 )}
//               </button>
//             </div>
//           </form>
          
//           <div className="mt-6">
//              <p className="text-center text-sm text-gray-600">
//                 Already have an account? 
//                 <a href="#login" className="font-medium text-indigo-600 hover:text-indigo-500">
//                     {' '}Sign in
//                 </a>
//              </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;









import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-xl w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded-lg"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded-lg"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded-lg"
        />
        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">Register</button>
        <p className="text-sm mt-4 text-center">
          Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/login')}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Register;

