module.exports = {
    agent_enabled: true,
    app_name: [process.env.NEW_RELIC_APP_NAME],
    license_key: process.env.NEW_RELIC_LICENSE_KEY,
    logging: {
        level: 'info',
        enabled: true,
        filepath: 'stdout',
    },
    allow_all_headers: true,
    attributes: {
        enabled: true,
        exclude: [],
    },
    transaction_tracer: {
        enabled: true,
        transaction_threshold: 1,
        record_sql: 'obfuscated',
        explain_threshold: 200,
    },
    slow_sql: {
        enabled: true,
        max_samples: 20,
    },
    distributed_tracing: {
        enabled: true,
    },
    error_collector: {},
    rules: {},
};