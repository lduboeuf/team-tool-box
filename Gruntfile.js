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

  grunt.registerTask('default', [
    'build'
  ]);
};
