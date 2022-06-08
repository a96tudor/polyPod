import {
    RootAnalysis,
} from "@polypoly-eu/poly-analysis";
import analysisKeys from "../analysisKeys";

export default class MessagesThreadParticipantsAnalysis extends RootAnalysis {
    async analyze({ dataAccount: whatsAppAccount }) {
        const messages = whatsAppAccount.messages;
        whatsAppAccount.analyses[analysisKeys.threadParticipants] = new Set(
            messages.filter((message) => message.sender)
        );
    }
}
