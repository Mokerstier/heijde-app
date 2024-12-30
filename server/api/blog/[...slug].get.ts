export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug');
    try {
        const blog = await Blog.findOne({ slug: slug });

        return blog;
    } catch (error) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Failed to fetch blogs',
            message: error.message,
        });
    }
});
