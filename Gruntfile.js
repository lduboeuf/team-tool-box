'use strict';

module.exports = function(grunt) {

  // load grunt tasks based on dependencies in package.json
  require('load-grunt-tasks')(grunt);
  var outputDir = 'dist/dev';
  if (grunt.option('rev')=='prod') outputDir = 'dist';
   // Configurable paths for the application
  var appConfig = {
    app: '',
    dist: outputDir
  };


    // Watches files for changes and runs tasks based on the changed files
// Define the configuration for all the tasks
  grunt.initConfig({

    appConfig : appConfig,


    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= appConfig.dist %>/*',
            '!<%= appConfig.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: {
            path: '.',
            options: {
              index: 'index.html',
              maxAge: 300000
            }
          }
        }
      }
    },
    nightwatch: {
      options: {
        "src_folders": [
          "test/e2e"// Where you are storing your Nightwatch e2e tests
        ],
        "output_folder": "./test/e2e/reports", // reports (test outcome) output by nightwatch
        "selenium": { // downloaded by selenium-download module (see readme)
          "start_process": true, // tells nightwatch to start/stop the selenium process
          "server_path": "./node_modules/nightwatch/bin/selenium.jar",
          "host": "127.0.0.1",
          "port": 4444, // standard selenium port
          "cli_args": { // chromedriver is downloaded by selenium-download (see readme)
            "webdriver.gecko.driver" : "./node_modules/nightwatch/bin/geckodriver",
            "webdriver.chrome.driver" : "./node_modules/nightwatch/bin/chromedriver"
          }
        },
        "test_settings": {
          "default": {
            "screenshots": {
              "enabled": true, // if you want to keep screenshots
              "path" : "./test/e2e/screenshots/" // save screenshots here
            },
            "globals": {
              "waitForConditionTimeout": 10000 // sometimes internet is slow so wait.
            },
            "desiredCapabilities": { // use Chrome as the default browser for tests
              "browserName": "chrome"
            }
          },
          "chrome": {
            "desiredCapabilities": {
              "browserName": "chrome",
              "javascriptEnabled": true // turn off to test progressive enhancement
            }
          },
          "gecko": {
            "desiredCapabilities": {
              "browserName": "gecko",
              "javascriptEnabled": true // turn off to test progressive enhancement
            }
          }
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true
      },
      all: ['Gruntfile.js', 'scripts/*.js']
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: 'index.html',
      options: {
        dest: '<%= appConfig.dist %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= appConfig.dist %>/index.html'],
    },


    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= appConfig.app %>',
          dest: '<%= appConfig.dist %>',
          src: [
            '*.{ico,png,txt}',
            '*.html',
            'templates/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= appConfig.dist %>/images',
          src: ['generated/*']
        }]
      }
    },
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: '<%= appConfig.dist %>',
          src: ['index.html','templates/*.html'],
          dest:'<%= appConfig.dist %>',
        }]
      }
    }


  });


  grunt.registerTask('build', [
    'clean:dist',
    'copy:dist',
    //'jshint',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'usemin',
    'htmlmin:dist',

  ]);

  grunt.registerTask('test', ['connect', 'nightwatch']);

  grunt.registerTask('default', [
    'build'
  ]);
};
