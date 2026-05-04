import { useState, useEffect } from "react";

const App = () => {
  console.log("App rendered");
  
  const stories = [
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
  const [searchTerm, setSearchTerm] = useState(
  localStorage.getItem("search") || ""
  );
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };
  useEffect(() => {
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]);

  const filteredStories = stories.filter((story) =>
  story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Hacker News Stories</h1>
      <Header />
      <Search onSearch={handleSearch} searchTerm={searchTerm}/>
      <List stories={filteredStories} />
      
    </div>
  );
};

export default App;

const List = ({ stories }) => {
  console.log("List rendered");

  return (
    <div>
      {stories.map((story) => (
        <Item key={story.objectID} story={story} />
      ))}
    </div>
  );
};
const Search = ({ onSearch, searchTerm }) => {
  console.log("Search rendered");

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input
        type="text"
        id="search"
        value={searchTerm}
        onChange={onSearch}
      />
    </div>
  );
};
const Header = () => {
  return <h1>My Hacker News App 🚀</h1>;
};
const Item = ({ story }) => {
  console.log("Item rendered");
  return (
    <div>
      <p>{story.title}</p>
    </div>
  );
};
/*
Lab 7 Reflection

1. Controlled component:
An input whose value is controlled by React state.

2. Side effect:
An operation outside rendering (like saving to localStorage).

3. Why useEffect:
To run code when state changes instead of during rendering.
*/