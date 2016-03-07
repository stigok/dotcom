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

    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  //grunt.registerTask('default', ['uglify', 'less']);
  grunt.registerTask('default', ['uglify']);
};
