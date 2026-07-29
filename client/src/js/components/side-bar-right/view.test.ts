import View from './view';
import TagsGartenModel from '../tags-garten/model';
import TagsGartenView from '../tags-garten/view';

// Mock child component dependencies
jest.mock('../tags-garten/model');
jest.mock('../tags-garten/view');

describe('SideBarRight View', () => {
    let view: View;

    beforeEach(() => {
        view = new View();
    });

    it('should fetch tags and embed tags garten markup into sidebar wrapper', async () => {
        const mockTags = [{ name: 'testing', slug: 'testing' }];
        const mockTagsHTML = '<div class="tags-garten">Tags Garten Markup</div>';

        (TagsGartenModel.prototype.getTags as jest.Mock).mockResolvedValue(mockTags as any);
        (TagsGartenView.prototype.appendTags as jest.Mock).mockReturnValue(mockTagsHTML);

        const html = await view.appendSideBarRight();

        expect(TagsGartenModel.prototype.getTags).toHaveBeenCalled();
        expect(TagsGartenView.prototype.appendTags).toHaveBeenCalledWith(mockTags);
        expect(html).toContain('class="w-full sidebar"');
        expect(html).toContain(mockTagsHTML);
    });
});