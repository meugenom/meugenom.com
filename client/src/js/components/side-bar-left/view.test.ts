import View, { TocHeading } from './view';

describe('SideBarLeft View', () => {
    let view: View;

    beforeEach(() => {
        view = new View();
    });

    it('should render TOC sidebar container with empty list when no headings provided', () => {
        const html = view.renderToc([]);

        expect(html).toContain('On this page');
        expect(html).toContain('<ul class="space-y-0">');
    });

    it('should render headings with calculated indentation, level styling, and attributes', () => {
        const headings: TocHeading[] = [
            { level: 1, text: 'Main Title', id: 'main-title' },
            { level: 2, text: 'Subsection', id: 'subsection' },
            { level: 3, text: 'Deep Detail', id: 'deep-detail' },
        ];

        const html = view.renderToc(headings);

        // Check level 1 indentation (0px) and heading text
        expect(html).toContain('style="padding-left: 0px"');
        expect(html).toContain('Main Title');
        expect(html).toContain('text-[15px] font-semibold');

        // Check level 2 indentation (12px), styling, and chevron icon
        expect(html).toContain('style="padding-left: 12px"');
        expect(html).toContain('Subsection');
        expect(html).toContain('text-[14px] font-medium');
        expect(html).toContain('›</span>Subsection');

        // Check level 3 indentation (24px) and styling
        expect(html).toContain('style="padding-left: 24px"');
        expect(html).toContain('Deep Detail');
        expect(html).toContain('text-[13px] font-normal');

        // Check attributes for smooth scroll targeting
        expect(html).toContain('href="#main-title"');
        expect(html).toContain('data-tocid="main-title"');
    });
});