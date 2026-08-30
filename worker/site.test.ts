import { describe, expect, it } from 'bun:test';
import { agentPages, renderMarkdownAsHtml } from './agent-pages';

describe('agent page content', () => {
  it('keeps homepage markdown substantial enough for no-JS crawlers', () => {
    expect(agentPages['/'].markdown.length).toBeGreaterThan(500);
  });

  it('renders markdown headings and list items into HTML', () => {
    const html = renderMarkdownAsHtml('# Title\n\n## Subtitle\n\n- one\n- two');
    expect(html).toContain('<h1>Title</h1>');
    expect(html).toContain('<h2>Subtitle</h2>');
    expect(html).toContain('<li>one</li>');
    expect(html).toContain('<li>two</li>');
  });
});
