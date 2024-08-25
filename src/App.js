import React, { useState } from "react";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [filter, setFilter] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://graceful-chaja-497576.netlify.app/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonInput,
        }
      );
      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredResponse = () => {
    if (!responseData) return null;
    let result = {};
    if (filter.includes("Numbers")) result.numbers = responseData.numbers;
    if (filter.includes("Alphabets")) result.alphabets = responseData.alphabets;
    if (filter.includes("Highest lowercase alphabet"))
      result.highest_lowercase_alphabet =
        responseData.highest_lowercase_alphabet;
    return result;
  };

  return (
    <div className="App">
      <h1>BFHL Frontend</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {responseData && (
        <>
          <select
            multiple
            onChange={(e) =>
              setFilter([...e.target.selectedOptions].map((o) => o.value))
            }
          >
            <option>Numbers</option>
            <option>Alphabets</option>
            <option>Highest lowercase alphabet</option>
          </select>
          <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
        </>
      )}
    </div>
  );
}

export default App;
