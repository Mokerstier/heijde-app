import { transformBlog } from '~/utils/transFormers';
import { Blog } from '~~/shared/models/blog.model';

export default eventHandler(async (event) => {
    try {
        const blogs = await Blog.find();
        const blogsOutline = blogs.map((blog) => transformBlog(blog));
        const filters = [...new Set(blogsOutline.flatMap((blog) => blog.tags).sort())];

        return { blogsOutline, filters };
    } catch (error) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Failed to fetch blogs',
            message: error.message,
        });
    }
});
