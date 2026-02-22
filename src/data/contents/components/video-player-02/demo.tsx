
import { VideoPlayer02 } from './index';

const VideoPlayer02Demo = () => {
    return (
        <div className="p-4  bg-transparent min-h-screen w-full flex items-center justify-center">
            <div className="w-full max-w-5xl">
                <VideoPlayer02
                    src="https://www.pexels.com/download/video/8820216/"
                    poster="https://images.pexels.com/videos/8820216/aerial-footage-aerial-video-aerial-view-at-the-beach-8820216.jpeg"
                    autoPlay={false}
                    loop={false}
                />
            </div>
        </div>
    );
};

export default VideoPlayer02Demo;