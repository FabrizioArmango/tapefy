var PageHTML5View = function() {

};

PageHTML5View.prototype.constructor = PageHTML5View;
PageHTML5View.prototype.render = function(body) {
  return `
  <!DOCTYPE html>
  <!--html manifest="tapefy.appcache"-->
  <html>

  <head>
  	<title>${this.model.title} :: Tapefy</title>
  	<meta name="author" content="${this.model.author}">
  	<meta name="date" content="2018-04-01T16:41:11+0100">
  	<meta name="copyright" content="${this.model.copyright}">
  	<meta name="keywords" content="HTML5, web,pagina">
  	<meta name="description" content="${this.model.description}">
  	<meta name="ROBOTS" content="NOINDEX, NOFOLLOW">
  	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
  	<meta http-equiv="content-type" content="application/xhtml+xml; charset=UTF-8">
  	<meta http-equiv="content-style-type" content="text/css">
  	<meta http-equiv="expires" content="0">

  	<meta name="viewport" content="width=device-width, initial-scale=1" />

    <link rel="stylesheet" href="/lib/bootstrap.min.css">
    <link rel="stylesheet" href="/lib/font-awesome.min.css">

    ${this.model.stylesheets.map((stylesheet) => {
      return `<link rel="stylesheet" href="${stylesheet}">`;
    })}


    <script src="/lib/cookies.js"></script>
    <script src="/lib/api.js"></script>
    </head>

    <body>
      ${this.model.body}
      <script src="/lib/player.js"></script>
    </body>

    </html>
    `;
};

module.exports = PageHTML5View;
