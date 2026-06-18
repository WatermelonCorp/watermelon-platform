import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApySparkline } from "./charts";
import { stats } from "../../data";
import { cn } from "@/lib/utils";

export function StatGrid() {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="min-h-28 rounded-2xl bg-card py-4 ring-0 shadow-primary dark:bg-muted"
        >
          <CardHeader className="flex items-center gap-2 px-4 pb-2">
            <div
              className={cn(
                " rounded-full shadow-[inset_0_1px_8px_1px_rgba(255,255,255,0.6),inset_0_-1px_8px_2px_rgba(0,0,0,0.3)] flex items-center justify-center p-2 ",
                stat.tone,
              )}
            >
              <stat.icon className={cn("size-5 text-black")} />
            </div>
            <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
          </CardHeader>
          <CardContent className="px-4  flex flex-col mt-auto  ">
            <div className="text-3xl font-nomral tracking-wide ">
              {stat.value}
            </div>
            <div className=" ">
              {stat.compactChart ? (
                <div className="mt-2 h-10">
                  <ApySparkline />
                </div>
              ) : (
                <div
                  className={cn("mt-2 flex items-center gap-1 text-sm", {
                    "text-emerald-400": stat.detail.startsWith("+"),
                    "text-red-400": stat.detail.startsWith("-"),
                  })}
                >
                  {stat.detail.startsWith("+") || stat.detail.startsWith("-") ? (
                    <>
                      {stat.detail.startsWith("+") ? (
                        <GoTriangleUp className="size-4 fill-current" />
                      ) : (
                        <GoTriangleDown className="size-4 fill-current" />
                      )}
                      <span className="">{stat.detail}</span>
                    </>
                  ) : (
                    <span className="">
                      {stat.detail.split(/(\d+(?:\.\d+)?)/).map((part, index) => {
                        if (!part) return null;
                        return /^\d+(?:\.\d+)?$/.test(part) ? (
                          <span key={index} className="text-foreground">
                            {part}
                          </span>
                        ) : (
                          <span key={index} className="text-muted-foreground">
                            {part}
                          </span>
                        );
                      })}
                    </span>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
