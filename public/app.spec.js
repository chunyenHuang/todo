var page = require('webpage').create();

page.viewportSize = {width: 1920, height:1080};

page.onConsoleMessage = function (msg) {
  console.log('web is ' + msg);
}

page.open('http://localhost:1337', function start(status) {
  console.log("Status: " + status);
  if(status === "success") {
    page.render('before.jpg', {format: 'jpeg', quality: '100'});
    console.log('yo it passes');
    page.includeJs('https://code.jquery.com/jquery-2.2.3.min.js',
      function (){
        page.evaluate(function () {
          $('#show-list').click();
          console.log(document.title);
        });
      }
    )
    setTimeout(function () {
      page.render('after.jpg', {format: 'jpeg', quality: '100'});
      phantom.exit();
    }, 2000)
  } else {
    console.log('failed to connect');
    phantom.exit();
  }
});
