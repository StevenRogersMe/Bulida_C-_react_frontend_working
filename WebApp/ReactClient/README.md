# ReactClient


## Get it Running
1. Install Dependencies
run `npm i`
2. to run **web client**: run `npm run start`


## Code Conventions
### React
Some concepts you should use (and know whenever not to use):
1. Stateless functional component
2. React `PureComponent`
3. Immutable collections for state and props (immutable.js to the rescue)


### Components
_Hierarchy:_ Page Container -> Page -> Components


#### Page Container
`Page Container` is responsible for the logic: data fetching and mutating, query logic, navigation, data manipulation.
It should be unique and covers a single action (login / view list of X / create X / edit X).
Has name suffix: `XxxPageContainer`.

/Reference: CampaignListPageContainer/


#### Page
`Page` orchestrates UI in top level.
It should be unique and covers a single action (you should expect a one-to-one relationship between `Page` and `PageContiner`).
Has name suffix: `XxxPage`.
Tend to be a stateless component.
Page should define its contract: which data it expects to get (if any).
Page is mounted only when it has all its requirements, for avoiding duplicated source of truth.
Every page wraps its content with `StepLayoutPage`, `SuccessLayoutPage` or `ListLayoutPage` which are responsible for general and reusable features: layout, title, loader, etc.


#### Components
General components or reusable compound components.


#### Components/ Common
Base reusable components, such as Button, Single Select, Text Input etc.
Has `MI` prefix (adding after redesigning) for distinguishing between our custom components and 3rd-party ones.

/Reference: MIButton/


### Functions
We use arrow functions as components methods for avoiding binding.

Avoid arrow function in props, it creates new instance each time render method is triggered:
``` js
// BAD!
<PureComp onClick={() => handleClick(id)} />
```


#### Naming
* In _page containers_ use the next prefixes: `on`, `go`, `load` for mutating, navigation and querying respectively.
	In any other case ask yourself if the method should be in the page container…
* for ‘as-is’ injected functions (i.e. functions in props) use the same name
* in _pages_ use the same name for injected method as prop, for list page use the verb: `refresh`, `do` (doPaging / doSorting and other manipulations), for a method that is not injected and is first-time defined not in `PageController` use the prefix `handle`
* in components the prop method has the `on` prefix but the function is enhanced, use the prefix `handle`


#### Arguments:
* prefer niladic (no arguments) or monadic.
* triadic should be avoid where possible
* polyadic should not be used anyway
* avoid flag arguments
* with dyadic and triadic consider using destructuring assignment: prefer `set({ color, size, weight })` over `set(color, size, weight)`


### Variables
#### Naming
* boolean variables have one of the next prefixes: `is`, `has`, `should` (per context)
* boolean variable for permission has the prefix: `can`
* besides the above, variables should not contain verbs, only nouns
* strive for consistency across same-type components


### G11n
* i18n - we use [react-intl](https://github.com/yahoo/react-intl), all components should support text only as id


### Styleguide

This project use [eslint](https://eslint.org/) rules based on AirBnb styleguide and [prettier](https://prettier.io/docs/en/webstorm.html) for formatting.

IDE-specific Prettier docs available here: [IDEA](https://www.jetbrains.com/help/webstorm/prettier.html), [Visual Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode#:~:text=Prettier%20Formatter%20for%20Visual%20Studio,account%2C%20wrapping%20code%20when%20necessary.), [Sublime, VIM, emacs etc](https://prettier.io/docs/en/editors.html).

### Webpack Bundle Analyzer
Visualize size of webpack output files with an interactive zoomable treemap.
```
npm run analyze
```
