module.exports = {
  css: {
    files: ['./**/*.less'],
    tasks: ['less:development', 'growl:less'],
    options: {
      spawn: false,
      atBegin: true
    }
  },
  dev: {
    files: ['Gruntfile.js', '<%= path.src %>/**/*'],
    tasks: ['build-dev'],
    options: {
      atBegin: true
    }
  }
};
