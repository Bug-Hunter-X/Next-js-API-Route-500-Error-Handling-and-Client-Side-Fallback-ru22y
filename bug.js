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
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData().catch(error => {
      console.error('Error fetching data:', error);
      // Handle the error appropriately. For example, display an error message to the user.
    });
  }, []);

  if(data === null) return <p>Loading...</p>;

  return(
    <div>My Component {JSON.stringify(data)}</div>
  );
}

// pages/api/data.js
export default function handler(req, res) {
  // Simulate an API call that sometimes fails.
  const randomNumber = Math.random();
  if (randomNumber < 0.5) {
    res.status(500).json({ error: 'Internal Server Error' });
  } else {
    res.status(200).json({ message: 'Data from API' });
  }
}
```