import { useState, useEffect } from "react";


const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const App = () => {
  console.log("App rendered");


  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  
  const [url, setUrl] = useState(
    API_ENDPOINT + (localStorage.getItem("search") || "react")
  );

 
  const [stories, setStories] = useState([]);

  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("search") || ""
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]);

  
  useEffect(() => {
    
    if (!url) return;

    setIsLoading(true);
    setIsError(false);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setStories(data.hits); 
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [url]); 

  
  const handleSubmit = () => {
    setUrl(API_ENDPOINT + searchTerm);
  };

  
  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => story.objectID !== item.objectID
    );
    setStories(newStories);
  };

  return (
    <div>
      <Header />

      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

     
      <button
        type="button"
        disabled={!searchTerm} 
        onClick={handleSubmit}
      >
        Submit
      </button>

     
      {isError && <p>Something went wrong...</p>}

      
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List stories={stories} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

export default App;


const List = ({ stories, onRemoveItem }) => {
  return (
    <div>
      {stories.map((story) => (
        <Item
          key={story.objectID}
          story={story}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </div>
  );
};


const InputWithLabel = ({ id, value, onInputChange, children }) => {
  return (
    <div>
      <label htmlFor={id}>{children}</label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onInputChange}
      />
    </div>
  );
};

const Header = () => {
  return <h1>My Hacker News App 🚀</h1>;
};


const Item = ({ story, onRemoveItem }) => {
  return (
    <div>
      <p>{story.title}</p>

      <button onClick={() => onRemoveItem(story)}>
        Delete
      </button>
    </div>
  );
};

/*
Lab 9 Reflection

1. Why use useEffect for fetching?
To run asynchronous operations after rendering and control when they execute.

2. Difference between loading and error:
Loading = waiting for data
Error = something failed during fetch

3. Why control fetching?
To avoid unnecessary API calls and improve performance.
*/