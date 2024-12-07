```javascript
// pages/index.js
export default function Home() {
  return (
    <div>
      <h1>Welcome to my Next.js app</h1>
      <p>This is a paragraph.</p>      
      <MyComponent/>
    </div>
  );
}

// components/MyComponent.js
export default function MyComponent(){
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || response.statusText}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      }
    };
    fetchData();
  }, []);

  if (error) return <p>Error: {error.message}</p>;
  if (data === null) return <p>Loading...</p>;

  return(
    <div>My Component {JSON.stringify(data)}</div>
  );
}

// pages/api/data.js
export default function handler(req, res) {
  const randomNumber = Math.random();
  if (randomNumber < 0.5) {
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  } else {
    res.status(200).json({ message: 'Data from API' });
  }
}
```