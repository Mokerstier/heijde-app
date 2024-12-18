import { defineMongooseModel } from '#nuxt/mongoose';
import { Icon } from '~/components/SvgComponent.vue';

export const PageSchema = defineMongooseModel({
    name: 'Page',
    schema:{
        alias:{ 
            type: 'string'
        },
        template: {
            type: Object
        },
    },
    options: {
        collection: 'pages'
    }
})

export interface RootPage {
    alias: string
    template: Template
  }
  
  export interface Template {
    components: Components;
  }

  export interface Components {
    Header?: Header;
    SkillBlock?: SkillBlock;
    ContentSection?: ContentSection
  }

export interface SkillBlock {
    Header: Header
    Visual: Visual
    Cards: Card[]
}

export interface ContentSection {
  columns: Column[]
}

export interface Column {
  type?: string
  content?: string[]
  alias?: string
  src?: string
  class?: string
  decorations?: Decoration[]
}

export interface Decoration {
  alias: string
  icon: Icon
  class: string
}
  

  
export interface Visual {
alias: string
class: string
icon: Icon
}
  
export interface Card {
alias: string
title: string
skills: string[]
}