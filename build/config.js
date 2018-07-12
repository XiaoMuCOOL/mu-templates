module.exports = {
  css: {
    src: ['../src/less/*.+(css|styl|stylus|less|sass|scss)'],
    dest: '../src/css'
  },
  js: {
    src: ['../src/js/*.js', '!../src/js/jquery-2.1.4.min.js'],
    dest: '../src/js'
  },
  html: {
    src: ['../src/html/**/*.html', '!../src/html/part/*.html', '!../src/html/模板.html'],
    dest: '../src/html/',
    watch: '../src/html/part/*.html'
  },
  watch: {
    src: '../src/+(js|css)/**/*.**'
  },
  clean: {
    src: ['../src/css/**/*.css', '!../src/css/reset.css', '!../src/css/style.css']
  },
  server: {
    src: ['../src/+(js|css)/**/*.min.**', '../src/**/*.html']
  }
}
