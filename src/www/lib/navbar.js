var navToggler = document.querySelector('nav button.navbar-toggler');
navToggler.addEventListener('click', function() {
  var navContent = document.getElementById(this.dataset.target);
  var isExpanded;

  navContent.className = navContent.className.split(' ').map(function(className) {
    console.log(className);
    return (className === 'collapse') ? 'expand' : ((className === 'expand') ? 'collapse' : className);
  }).join(" ");
});
