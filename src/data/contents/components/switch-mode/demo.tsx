import { SwitchMode } from ".";


export default function SwitchModeDemo() {
    return (
        <div className="flex items-center justify-center">
            <SwitchMode
                width={180}
                height={90}
                darkColor="#111"
                lightColor="#F9F9F9"
                knobDarkColor="#1C1C1C"
                knobLightColor="#F3F3F7"
                borderDarkColor="#444"
                borderLightColor="#DDD"
            />
        </div>
    );
}