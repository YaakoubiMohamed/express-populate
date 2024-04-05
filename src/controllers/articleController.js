const Article = require('../models/article');

const multer = require('multer'); // Import Multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Change 'uploads/' to your desired folder path
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage: storage });

exports.createArticle = async (req, res) => {
  try {
    // Use Multer middleware for image upload (single image assumed)
    upload.single('image')(req, res, async (err) => {
      if (err) {
        // Handle Multer specific errors
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(413).json({ message: 'Image size exceeds limit!' });
        } else {
          return res.status(500).json({ message: 'Error during image upload!' });
        }
      }

      const newArticle = new Article({
        ...req.body, // Spread operator for other article data
        // Access uploaded image details from req.file if successful
        image: req.file ? req.file.path : undefined, // Store path only if uploaded
      });

      await newArticle.save();
      res.status(201).json({ newArticle });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error creating article' });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.getArticlebyId = async (req, res) => {
  const articleID = req.params.id;
  try {
    const article = await Article.findById(articleID);
    if (!article) return res.status(404).json({ message: 'No article with this ID' })
    res.status(200).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting the article' })
  }
}

exports.updateArticle = async  (req, res) => {
  const articleID = req.params.id;
  try {
    const article = await Article.findByIdAndUpdate(articleID, req.body);
    if (!article) return res.status(404).json({ message: 'No article with this ID' })
    res.status(200).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating the article' })
  }
}

exports.deleteArticle = async  (req, res) => {
  const articleID = req.params.id;
  try {
    const article = await Article.findByIdAndDelete(articleID);
    if (!article) return res.status(404).json({ message: 'No article with this ID' })
    res.status(200).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting the article' })
  }
}