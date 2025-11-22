import { NonRetriableError } from "inngest";
import { User } from "../../models/user.model.js";
import { inngest } from "../client.js";
import { sendMail } from "../../utils/mailer.js";

export const onUserSignUp = inngest.createFunction(
    {id : "on-user-signup", retries : 2}, //id of function
    {event : "user/signup"}, //this function will be invoked whenever this event is triggered 

    async ({event, step}) => {
        try {
            //whoever is invoking some event they can pass some data
            const {email} = event.data

            //find the user in the database
            const user = await step.run("check-for-user-email", async () => {
                const userObject = await User.findOne({email})
                if (!userObject) {
                    throw new NonRetriableError("User does not exists in our database!") //inggest error
                }
                return userObject //this will be passed to step two automatically
            })

            await step.run("send-welcome-email", async () => {
                const subject = `Welcome to the app!`
                const message = `Hi,
                \n\n
                Thanks for signing in. We are glad to have you onboard!`

                await sendMail(user?.email, message, subject)
            })

            //when all steps are completed
            return {success : true}
        } catch (error) {
            
        }
    }
)