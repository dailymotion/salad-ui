# SaladUI

SaladUI provides a collection of simple React Components to build Universal apps.

### Usage

You can either include all the components:

```
npm i --save salad-ui
```

```js
import Salad from 'salad-ui'
class myComponent extends React.Component{
  render(){
     return <Salad.Form.Autocomplete/>
  }
}
```

Or some of the elements separately (lightweight!)

```
npm i --save salad-ui.form
```

```js
import { Autocomplete } from 'salad-ui.form'
class myComponent extends React.Component{
  render(){
     return <Autocomplete/>
  }
}
```


### Documentation

[Salad-UI.com](https://salad-ui.com)


### Development

If you would like to contribute, feel free to submite pull requests/contact us directly. Salad-UI intends to develop simple, lightweight components that can be re-used accross various applications and environents.

Requirements:
Sass `gem install sass`
Node (tested in latest)
Npm (tested in latest)

Developing? run `npm run build` in one terminal tab, and then `npm run dev` in another.
Production? run `npm run pub` to directly publish to NPM, or `npm run dist` to only generate files.
Demo page? To generate the demo client JS, run `npm run dist:demo`.
