const path = require('path');

module.exports = function (grunt) {
  const today = grunt.template.today('yyyymmddhhMMss');
  const banner = '/*! snippetshow, bro ' + today + ' %> */\n';
  const footer = '/* 110v3<3 */';

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
        dest: 'dist/js/snippetshow.min.js'
      }
    },

    concat: {
      dev: {
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
          {expand: false, src: 'app/css/theme.css', dest: 'dist/css/theme.css'}
        ]
      },
      dev: {
        files: [
          {expand: true, cwd: 'app/', src: ['api/**/*.json'], dest: 'dist/'}
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

  grunt.registerTask('production', ['less', 'uglify:dist', 'copy:dist', 'growl:build']);
  grunt.registerTask('development', ['less', 'uglify:dev', 'copy', 'growl:build']);
};
