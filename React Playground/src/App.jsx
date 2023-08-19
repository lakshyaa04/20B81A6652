import React, { useState } from 'react';

export function App() {
  const [urls, setUrls] = useState([]);
  const [mergedNumbers, setMergedNumbers] = useState([]);

  const handleFetchNumbers = async () => {
    try {
      const response = await fetch(`/numbers${urls.map(url => `?url=${encodeURIComponent(url)}`).join('')}`);
      const data = await response.json();
      setMergedNumbers(data.numbers);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  return (
    <div className="App">
      <h1>Number Management App</h1>
      <div>
        <label>Enter URL:</label>
        {urls.map((url, index) => (
          <div key={index}>
            <input
              type="text"
              value={url}
              onChange={e => handleUrlChange(index, e.target.value)}
            />
          </div>
        ))}
        <button
          onClick={() => {
            setUrls([...urls, '']);
          }}
        >
          Add URL
        </button>
      </div>
      <button onClick={handleFetchNumbers}>Fetch Numbers</button>
      <div>
        <h2>Merged Unique Integers:</h2>
        {mergedNumbers.length > 0 ? (
          <ul>
            {mergedNumbers.map(number => (
              <li key={number}>{number}</li>
            ))}
          </ul>
        ) : (
          <p>No merged numbers available.</p>
        )}
      </div>
    </div>
  );
}
