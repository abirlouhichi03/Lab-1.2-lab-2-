import { useState, useEffect } from "react";

const App = () => {
  console.log("App rendered");

  const initialStories = [
    {
      objectID: 1,
      title: "React is Awesome",
      url: "https://react.dev",
      author: "Dan",
      points: 120,
      num_comments: 45
    },
    {
      objectID: 2,
      title: "JavaScript Tips",
      url: "https://developer.mozilla.org",
      author: "Sarah",
      points: 80,
      num_comments: 500
    },
    {
      objectID: 3,
      title: "AI is the Future",
      url: "https://openai.com",
      author: "John",
      points: 200,
      num_comments: 60
    }
  ];

  const [stories, setStories] = useState(initialStories);

  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("search") || ""
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]);


  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => story.objectID !== item.objectID
    );
    setStories(newStories);
  };

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      
      <List stories={filteredStories} onRemoveItem={handleRemoveStory} />
    </div>
  );
};

export default App;


const List = ({ stories, onRemoveItem }) => {
  console.log("List rendered");

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


const InputWithLabel = ({
  id,
  value,
  onInputChange,
  children
}) => {
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
  console.log("Item rendered");

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
Lab 8 Reflection

1. Reusable component:
A component that can be used in different contexts by passing props instead of hard-coded values.

2. Component composition:
Using components inside other components via children.

3. Why pass handlers:
Because state is managed in parent, but actions happen in child components.
*/