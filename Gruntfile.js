var path = require('path')

module.exports = function (grunt) {
  grunt.initConfig({
    nunjucks: {
      options: {
        fooName: 'foo',
        data: grunt.file.readJSON('tests/data.json'),
        preprocessData: function (data) {
          data.page = path.basename(this.src[0], '.html')
          return data
        },
        configureEnvironment: function (env) {
          var options = this.options()
          env.addGlobal(options.fooName, 'bar')
          env.addFilter('timeout', (options, done) =>
            setTimeout(() => done(null, options.message), options.delay)
          , true)
        }
      },
      render: {
        files: {
          'tests/base/_output.html': ['tests/base/input.html'],
          'tests/autoescape/_output.html': ['tests/autoescape/input.html'],
          'tests/leaking-vars/_output1.html': ['tests/leaking-vars/input1.html'],
          'tests/leaking-vars/_output2.html': ['tests/leaking-vars/input2.html'],
          'tests/async/_output1.html': ['tests/async/input1.html'],
          'tests/async/_output2.html': ['tests/async/input2.html']
        }
      }
    }
  })

  grunt.loadTasks('tasks/')

  grunt.registerTask('test', ['nunjucks'])
}
