casper.test.begin('todo login', function suite(test) {
  casper.start("http://localhost:1337", function() {
      test.assertTitle("Todo (Angular JS)", "Todo (Angular JS) homepage title is the one expected");
      test.assertExists('form', "form is found");
      this.fill('form', {
          username: "John"
      }, true);
      test.assertExists('#show-list');
      test.assertExists('#show-profile');
  });

  casper.then(function() {
    this.click("a[href^='#/todo']");
    test.assertUrlMatch('#/todo', 'link to todo page');
  });

  casper.run(function() {
      test.done();
  });
});
