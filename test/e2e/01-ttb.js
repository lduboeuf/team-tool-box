//var config = require('../../nightwatch.conf.BASIC.js');

module.exports = { // adapted from: https://git.io/vodU0
  'TTB Assert Home Page, navigation': function(browser) {
    browser
      .url('http://localhost:8000/index.html')
      .waitForElementVisible('body')
      .assert.title('Team ToolBox')
      .pause(1000)
      .assert.visible(".alert-info")
      .saveScreenshot('.tmp/nightwatch/ttb/screenshots/home.png')
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
  'Add a team  ':function(browser){
    browser
    .url('http://localhost:8000/index.html#team-list')
    .waitForElementVisible('#team-list')
    .assert.elementNotPresent("ul.team-list li") //should have no team-list
    .click('#team-list a[href="#team-add"]')
    .perform(function(client, done){
      for (var i = 0; i <2; i++){ //perform creation of 2 teams

        client.waitForElementVisible('#team-add form')
        client.setValue('#team-add input[name="name"]', 'team' +i)
        client.click('#team-add input[type="submit"]')

        client.waitForElementVisible('#team-list-details')
        client.back()
      }
      done()
    })
    .click('a[href="#team-list"]') //go back to team-list
    .waitForElementVisible('ul.team-list li')
    .elements('css selector', 'ul.team-list li', function (elements) {
      var count = elements.value.length;
      this.assert.equal(count,2, 'should have a list of 2 teams')
    })

    .saveScreenshot('.tmp/nightwatch/ttb/screenshots/team-list.png')
  },
  'Remove a team  ':function(browser){
    browser
    .url('http://localhost:8000/index.html#team-list')
    .waitForElementVisible('#team-list ul.team-list li')
    .click('#team-list ul.team-list li a') //click on first team
    .waitForElementVisible('#team-list-details a.remove-link')
    .click('#team-list-details a.remove-link')
    .pause(500)
    .acceptAlert()
    .pause(500)
    .waitForElementVisible('#team-list ul.team-list li')
    .elements('css selector', 'ul.team-list li', function (elements) {
      var count = elements.value.length;
      this.assert.equal(count,1, 'should have a list of 1 team')
    })
    .saveScreenshot('.tmp/nightwatch/ttb/screenshots/team-list-removed-one.png')

  },
  'Team Members Add ':function(browser){
    browser
    .url('http://localhost:8000/index.html#team-list')
    .waitForElementVisible('#team-list ul.team-list li')
    .click('#team-list ul.team-list li a') //click on first team
    .waitForElementVisible('#team-list-details form')
    .perform(function(client, done){
      for (var i = 0; i <11; i++){
        client.setValue('#team-list-details input[name="name"]', 'member'+i);
        client.click('#team-list-details input[type="submit"]');
        client.waitForElementVisible('#team-list-details .team-members a');

      }
      done();
    })
    .assert.elementPresent("ul.team-members li")
    .saveScreenshot('.tmp/nightwatch/ttb/screenshots/team-members.png')
  },
  'Team Members Update ':function(browser){
    browser
    //modify users
    .click("ul.team-members li a") //click on first element
    .waitForElementVisible('#team-member-details')
    .setValue('#team-member-details input[name="name"]', 'modified member')
    .click('#team-member-details input[type="submit"]')
    .waitForElementVisible('#team-list-details')
    .saveScreenshot('.tmp/nightwatch/ttb/screenshots/team-members-after-rename.png')
  },
  'Team Members Delete ':function(browser){
    browser
    //remove a member
    .click("ul.team-members li:last-child a") //click on last element
    .waitForElementVisible('#team-member-details')
    .click('#team-member-details input[type="button"]')
    .pause(500)
    .acceptAlert()
    .pause(500)
    .waitForElementVisible('#team-list-details')
    .saveScreenshot('.tmp/nightwatch/ttb/screenshots/team-members-after-removeone.png')
  },
  'Random Teams test ':function(browser){
    browser
    .url('http://localhost:8000/index.html#tool-build-teams')
    .waitForElementVisible('#tool-build-teams')
    .setValue('#tool-build-teams .nb-members', 1)
    .click('input[type="submit"]')
    .waitForElementVisible('#tool-build-teams div.team')
    .pause(500)
    .assert.elementPresent("ul.list li")
    .elements('css selector', '.team h3', function (elements) {
      var count = elements.value.length;
      this.assert.equal(count,10, 'should generate a list of 10 teams')
    })
    .pause(1000)
    //------
    .setValue('#tool-build-teams .nb-members', 2)
    .click('input[type="submit"]')
    .waitForElementVisible('#tool-build-teams div.team')
    .assert.elementPresent("ul.list li")
    .elements('css selector', '.team h3', function (elements) {
      var count = elements.value.length;
      this.assert.equal(count,5, 'should generate a list of 5 teams')
    })
    .pause(1000)

    .click('#tool-build-teams .teams-result button')
    .waitForElementVisible('#archive-save',1000)
    //test for name empty
    .setValue('#archive-save input[name="name"]', '')
    .click('#archive-save input[type="submit"]')
    //
    .assert.urlContains('#archive-save') //test if empty
    .setValue('#archive-save input[name="name"]', 'archive1')
    .setValue('#archive-save textarea', 'description for archive1')
    .click('#archive-save input[type="submit"]')
    .saveScreenshot('.tmp/nightwatch/ttb/screenshots/team-generation-save.png')
    .pause(500)
    .acceptAlert()
    .waitForElementVisible('#tool-build-teams',1000)
    .assert.cssClassNotPresent('#tool-build-teams .teams-result button', 'btn-success')

    .pause(1000)
    .end();
  }


};
