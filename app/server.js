var express = require('express'),
	_       = require('underscore'),
	fs      = require('fs'),
	hbs     = require('express-hbs'),
	router  = require('./routes'),
	config  = require('./etc/config');
	

var app = express();

app.configure(function() {

	app.use(express.bodyParser());
	app.use(express.methodOverride());

	app.engine('html',hbs.express3({
		partialsDir   : __dirname + config.paths.view + '/partials',
		layoutsDir    : __dirname + config.paths.view + '/layouts',
		defaultLayout : __dirname + config.paths.view + '/layouts/public.html'
	}));
	app.set('view engine','html');
	app.set('views',__dirname + config.paths.view);

	app.use(app.router);

	app.use(function(req,res,next){
		console.log('%s %s',req.method,req.url);
		next();
	});

	app.use(express.static(__dirname + '../../public'));

	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true,
	}));

	app.use(function(req,res,next) {
		res.status(404);
		res.render(config.paths.errorPages + '404',{
			status:404,
			url:req.url
		});
	});
});


router(app);

var port = process.env.PORT || config.port;
app.listen(port,function() {
	console.log('Server started on port %d in %s mode',port,app.settings.env);
});
