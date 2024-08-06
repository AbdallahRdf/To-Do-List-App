import User from '../mongoose/schemas/user.js';
import Task from '../mongoose/schemas/task.js';

export const getUser = (req, res) => {   
    if(req.query.fileError){
        return res.render('profile', { title: 'Profile | To-Do App', user: req.user, fileError: 'Only image files are allowed!' });
    }
    return res.render('profile', { title: 'Profile | To-Do App', user: req.user });

};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if(!user) return res.status(404).render('errorPage', {code: 404, message: 'No Such User Found', title: '404 | To-Do App'});
        req.logout((err) => {
            if (err) {
                return res.status(400).send('Error logging out');
            }
    
            req.session.destroy(async (err) => {
                if (err) {
                    console.error('Error destroying session:', err);
                    return res.status(500).send('Error destroying session');
                }
    
                res.clearCookie('connect.sid', { path: '/' });
    
                // Disable caching for the current response
                res.set('Cache-Control', 'no-store');
                res.set('Pragma', 'no-cache');
                res.set('Expires', '0');

                try {
                    await Task.deleteMany({ owner: user.id });
                    await user.deleteOne();
                    return res.redirect('/signup');
                } catch (innerError) {
                    console.log(innerError);
                    return res.status(500).render('errorPage', { code: 500, message: 'Internal Server Error', title: '500 | To-Do App' });
                }
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).render('errorPage', {code: 500, message: 'Internal Server Error', title: '500 | To-Do App'})
    }
}

export const updateUserProfileImage = async (req, res) => {
    try {
        if(!["image/jpeg", "image/png"].includes(req.file?.mimetype)){
            return res.redirect(`/user?fileError=Only image files are allowed!`);
        }

        const user = await User.findOne({ _id: req.params.id });
        if(!user) return res.status(400).render('errorPage', {
            code: 400,
            message: 'No such user found',
            title: '400 | To-Do App'
        });

        if(req.file){
            user.image.contentType = req.file.mimeType;
            user.image.data = req.file.buffer;
        }

        await user.save();

        return res.redirect('/user');
    } catch (error) {
        console.log(error);
        return res.status(500).render('errorPage', {code: 500, message: 'Internal Server Error', title: '500 | To-Do App'})
    }
};

export const getProfileImage = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || !user.image) {
            return res.status(404).send('No image found');
        }

        res.set('Content-Type', user.image.contentType);
        res.send(user.image.data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};