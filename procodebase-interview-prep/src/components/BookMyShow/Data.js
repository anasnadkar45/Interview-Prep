export const generateSeats = () => {
    const seats = [];

    const rawConfig = {
        A: { count: 16 },
        B: { count: 15 },
        C: { count: 23 },
        D: { count: 23 },
        E: { count: 23 },
        E: { count: 23 },
        F: { count: 23 },
        G: { count: 23 },
        H: { count: 23 },
        I: { count: 23 },
        J: { count: 23 },
        K: { count: 23 },
        L: { count: 23 },
        M: { count: 13 },
    }

    Object.entries(rawConfig).forEach(([row, config]) => {
        const price = 150;

        for (let i = 1; i <= config.count; i++) {
            seats.push({
                id: `${row}${i}`,
                row,
                number: i,
                status: getInitialStatus(row, i),
                price
            })
        }
    })

    return seats;
}

const getInitialStatus = (row, number) => {
    if (
        (row === 'D' && number >= 11 && number <= 13) ||
        (row === 'E' && number >= 14 && number <= 16) ||
        (row === 'L' && number >= 10 && number <= 12)
    ) {
        return 'bestseller'
    }

    if (Math.random() > 0.85) {
        return 'sold'
    }

    return 'available'
}