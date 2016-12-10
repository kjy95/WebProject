var express = require('express'),
    Post = require('../models/Post'),
    Reservation = require('../models/Reservation'),
    Comment = require('../models/Comment'),
    User = require('../models/User');

var router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인후 이용할 수 있습니다.');
    res.redirect('/signin');
  }
}


// '/'를 받았을때 posts(이곳)에 감.
router.get('/',needAuth,  function(req, res, next) {
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
  var newpost = new Post({
    city: req.body.city || "N/A",
    title: req.body.title,
    email: req.body.email, 
    read:0, 
    content: req.body.content}
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
    if (err) {
      return next(err);
    }
    Reservation.find({post: post.id}, function(err, reservations ) {
      Comment.find({post: post.id}, function(err, comments ) {
          if (err) {
            return next(err);
          }
      
      if (err) {
        return next(err);
      }
      res.render('posts/show', {post: post, reservations: reservations, comments: comments});
       });
    });
  });
});

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
    post.content =  req.body.content;
    post.title =  req.body.title;
    post.city = req.body.city || "N/A";
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


//reservation추가
router.post('/:id/reservations', function(req, res, next) {
  
  var reservation = new Reservation({
    userId: req.user.id,
    email: req.user.email,
    post: req.params.id,
    Pnum: req.body.Pnum,
    content: req.body.content,
    reserve: "미승인"
  });

  reservation.save(function(err) {
    if (err) {
      return next(err);
    }
    Post.findByIdAndUpdate(req.params.id, {$inc: {numComment: 1}},function(err) {
     
      if (err) {
        return next(err);
      }
      res.redirect('/posts/' + req.params.id);
  });
  });
});

//comment 추가

router.post('/:id/comments', function(req, res, next) {
  var comment = new Comment({
    userId: req.user.id,
    post: req.params.id,
    content: req.body.content,
    email: req.user.email
  });

  comment.save(function(err) {
    if (err) {
      return next(err);
    }
    Post.findByIdAndUpdate(req.params.id, {$inc: {numComment: 1}},function(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/posts/' + req.params.id);
    });
  });
});
module.exports = router;
