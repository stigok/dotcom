module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  function loadConfig(path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {cwd: path}).forEach(function (option) {
      key = option.replace(/\.js$/, '');
      object[key] = require(path + option);
    });

    return object;
  }

  var config = {
    pkg: grunt.file.readJSON('package.json'),
    env: process.env,
    path: {
      dist: 'dist',
      src: 'app',
      tmp: 'tmp'
    }
  };

  grunt.util._.extend(config, loadConfig('./tasks/options/'));

  grunt.initConfig(config);

  // Load all tasks from tasks/ folder
  grunt.loadTasks('tasks/');
};
