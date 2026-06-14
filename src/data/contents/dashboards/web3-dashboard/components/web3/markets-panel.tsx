import { ArrowUpRight } from "lucide-react";
import { GoTriangleUp } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AssetBadge } from "./asset-badge";
import { markets } from "../../data";

export function MarketsPanel() {
  return (
    <Card className="rounded-2xl bg-card shadow-priamry dark:bg-muted p-2 ring-0 shadow-primary gap-1">
      <CardHeader className="flex items-center justify-between px-2 py-0.5">
        <CardTitle className="text-lg font-medium">Top Markets</CardTitle>
        <Button variant="ghost" size="sm" className="h-7 gap-2 px-1 text-sm font-normal text-muted-foreground">
          View all
          <ArrowUpRight className="size-4" />
        </Button>
      </CardHeader>
      <CardContent className="px-2 bg-muted/20 dark:bg-black rounded-xl h-full shadow-primary">
        <div className="">
          {markets.map((market) => (
            <div key={market.name} className="flex items-center gap-4 py-4">
              <AssetBadge symbol={market.name} color={market.color} />
              <span className="flex-1 text-lg font-medium">{market.name}</span>
              <span className="flex items-center gap-1 text-sm font-medium text-emerald-400">
                <GoTriangleUp className="size-4 fill-current" />
                {market.change}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
