"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/base-ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from '@/components/base-ui/button';

type FeatureCardType = {
    title: string,
    description: string,
    imageSrc: string,
    imageAlt: string,
}

const featureCard: FeatureCardType = {
    title: "Designed to Feel Effortless",
    description: "This is what happens when design meets intention and taste.",
    imageSrc: "https://images.unsplash.com/photo-1676293038838-c2e5e310c203?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "A model in stylish pose",
}

const Card16 = () => {
    return (
        <Card className="max-w-md">
            <img src={featureCard.imageSrc}
                alt={featureCard.imageAlt}
                className="rounded-lg m-3.5 md:m-4 object-cover" />

            <CardHeader>
                <CardTitle >{featureCard.title}</CardTitle>
                <CardDescription>{featureCard.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex w-full items-center justify-between mt-7">
                <div className="flex items-center justify-center size-7 p-1 
                bg-accent rounded-full border border-accent-foreground/10">
                    <ArrowLeft className="size-4" />
                </div>

                <Button>
                    Explore More
                </Button>
            </CardContent>
        </Card >
    );
}

export default Card16;