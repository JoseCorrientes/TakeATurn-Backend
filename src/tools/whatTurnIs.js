export function whatTurnIs(hour, minute) {
    let data=hour+minute;
    switch (data) {
        case '0800':
            return 0;
        case '0830':
            return 1;
        case '0900':
            return 2;
        case '0930':
            return 3;
        case '1000':
            return 4;
        case '1030':
            return 5;
        case '1100':
            return 6;
        case '1130':
            return 7;
        case '1200':
            return 8;
        case '1230':
            return 9;
        case '1300':
            return 10;
        case '1330':
            return 11;
        case '1400':
            return 12;
        case '1430':
            return 13;
        case '1500':
            return 14;
        case '1530':
            return 15;
        case '1600':
            return 16;
        case '1630':
            return 17;
        case '1700':
            return 18;
        case '1730':
            return 19;
        case '1800':
            return 20;
        case '1830':
            return 21;
        case '1900':
            return 22;
        case '1930':
            return 23;
        case '2000':
            return 24;
        case '2030':
            return 25;
        case '2100':
            return 26;
        case '2130':
            return 27;
        case '2200':
            return 28;
        default:
            return 29;
    }
}