import { CarouselSlider } from '.'

const slides = [
    { id: 1, img: "https://prourls.link/ORXBVr" },
    {
        id: 2,
        img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=500&auto=format&fit=crop",
    },
    {
        id: 3,
        img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=500&auto=format&fit=crop",
    },
    {
        id: 4,
        img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=500&auto=format&fit=crop",
    },
    {
        id: 5,
        img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=500&auto=format&fit=crop",
    },
    {
        id: 6,
        img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=500&auto=format&fit=crop",
    },
];

function CarouselSliderDemo() {
    return (
        <div className="flex justify-center items-center">
            <CarouselSlider
                slides={slides}
            />
        </div>

    )
}

export default CarouselSliderDemo