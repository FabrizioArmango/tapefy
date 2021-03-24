var PageBaseView = require('./page_baseview');

var PageSearchResultView = function(model) {
  PageBaseView.call(this, model);
  console.log("PageSearchResultView.constructor");
};

PageSearchResultView.prototype = Object.create(PageBaseView.prototype);
PageSearchResultView.prototype.constructor = PageSearchResultView;
PageSearchResultView.prototype.render = function() {
  console.log("PageSearchResultView.render");

  this.model.html.content = `
  <div class="row justify-content-center mb-5">
    <form class="form-inline mys-2 my-lg-0" action="/search" method="post">
      <div class="col">
        <div class="row no-gutters">
          <div class="col mr-1 mr-sm-2 pr-3">
            <input class="form-control w-auto mr-sm-2 my-2" type="search" name="query" placeholder="${this.model.query}" aria-label="Search">
          </div>
          <div class="col mr-1 mr-sm-2 text-right">
            <button class="btn btn-outline-success my-2 px-1 px-md-4" type="submit">Search</button>
          </div>
        </div>
      </div>
    </form>
  </div>
  ${(this.model.results && this.model.results.length > 0) ? this.model.results.map((resultCard) => {
    return `<div class="row justify-content-center mt-3 mx-auto">
     ${resultCard.render()}
    </div>`;
  }).join("") : '<h4>La ricerca non ha prodotto nessun risultato</h4><p>Il nostro algoritmo di ricerca è ancora in stato di sviluppo.</p><p>Prova a migliorare la ricerca.</p>'}
  <div class="row justify-content-center mt-4">
  <!-- button class="btn btn-outline-success my-2 my-sm-0 px-5" type="button">Altro</button-->
  </div>
  <script src="/lib/cards.js"></script>
  `;


  return PageBaseView.prototype.render.call(this);
};

module.exports = PageSearchResultView;
