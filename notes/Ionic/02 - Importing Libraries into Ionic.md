# Importing Libarires into Ionic


## Pattern for importing / exporting
I stuffed around for ages trying to export a SINGLE library file. I don't think that it works this way. I think that you're supposed to have multiple files for your library then import them as needed.
You could do this though and have a single file which exposed a lot of libraries.
``` TypeScript
# common.ts
import * as maths from 'dcapjs/lib/maths'
import * as constants from 'dcapjs/lib/constants'
export  {maths, constants}  

# Then consuming in client.ts
import * as dcap from './common'


<p>{dcap.maths.divide(2,30)}</p>
<p>{dcap.constants.author}</p>
```




