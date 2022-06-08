import { DataAccount } from "@polypoly-eu/poly-import";

export default class WhatsAppAccount extends DataAccount {
    constructor() {
        super();
        this.messages = [];
    }

    get dataGroups() {
        return [
            {
                title: "Messages",
                count: this.messages.length,
            },
        ];
    }
}
