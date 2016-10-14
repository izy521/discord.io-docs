exports.handlers = {
    beforeParse: function(e) {
        e.source = e.source
            //Get rid of first DCP
            .replace("var DCP = Discord.Client.prototype;", "")

            //Replace all DCPs with Discord.Client.prototype
            .replace(/DCP./g, "Discord.Client.prototype.")

            //Replace S* with Snowflake
            .replace(/S\*/g, "Snowflake");
    }
};