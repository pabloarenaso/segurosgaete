import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface CarouselControlsProps {
    onPrev: () => void;
    onNext: () => void;
    className?: string;
    canScrollPrev?: boolean;
    canScrollNext?: boolean;
}

const CarouselControls = ({ onPrev, onNext, className = "" }: CarouselControlsProps) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-sm hover:bg-background"
                onClick={onPrev}
                aria-label="Anterior"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-sm hover:bg-background"
                onClick={onNext}
                aria-label="Siguiente"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default CarouselControls;
