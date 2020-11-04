# Matt Website

## Technology used

- Sapper [https://github.com/sveltejs/sapper](https://github.com/sveltejs/sapper) as front-end framework
- TypeScript [https://www.typescriptlang.org/](https://www.typescriptlang.org/) except in svelte components
- Vercel [https://vercel.com](https://vercel.com) for hosting with auto-deployment on code change and update from headless CMS
- Firebase [https://firebase.google.com](https://firebase.google.com) to store email subscriptions and kudos sended for each article
- Prismic [https://prismic.io/](https://prismic.io/) as headless CMS for blogging


## Getting started

This project was initialized with `sveltejs/sapper-template#rollup`.

### Running the project

Before running the project in your local environment, you have to create a `.env` file with those variables:
```
# Firebase variables
FIREBASE_URL="https://my-firebase-project.firebaseio.com"
FIREBASE_SERVICE_ACCOUNT=""
FIREBASE_PRIVATE_KEY=""

# Prismic
PRISMIC_URL="https://my-prismic-project.prismic.io"
```

```sh
yarn # to install dependencies

yarn dev # start dev server

# if you want to test locally serverless functions
# you can find VERCEL_TOKEN in https://vercel.com/account/tokens
yarn vercel --token=VERCEL_TOKEN # needed only once to linked your project with Vercel project
yarn vercel dev --token=VERCEL_TOKEN # start dev server with serverless functions
```

### Generate static website

You can generate all blog pages as static files to deploy it with a basic static server if you can't have a NodeJS server or prefer hosting the website on a static file server.

```sh
yarn export
```

### Build application with server side rendering

If you can deploy the project to a server with a NodeJS runtime, you can build and run the project with those commands:

```sh
yarn build
yarn start
```

### Unit tests

There are some unit test especially about formatting data from Prismic.  
Those tests use Jest as framework and you can run them with this command:
```sh
yarn test
```

### CI integration

For CI integration here is the command to use before deploying a new version:
```
yarn check-types # run typescript to check static types
yarn svelte-check # to make a diagnostic of svelte components
yarn test # run unit test
```


## Structure

Sapper expects to find two directories in the root of your project —  `src` and `static`.


### src

The [src](src) directory contains the entry points for your app — `client.js`, `server.js` and (optionally) a `service-worker.js` — along with a `template.html` file and a `routes` directory.


#### src/routes

This is the heart of your Sapper app. There are two kinds of routes — *pages*, and *server routes*.

**Pages** are Svelte components written in `.svelte` files. When a user first visits the application, they will be served a server-rendered version of the route in question, plus some JavaScript that 'hydrates' the page and initialises a client-side router. From that point forward, navigating to other pages is handled entirely on the client for a fast, app-like feel. (Sapper will preload and cache the code for these subsequent pages, so that navigation is instantaneous.)

**Server routes** are modules written in `.ts` files, that export functions corresponding to HTTP methods. Each function receives Express `request` and `response` objects as arguments, plus a `next` function. This is useful for creating a JSON API, for example.

There are three simple rules for naming the files that define your routes:

* A file called `src/routes/about.svelte` corresponds to the `/about` route. A file called `src/routes/blog/[slug].svelte` corresponds to the `/blog/:slug` route, in which case `params.slug` is available to the route
* The file `src/routes/index.svelte` (or `src/routes/index.js`) corresponds to the root of your app. `src/routes/about/index.svelte` is treated the same as `src/routes/about.svelte`.
* Files and directories with a leading underscore do *not* create routes. This allows you to colocate helper modules and components with the routes that depend on them — for example you could have a file called `src/routes/_helpers/datetime.js` and it would *not* create a `/_helpers/datetime` route


### static

The [static](static) directory contains any static assets that should be available. These are served using [sirv](https://github.com/lukeed/sirv).

In your [service-worker.js](src/service-worker.js) file, you can import these as `files` from the generated manifest...

```js
import { files } from '@sapper/service-worker';
```

...so that you can cache them (though you can choose not to, for example if you don't want to cache very large files).


## Bundler config

Sapper uses Rollup to provide code-splitting and dynamic imports, as well as compiling your Svelte components. As long as you don't do anything daft, you can edit the configuration files to add whatever plugins you'd like.


## Using external components

At the moment, there isn't any svelte components installed from npm but in case in the future we need external components this could be helpfull.

When using Svelte components installed from npm, such as [@sveltejs/svelte-virtual-list](https://github.com/sveltejs/svelte-virtual-list), Svelte needs the original component source (rather than any precompiled JavaScript that ships with the component). This allows the component to be rendered server-side, and also keeps your client-side app smaller.

Because of that, it's essential that the bundler doesn't treat the package as an *external dependency*. You can either modify the `external` option under `server` in [rollup.config.js](rollup.config.js) or the `externals` option in [webpack.config.js](webpack.config.js), or simply install the package to `devDependencies` rather than `dependencies`, which will cause it to get bundled (and therefore compiled) with your app:

```bash
npm install -D @sveltejs/svelte-virtual-list
```

## Content management

To let Matt edit by himself articles and projects, this project use an headless CMS.  
For this project, Prismic was selected because there is a free plan without to much restrictions.  

All code about Prismic is in:
- `src/server-utils/blog.ts`
- `src/server-utils/prismic.ts`
- `src/server-utils/prismic.ts`
> if you want to use an other CMS, you just need to edit those files.

HTTP request made to Prismic are only done on server side, here is advantages:
- make possible to cache response for all users (Prismic API response can take several seconds with free plan).
- all the code about create a graphQL request and format data for blog is only in backend, so it make front-end bundle lighter.

### Prismic configuration

Here is the custom types you should create to make this website working well:

#### article
This type is used for `Essays` pages  
Fields to create:
- UID, name: slug, app-id: `uid`
- Title, name: Title, slug: `title`, params: only h1
- Image, name: Social media image, slug: `social_media_image`, params: width 1200px height 627px
- Rich Text, name: Content, slug: `content`, params: allow multiple paragraphs and target blank for links

#### project
This type is used for `Projects` pages  
Fields to create:
- UID, name: slug, app-id: `uid`
- Title, name: Title, slug: `title`, params: only h1
- Image, name: Social media image, slug: `social_media_image`, params: width 1200px height 627px
- Rich Text, name: Content, slug: `content`, params: allow multiple paragraphs and target blank for links

## Email subscription and 🍕 kudos

Email subscription and kudos for articles/projects are store in a firebase realtime database.  
Even if realtime isn't used, this is the easiest way to store JSON data.  

Firebase functions are only use in serverless function, this bring those advantages:
- this avoid to expose Firebase token
- it avoid to import firebase SDK in front-end bundle, so it make it lighter

### Firebase configuration

To make data readable only by our severless functions, you should set realtime database rules with this configuration:
```json
{
  /* Visit https://firebase.google.com/docs/database/security to learn more about security rules. */
  "rules": {
    ".read": "auth.uid === 'WEBSITE_BACKEND'",
    ".write": "auth.uid === 'WEBSITE_BACKEND'"
  }
}
```

To get `FIREBASE_SERVICE_ACCOUNT` and `FIREBASE_PRIVATE_KEY`, you have to go in "Firebase console"/"Settings"/"Service account" and click on "Generate private key".

> FIREBASE_SERVICE_ACCOUNT is the downloaded json file with all keys except `private_key`  
> FIREBASE_PRIVATE_KEY is the value of `private_key` from the json file downloaded in Firebase  
> To set FIREBASE_PRIVATE_KEY in Vercel, you should remove `\n` and replace them by line break in the input  

## Deployement on Vercel

This blog is hosted on Vercel.  
All files in folder `api` are deployed as serverless function (expect if filename start with `_`).  

### Vercel settings:

#### General

- Framework preset: `Sapper`
> this preset will automatically set output directory options.  
- Build command: `yarn vercel-ci`
> this will run type check, svelte check and unit test before building the app.

#### Git integration

To deploy automatically the website on code change, you should set the repository name depending where you host source code.
> On each push on `master` branch, the website will be rebuild and deploy.

To rebuild the website on content changes in CMS, you should create a "Deploy Hook" and copy the URL in Prismic settings (Settings/Webhooks).
> Each time an article is publish in Prismic, the website will be rebuild and deploy.

#### Environment Variables

Environement variables to set are described in `Running the project` part.
