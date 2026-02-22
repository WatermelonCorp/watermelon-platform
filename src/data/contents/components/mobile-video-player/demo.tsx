import React from 'react';
import { MobileVideoPlayer } from './index';

const MobileVideoPlayerDemo: React.FC = () => {
    return (
        <main className="min-h-screen">
          <MobileVideoPlayer
              src="https://www.pexels.com/download/video/8820216/"
              poster="https://images.pexels.com/videos/8820216/aerial-footage-aerial-video-aerial-view-at-the-beach-8820216.jpeg"
              loop={true}
              autoPlay={false}
          />
        </main>
    );
};

export default MobileVideoPlayerDemo;