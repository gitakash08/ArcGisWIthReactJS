export const baseTrackPopUpTemplate = {
    title: "Track Data",
    content: "<table class='table table-striped'>" +
        "<tr><td>Line</td><td class='popup-cell'>{line}}</td></tr>" +
        "<tr><td>Railway</td><td class='popup-cell'>{railway}</td></tr>" +
        "<tr><td>Division</td><td class='popup-cell'>{division}</td></tr>" +
        "<tr><td>Section</td><td class='popup-cell'>{tmssection}</td></tr>" +
        "<tr><td>Route</td><td class='popup-cell'>{route}</td></tr>" +
        "</table>",
}

const gmtClassBreaks = [
    {
        minValue: 50,
        maxValue: 59,
        symbol: {
            type: "simple-line",
            style: "solid",
            color: "#FF0000", // Red
            width: 2 // Adjust the width property instead of size
        },
        label: ">=50<60"
    },
    {
        minValue: 60,
        maxValue: 69,
        symbol: {
            type: "simple-line",
            style: "solid",
            color: "#EB5B00", // Green
            width: 2 // Adjust the width property instead of size
        },
        label: ">=60<70"
    },
    {
        minValue: 70,
        maxValue: 79,
        symbol: {
            type: "simple-line",
            style: "solid",
            color: "#FFC700", // Blue
            width: 2 // Adjust the width property instead of size
        },
        label: ">=70<80"
    },
    {
        minValue: 80,
        maxValue: 89,
        symbol: {
            type: "simple-line",
            style: "solid",
            color: "#4793AF", // Yellow
            width: 2 // Adjust the width property instead of size
        },
        label: ">=80<90"
    },
    {
        minValue: 90,
        maxValue: 99,
        symbol: {
            type: "simple-line",
            style: "solid",
            color: "#06D001", // Magenta
            width: 2 // Adjust the width property instead of size
        },
        label: ">=90<100"
    },
    {
        minValue: 100,
        maxValue: 10000000,
        symbol: {
            type: "simple-line",
            style: "solid",
            color: "#399918", // Cyan
            width: 2 // Adjust the width property instead of size
        },
        label: ">100"
    }
];

export const gmtClassBreaksRenderer = {
    type: "class-breaks",
    field: "life_slab_percent",
    classBreakInfos: gmtClassBreaks
};