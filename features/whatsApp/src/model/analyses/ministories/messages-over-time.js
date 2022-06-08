import {
    groupActivitiesByTime,
    RootAnalysis,
} from "@polypoly-eu/poly-analysis";
import analysisKeys from "../analysisKeys";

export default class MessagesOverTimeAnalysis extends RootAnalysis {
    async analyze({ dataAccount: whatsAppAccount }) {
        const messages = whatsAppAccount.messages;
        const groupedMessages = groupActivitiesByTime(
            messages.map(({ timestamp }) => timestamp)
        );
        if (Object.keys(messages).length > 0)
            whatsAppAccount.analyses[analysisKeys.messagesOverTime] =
                groupedMessages;
    }
}
