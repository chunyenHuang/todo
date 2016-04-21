casper.test.begin('todo login', 6, function suite(test) {
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
        test.assertTitle("Todo (Angular JS)", "Todo (Angular JS) title is ok");
        test.assertUrlMatch('/', "user John has been submitted");
    });

    casper.run(function() {
        test.done();
    });
});
