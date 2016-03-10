module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! snippetshow, bro <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        screwIE8: true,
        mangle: false
      },
      dist: {
        src: ['app/**/*.js', '!app/bower_components/**'],
        dest: 'dist/js/snippetshow.min.js'
      }
    },

    less: {
      development: {
        options: {
          banner: '/*! snippetshow, bro <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          paths: ["app/css/"]
        },
        files: {
          "app/css/theme.css": "app/css/theme.less"
        }
      }
    },

    watch: {
      less: {
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
        image: __dirname + '/grunt-growl.gif'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-growl');

  grunt.registerTask('default', ['auto-compile-less']);
  grunt.registerTask('compile-less', ['less']);

  grunt.registerTask('auto-compile-less', ['watch:less']);

};
