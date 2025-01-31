import type {
    ContentHeader,
    SkillBlock,
    ContentSection,
    PageElement,
} from '~/server/models/page.schema';

function isHeader(element: PageElement): element is ContentHeader {
    return (element as ContentHeader).title !== undefined;
}

function isSkillBlock(element: PageElement): element is SkillBlock {
    return (element as SkillBlock).children !== undefined;
}

function isContentSection(element: PageElement): element is ContentSection {
    return (element as ContentSection).columns !== undefined;
}

export const getElementByType = <T extends PageElement>(template: PageElement[]): T | undefined => {
    for (const element of template) {
        if (isHeader(element)) {
            return element as T;
        } else if (isSkillBlock(element)) {
            return element as T;
        } else if (isContentSection(element)) {
            return element as T;
        }
    }
    return undefined;
};
