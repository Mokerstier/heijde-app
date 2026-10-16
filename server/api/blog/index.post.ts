import { Blog, type IBlog } from '#shared/models/blog.model';
import { transformSlug } from '~/utils/transFormers';

export default eventHandler(async (event) => {
    const { title, tags, content, description, image } = await readBody<IBlog>(event);
    const slug = transformSlug(title);

    try {
        return await Blog.create({
            title,
            tags,
            content,
            description,
            slug,
            image,
        });
    } catch (error) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Failed to upload blog',
            message: (error as Error).message,
        });
    }
});
