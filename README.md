## PSD Browser Preview

Display and reload your Photoshop mockups in your browsers (desktop, mobile, others).

## Requirements

- [Node.js](http://nodejs.org/)
- [Gulp](http://gulpjs.com/) - [how-to install it](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
- [ImageMagick](http://www.imagemagick.org/)

## Getting started

Download the .zip (or use git clone) to grab the project. Open a terminal, and go where you extract the files.

```
cd path_to_the_folder
```

Run a **npm install** to install project dependencies.

```
npm install
```

Start watching your files using the gulp default task.

```
gulp
```

## But wait, there's more

Convert to **.png** file (instead of a **.jpg**, it's slower).

```
gulp --png
```

Watch one file at the time (add the possibility to launch 1 server per .psd).

```
gulp --input home.psd
```

Add a **background-color**.

```
gulp --color #00ff00
```

Change your mockup alignement (default is center).

```
gulp --left
gulp --right
```

## Help me, I'm using Windows

No problem. Open **gulpfile.js** and replace "*exec: 'convert'*" with the full path to ImageMagick **convert.exe**. That's it!