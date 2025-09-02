import React, { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";

const Users = () => {
  const port = import.meta.env.VITE_API_URL;
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        setError("No token found, please login first");
        return;
      }

      const res = await fetch(`${port}/api/getalluser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setUsers(data.data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    }
  }, [port]); 

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <h2>All Users</h2>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.address}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
