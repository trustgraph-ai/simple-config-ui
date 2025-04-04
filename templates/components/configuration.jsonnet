local base = import "base/base.jsonnet";
local images = import "values/images.jsonnet";
local url = import "values/url.jsonnet";

local prompts = import "prompts/mixtral.jsonnet";
local default_prompts = import "prompts/default-prompts.jsonnet";

{

    prompts:: default_prompts,
    tools:: [],

    local configuration = std.manifestJsonMinified({
        prompt: {
            "system": $["prompts"]["system-template"],
            "template-index": std.objectFieldsAll($.prompts.templates),
        } + {
            ["template." + p.key]: p.value
            for p in std.objectKeysValuesAll($.prompts.templates)
        },
        agent: {
            "tool-index": [t.id for t in $.tools],
        } + {
            ["tool." + p.id]: p
            for p in $.tools
        }
    }),

    "init-trustgraph" +: {
    
        create:: function(engine)

            local container =
                engine.container("init-trustgraph")
                    .with_image(images.trustgraph_flow)
                    .with_command(
                        [
                            "tg-init-pulsar",
                            "-p",
                            url.pulsar_admin,
                            "--config",
                            configuration,
                        ]
                    )
                    .with_limits("0.5", "128M")
                    .with_reservations("0.1", "128M");

            local containerSet = engine.containers(
                "init-trustgraph", [ container ]
            );

            engine.resources([
                containerSet,
            ])

    },

} + default_prompts

