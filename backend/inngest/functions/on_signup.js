import { inngest } from "../client";

export const onUserSignUp = inngest.createFunction(
    {id : "on-user-signup", retries : 2}, //id of function
    {event : "user/signup"}, //this function will be invoked whenever this event is triggered 

    async ({event, step}) => {

    }
)