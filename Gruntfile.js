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
        //screwIE8: true,
        mangle: false
      },
      js: {
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
      }
    },

    growl: {
      less: {
        title: 'Grunt Task Complete',
        message: 'Task: compile-less',
        image: path.join(__dirname, '/grunt-growl.gif')
      }
    },

    copy: {
      dist: {
        files: [
          {expand: true, cwd: 'app/', src: ['**/*.html'], dest: 'dist/'},
          {expand: false, src: 'app/css/theme.css', dest: 'dist/css/theme.css'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-growl');
  grunt.loadNpmTasks('grunt-template');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['auto-compile-less']);
  grunt.registerTask('compile-less', ['less']);
  //grunt.registerTask('production', ['less', 'concat', 'copy']);
  grunt.registerTask('production', ['less', 'uglify', 'copy']);

  grunt.registerTask('auto-compile-less', ['watch:less']);
};
