import { PageSchema } from '~/server/models/page.schema';

export default defineEventHandler(async (event) => {
    try {
        // return collection?.dbName
         return await PageSchema.find({alias: 'home'});
    } catch (error) {
        return error;
    } 
});
