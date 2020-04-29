import sucrase from "@rollup/plugin-sucrase";

export default {
    input: "src/index.ts",
    output: [
        {
            file: "dist/index.es.js",
            format: "esm"
        },
        {
            file: "dist/index.js",
            format: "cjs"
        }
    ],
    plugins: [
        sucrase({
            exclude: ["node_modules/**"],
            transforms: ["typescript"]
        })
    ],
    external: [
        "@polypoly-eu/bubblewrap",
        "@polypoly-eu/port-authority",
        "@polypoly-eu/postoffice",
        "@polypoly-eu/rdf"
    ]
};
