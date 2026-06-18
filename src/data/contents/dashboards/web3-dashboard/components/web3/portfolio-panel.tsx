import { GoTriangleUp } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PortfolioChart } from "./charts";
import { cn } from "@/lib/utils";

const ranges = ["All", "1D", "7D", "1M"];

export function PortfolioPanel() {
  return (
    <Card className="rounded-2xl ring-0 shadow-primary bg-card dark:bg-muted  p-2 xl:col-span-3 gap-2">
      <CardHeader className="flex items-center justify-between p-0">
        <CardTitle className="text-lg font-medium px-2 truncate line-clamp-1">
          Portfolio Performance
        </CardTitle>
        <div className="flex items-center ">
          {ranges.map((range) => (
            <Button
              key={range}
              variant="ghost"
              size="sm"
              className={cn(
                "h-7 px-3 text-sm text-muted-foreground",
                range === "All"
                  ? "text-primary bg-muted/40 dark:bg-black border-0"
                  : "",
              )}
            >
              {range}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-2 bg-muted/20 dark:bg-card rounded-xl flex-1 shadow-primary overflow-hidden pointer-events-none">
        <div className="px-4 flex-1">
          <div className="text-3xl font-medium tracking-wide">$84,520</div>
          <div className="mt-2 flex items-center gap-1 text-sm font-medium text-emerald-400">
            <GoTriangleUp className="size-4 fill-current" />
            <span>6.8% this month</span>
          </div>
        </div>
        <div className="h-80 pt-5">
          <PortfolioChart />
        </div>
      </CardContent>
    </Card>
  );
}
