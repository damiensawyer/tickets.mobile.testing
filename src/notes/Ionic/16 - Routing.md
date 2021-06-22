# Routing
This did my head in a bit.
You can route by just rendering 
``` tsx
<Redirect to={'/page/Home'}/>
<Redirect push to={'/page/Home'}/>  (will put the navigation on the back stack
```



## Using history
You can navigate more imperatively with
history.push("/quiet")

You can get history from
import {useHistory} from "react-router-dom";
const history = useHistory() // typing from https://stackoverflow.com/questions/49342390/typescript-how-to-add-type-check-for-history-object-in-react

Note that, in the above, history os of type 'History', gotten like this. You could use that to pass history around to functions.  
import { History } from 'history';


