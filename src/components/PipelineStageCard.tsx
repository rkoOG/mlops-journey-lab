import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface PipelineStageCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
  onClick: () => void;
}

export const PipelineStageCard = ({
  icon: Icon,
  title,
  description,
  bullets,
  onClick,
}: PipelineStageCardProps) => {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <CardContent className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary">
            <Icon className="h-6 w-6 text-primary-foreground" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 transition-opacity group-hover:opacity-100"
            onClick={onClick}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <h3 className="mb-2 text-xl font-bold">{title}</h3>
        <p className="mb-4 text-sm text-muted-foreground">{description}</p>

        <ul className="space-y-2">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start text-sm">
              <span className="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span className="text-muted-foreground">{bullet}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
