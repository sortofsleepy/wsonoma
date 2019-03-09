
module.exports = {

    /**
     * Process command line arguments.
     * @returns {{port: number}}
     */
    processArgs:function(){
        let args = process.argv;

        // splice the first two items
        let programArgs = [];

        for(let i = 2; i < args.length; ++i){
            programArgs.push(args[i]);
        }

        // check for port argument
        let finalArgs = {
            port:3000
        };
        programArgs.forEach(itm => {
            if(itm.search("--port=") !== -1){
                let arg = itm.split("--port=");
                finalArgs.port = arg[arg.length - 1];
            }
        });

        return finalArgs;
    }
};