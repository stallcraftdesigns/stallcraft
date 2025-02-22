class ConsoleManager {
    log(...args) {
        if (["dev", "development", "staging"].includes(process.env.ENV)) {
            console.log("[LOG]:", ...args);
        }
    }

    error(...args) {
        if (["dev", "development", "staging"].includes(process.env.ENV)) {
            console.error("[ERROR]:", ...args);
        }
    }
}

module.exports = new ConsoleManager();
