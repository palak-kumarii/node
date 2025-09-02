import React, { useState } from "react";

const VerifyOtp = () => {
  const port = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${port}/api/verifyotp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, newpassword }),
      });

      const data = await res.json();
      setMessage(data.message);

      if (data.success) {
        setEmail("");
        setOtp("");
        setNewpassword("");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>

      <form onSubmit={handleSubmit}>
        
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div><br/><br/>

    
        <div>
          <label>OTP:</label>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div><br/><br/>

 
        <div>
          <label>New Password:</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newpassword}
            onChange={(e) => setNewpassword(e.target.value)}
            required
          />
        </div><br/><br/>

        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify & Reset"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyOtp;
