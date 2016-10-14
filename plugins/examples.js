var reg = /@arg.*{(.*)}\s(.+?\s|.+?\n)/g;

exports.handlers = {
    symbolFound: function(e) {
        //Ignore undocumented and the Client's constructor
        if (e.comment === "@undocumented" || e.code.name === "Discord.Client") return;

        //Remove the "*/"
        e.comment = e.comment.slice(0, e.comment.length - 2);

        //Get the full method name "Discord.Client.Prototype.xxxxx", and then just get "xxxxx"
        var method = e.code.name, methodName = method.slice(
            method.lastIndexOf("."),
            method.length
        );

        //Prime the example array
        var example = [
            "* @example",
            " * client" + methodName + (e.code.type === 'FunctionExpression' ? "(" : "")
        ];

        var r, type, current, temp, bracket;

        //For every argument
        while (r = reg.exec(e.comment)) {
            type = r[1].trim(), current = r[2].trim(), temp = " *	";

            //If the argument is `input` and it's an Object, we're making an Object argument
            if (type === "Object" && current === 'input') {
                example[1] += "{";
                continue;
            }

            bracket = example[1][example[1].length - 1];
            current = current.replace("input.", "");

            if (bracket === "(") {
                example[1] += current + ": " + type;
            }
            if (bracket === "{") {
                temp += current + ": " + type + ",";
                example.push(temp);
            }
        }

        if (!bracket) bracket = example[1][example[1].length - 1];

        if (bracket === "(") example[1] += ");";
        if (bracket === "{") example.push(" *});");

        example.push("*/");
        e.comment += example.join("\n");
    }
}