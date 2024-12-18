import { defineMongooseModel } from '#nuxt/mongoose';
import { Schema } from 'mongoose';
import { Header } from '~/components/header/HeaderBlock.vue';
import { Icon } from '~/components/SvgComponent.vue';

export const PageSchema = defineMongooseModel<RootPage>(
    'Page',
    new Schema<RootPage>({
        alias: {
            type: 'string',
        },
    }),
    {
        collection: 'pages',
    }
);

export interface RootPage {
    alias: string;
    template: (Header | SkillBlock | ContentSection)[];
}

export interface Components {
    Header?: Header;
    SkillBlock?: SkillBlock;
    ContentSection?: ContentSection;
}
export interface ChildrenProps {
    Header: Header;
    Visual: Visual;
    SkillCards: {
        Cards: Card[];
    };
}

export interface SkillBlock {
    alias: string;
    children: [ChildrenProps['Header'], ChildrenProps['Visual'], ChildrenProps['SkillCards']];
}

export interface ContentSection {
    alias: string;
    columns: Column[];
}

export interface Column {
    type?: string;
    content?: string[];
    alias?: string;
    src?: string;
    class?: string;
    decorations?: Decoration[];
}

export interface Decoration {
    alias: string;
    icon: Icon;
    class: string;
}

export interface Visual {
    alias: string;
    class: string;
    icon: Icon;
}

export interface Card {
    alias: string;
    title: string;
    skills: string[];
}
