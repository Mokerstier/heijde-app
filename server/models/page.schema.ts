import { defineMongooseModel } from '#nuxt/mongoose';
export const PageSchema = defineMongooseModel({
    name: 'Page',
    schema:{
        alias:{ 
            type: 'string'
        },
        template: {
            sections: {
                type: Array,
            }
        }
    },
    options: {
        collection: 'pages'
    }
})