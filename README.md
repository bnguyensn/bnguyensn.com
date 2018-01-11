# 1d100

### Underlying Technologies

* Node.js
* Express
* React

### Boilerplate parts

###### Essential generic files for any new projects that employ the same technologies

First, you should have these global packages:

```
yarn
```

Then the files you want are:

```
.babelrc
.gitignore
package.json
postcss.config.js
README.md
webpack.common.js
webpack.dev.js
webpack.prod.js
```

With the `package.json`, do a `yarn install` :coffee:.

Now create these basic folders & files to finish:

```
routes  /* Server-side express routes */
    index.js

src  /* Everything in here are client-side */
    css
    |---index.css
    html  /* Store .html template for webpack's production build */
    |---t_index.html
    js
    |
    index.js  /* Files directly under src/ will be used as entry point for webpack */ 

views  /* Optional if you don't use a view engine */

app.js  /* Server-side express standard app.js */
```