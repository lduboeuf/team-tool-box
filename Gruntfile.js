'use strict';

module.exports = function(grunt) {

  // load grunt tasks based on dependencies in package.json
  require('load-grunt-tasks')(grunt);
  var outputDir = 'dist/dev';
  if (grunt.option('rev')=='prod') outputDir = 'dist';
   // Configurable paths for the application
  var appConfig = {
    app: 'src',
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
                path: '<%= appConfig.app %>',
                options: {
                  index: 'index.html',
                  maxAge: 300000
                }
              }
            }
          }
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
         }
       }
     }
   } ,
    nightwatch: {
      options: {
        "src_folders": [
          "<%= appConfig.app %>/test/e2e"// Where you are storing your Nightwatch e2e tests
        ],
        "output_folder": "/tmp/nightwatch/ttb/reports", // reports (test outcome) output by nightwatch

        "test_settings": {
          "default": {
            "launch_url" : "http://localhost",
            "selenium_port"  : 4444,
            "selenium_host"  : "localhost",
            "screenshots": {
              "enabled": true, // if you want to keep screenshots
              "path" : "/tmp/nightwatch/ttb/screenshots/" // save screenshots here //L.D: does not seems to work
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
      all: ['Gruntfile.js', '<%= appConfig.app %>/scripts/*.js']
    },
    'string-replace': {
        inline: {
          files: {
            '<%= appConfig.dist %>/index.html': '<%= appConfig.app %>/index.html',
          },
          options: {
            replacements: [
              // place files inline example
              {
                pattern: /<section id="(.*?)" src="(.*?)">/ig,
                replacement: function (match, p1, p2) {
                  return '<section id="' + p1 + '">\r\n' + grunt.file.read(grunt.config.get('appConfig.app') + '/' + p2) + '\r\n';
                }
              }
            ]
          }
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
          src: ['index.html'],
          dest:'<%= appConfig.dist %>',
        }]
      }
    },
    pkg: grunt.file.readJSON('package.json'),
    manifest: {
    generate: {
      options: {
        basePath: '',
        cache: ['index.html'],
        network: ['http://*', 'https://*'],
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


  grunt.registerTask('build', [
    //'test',
    'clean:dist',
    'copy:dist',
    'string-replace',
    //'jshint',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'usemin',
    'htmlmin:dist',
    'manifest'

  ]);

  grunt.registerTask('test', [
    'selenium_standalone:default:install',
    'connect',
    'selenium_standalone:default:start',
    'nightwatch',
    'selenium_standalone:default:stop'
   ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
