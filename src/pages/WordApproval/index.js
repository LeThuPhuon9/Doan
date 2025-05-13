function WordApproval() {
  const [pendingWords, setPendingWords] = useState([]);  // Initialize as empty array
  
  useEffect(() => {
    const fetchPendingWords = async () => {
      try {
        const response = await // your API call
        if (response && response.data) {
          // Ensure we're setting an array
          setPendingWords(Array.isArray(response.data) ? response.data : []);
        }
      } catch (error) {
        console.error('Error fetching pending words:', error);
        setPendingWords([]);
      }
    };

    fetchPendingWords();
  }, []);

  // Add check before mapping
  return (
    <div>
      {Array.isArray(pendingWords) && pendingWords.length > 0 ? (
        pendingWords.map((word) => (
          // your rendering logic
        ))
      ) : (
        <div>No pending words to approve</div>
      )}
    </div>
  );
}