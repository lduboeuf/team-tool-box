//var config = require('../../nightwatch.conf.BASIC.js');

module.exports = { // adapted from: https://git.io/vodU0
  'TTB Assert Home Page, navigation': function(browser) {
    browser
      .url('http://localhost:8000/index.html')
      .waitForElementVisible('body')
      .assert.title('Team Toolbox')
      //.pause(1000)
      .waitForElementVisible(".alert-info")
      .saveScreenshot('.tmp/nightwatch/ttb/screenshots/home.png')
      //test links
      .click('a[href="#home"]')
      .assert.visible("#home")
      .click('a[href="#team-list"]')
      .assert.visible("#team-list")
      .click('a[href="#archive-list"]')
      .assert.visible("#archive-list")
      .click('a[href="#settings"]')
      .assert.visible("#settings")
      .click('a[href="#about"]')
      .assert.visible("#about")
      //test actions
      /*
      .click('a[href="#home"]')
      .click('.actions a[href="#tool-build-teams"]')
      .assert.visible("#tool-build-teams")
      .click('a[href="#home"]')
      .click('.actions a[href="#tool-find-members"]')
      .assert.visible("#tool-find-members")
      .click('a[href="#home"]')
      .click('.actions a[href="#tool-next-member"]')
      .assert.visible("#tool-next-member")
      .click('a[href="#home"]')
      .click('.actions a[href="#tool-match"]')
      .assert.visible("#tool-match")
      */
  },
  'Add a team  ':function(browser){
    browser
    .url('http://localhost:8000/index.html#team-list')
    .waitForElementVisible('#team-list')
    .assert.elementNotPresent("ul.team-list li") //should have no team-list

    .perform(function(client, done){
      for (var i = 0; i <3; i++){ //perform creation of 3 teams
        client.click('#team-list a[href="#team-add"]')
        client.waitForElementVisible('#team-add form')
        client.setValue('#team-add input[name="name"]', 'team' +i)
        client.click('#team-add input[type="submit"]')
        client.waitForElementVisible('#team-list-details')
        client.click('a[href="#team-list"]')
        client.waitForElementVisible('#team-list li')
      }
      done()
    })
    //.click('a[href="#team-list"]') //go back to team-list
    .waitForElementVisible('ul.team-list li')
    .elements('css selector', 'ul.team-list li', function (elements) {
      var count = elements.value.length;
      this.assert.equal(count,3, 'should have a list of 3 teams')
    })

    .saveScreenshot('.tmp/nightwatch/ttb/screenshots/team-list.png')
  },
  'Remove a team  ':function(browser){
    browser
    .url('http://localhost:8000/index.html#team-list')
    .waitForElementVisible('#team-list ul.team-list li')
    .click('#team-list ul.team-list li a') //click on first team
    .waitForElementVisible('#team-list-details button[name="remove"]')
    .click('#team-list-details button[name="remove"]')
    .pause(500)
    .acceptAlert()
    .pause(500)
    .waitForElementVisible('#team-list ul.team-list li')
    .elements('css selector', 'ul.team-list li', function (elements) {
      var count = elements.value.length;
      this.assert.equal(count,2, 'should have a list of 2 team')
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
    .click('#team-list ul.team-list li:nth-child(2) a') //click on second team
    .waitForElementVisible('#team-list-details form')
    .perform(function(client, done){
      for (var i = 0; i <2; i++){
        client.setValue('#team-list-details input[name="name"]', 'member'+i);
        client.click('#team-list-details input[type="submit"]');
        client.waitForElementVisible('#team-list-details .team-members a');

      }
      done();
    })
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
    .elements('css selector', '#tool-build-teams .team h3', function (elements) {
      var count = elements.value.length;
      this.assert.equal(count,12, 'should generate a list of 12 teams')
    })
    .pause(1000)
    //------
    .setValue('#tool-build-teams .nb-members', 2)
    .click('input[type="submit"]')
    .waitForElementVisible('#tool-build-teams div.team')
    .assert.elementPresent("ul.list li")
    .elements('css selector', '#tool-build-teams .team h3', function (elements) {
      var count = elements.value.length;
      this.assert.equal(count,6, 'should generate a list of 6 teams')
    })
    .pause(1000)
    //save to archive
    .click('#tool-build-teams button[name="save"]')
    .waitForElementVisible('#archive-save')
    //test for empty name
    .setValue('#archive-save input[name="name"]', '')
    .click('#archive-save input[type="submit"]') //should do nothing (TODO handle msg error)
    //
    //.assert.urlContains('#archive-save')
    .setValue('#archive-save input[name="name"]', 'archive1')
    .setValue('#archive-save textarea', 'description for archive1')
    .click('#archive-save input[type="submit"]')
    .saveScreenshot('.tmp/nightwatch/ttb/screenshots/team-generation-save.png')
    .pause(500)
    .acceptAlert()
    .waitForElementVisible('#tool-build-teams',1000)
    .assert.cssClassNotPresent('#tool-build-teams .teams-result button', 'btn-success')


  },
  'Archive update ':function(browser){
    browser.url('http://localhost:8000/index.html#archive-list')
    //remove a member
    .waitForElementVisible('#archive-list .archive-list')
    .assert.elementPresent("#archive-list .archive-list li")
    .click("#archive-list .archive-list li:last-child a") //click on last element
    .waitForElementVisible('#archive-details')
    .setValue('#archive-details textarea[name="comment"]', 'comment for archive here')
    .click('#archive-details input[type="submit"]')
    .pause(500)
    .assert.containsText('#archive-details textarea','comment for archive here')
    .saveScreenshot('.tmp/nightwatch/ttb/screenshots/archive-update.png')
  },
  'Find members ':function(browser){
    browser.url('http://localhost:8000/index.html#tool-find-members')
    .waitForElementVisible('#tool-find-members form')
    .setValue('#tool-find-members .nb-members', 4)
    .click('#tool-find-members input[type="submit"]')
    .waitForElementVisible('#tool-find-members div.team')
    .assert.elementPresent("ul.list li")
    .elements('css selector', '#tool-find-members .team li', function (elements) {
      var count = elements.value.length;
      this.assert.equal(count,4, 'should generate a list of 4 members')
    })
    .end()
  }
  // ,
  // 'Next members ':function(browser){
  //   browser.url('http://localhost:8000/index.html#tool-next-member')
  //   .waitForElementVisible('#tool-next-member form')
  //   .setValue('#tool-find-members select[name="team-list"]', 4)
  //
  //   .waitForElementVisible('#teams-result')
  //   .assert.elementPresent("#teams-result ul.list li")
  //   .elements('css selector', '#tool-find-members .team li', function (elements) {
  //     var count = elements.value.length;
  //     this.assert.equal(count,4, 'should generate a list of 4 members')
  //   })
  //   .end();
  //}


};
