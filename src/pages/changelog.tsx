import { SEOHead } from "@/components/seo-head";
import { changelogData } from "@/data/changelog";
import { DocPage, DocHeader } from "@/components/docs";
import { Link } from "react-router-dom";

export default function ChangelogPage() {
  return (
    <>
      <SEOHead
        title="Changelog"
        description="Stay updated with the latest changes and improvements to Watermelon UI."
        keywords="changelog, updates, releases, watermelon ui"
      />

      <DocPage>
        <DocHeader
          title="Changelog"
          description="Latest updates and announcements for Watermelon UI."
        />

        <div className="mt-12 relative">
          {/* Vertical Line - adjusted position for DocPage context */}
          <div className="absolute left-[140px] top-4 bottom-4 w-px bg-border hidden md:block" />

          <div className="space-y-16">
            {changelogData.map((entry) => (
              <div key={entry.version} className="relative flex flex-col md:flex-row gap-8 md:gap-0">
                {/* Date Side */}
                <div className="md:w-[140px] md:pr-12 text-sm text-muted-foreground font-medium pt-1 shrink-0">
                  {entry.date}
                </div>

                {/* Dot */}
                <div className="absolute left-[136px] top-2 hidden md:block z-10">
                  <div className="h-2 w-2 rounded-full bg-border ring-4 ring-background" />
                </div>

                {/* Content Side */}
                <div className="flex-1 md:pl-12">
                  <div className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border bg-muted/50 mb-4">
                    {entry.version}
                  </div>

                  {entry.stats && entry.stats.length > 0 && (
                    <div className="mb-5 flex flex-wrap gap-2">
                      {entry.stats.map((stat, idx) => (
                        <Link
                          key={`${stat.label}-${idx}`}
                          to={stat.href}
                          className="inline-flex items-center gap-1.5 rounded-md border bg-background px-2.5 py-1 text-xs hover:bg-muted transition-colors"
                        >
                          <span className="font-semibold text-foreground">{stat.count}</span>
                          <span className="text-muted-foreground">{stat.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}

                  <div className="space-y-8">
                    {entry.sections.map((section, sIdx) => (
                      <div key={sIdx}>
                        <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
                        <ul className="space-y-3">
                          {section.items.map((item, iIdx) => (
                            <li key={iIdx} className="flex items-start text-sm leading-relaxed text-foreground/80">
                              <span className="mr-3 text-muted-foreground mt-1.5 h-1 w-1 rounded-full bg-muted-foreground shrink-0" />
                              <div className="flex-1">
                                {item.text}{" "}
                                {item.author && (
                                  <>
                                    by{" "}
                                    <a
                                      href={item.author.link}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="font-medium text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground transition-colors"
                                    >
                                      {item.author.name}
                                    </a>
                                  </>
                                )}
                                {item.tags && item.tags.length > 0 && (
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {item.tags.map(tag => (
                                      <code
                                        key={tag}
                                        className="px-1 py-0.5 rounded bg-muted text-[10px] font-mono text-foreground"
                                      >
                                        {tag}
                                      </code>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DocPage>
    </>
  );
}

