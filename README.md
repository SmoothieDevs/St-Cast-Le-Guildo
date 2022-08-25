# Vanilla Frontend Boilerplate

Simple vanilla frontend development setup.

**Features**
* PHP include() like feature : create nav.html, footer.html and use it in multiple pages.
* bootstrap's grid classes for easy responsive design : eg. .row, .col-12, etc
* separate SCSS files for each pages
* separate Javascript files

**More**
* remove unused css with purge css on build
* html, css, js minification
* dev server
* source maps for css and js
* based on webpack
* install and use NPM packages
* sensible build files eg, index.html, blog.html

Install dependencies, develop, and deploy.

```
npm install
```

## Usage

### Development

Development with features such as: dev-server, source-maps, and scss-loader.

```
npm run start
```

### Production

Webpack configuration with css, js, & html minification, purge unused css, and transpile js.

```
npm run build
```
