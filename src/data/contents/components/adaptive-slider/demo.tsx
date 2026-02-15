import { AdaptiveSlider } from './index'

function AdaptiveSliderDemo() {
    return (
        <div className="flex justify-center items-center">
            <AdaptiveSlider
                min={100}
                max={800}
                step={50}
                defaultValue={300}
            />
        </div>
    )
}

export default AdaptiveSliderDemo