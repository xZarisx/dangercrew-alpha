export default function(array) {
    var delivery = [];

    array.forEach((segment, index) => {
        if (!segment.match(/@@pause_/)) {

            let speed = 70;
            if (segment.match(/^\[LIGHTNING\]/i)) {
                segment = segment.replace("[LIGHTNING]", "");
                speed = 10;
            }
            if (segment.match(/^\[FAST\]/i)) {
                segment = segment.replace("[FAST]", "");
                speed = 35;
            }
            if (segment.match(/^\[SLOW\]/i)) {
                segment = segment.replace("[SLOW]", "");
                speed = 140;
            }
            if (segment.match(/^\[CRAWL\]/i)) {
                segment = segment.replace("[CRAWL]", "");
                speed = 360;
            }

            const split = segment.split('').map(function(char) {
                return {
                    content: char,
                    delayBefore: (char != " ") ? speed : 0
                }
            });
            delivery = [...delivery, ...split]


        } else {
            const parsedDelay = segment.match(/\d+/g)[0];
            delivery = [...delivery, { content: " ", delayBefore: parsedDelay}]
        }
    });

    return delivery
}