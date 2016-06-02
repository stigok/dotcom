module.exports = {
  css: {
    files: ['<%= path.src %>/**/*.less'],
    tasks: ['less:development', 'growl:less'],
    options: {
      atBegin: true
    }
  },
  dev: {
    files: ['Gruntfile.js', '<%= path.src %>/**/*', '!**/*.less'],
    tasks: ['build-dev', 'growl:watch'],
    options: {
      atBegin: true
    }
  }
};
