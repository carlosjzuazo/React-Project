const {
  createPost,
  getAllPosts,
  getPostById,
  deletePostById,
} = require('../db/posts');
const { generateError } = require('../helpers');

const getPostsController = async (req, res, next) => {
  try {
    const posts = await getAllPosts();

    res.send({
      status: 'ok',
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

const newPostController = async (req, res, next) => {
  try {
    const { description, title, url } = req.body;

    if (!description || description.length > 200) {
      throw generateError(
        'The maximum length for the description is 200 characters.',
        400
      );
    }

    const id = await createPost(req.userId, description, title, url);

    const post = await getPostById(id);

    res.send({
      status: 'ok',
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleTweetController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tweet = await getTweetById(id);

    res.send({
      status: 'ok',
      data: tweet,
    });
  } catch (error) {
    next(error);
  }
};

const deletePostController = async (req, res, next) => {
  try {
    //req.userId
    const { id } = req.params;

    // Conseguir la información del tweet que quiero borrar
    const post = await deletePostById(id);

    // Comprobar que el usuario del token es el mismo que creó el tweet
    if (req.userId !== post.user_id) {
      throw generateError('Must be the owner to delete', 401);
    }

    // Borrar el tweet
    await deletePostById(id);

    res.send({
      status: 'ok',
      message: `Post with id: ${id} was deleted`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPostsController,
  newPostController,
  getSingleTweetController,
  deletePostController,
};
