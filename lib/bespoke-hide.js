var getCache = function(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
};
var hideItem = function(deck, index) {
  index = index || deck.slide();
  var slide = deck.slides[index];
  var originalIndex = slide.getAttribute('data-slide-index') * 1;
  slide.remove();
  deck.slides.splice(slide, 1);
  hiddenSlides.push({
    slide: slide,
    index: index,
    originalIndex: originalIndex
  });
  return originalIndex;
};

module.exports = function() {
  var storageKey = 'bespoke-hide';
  var hiddenSlides = [];

  var keydown = function keydown(e) {
    if (e.which == 72) { //h
      var index = hideFor();
      var cache = getCache(storageKey);

      cache.push(index);

      localStorage.setItem(storageKey, JSON.stringify(cache));
      deck.slide(index);
    } else if (e.which == 85) { //u
      var cache = getCache(storageKey);
      if (!cache.length) {
        return;
      }
      var element = document.createElement('nav');
      var ul = document.createElement('ul');
      var lis = cache.map(function(index) {
        var li = document.createElement('li');
        li.innerHTML = 'Slide ' + index;
        li.setAttribute('data-index', index);
        ul.appendChild(li);
        return li;
      });
      element.appendChild(ul);

      element.style.position = 'absolute';
      element.style.top = '0';
      element.style.left = '0';
      deck.parent.appendChild(element);

      document.removeEventListener('keydown', keydown);

      element.addEventListener('click', function(e) {
        var el = e.srcElement;
        if (el.nodeName == 'LI') {
          var index = el.getAttribute('data-index') * 1;

          var slide = hiddenSlides.filter(function(info) {
            return info.index == index;
          }).map(function(info) {
            return info.slide;
          })[0];

          if (slide) {
            var after = deck.slides[index];
            if (!after) {
              deck.parent.appendChild(slide);
            } else {
              deck.parent.insertBefore(slide, after);
            }

            document.addEventListener('keydown', keydown, false);
            cache.splice(index, 1);
            localStorage.setItem(storageKey, JSON.stringify(cache));
            element.remove();
            deck.slides.splice(index, 0, slide);
            deck.slide(index);
          }
        }
      }, false);
    }
  };

  return function(deck) {
    var hideFor = hideItem.bind(null, deck);
    document.addEventListener('keydown', keydown);

    var off = deck.on('activate', function(event) {
      var cache = getCache(storageKey);
      cache.map(hideFor);
      off();
      setTimeout(deck.slide(event.index));
    });

    deck.slides.map(function(slide, index) {
      slide.setAttribute('data-slide-index', index);
    });
  };
};
