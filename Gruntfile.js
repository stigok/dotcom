const path = require('path');

module.exports = function (grunt) {
  const today = grunt.template.today('yyyymmddhhMMss');
  const banner = '/*! snippetshow, bro ' + today + ' %> */\n';
  const footer = '/* 1x10v3<21 */';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      development: {
        options: {
          banner: banner + '\n',
          paths: ['app/css/'],
          compress: true,
          ieCompat: false
        },
        files: {
          'app/css/theme.css': 'app/css/theme.less'
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
          'app/components/**/*.js',
          'app/views/**/*.js',
          'app/app.js'
        ],
        dest: 'dist/js/snippetshow.min.js'
      },
      dev: {
        options: {
          beautify: true
        },
        src: [
          'app/components/**/*.js',
          'app/views/**/*.js',
          'app/app.js'
        ],
        dest: 'dist/js/snippetshow.js'
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
        files: ['Gruntfile.js', 'app/**/*'],
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
          {expand: true, cwd: 'app/', src: ['**/*.html', '!bower_components/**/*'], dest: 'dist/'},
          {expand: true, cwd: 'include/js/', src: '*.js', dest: 'dist/js/vendor/'},
          {src: 'app/css/theme.css', dest: 'dist/css/theme.css'},
          {src: 'node_modules/normalize.css/normalize.css', dest: 'dist/css/vendor/normalize.css'},
          {src: 'bower_components/showdown/dist/showdown.min.js', dest: 'dist/js/vendor/showdown.min.js'},
          {src: 'bower_components/ng-showdown/dist/ng-showdown.min.js', dest: 'dist/js/vendor/ng-showdown.min.js'}
        ]
      },
      dev: {
        files: [
          {expand: true, cwd: 'app/', src: ['api/**/*.json'], dest: 'dist/'}
        ]
      },
      vendor: {
        files: [
          {
            expand: true,
            src: [
              'node_modules/normalize.css/normalize.css'
            ],
            dest: 'dist/css/vendor/'
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
          {src: 'dist/index.html', dest: 'dist/index.html'},
          {src: 'dist/js/snippetshow.min.js', dest: 'dist/js/snippetshow.min.js'}
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
              replacement: 'http://thing.sshow-84:42001/api/tumblr'
            }
          ]
        },
        files: [
          {src: 'dist/index.html', dest: 'dist/index.html'},
          {src: 'dist/js/snippetshow.js', dest: 'dist/js/snippetshow.js'}
        ]
      }
    }
  });

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
