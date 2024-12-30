import { IBlog } from '~/server/models/blog.model';
import { transformSlug } from '~/utils/transFormers';

export default defineEventHandler(async (event) => {
    const { title, tags, content, description } = await readBody<IBlog>(event);
    const slug = transformSlug(title);

    try {
        return await Blog.create({
            title,
            tags,
            content,
            description,
            slug,
        });
    } catch (error) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Failed to upload blog',
            message: error.message,
        });
    }
});
