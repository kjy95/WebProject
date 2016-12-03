var express = require('express'),
    Post = require('../models/Post');
var router = express.Router();


// '/'를 받았을때 posts(이곳)에 감.
router.get('/',  function(req, res, next) {
  Post.find({}, function(err, posts) {
    if (err) {
      return next(err);
    }
    res.render('posts/index', {posts: posts});
  });
});

//글쓰기를 누르고 posts/new로 갔을 때posts/edit를 사용하기 위함이다.
router.get('/new', function(req, res, next) { 
  res.render('posts/edit', {post:{id:0}});
});

//새Post객체생성
router.post('/', function(req, res, next) {
  var newpost = new Post({title: req.body.title,email: req.body.email, read:0, content: req.body.content}
  );
  newpost.save(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/posts');
  });
});

//글제목 누르면 내용보여줌
router.get('/:id', function(req, res, next) {
Post.findById(req.params.id, function(err, post) {
    Post.findByIdAndUpdate(req.params.id, {$inc: {read: 1}}, function(err) {
      if (err) {
        return next(err);
      }
      res.render('posts/show', {post: post});
   });
 }); });

///:id/edit일대 그 값을 넘겨서 edit을 연다.
router.get('/:id/edit', function(req, res, next) {
  res.render('posts/edit', {post:{id: req.params.id}});
});

//수정하기
router.put('/:id', function(req, res, next) {
   Post.findById({_id: req.params.id}, function(err, post) {
    if (err) {
      return next(err);
    }
    //각 항목에 넣은값을 입력한다.
    post.email = req.body.email;
    post.content =  req.body.content
    post.title =  req.body.title;
    post.password =  req.body.password;
    post.save(function(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/posts');
    }); 
  });
});

//삭제하기(findOneAndRemove를 이용한 삭제)
router.delete('/:id', function(req, res, next) {
  Post.findOneAndRemove({_id: req.params.id}, function(err) {
   res.redirect('/posts');
  });
});



module.exports = router;
