import { useCallback, useEffect, useState } from "react";
import StoryContainer from "./Components/StoryContainer";
import "./App.css";
import StoryViewer from "./Components/ViewStory";

function App() {
  const [stories, setStories] = useState([]);
  const [isStoryViewerOpen, setIsStoryViewerOpen] = useState(false);
  const [currStoryIdx, setCurrStoryIdx] = useState(0);
  useEffect(() => {
    (async function () {
      try {
        const fetchStoriesData = await fetch(
          `https://api.unsplash.com/search/photos?page=1&query=landscape&client_id=${import.meta.env.VITE_clientId}`
        );
        const StoriesData = await fetchStoriesData.json();
        setStories(StoriesData.results);
      } catch (err) {
        console.log("failed to fetch the stories", err);
      }
    })();
  }, []);

   const handleClick = useCallback((idx: number) => {
    setIsStoryViewerOpen(true);
    setCurrStoryIdx(idx);
  }, []);

  return (
    <div>
      <div className="StoriesList">
        {stories?.map((story, idx) => {
          return <StoryContainer story={story} key={idx} onClick={() => handleClick(idx)}/>;
        })}
      </div>
      <h1>This is Instagram Story feature.</h1>
      <p>
        PLease click on the story to view the story and click on the left side
        or right side of the story to move forward and back in stories.
      </p>
      {isStoryViewerOpen && (
        <StoryViewer
          stories={stories}
          initialIndex={currStoryIdx}
          onClose={()=>setIsStoryViewerOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
