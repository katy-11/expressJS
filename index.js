require('dotenv').config();
//req.query
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URL);

var cookieRouter = require('./routes/cookie.route');
var authRouter = require('./routes/auth.route');
var bookRouter = require('./routes/book.route');
var userRouter = require('./routes/user.route');
var productRouter = require('./routes/product.route');
var profileRouter = require('./routes/profile.route');
var transactionRouter = require('./routes/transaction.route');
var cartRouter = require('./routes/cart.route');


var authMiddleware = require('./middleware/auth.middleware');
var sessionMiddleware = require('./middleware/session.middleware');

var cartItem = require('./controllers/cart.controller.js');

var port = process.env.PORT || 3000;
var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

var apiProductRouter = require('./api/routes/product.route');

app.use(cookieParser('process.env.SESSION_SECRET'));
app.use(sessionMiddleware);

app.use(express.static('public'));
app.use(express.static('views/dist'));

app.use('/', cookieRouter);
app.use('/auth', authRouter);
app.use('/books', cartItem.addToCart, bookRouter);
app.use('/transactions', authMiddleware.requireAuth, transactionRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/profile', authMiddleware.requireAuth, profileRouter);
app.use('/cart', cartRouter);

app.use('/api/product', apiProductRouter);
//routers
// app.get('/', function(req, res) {
// 	res.render('index', {
// 		name: 'Coders Tokyo',
// 	});
// }); 


app.listen(port, function() {
	console.log('Server listening at port 3000');
});

