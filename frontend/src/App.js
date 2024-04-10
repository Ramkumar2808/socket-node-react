// App.js (or any other component)
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Change URL to your server address

function App() {
  const [randomData, setRandomData] = useState(null);

  useEffect(() => {
    // Listen for random data from the server
    socket.on("randomData", (data) => {
      console.log("Received random data from server:", data);
      setRandomData(data);
    });

    return () => {
      // Clean up event listener
      socket.off("randomData");
    };
  }, []); // Run only once on component mount

  return (
    <div>
      <h1>React Socket.IO Random Data</h1>
      {randomData && (
        <div>
          <p>Received random value: {randomData.value}</p>
          {/* Display other properties of randomData if needed */}
        </div>
      )}
    </div>
  );
}

export default App;
