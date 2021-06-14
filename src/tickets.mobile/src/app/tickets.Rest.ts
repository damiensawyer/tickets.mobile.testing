import * as core from './ticketsCore'
/*
What am I trying to achieve?
- pure functions which make API calls based on an environment object
- return an option or either
- 

*/
let e = core.GetEnvironmentSettings[core.Environment.development]
let a = 100
a //?