import {relevantZipEntries} from "@polypoly-eu/poly-analysis";


async function parseMessages(entry) {
    const content = await entry.getContent();
    const text = await new TextDecoder("utf-8").decode(content);
    const rawMessages = text.split('\n');

    const regex = /\[(?<timestamp>.{20})\] (?<sender>.+): (?<message>.+)$/;

    const messages = [];

    for (const line of rawMessages) {
        const parsedMessage = line.match(regex);
        const timestampRegex = /(?<day>\d{2})\.(?<month>\d{2})\.(?<year>\d{4}), (?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})/;
        const parsedTimestampGroups = parsedMessage.groups.timestamp.match(timestampRegex).groups;
        const jsFormatTimestampString = `${parsedTimestampGroups.year}-${parsedTimestampGroups.month}-${parsedTimestampGroups.day}T${parsedTimestampGroups.hour}:${parsedTimestampGroups.minute}:${parsedTimestampGroups.second}`;

        messages.push(new WhatsAppMessage(
            new Date(jsFormatTimestampString),
            parsedMessage.groups.sender,
            parsedMessage.groups.message,
        ));
    }
    return messages;
}

export default class MessagesImporter {
    async import({ zipFile, facebookAccount: whatsAppAccount }) {
        const entries = await relevantZipEntries(zipFile);
        whatsAppAccount.messages.push(
            ...(
                await Promise.all(
                    entries.map((entry) => parseMessages(entry))
                )
            ).flat()
        );
    }
}

class WhatsAppMessage {
    constructor(timestamp, sender, message) {
        this.timestamp = timestamp;
        this.sender = sender;
        this.message = message;
        this.type = this._get_message_type();
    }

    _get_message_type() {
        if (this.message.endsWith('image omitted')) return 'image';
        if (this.message.endsWith('video omitted')) return 'video';
        return 'text';
    }

}
