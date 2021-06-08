# Overview of these samples.
There are many ways you can set up react / redux. 
It appears that the main killer redux tool is https://redux-toolkit.js.org/ (RTK)
There is a demo app using RTK that I've included in this project folder under c:\code\Tickets.Mobile\misc-files\demo-projects\reduxreactsample\. I've also copied the main page from it and put it into this project as 'Counter.tsx' et al. 
There are two main pages describing the patterns used here
[Usage Guide (RDK)](https://redux-toolkit.js.org/usage/usage-guide)
[Usage with TypeScript (RDK)](https://redux-toolkit.js.org/usage/usage-guide)
When using these, the menu on the right allows quick jumping to headings. 



## Counter.tsx summary of what React Toolkit can do out of the box with 'best practises'
### Use Create Reducer to automatically do immutability magic with Immer (https://redux-toolkit.js.org/usage/usage-guide#simplifying-reducers-with-createreducer)
 - Using CreateSlice to automatically (https://redux-toolkit.js.org/usage/usage-guide#simplifying-reducers-with-createreducer)
     - Create reducer functions which user Immer  

### Use of createAction to creat action types (https://redux-toolkit.js.org/usage/usage-guide#writing-action-creators)
This is cool. 
   - Creates an action object simply including the 'type' (the string to ID the action )
   - The returned action creator function also has toString() defined on it, with that type returned. That means you can actually use that funciton object in place of a string for dictionary lookups. (https://redux-toolkit.js.org/usage/usage-guide#using-action-creators-as-action-types)
   - You could use createAction with createReducer to get the help of Immer etc but still have more manual control that you get with CreateSlice (below)

### Creating Slices of State (https://redux-toolkit.js.org/usage/usage-guide#creating-slices-of-state)
  - There's a popular pattern called [ducks](https://github.com/erikras/ducks-modular-redux) for putting stuff in the same files. 
  - Create Slice does magic! (https://redux-toolkit.js.org/usage/usage-guide#simplifying-slices-with-createslice)
  - A 'slice' is defined by the reducers passed to `combineReduces` when you configure the store. There is a 1:1 relationship between a slice and a reducer. It's kind of the package of the `reducer` (a function), the optional `action creator` methods and the `Action Types` (the POJOs that are passed around).
  - auto-gens the `Action Types`  (based on the name of the reducer function you provide)
  - auto-gens the `Action Creators` (based on the name of the reducer function you provide)
  - You can then extract all the `action creators` and the `reducer` [from the file](https://redux-toolkit.js.org/usage/usage-guide#exporting-and-using-slices). Remember that the reducer is a function which you pass `Action Types` to.
  - I think that `Action Types` can be handled by multiple reducers. Have a look at `extraReducers` in `createSlice`. So, for example, you might have 'ACCOUNT/USER_LOGGED_OUT' update 20 different pieces of the state 
  - In summary, create slice is awesome!
   
### Thunks
  - A thunk is just a function returned by another function (https://daveceddia.com/what-is-a-thunk/)
  - If you pass redux a function instead of a POJO, it will execute it as a promise. That's all there is to thunks.
  - A thunk can then dispatch other actions. 
  - Thunks are a poor man's approach to async. Rxjs is much more advanced and can replace it. BUT, there's now reason why you can't use both alongside each other. RTK includes a dependency on redux-thunk.
  - RTK has `createAsyncThunk` (https://redux-toolkit.js.org/usage/usage-guide#async-requests-with-createasyncthunk)
    - You give `createAsyncThunk` a string for the `action type` prefix, and an async function
    - It creates a thunk with some magic helpers that automatically create `action types` which are yielded on the promise results. Look at `incrementAsync.pending`, `incrementAsync.fulfilled` and `incrementAsync.rejected` in `counterSlice.ts`. You 
  -
    
  


## RXJS = Redux Observable library
- Look at PingPongSlice.ts. I have a good example there of pulling the best out of the above. 