import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");

  const handleSave = async () => {
    try {
      const payload = {
        name,
        userName,
      };

      const response = await axios.post(
        "http://localhost:3000/users",
        payload,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <div>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        Username:
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      <button onClick={handleSave}>Submit</button>
    </div>
  );
};

export default App;