import { defineMongooseModel } from '#nuxt/mongoose';
import { Schema } from 'mongoose';
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
    template: [PageElement];
}

export type PageElement = ContentHeader | SkillBlock | ContentSection;

export interface ContentHeader {
    alias?: string;
    title?: string;
    prefix?: string;
    link?: {
        url: string;
        label: string;
    };
    showBorder?: boolean;
    subTitle?: string;
    trim?: boolean;
}

export interface ChildrenProps {
    Header: ContentHeader;
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
