import {DefaultPod} from "@polypoly-eu/poly-api";
import {Volume} from "memfs";
import {LogPod, nullLogger} from "../log";
import {dataset} from "@rdfjs/dataset";
import fetch from "node-fetch";
import {getHttpbinUrl, podSpec} from "@polypoly-eu/poly-api/dist/specs";

describe("Log pod", () => {

    const fs = new Volume().promises as any;
    const underlying = new DefaultPod(dataset(), fs, fetch);

    podSpec(new LogPod(underlying, nullLogger), "/", getHttpbinUrl());

});
