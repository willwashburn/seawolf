module.exports = function(grunt) {

    grunt.initConfig({
        project: {
            js_src: 'app/client/',
            js_dest:'public/js/app',
            sass_src:'app/sass',
            css_dest:'public/css'
        },
        pkg: grunt.file.readJSON('package.json'),
        compass: {
        	dist: {
				options: {
					config  : 'app/etc/config.rb',
					sassDir : '<%= project.sass_src %>',
					cssDir  : '<%= project.css_dest %>'
				}
			}
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['<%= project.js_src %>/**/*.js'],
                dest: '<%= project.js_dest %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    '<%= project.js_dest %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['gruntfile.js', '<%= project.js_src %>/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery   : true,
                    console  : true,
                    module   : true,
                    document : true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>','<%= project.sass_src %>/**/*.js'],
            tasks: ['default']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('default', ['jshint', 'concat', 'uglify','compass']);

};
