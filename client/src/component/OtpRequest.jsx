import React, { useState } from "react";

const OtpRequest = () => {
  const port = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${port}/api/sendotp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("OTP sent successfully! Please check your email.");
      } else {
        setMessage(data.message || "Failed to send OTP");
      }
    } catch (error) {   
      console.error("Error while sending OTP:", error); 
      setMessage("Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Request OTP</h2>

      <form onSubmit={handleSendOtp}>
   
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div><br/><br/>

  
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </div>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default OtpRequest;
