import { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";

type AnimatedCurrencyProps = {
    value: number;
};

export default function AnimatedCurrency({
    value,
}: AnimatedCurrencyProps) {
    const [displayValue, setDisplayValue] = useState<number>(0);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setDisplayValue(value);
        }, 100);

        return () => window.clearTimeout(timeoutId);
    }, [value]);

    return (
        <NumberFlow
            value={displayValue}
            format={{
                style: "currency",
                currency: "CAD",
                currencyDisplay: "narrowSymbol",
                maximumFractionDigits: 0,
            }}
            transformTiming={{
                duration: 900,
                easing: "ease-out",
            }}
        />
    );
}