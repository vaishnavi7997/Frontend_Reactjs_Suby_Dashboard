import React, {useState} from 'react'
import { API_URL } from '../../data/apiPath';

const Register = ( {showLoginHandler} ) => {
  const [username, setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  // const [error,setError] = useState("");
  // const [loading, setLoading] = useState(true);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${API_URL}/vendor/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const text = await response.text(); // get raw response
    console.log("Raw response:", text);

    const data = text ? JSON.parse(text) : {}; // parse safely if not empty

    if (response.ok) {
      console.log("✅ Registration success:", data);
      setUsername("");
      setEmail("");
      setPassword("");
      alert("Vendor registered successfully");
      showLoginHandler();
    } else {
      console.error("❌ Server responded with error:", data);
      alert(data?.error || "Registration failed");
    }
  } catch (error) {
    console.error("❌ Registration failed:", error);
    alert("Something went wrong. Please try again.");
  }
};

return (
    <div className='registerSection'>
      <form className='autnForm' onSubmit={handleSubmit}>
                <h3>Vendor Register</h3>
            <label>Username</label>
            <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter your Name' />
            <label>Email</label>
            <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email' />
            <label>Password</label>
            <input type='text' name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your Password' />
            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Register
