import plugin from "tailwindcss/plugin";

const defaultValues = (() => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const values = {};
    array.forEach((item) => {
        values[item] = String(item);
    });
    return values;
})();

export default plugin(function ({ matchVariant }) {
    // Target count items or more: at-least-5: / at-least[20]
    matchVariant(
        "at-least",
        (value) => {
            return [`&:nth-last-child(n+${value})`, `&:nth-last-child(n+${value}) ~ *`];
        },
        {
            values: defaultValues,
        },
    );
    // Target count items or less: at-most-5: / at-most[20]:
    matchVariant(
        "at-most",
        (value) => {
            return [`&:nth-last-child(-n+${value}):first-child`, `&:nth-last-child(-n+${value}):first-child ~ *`];
        },
        {
            values: defaultValues,
        },
    );
    // Target between: between[1-3]:
    matchVariant("between", (value) => {
        return [
            `&:nth-last-child(n+${value.split("-")[0]}):nth-last-child(-n+${value.split("-")[1]}):first-child`,
            `&:nth-last-child(n+${value.split("-")[0]}):nth-last-child(-n+${value.split("-")[1]}) ~ *`,
        ];
    });
    // Target exactly count items::exactly-5: /exactly[20]:
    matchVariant(
        "exactly",
        (value) => {
            return [`&:nth-last-child(${value}):first-child`, `&:nth-last-child(${value}):first-child ~ *`];
        },
        {
            values: defaultValues,
        },
    );
});
