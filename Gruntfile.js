module.exports = function(grunt) {

    grunt.initConfig({
      less: {
        development: {
                options: {
                    compress: false,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "app/tmp/style.css": "app/css/style.less",
                }
        }
      },
      autoprefixer: {
        options: {
          browsers: ['last 5 versions']
        },

        dist: {
                files: {
                    "app/tmp/style.css": "app/tmp/style.css",
                    'app/tmp/sprite.css': ['app/css/sprite.css'],
                }
        }
      },
      cssmin: {
        build: {
            files: {
                'production/css/prev.min.css': ['app/css/bootstrap.css', 
                                                'app/css/jquery.fancybox.css', 
                                                'app/css/owl.carousel.css', 
                                                'app/css/owl.theme.default.css', 
                                                'app/css/jquery-ui-datapicker.css', 
                                                'app/css/reset.css'],
                'production/css/style.min.css': ['app/tmp/style.css'],
                'production/css/sprite.min.css': ['app/tmp/sprite.css'],
                'production/css/cart.min.css': ['app/css/cart.css'],
                
            }
        }
      },
      //js
      concat: {
        build: {
          files: {
                'app/tmp/prev.js': ['app/js/jquery.js',
                                          
                                          'app/js/popper.min.js', 
                                          'app/js/bootstrap.js', 
                                          'app/js/jquery.validate.min.js', 
                                          'app/js/jquery.inputmask.bundle.js', 
                                          'app/js/additional-methods.js', 
                                          'app/js/livequery.js', 
                                          'app/js/jquery.fancybox.pack.js', 
                                          'app/js/owl.carousel.js', 
                                          'app/js/jquery-ui-datapicker.js',
                                          'app/js/ui-datapicker-ru.js',
                                          ],
          }
        },

      },
      /*js minified*/
      uglify: {
        build: {
          files: {
                'production/js/prev.min.js': ['app/tmp/prev.js'],
                'production/js/scripts.min.js': ['app/js/scripts.js'],
                'production/js/cart.min.js': ['app/js/cart.js'],
                'production/js/scriptsShop.min.js': ['app/js/scriptsShop.js'],
                'production/js/delivery.min.js': ['app/js/delivery.js'],
                'production/js/contact.min.js': ['app/js/contact.js'],
          }
        },
      },

      imagemin: {
        dynamic: {
            files: [{
                expand: true,
                cwd: 'app/img/',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'production/img/'
            }]
        }
      },
      pug: {
          compile: {
            options: {
              pretty: true,
            },
            files: [ {
                          cwd: "./app/pug",
                          src: "*.pug",
                          dest: "app",
                          expand: true,
                          ext: ".html"
                        } ]
            
          }
        },
      browserSync: {
            dev: {
                bsFiles: {
                    src : ['app/**/*']
                },
                options: {
                    watchTask: true,
                    server: 'app',
                    port: 8080,
                    open: true,
                }
            }
        },
        watch: {
            //files: ['app/**/*'],
            //tasks: ['concat', 'uglify','imagemin','less','autoprefixer','cssmin','pug'],
            files: ['app/**/*.pug'],
            tasks: ['pug'],

        },

    });

    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-pug');

    grunt.registerTask('img', ['imagemin',]);
    grunt.registerTask('css', ['less','autoprefixer','cssmin',]);
    grunt.registerTask('js', ['concat', 'uglify']);
    grunt.registerTask('cssJs', ['concat', 'uglify','less','autoprefixer','cssmin',]);
    grunt.registerTask('all', ['concat', 'uglify','imagemin','less','autoprefixer','cssmin','pug']);
    grunt.registerTask('default', ['browserSync', 'watch']);

};
