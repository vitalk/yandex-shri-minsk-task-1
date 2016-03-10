module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Path to static assets
    assets: 'stylesheets',

    clean: {
      stylesheets: ['<%= assets %>/*.css']
    },

    connect: {
      options: {
        hostname: '0.0.0.0',
        port: 5010,
      },

      serve: {
        options: {
          // Prevents Grunt to close just after the task (starting the server)
          // completes
          keepalive: true,
          livereload: '<%= watch.options.livereload %>',
        }
      }
    },

    watch: {
      options: {
        livereload: 1352
      },

      stylesheets: {
        files: ['<%= assets %>/**/*.less', 'dev.html'],
        // Remove compiled stylesheets to force assets rebuild
        tasks: ['clean:stylesheets', 'less:stylesheets', 'inline']
      }
    },

    less: {
      options: {
        plugins: [
          new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
        ],
      },

      stylesheets: {
        files: {
          "<%= assets %>/main.css": "<%= assets %>/main.less"
        }
      }
    },

    inline: {
      dist: {
        options:{
          cssmin: true
        },
        src: 'dev.html',
        dest: 'index.html',
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-inline');
};
