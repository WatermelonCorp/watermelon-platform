import {SwitchDisclosure} from ".";

const SwitchDisclosureDemo = () => {
    return (
        <div className="flex items-center justify-center">
            <SwitchDisclosure
                title="Predictive Completion"
                subOptionLabel="Inline Completion"
                onToggleChange={(enabled) => {
                    console.log("Main toggle:", enabled);
                }}
                onSubOptionChange={(checked) => {
                    console.log("Sub option:", checked);
                }}
            />
        </div>
    );
};

export default SwitchDisclosureDemo;