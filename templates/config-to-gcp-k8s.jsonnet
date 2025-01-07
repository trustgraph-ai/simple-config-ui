
local engine = import "engine/gcp-k8s.jsonnet";
local decode = import "util/decode-config.jsonnet";
local components = import "components.jsonnet";

// Import config
local config = import "config.json";

// Produce patterns from config
local patterns = decode(config);

// Extract resources using the engine
local resources = std.foldl(
    function(state, p) state + p.create(engine),
    std.objectValues(patterns),
    {}
);

resources

