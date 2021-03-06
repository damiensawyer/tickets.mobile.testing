# Redux
[Getting Started](https://redux.js.org/introduction/getting-started/)
[Getting Started (essentials?) Course](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)
npx create-react-app reduxreactsample --template redux-typescript
or npx create-react-app redux-essentials-example --template redux



## Installation
check these out... 
npm info @reduxjs/toolkit  (shows that it has redux as a dependency)   
npm info react-redux

## Tooling (Chrome plugins)
[React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
[Redux Developer  tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

## Udemy course?

[What is the difference between React Redux and Redux Toolkit and which one should I learn in 2020?](https://www.reddit.com/r/reactjs/comments/icxq1k/what_is_the_difference_between_react_redux_and/)
- https://redux-toolkit.js.org/
- https://react-redux.js.org/


## Concepts
### [Actions](https://redux.js.org/tutorials/essentials/part-1-overview-concepts#actions)

``` js
// A typical action object might look like this:
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
}

// An action creator is a function that creates and returns an action object. We typically use these so we don't have to write the action object by hand every time:
const addTodo = text => {
  return {
    type: 'todos/todoAdded',
    payload: text
  }
}
```

### [Reducers](https://redux.js.org/tutorials/essentials/part-1-overview-concepts#reducers)
A reducer is a function that receives the current state and an action object, decides how to update the state if necessary, and returns the new state.
They are not allowed to modify the existing state.


### [Store](https://redux.js.org/tutorials/essentials/part-1-overview-concepts#store)
The current Redux application state lives in an object called the store .


### [Despatch](https://redux.js.org/tutorials/essentials/part-1-overview-concepts#dispatch)
The Redux store has a method called dispatch. The only way to update the state is to call store.dispatch() and pass in an action object.  The store will run its reducer function and save the new state value inside, and we can call getState() to retrieve the updated value:
``` js
store.dispatch({ type: 'counter/increment' })

console.log(store.getState())
// {value: 1}

```


### [Selectors](https://redux.js.org/tutorials/essentials/part-1-overview-concepts#selectors)
Selectors are functions that know how to extract specific pieces of information from a store state value. As an application grows bigger, this can help avoid repeating logic as different parts of the app need to read the same data:
"Selector functions" are a powerful tool for encapsulating reading values from the Redux store state and deriving further data from those values. In addition, libraries like Reselect enable creating memoized selector functions that only recalculate results when the inputs have changed, which is an important aspect of optimizing performance.

We strongly recommend using memoized selector functions for reading store state whenever possible, and recommend creating those selectors with Reselect.
[Reselect with Redux and React](https://www.youtube.com/watch?v=6Xwo5mVxDqI&ab_channel=aboutscript)
[Using memoizing Selectors](https://react-redux.js.org/api/hooks#using-memoizing-selectors)
"When the selector does only depend on the state, simply ensure that it is declared outside of the component so that the same selector instance is used for each render:"

[Intersting?](https://thewebdev.info/2020/09/27/using-the-react-redux-useselector-hook/) 
He says, "It’s equivalent to mapStateToProps in connect, The selector will be called with the entire Redux store state as its only argument." which I think is what they use in the Conference Demo App.
Also, "If we want to retrieve multiple values from the store, we can call useSelector multiple times with each call returning a single field value, use Reselect or a similar library to create a memoized selector that returns multiple values in an object but returns a new object when one of the values is changed"

[Good SO post on useSelector vs createSeelector](https://stackoverflow.com/questions/63493433/confusion-about-useselector-and-createselector-with-redux-toolkit)
He says, "I would recommend only using createSelector if there's actual derived state involved, ie, state => state.items.map(item => item.id)". 
So, in a nutshell, if the component is mutating the state from the store, use createSelector from the Reselect library (which is [re-exported from RTK for ease of use](https://redux-toolkit.js.org/api/createselector/#createselector)) 



``` js
const selectCounterValue = state => state.value
const currentValue = selectCounterValue(store.getState())
```

### [Thunks and Async Logic](https://redux.js.org/tutorials/essentials/part-5-async-logic#thunks-and-async-logic)
[Crazy simple explantation of what redux-thunk does!!](https://daveceddia.com/what-is-a-thunk/)

- [A kind of middlewear](https://redux.js.org/tutorials/fundamentals/part-4-store#middleware)
There are many kinds of async middleware for Redux, and each lets you write your logic using different syntax. The most common async middleware is redux-thunk, which lets you write plain functions that may contain async logic directly. Redux Toolkit's configureStore function automatically sets up the thunk middleware by default, and we recommend using thunks as the standard approach for writing async logic with Redux.

- I think that RXJS might be another type of middlewear [you can use instead of redux-thunk?](https://redux.js.org/style-guide/style-guide#use-thunks-for-async-logic)




## Normalizr
https://github.com/paularmstrong/normalizr
C:\temp\code\quokka\Normalizr\01 - Normalizr Intro.ts