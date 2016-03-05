export default function(items=[]) {

    var entries = [];
    items.forEach((item, ii) => {

        var matches = entries.filter(entry => {
            return entry.name == item;
        });
        if (matches.length == 0) {
            entries.push({
                name: item,
                quantity: 1
            })
        } else {
            entries.forEach((e) => {
                if (e.name == item) {
                    e.quantity = e.quantity + 1;
                }
            });
        }
    });

    var str = "";
    entries.map((entry, index) => {
        const end = (entry.quantity > 1) ? "s" : "";
        return `${entry.quantity} ${entry.name}${end}`
    }).forEach((segment, index) => {
        str += segment;
        if (index == entries.length-2) {
            if (entries.length > 2) {
                str+= ",";
            }
            str += " and ";
        }
        if (index < entries.length-2) {
            str += ", "
        }
    });

    return str;
}