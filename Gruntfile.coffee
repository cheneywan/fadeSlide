
sysPath = require 'path'

module.exports = (grunt) ->
  grunt.initConfig(

    coffee:
      main:
        expand: true
        src: ['src/*.coffee']
        dest: 'demo/'
        ext: '.js'

    less:
      main:
        expand: true
        src: ['src/*.less']
        dest: 'demo'
        ext: '.css'
        filter: (filepath) ->
          return true if grunt.file.isDir filepath
          not grunt.util._(sysPath.basename filepath).startsWith '_'

    watch:
      options: livereload: true
      coffee:
        files: 'src/*.coffee'
        tasks: ['coffee']
      less:
        files: 'src/*.less'
        tasks: ['less']

  )
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['coffee', 'less', 'watch']

