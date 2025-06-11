import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';

const Login = ({ setShowWelcomeHandler }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login Success');
        setEmail('');
        setPassword('');
        localStorage.setItem('loginToken', data.token);

        const vendorId = data.vendorId;
        console.log('Checking For Vendor Id:', vendorId);

        const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
        const vendorData = await vendorResponse.json();

        if (vendorResponse.ok) {
          const vendorFirmId = vendorData.vendorFirmId;
          const vendor = vendorData.vendor;

          if (vendor && vendor.firm && vendor.firm.length > 0) {
            const vendorFirmName = vendor.firm[0].firmName;
            console.log('Firm name is', vendorFirmName);

            localStorage.setItem('firmId', vendorFirmId);
            localStorage.setItem('firmName', vendorFirmName);
          } else {
            console.log('Firm not found for this vendor.');
            localStorage.removeItem('firmId');
            localStorage.removeItem('firmName');
          }

          setShowWelcomeHandler(); // show dashboard or next screen
          window.location.reload(); // refresh to update UI (e.g., NavBar)
        } else {
          alert('Failed to fetch vendor data');
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error', error);
      alert('Something went wrong. Try again later.');
    }
  };

  return (
    <div className="loginSection">
      <form className="autnForm" onSubmit={loginHandler}>
        <h3>Vendor Login</h3>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
          required
        />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
