import { transformBlog } from '~/utils/transFormers';

export default defineEventHandler(async (event) => {
    try {
        const blogs = await Blog.find();
        const blogsOutline = blogs.map((blog) => transformBlog(blog));

        return blogsOutline;
    } catch (error) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Failed to fetch blogs',
            message: error.message,
        });
    }
});
