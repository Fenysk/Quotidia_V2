const pricing = {
    GPT4: {
        input: {
            standard: 0.03, // 0.03 $ / 1000 tokens
            k32: 0.06,     // 0.06 $ / 1000 tokens
        },
        output: {
            standard: 0.06, // 0.06 $ / 1000 tokens
            k32: 0.12,     // 0.12 $ / 1000 tokens
        },
    },
    GPT35turbo: {
        input: {
            standard: 0.0015, // 0.0015 $ / 1000 tokens
            k16: 0.003,      // 0.003 $ / 1000 tokens
        },
        output: {
            standard: 0.002, // 0.002 $ / 1000 tokens
            k16: 0.004,     // 0.004 $ / 1000 tokens
        },
    },
};

export default pricing;