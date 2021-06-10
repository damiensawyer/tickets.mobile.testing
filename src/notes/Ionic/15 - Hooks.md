# Hooks

## Clean up and Perf (Effects run on every render unless you opt out!! )
Every effect (hook) may return a function that cleans up after it. This lets us keep the logic for adding and removing subscriptions close to each other. They’re part of the same effect!
React performs the cleanup when the component unmounts. However. effects run for every render and not just once. This is why React also cleans up effects from the previous render before running the effects next time. See [this](https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects) for how to opt out of this behavior


## [UseSate](https://reactjs.org/docs/hooks-state.html)
store state for the local component




## [UseEffect](https://reactjs.org/docs/hooks-effect.html)
The Effect Hook lets you perform side effects in function components:
``` ts
    // shows a useEffect hook updating a useState hook and offering a cleanup function 
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

[Use Effect with Cleanup](https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup)
Every effect may return a function that cleans up after it. 
