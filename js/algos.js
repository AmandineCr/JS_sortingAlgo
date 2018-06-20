// Converts from degrees to radians.
Math.toRadians = function (degrees) {
    return degrees * Math.PI / 180;
};


function distanceFromGrenoble(city) {
    console.log("implement me !");
    let GrenobleLat = 45.166667;
    let GrenobleLong = 5.716667;
    let lat2 = city.latitude;
    let lon2 = city.longitude;

    let R = 6371e3; // metres
    let φ1 = Math.toRadians(GrenobleLat);
    let φ2 = Math.toRadians(lat2);
    let Δφ = Math.toRadians(lat2 - GrenobleLat);
    let Δλ = Math.toRadians(lon2 - GrenobleLong);


    let a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    let d = R * c;


    return d;
}

function swap(i, j) // Swap the values in array csvData
{
    displayBuffer.push(['swap', i, j]); // Do not delete this line (for display)
    let temp = csvData[i];
    csvData[i] = csvData[j];
    csvData[j] = temp;
}

function isLess(A, B) {
    // Do not delete this line (for display)
    displayBuffer.push(['compare', A, B]);
    return csvData[A].dist < csvData[B].dist;
}

function insertsort() {
    for (let i = 1; i < csvData.length; i++) {
        for (let k = i; k > 0 && isLess(k, k - 1); k--) {
            swap(k, k - 1);
        }
    }
}

function selectionsort() {
    for (let i = 0; i < csvData.length; i++) {
        let k = i;
        for (let j = i + 1; j < csvData.length; j++) {
            if (isLess(j, k)) {
                k = j;
            }
        }
        swap(i, k);
    }
}

function bubblesort() {

    for (let i = 0; i < csvData.length; i++) {
        let swapped = false;
        for (let j = csvData.length - 1; j > 0; j--) {
            if (isLess(j, j - 1)) {
                swap(j, j - 1);
                swapped = true
            }
        }

        if (swapped === false) {
            break;
        }
    }


}

function shellsort() {
    console.log("implement me !");
}

function mergesort(data) {
    console.log("implement me !");
}

function heapsort(data) {
    console.log("implement me !");
}


function quicksort() {

    quick(Math.ceil(0), Math.floor(csvData.length - 1));

    function quick(min, max) {
        if (max - min > 0) {
            let randomize = Math.floor(Math.random() * (max - min + 1)) + min;
            swap(min, randomize);

            // 2-way partition
            let k = min;
            for (let i = min + 1 ; i <= max; i++) {
                if (isLess(i, min)) {
                    swap(++k, i);
                }
            }
            swap(min, k);

            // Recursive sorts
            quick(min, k-1);
            quick(k+1, max);
        }
    }


}

function quick3sort(data) {
    console.log("implement me !");
}


var algorithms = {
    'insert': insertsort,
    'select': selectionsort,
    'bubble': bubblesort,
    'shell': shellsort,
    'merge': mergesort,
    'heap': heapsort,
    'quick': quicksort,
    'quick3': quick3sort
}

function sort(algo) {
    if (!algorithms.hasOwnProperty(algo)) {
        throw 'Invalid algorithm ' + algo;
    }
    var sort_fn = algorithms[algo];
    sort_fn();
}

