const path = require('path');

module.exports = function (grunt) {
  const today = grunt.template.today('yyyymmddhhMMss');
  const banner = '/*! snippetshow, bro ' + today + ' %> */\n';
  const footer = '/* 1x10v3<21 */';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    path: {
      dist: 'dist',
      src: 'app',
      tmp: 'tmp'
    },

    less: {
      development: {
        options: {
          banner: banner + '\n',
          paths: ['<% path.src %>/css/'],
          compress: true,
          ieCompat: false
        },
        files: {
          '<% path.src %>/css/theme.css': '<% path.src %>/css/theme.less'
        }
      }
    },

    uglify: {
      options: {
        banner: banner,
        footer: footer,
        //beautify: true,
        screwIE8: true,
        mangle: false
      },
      dist: {
        src: [
          '<% path.src %>/components/**/*.js',
          '<% path.src %>/views/**/*.js',
          '<% path.src %>/app.js'
        ],
        dest: '<% path.dist %>/js/snippetshow.min.js'
      },
      dev: {
        options: {
          beautify: true
        },
        src: [
          '<% path.src %>/components/**/*.js',
          '<% path.src %>/views/**/*.js',
          '<% path.src %>/app.js'
        ],
        dest: '<% path.dist %>/js/snippetshow.js'
      }
    },

    watch: {
      css: {
        files: ['**/*.less'],
        tasks: ['less:development', 'growl:less'],
        options: {
          spawn: false,
          atBegin: true
        }
      },
      dev: {
        files: ['Gruntfile.js', '<% path.src %>/**/*'],
        tasks: ['development'],
        options: {
          atBegin: true
        }
      }
    },

    growl: {
      less: {
        title: 'Grunt Task Complete',
        message: 'Task: compile-less',
        image: path.join(__dirname, '/grunt-growl.gif')
      },
      build: {
        title: 'Grunt build complete!',
        image: path.join(__dirname, '/grunt-growl.gif')
      }
    },

    copy: {
      dist: {
        files: [
          {expand: true, cwd: '<% path.src %>/', src: ['**/*.html', '!bower_components/**/*'], dest: '<% path.dist %>/'},
          {expand: true, cwd: 'include/js/', src: '*.js', dest: '<% path.dist %>/js/vendor/'},
          {src: '<% path.src %>/css/theme.css', dest: '<% path.dist %>/css/theme.css'},
          {src: 'node_modules/normalize.css/normalize.css', dest: '<% path.dist %>/css/vendor/normalize.css'},
          {src: 'bower_components/showdown/<% path.dist %>/showdown.min.js', dest: '<% path.dist %>/js/vendor/showdown.min.js'},
          {src: 'bower_components/ng-showdown/<% path.dist %>/ng-showdown.min.js', dest: '<% path.dist %>/js/vendor/ng-showdown.min.js'}
        ]
      },
      dev: {
        files: [
          {expand: true, cwd: '<% path.src %>/', src: ['api/**/*.json'], dest: '<% path.dist %>/'}
        ]
      },
      vendor: {
        files: [
          {
            expand: true,
            src: [
              'node_modules/normalize.css/normalize.css'
            ],
            dest: '<% path.dist %>/css/vendor/'
          }
        ]
      }
    },

    replace: {
      prod: {
        options: {
          patterns: [
            {
              match: 'js-extension',
              replacement: 'min.js'
            },
            {
              match: 'apiEndpoint',
              replacement: 'http://api.tumblr.stigok.com'
            }
          ]
        },
        files: [
          {src: '<% path.dist %>/index.html', dest: '<% path.dist %>/index.html'},
          {src: '<% path.dist %>/js/snippetshow.min.js', dest: '<% path.dist %>/js/snippetshow.min.js'}
        ]
      },
      dev: {
        options: {
          patterns: [
            {
              match: 'js-extension',
              replacement: 'js'
            },
            {
              match: 'apiEndpoint',
              replacement: 'http://tumblrapi.sshow-7/api/tumblr'
            }
          ]
        },
        files: [
          {src: '<% path.dist %>/index.html', dest: '<% path.dist %>/index.html'},
          {src: '<% path.dist %>/js/snippetshow.js', dest: '<% path.dist %>/js/snippetshow.js'}
        ]
      }
    },

    // Clean up distribution files
    clean: ['<% path.dist %>/']
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-growl');
  grunt.loadNpmTasks('grunt-replace');

  grunt.registerTask('production', ['less', 'uglify:dist', 'copy:dist', 'replace:prod', 'growl:build']);
  grunt.registerTask('development', ['less', 'uglify:dev', 'copy', 'replace:dev', 'growl:build']);
};
