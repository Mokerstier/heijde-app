import { User } from '~~/server/models/user.model';

export default defineEventHandler(async (event) => {
    return await User.find().select('-password');
});
