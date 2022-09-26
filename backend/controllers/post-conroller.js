import PostModel from "../models/post.js";

const getAll = async (req, res) => {
    try {
      const posts = await PostModel.find().populate('author').exec();
      res.json(posts);

    } catch (error) {
      console.log(error);
      res.status(500).json({
      message: 'Can\'t get articles'
    })
    }
}

const getOne = async (req, res) => {
    try {
      const postId = req.params.id;
      
      PostModel.findOneAndUpdate(
        {_id: postId},
        {$inc: { viewsCount: 1}},
        {returnDocument: 'after'},
        ).populate('author')
        .exec((err, doc) => {
          if(err) {
            console.log(err);
           return res.status(500).json({
            message: 'Can\'t get article',
          });
        }
        if(!doc) {
          return res.status(404).json({
            message: 'Can\'t find article',
          });
        }

        res.json(doc);
       
      },
      );

    } catch (error) {
      console.log(error);
      res.status(500).json({
      message: 'Can\'t get articles'
    });
    };
}

const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    
    PostModel.findOneAndDelete({
      _id: postId,
    }, (err, doc) => {
      if(err) {
        console.log(err);
        res.status(500).json({
        message: 'Can\'t delete article'
      });
      }
      if(!doc) {
        return res.status(404).json({
          message: 'Can\'t find article',
        });
      }

      res.json({
        success: true,
      })
    });

   
      
  } catch (error) {
    console.log(error);
    res.status(500).json({
    message: 'Can\'t get articles'
  });
  };
}

const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      author: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
     res.status(500).json({
     message: 'article doesn\'t created'
   })
  }
}

const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne({
      _id: postId,
    },
    {
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      author: req.userId,
    },
    );
    res.json({
      success: true,
    })
  } catch (error) {
    console.log(error);
      res.status(500).json({
      message: 'Can\'t update the article'
    });
  }
}

const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();
    const tags = posts.map((post) => post.tags)
    .flat()
    .slice(0,5)

    res.json(tags);

  } catch (error) {
    console.log(error);
    res.status(500).json({
    message: 'Can\'t get articles'
  })
  }
}

export { create, getAll, getOne, remove, update, getLastTags };