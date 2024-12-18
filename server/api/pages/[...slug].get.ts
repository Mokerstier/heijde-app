import { PageSchema } from '~/server/models/page.schema';

export default defineEventHandler(async (event) => {
    const slug = event.context.params?.slug;
    try {
        // return collection?.dbName
         return await PageSchema.findOne({alias: slug});
    } catch (error) {
        return error;
    } 
});
