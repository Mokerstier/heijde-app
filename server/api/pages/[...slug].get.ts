import { PageSchema } from '#shared/models/page.schema';

export default eventHandler(async (event) => {
    const slug = event.context.params?.slug;
    try {
        return await PageSchema.findOne({ alias: slug });
    } catch (error) {
        return error;
    }
});
