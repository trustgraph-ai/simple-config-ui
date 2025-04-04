local base = import "base/base.jsonnet";
local images = import "values/images.jsonnet";
local url = import "values/url.jsonnet";

{

    "prompt" +: {
    
        create:: function(engine)

            local container =
                engine.container("prompt")
                    .with_image(images.trustgraph_flow)
                    .with_command([
                        "prompt-template",
                        "-p",
                        url.pulsar,
                        "--text-completion-request-queue",
                        "non-persistent://tg/request/text-completion",
                        "--text-completion-response-queue",
                        "non-persistent://tg/response/text-completion",
                    ]
                    )
                    .with_limits("0.5", "128M")
                    .with_reservations("0.1", "128M");

            local containerSet = engine.containers(
                "prompt", [ container ]
            );

            local service =
                engine.internalService(containerSet)
                .with_port(8080, 8080, "metrics");

            engine.resources([
                containerSet,
                service,
            ])

    },

    "prompt-rag" +: {
    
        create:: function(engine)

            local container =
                engine.container("prompt-rag")
                    .with_image(images.trustgraph_flow)
                    .with_command([
                        "prompt-template",
                        "-p",
                        url.pulsar,
                        "-i",
                        "non-persistent://tg/request/prompt-rag",
                        "-o",
                        "non-persistent://tg/response/prompt-rag",
                        "--text-completion-request-queue",
                        "non-persistent://tg/request/text-completion-rag",
                        "--text-completion-response-queue",
                        "non-persistent://tg/response/text-completion-rag",
                    ]
                    )
                    .with_limits("0.5", "128M")
                    .with_reservations("0.1", "128M");

            local containerSet = engine.containers(
                "prompt-rag", [ container ]
            );

            local service =
                engine.internalService(containerSet)
                .with_port(8080, 8080, "metrics");

            engine.resources([
                containerSet,
                service,
            ])

    },

}

