import { useEffect, useMemo, useState } from "react";

interface Story {
  urls: {
    thumb: string;
    regular?: string;
  };
  alt_description?: string;
}

interface StoryViewerProps {
  stories: Story[];
  initialIndex: number;
  onClose: () => void;
}

const StoryViewer = ({ stories, initialIndex, onClose }: StoryViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
  const [progress, setProgress] = useState(0);
  const currentStory = useMemo(() => {
    return stories[currentIndex];
  }, [stories, currentIndex]);

  const goToNextStory = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const goToPrevStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goToNextStory();
      if (e.key === "ArrowLeft") goToPrevStory();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  useEffect(() => {
    setProgress(0);
    const duration = 5000;
    const intervalTime = 50;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const id = setInterval(() => {
      setProgress(prev => {
        if(prev >= 100){
          clearInterval(id);
          goToNextStory();
          return 0;
        }
        return prev + increment;
      })
    }, intervalTime);

    return () => clearInterval(id);
  }, [currentIndex, goToNextStory]);
  return (
    <div className="storyViewer-overlay">
      <div 
        className='progressBar'
        style={{ width: `${progress}%` }}
      />
      <div className="viewContainer">
        <img
          src={currentStory?.urls?.regular}
          alt={currentStory?.alt_description || "storyView"}
        />
        {/* Left Click Area - For Previous Story */}
        <div className="clickArea leftClickArea" onClick={goToPrevStory} />

        {/* Right Click Area - For Next Story */}
        <div className="clickArea rightClickArea" onClick={goToNextStory} />
      </div>
      <button className="closeBtn" onClick={onClose}>
        &#10006;
      </button>
    </div>
  );
};

export default StoryViewer;
