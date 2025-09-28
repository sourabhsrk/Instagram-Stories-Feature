import React from "react";

interface Story {
  urls: {
    thumb: string;
    regular?: string;
  };
  alt_description?: string;
}

interface StoryContainerProps {
  story: Story;
  onClick: () => void;
}

const StoryContainer = ({story, onClick}: StoryContainerProps) => {
  return (
    <div className='storyContainer' onClick={onClick}>
      <img src={story?.urls?.thumb} alt={story?.alt_description || "storyContainer"}/>
    </div>
  )
}

export default React.memo(StoryContainer);