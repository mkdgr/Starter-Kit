module.exports = function(grunt) {
    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            // scss dosyamizi css formatina ceviriyoruz
            sass: {
                dist: {
                    options: {
                        // compact    : tek satir
                        // expanded   : klasik
                        // nested   : ic ice
                        // compressed : sikistirilmis
                        style: 'nested'
                    },
                    files: {
                        'dev/scss/main.css': 'dev/scss/main.scss',
                    }
                }
            },
            // css dosyasinindaki eksik prefix'leri ekliyoruz
            autoprefixer: {
                options: {
                    browsers: ['last 2 version', 'ie 8', 'ie 7']
                },
                css: {
                    src: 'dev/scss/main.css',
                    dest: 'dev/scss/main-prefixed.css'
                }
            },
            // css dosyasini sikistiriyoruz
            cssmin: {
                combine: {
                    files: {
                        'css/main.min.css': ['dev/scss/main-prefixed.css']
                    }
                }
            },
            // js dosyalarini birlestirip sikistiriyoruz
            uglify: {
                my_advanced_target: {
                    options: {
                        report: 'min'
                    },
                    files: [{
                        expand: true,
                        cwd: 'dev/minjs/',
                        src: ['**/*.js'],
                        dest: 'js/'
                    }]
                }
        },
        // gorsellerimizin formatlarina gore guzelce sikistiralim
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'dev/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
            }
        },
        // js, css veya img dosyalarimizda herhangi bir degisiklik -
        // oldugunda ilgili dosyalari tekrar derleyelim
        watch: {
            options: {
                livereload: true,
            },
            js: {
                files: ['dev/**/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                }
            },
            css: {
                files: ['dev/scss/**/*.scss'],
                tasks: ['sass', 'autoprefixer', 'cssmin'],
                options: {
                    spawn: false,
                }
            },
            img: {
                files: ['dev/img/**/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
                options: {
                    spawn: false,
                },
            }
        }
    });
require('load-grunt-tasks')(grunt);
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'uglify', 'imagemin']);
grunt.registerTask('dev', ['watch']);
};
