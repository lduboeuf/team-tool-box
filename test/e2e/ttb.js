//var config = require('../../nightwatch.conf.BASIC.js');

module.exports = { // adapted from: https://git.io/vodU0
  'TTB Assert Home Page': function(browser) {
    browser
      .url('http://localhost:8000/index.html')
      .waitForElementVisible('body')
      .assert.title('Team Tool Box')
      .assert.visible(".alert-info")
      .saveScreenshot('/tmp/nightwatch/ttb/screenshots/home.png')
      //test links
      .click('a[href="#home"]')
      .assert.visible("#home")
      .click('a[href="#team-list"]')
      .assert.visible("#team-list")
      .click('a[href="#archive-list"]')
      .assert.visible("#archive-list")
      .click('a[href="#about"]')
      .assert.visible("#about")
  },
  'Team List ':function(browser){
    browser
    .url('http://localhost:8000/index.html#team-list')
    .waitForElementVisible('#team-list')
    .assert.elementNotPresent("ul.team-list li") //should have no team-list
    .click('a[href="#team-add"]')
    .waitForElementVisible('#team-add')
    .setValue('input[name="name"]', 'team1')
    .click('input[name="add"]')
    .waitForElementVisible('ul.team-list li',1000)
    .saveScreenshot('/tmp/nightwatch/ttb/screenshots/team-list.png')
    //test remove now
    .click('ul.team-list li a') //click on first team
    .waitForElementVisible('#team-list-details')
    .click('#team-list-details a.remove-link')
    .pause(1000)
    .acceptAlert()
    .waitForElementVisible('#team-list',1000)
    .assert.elementNotPresent("ul.team-list li")
    .saveScreenshot('/tmp/nightwatch/ttb/screenshots/team-list-removed.png')
    //
    //.assert.elementPresent("ul.team-list li") //should now have a team


  },

  'Team Members ':function(browser){
    browser
    .url('http://localhost:8000/index.html#team-list')
    .waitForElementVisible('#team-list')
    //add a team
    .click('a[href="#team-add"]')
    .waitForElementVisible('#team-add')
    .setValue('input[name="name"]', 'team1')
    .click('input[name="add"]')
    .waitForElementVisible('#team-list',1000)
    //
    .click('#team-list ul.team-list li a') //click on first team
    .waitForElementVisible('#team-list-details')
    .pause(1000)
    .perform(function(client, done){
      for (var i = 0; i <10; i++){
        client.click('#team-list-details a.add-link');
        client.waitForElementVisible('section#team-member-add',1000);
        client.setValue('#team-member-add input[name="name"]', 'member'+i);
        client.click('#team-member-add input[name="add"]');
        client.waitForElementVisible('#team-list-details');
        done();
      }

    })
    .assert.elementPresent("ul.team-members li")
    //.assert.elementPresent("ul.team-list li") //should now have a team
    .saveScreenshot('/tmp/nightwatch/ttb/screenshots/team-members.png')
  },

  'Generate Tool test ':function(browser){
    browser
    .url('http://localhost:8000/index.html')
    .waitForElementVisible('#home')
    //----
    .click('input[type="submit"]')
    .waitForElementVisible('#home div.team')
    .assert.elementPresent("ul.teams li")
    .elements('css selector', '.team h3', function (elements) {
      var count = elements.value.length;
      this.assert.equal(count,10, 'should generate a list of 10 teams')
    })
    .pause(1000)
    //------
    .setValue('#home select#nb', 2)
    .click('input[type="submit"]')
    .waitForElementVisible('#home div.team')
    .assert.elementPresent("ul.teams li")
    .elements('css selector', '.team h3', function (elements) {
      var count = elements.value.length;
      this.assert.equal(count,5, 'should generate a list of 5 teams')
    })
    .pause(1000)

    .click('#teams-result button')
    .waitForElementVisible('#archive-save',1000)
    //test for name empty
    .setValue('#archive-save input[name="name"]', '')
    .click('#archive-save input[type="submit"]')
    //
    .assert.urlContains('#archive-save') //test if empty
    .setValue('#archive-save input[name="name"]', 'archive1')
    .setValue('#archive-save textarea', 'description for archive1')
    .click('#archive-save input[type="submit"]')
    .saveScreenshot('/tmp/nightwatch/ttb/screenshots/team-generation-save.png')
    .pause(500)
    .acceptAlert()
    .waitForElementVisible('#home',1000)
    .assert.cssClassNotPresent('#teams-result button', 'btn-success')

    .pause(1000)
    .end();
  },


};
