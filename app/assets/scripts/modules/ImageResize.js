// Resize the map to fit within the boundaries provided
var resizeTime = 0;
var resizeDelay = 0;

function resize(maxWidth, maxHeight) {
  var image = $('img'),
    imgWidth = image.width(),
    imgHeight = image.height(),
    newWidth = 0,
    newHeight = 0;

  if (imgWidth / maxWidth > imgHeight / maxHeight || imgWidth / maxWidth < imgHeight / maxHeight) {
    newWidth = maxWidth;
  } else {
    newHeight = maxHeight;
  }
  image.mapster('resize', newWidth, newHeight, resizeTime);
}

// Track window resizing events, but only actually call the map resize when the
// window isn't being resized any more

function onWindowResize() {
  var curWidth = $('.map_container').width(),
    curHeight = $('.map_container').height(),
    checking = false;
  if (checking) return;
  checking = true;
  window.setTimeout(function() {
    var newWidth = $('.map_container').width(),
      newHeight = $('.map_container').height();
    if (newWidth === curWidth &&
      newHeight === curHeight) {
      resize(newWidth, newHeight);
    }
    checking = false;
  }, resizeDelay);
}

module.exports = onWindowResize;
