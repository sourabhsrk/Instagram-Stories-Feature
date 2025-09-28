import { useCallback, useEffect, useMemo, useState, memo } from 'react'

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

const StoryViewer = ({stories, initialIndex, onClose}: StoryViewerProps) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
     const currentStory = useMemo(() => {
        return stories[currentIndex];
    }, [stories, currentIndex]);

    const goToNextStory = useCallback(() => {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onClose(); 
        }
    }, [currentIndex, stories.length, onClose]);

    const goToPrevStory = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            onClose(); 
        }
    }, [currentIndex, onClose]);

    useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goToNextStory();
      if (e.key === 'ArrowLeft') goToPrevStory();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);
  return (
    <div className='storyViewer-overlay'>
      <div className='viewContainer'>
        <img src={currentStory?.urls?.regular} alt={currentStory?.alt_description || "storyView"}/>
        {/* Left Click Area - For Previous Story */}
        <div 
          className='clickArea leftClickArea' 
          onClick={goToPrevStory}
        />
        
        {/* Right Click Area - For Next Story */}
        <div 
          className='clickArea rightClickArea' 
          onClick={goToNextStory}
        />
      </div>
      <button className='closeBtn' onClick={onClose}>&#10006;</button>
    </div>
  )
}

export default memo(StoryViewer);
