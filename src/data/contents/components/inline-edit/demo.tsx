import { InlineEditCard } from ".";
import type { EventData } from ".";
import { useState } from "react";

export default function InlineEditDemo() {
    const [data, setData] = useState<EventData>({
        event: "The BBQ Night",
        date: "Saturday, 18 May",
        start: "8:00 pm",
        end: "11:00 pm",
        location: "Brooklyn Rooftop, NY",
        url: "event.sh/783",
        desc: 'Join us for "The BBQ Night" — an evening of delicious grilled food, live music, and great company under the stars!',
    });

    return (
        <div className="flex items-center justify-center">
            <InlineEditCard
                title="Event Details"
                data={data}
                onDataChange={setData}
            />
        </div>
    );
}
