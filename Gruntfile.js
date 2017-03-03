'use strict';

module.exports = function(grunt) {

  // load grunt tasks based on dependencies in package.json
  require('load-grunt-tasks')(grunt);

  var help = function(){
    grunt.log.writeln('use `grunt build:dev` to build to dist/dev folder');
    grunt.log.writeln('use `grunt build:prod` to build to dist folder');
    grunt.log.writeln('use `grunt connect:src|prod:keepalive` to launch a local static server');
    grunt.log.writeln('use `grunt test:src|prod` to launch tests to src folder or production folder( nightwatch with chrome by default), use `grunt test:src|prod:gecko` to run within Firefox');
    grunt.log.writeln('use `grunt spapp_generator:new --name=xxx to generate controller/view skeleton and html/css declaration ');
  }

   // Configurable paths for the application
  var appConfig = {
    app: 'src',
    dist: 'dist',
    distDev: 'dist/dev'
  };

  var folderToTest = function(){
    var f = appConfig.app;
    grunt.log.writeln('target:'+grunt.task.current.target);
    if (grunt.task.current.args){
      var arg = grunt.task.current.args[0];
      if (arg==='dev'){
        f = appConfig.distDev;
      }else if(arg==='prod'){
        f = appConfig.dist;
      }
    }

    return f;
  }


// Define the configuration for all the tasks
  grunt.initConfig({

    appConfig : appConfig,


    connect: {
      src: {
        options: {
          port: 8000,
          base: {
            path: '<%= appConfig.app %>',
            options: {
              index: 'index.html',
              maxAge: 300000
            }
          }
        }
      },
      prod: {
        options: {
          port: 8000,
          base: {
            path: '<%= appConfig.dist %>',
            options: {
              index: 'index.html',
              maxAge: 300000
            }
          }
        }
      },
    },
    selenium_standalone: {
     options: {
       stopOnExit: true
     },
     default: {
       seleniumVersion: '3.0.0',
       seleniumDownloadURL: 'http://selenium-release.storage.googleapis.com',
       drivers: {
         chrome: {
           version: '2.27',
           arch: process.arch,
           baseURL: 'http://chromedriver.storage.googleapis.com'
         },
         firefox: {
          version: '0.14.0',
          arch: process.arch,
          baseURL: 'https://github.com/mozilla/geckodriver/releases/download',
        }
       }
     }
   } ,
    nightwatch: {
      options: {
        "src_folders": [
          "test/e2e"// Where you are storing your Nightwatch e2e tests
        ],
        "output_folder": ".tmp/nightwatch/ttb/reports", // reports (test outcome) output by nightwatch

        "test_settings": {
          "default": {
            "launch_url" : "http://localhost",
            "selenium_port"  : 4444,
            "selenium_host"  : "localhost",
            "screenshots": {
              "enabled" : true,// if you want to keep screenshots
              "on_failure" : true,
              "on_error" : true,
              "path" : ".tmp/nightwatch/ttb/screenshots" // save screenshots here //L.D: does not seems to work
            },
            "globals": {
              "waitForConditionTimeout": 4000 // sometimes internet is slow so wait.
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
              "browserName": "firefox",
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
      all: ['Gruntfile.js', '<%= appConfig.app %>/**.js']
    },
    spapp_generator: {
      src: '<%= appConfig.app %>/index.html',
      dest:'<%= appConfig.dist %>/index.html',
      options: {
        basePath: '<%= appConfig.app %>'
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= appConfig.app %>/index.html',
      options: {
        dest: '<%= appConfig.dist %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= appConfig.dist %>/index.html'],
      options: {
        assetsDirs: ['<%= appConfig.dist %>']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [ '.tmp','<%= appConfig.dist %>/*','!<%= appConfig.dist %>/.git*','!<%= appConfig.dist %>/dev/**']
        }]
      },
      dev:{
        files: [{
          dot: true,
          src: [ '.tmp','<%= appConfig.dist %>/dev/*']
        }]
      },
      server: '.tmp'
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= appConfig.app %>',
          dest: '<%= appConfig.dist %>',
          src: ['*.{ico,png,txt}','images/{,*/}*.{webp}','fonts/*']
        }]
      },
      dev: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= appConfig.app %>',
          dest: '<%= appConfig.dist %>/dev',
          src: ['**/*']
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
          src: ['index.html'],
          dest:'<%= appConfig.dist %>',
        }]
      }
    },
    //manifest generator
    pkg: grunt.file.readJSON('package.json'),
    manifest: {
      generate: {
        options: {
          basePath: '',
          cache: ['index.html'],
          network: ['*'],
          preferOnline: true,
          headcomment: " <%= pkg.name %> v<%= pkg.version %>",
          verbose: true,
          timestamp: true,
          hash: true,
          process: function(path) {
            return path.substring((appConfig.dist + '/').length);
          }
        },
        src: [
            '<%= appConfig.dist %>/scripts/*.js',
            '<%= appConfig.dist %>/styles/*.css'
        ],
        dest: '<%= appConfig.dist %>/manifest.appcache'
      }
    }

  });



  grunt.registerTask('build', ['build:dev']);

  grunt.registerTask('build:prod', [
    'clean:dist',
    'copy:dist',
    'spapp_generator:inline',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'usemin',
    'htmlmin:dist',
    'manifest',
    'test:prod'
  ]);
  grunt.registerTask('build:dev', [
    'clean:dev',
    'copy:dev'
  ]);

  grunt.registerTask('test', function(arg1, arg2) {
    if (arg1 == null) {
      arg1 = 'src';
    }
    if(arg2==null){
      arg2 = 'chrome';
    }
    grunt.task.run('selenium_standalone:default:install',
    'connect:' + arg1,
    'selenium_standalone:default:start',
    'nightwatch:' + arg2,
    'selenium_standalone:default:stop');
  });
  grunt.registerTask('help', help);
  grunt.registerTask('default', help);
};
