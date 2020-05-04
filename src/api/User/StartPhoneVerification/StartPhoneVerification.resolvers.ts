import { StartPhoneVerificationMutationArgs , StartPhoneVerificationResponse} from "../../../types/graph";
import { Resolvers } from "../../../../src/types/resolvers";
import Verification from "../../../entities/Verification";
import { sendVerificationSMS } from "../../../utils/sendSMS";

const resolvers: Resolvers = {
    Mutation : {
        StartPhoneVerification: async (_, args: StartPhoneVerificationMutationArgs)
        : Promise<StartPhoneVerificationResponse> => {
            const { phoneNumber } = args;
            try {
              const existingVerification =   await Verification.findOne({ payload: phoneNumber});
              if(existingVerification){
                 existingVerification.remove();
              }
              const newVerificarion = await Verification.create({
                  payload: phoneNumber,
                  target:"PHONE",
                
              }).save();
              console.log(newVerificarion);

              //to send sms
              await sendVerificationSMS(newVerificarion.payload, newVerificarion.key);
              return {
                  ok: true,
                  error: null
              }
              
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                }
            }
        }
    }
}

export default resolvers;