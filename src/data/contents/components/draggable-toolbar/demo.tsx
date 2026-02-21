
import { DraggableToolbar } from '.';

const DraggableToolbarDemo = () => {
    return (
        <div className="w-full">
            <DraggableToolbar 
                label="Skipper Toolbar" 
                onClose={() => console.log("Toolbar Hidden")} 
            />
        </div>
    );
};

export default DraggableToolbarDemo;