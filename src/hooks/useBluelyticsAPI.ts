import { useEffect, useState } from "react";

function aggregateData(data) {
    return data.reduce((result, item) => {
        let entry = result.find(e => e.date === item.date);

        if (!entry) {
            entry = {
                date: item.date,
                official_buy: null,
                official_sell: null,
                blue_buy: null,
                blue_sell: null,
                difference_buy: null,
                difference_sell: null
            };
            result.push(entry);
        }

        if (item.source === "Blue") {
            entry.blue_buy = item.value_buy;
            entry.blue_sell = item.value_sell;
        } else if (item.source === "Oficial") {
            entry.official_buy = item.value_buy;
            entry.official_sell = item.value_sell;
        }

        if (entry.blue_buy !== null && entry.official_buy !== null) {
            entry.difference_buy = ((entry.blue_buy - entry.official_buy) / entry.official_buy) * 100;
        }

        if (entry.blue_sell !== null && entry.official_sell !== null) {
            entry.difference_sell = ((entry.blue_sell - entry.official_sell) / entry.official_sell) * 100;
        }
        return result;
    }, [])
    .reverse()
}


export function useBluelyticsAPI() {
    const [data, setData] = useState([])
    const [dataLoading, setDataLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetch("https://api.bluelytics.com.ar/v2/evolution.json")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch Bluelytics API data");
                return res.json();
            })
            .then(res => setData(aggregateData(res)))
            .catch(setError)
            .finally(() => setDataLoading(false));
    }, []);

    return { data, dataLoading, error };
}

// https://api.bluelytics.com.ar/v2/evolution.json

