import Head from 'next/head'
import Sidebar from '../components/dashboard/sidebar.component'
import TopCard from '../components/dashboard/topbar.component'
import BarChart from '../components/dashboard/barchart.component'
import RecentData from '../components/dashboard/recentdata.component'
import { useState, useEffect } from 'react';
import ScatterGraph from '../components/dashboard/scatterchart.component'
import Runner from '../components/runner'
import styles from '../styles/dashboard.css'
import GraphType from '../components/dashboard/graphtype.component'
import TextInput from '../components/dashboard/textinput.component'
// import DataTypeSelector from '../components/dashboard/datatypeselector.component'
import Modal from '../components/dashboard/modal.component'

function removeOutliers(dataObj, k = 1.5) {
    const values = Object.values(dataObj);
    values.sort((a, b) => a - b);

    const q1 = values[Math.floor(values.length / 4)];
    const q3 = values[Math.floor(3 * values.length / 4)];
    const iqr = q3 - q1;

    const lowerBound = q1 - k * iqr;
    const upperBound = q3 + k * iqr;

    const filteredData = {};
    for (const key in dataObj) {
        if (dataObj[key] >= lowerBound && dataObj[key] <= upperBound) {
            filteredData[key] = dataObj[key];
        }
    }

    return filteredData;
}



export default function Dashboard() {
    // console.clear();
    const myName = "Peaks";
    const second = 1;
    const frames = 30;
    const minute = 60;
    // const [runners, setRunners] = useState([]);
    const [cadenceArray, setCadenceArray] = useState([]);
    const [verticalArray, setVerticalArray] = useState([]);
    const [overstridingArray, setOverstridingArray] = useState([]);
    const [showScatter, setShowScatter] = useState(false);
    const [framesPerSecond, setFramesPerSecond] = useState(300);
    const [currentDataType, setCurrentDataType] = useState('cadence');
    const [inputValue, setInputValue] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const handleRunnerNameChange = (newValue) => {
        setInputValue(newValue);
    };
    const handleSearchClick = () => {
        fetchRunners(inputValue);
    };
    async function fetchRunners(name) {
        try {
            const res = await fetch(`/api/runners?name=${name}`)
            const newRunners = await res.json();
            if (!newRunners || Object.keys(newRunners).length === 0) {
                console.log("No runners found, showing popup.");
                setPopupMessage('Runner not found in the database.');
                setShowPopup(true);
                return;
            }


            const cadences = newRunners.cadence;
            const verticals = newRunners.vo;
            const overstrides = newRunners.overstriding;
            setVerticalArray(removeOutliers(verticals));
            setCadenceArray(cadences);
            setOverstridingArray(overstrides);

        } catch (error) {
            // console.log("Error fetching runners:", error);
            setPopupMessage('Error fetching runners. Please try again later.');
            setShowPopup(true);
        }

    }
    useEffect(() => {

        // fetchRunners();
    }, []);


    // function secondsToTimeFormat(seconds) {
    //     const minutes = Math.floor(seconds / 60);
    //     const secs = Math.floor(seconds) - (minutes * 60);
    //     const millis = Math.round((seconds - Math.floor(seconds)) * 1000);

    //     return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(millis).padStart(3, '0')}`;
    // }

    function secondsToTimeFormat(seconds, addSeconds = 0) {
        const minutes = Math.floor((seconds + addSeconds) / minute);
        const secs = Math.round((seconds + addSeconds) - (minutes * minute));

        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }



    function framesToSeconds(data) {
        let maps = [];
        data.forEach(point => {
            let x = point.x;
            let t = Math.floor(x / framesPerSecond);  // 30 frames per second (30 * 60 = 1800) so 1800 frames = 1 minute
            if (!(t in maps)) {
                maps.push({ x: t, y: [] });
            }
            maps[t].y.push(point.y);
        });

        maps = maps.map(point => {
            let sum = point.y.reduce((a, b) => a + b, 0);
            let avg = sum / point.y.length;
            return { x: point.x, y: avg };
        });
        return maps;
    }

    function createXYDictionary(data) {
        const x_y_dict = {};

        data.forEach(entry => {
            x_y_dict[entry.x] = entry.y;
        });

        return x_y_dict;
    }


    let scatterDataPoints = Object.entries(verticalArray || {}).map(([x, y]) => ({ x: parseInt(x), y }));
    let scatterDataPointsMin = framesToSeconds(scatterDataPoints);


    for (let n in scatterDataPoints) {
        let seconds = (scatterDataPoints[n].x * second) / frames;
        scatterDataPoints[n].x = secondsToTimeFormat(seconds);
    }


    let current_key = 0;
    const c = {};
    const CADENCE_BOUNDARY = 153;

    for (let k in cadenceArray) {
        if ((parseInt(k) % minute) === 0) {
            current_key += 1;
            let c_key = String(current_key);
            c[c_key] = (cadenceArray[k] * 2);
        } else {
            c[String(current_key)] += (cadenceArray[k] * 2);
        }
    }


    let colors = [];
    for (let k in c) {
        if (c[k] > CADENCE_BOUNDARY) {
            colors.push('rgba(0, 255, 8, 0.8)');
        } else {
            colors.push('rgba(255, 0, 0, 0.7)');
        }
    }


    const c1 = createXYDictionary(scatterDataPointsMin);
    let c1_colors = [];
    for (let k in c1) {
        if (c1[k] >= 5 && c1[k] <= 10) {
            c1_colors.push('rgba(0, 255, 8, 0.8)');
        } else {
            c1_colors.push('rgba(255, 0, 0, 0.7)');
        }
    }

    const validValues = [30, 150, 300, 600, 900, 1800];


    const handleSliderChange = (e) => {
        const index = e.target.value - 1;
        const selectedValue = validValues[index];
        setFramesPerSecond(selectedValue);
    };


    // let overstriding = {};
    // for (let k in overstridingArray) {
    //     if ((parseInt(k) % minute) === 0) {
    //         current_key += 1;
    //         let c_key = String(current_key);
    //         overstriding[c_key] = overstridingArray[k];
    //     } else {
    //         overstriding[String(current_key)] += overstridingArray[k];
    //     }
    // }
    let overstriding = overstridingArray;
    const OVERSTRIDING_BOUNDARY = 7; // Adjust this value as needed
    let overstriding_colors = [];
    for (let k in overstriding) {
        if (overstriding[k] > OVERSTRIDING_BOUNDARY) {
            overstriding_colors.push('rgba(0, 0, 255, 0.8)');
        } else {
            overstriding_colors.push('rgba(255, 165, 0, 0.7)');
        }
    }

    const overstridingData = {
        colors: overstriding_colors,
        data: overstriding,
        title: 'Overstriding',
        labels: { 'x': 'time (min)', 'y': 'Overstride Value' } // Adjust y-label as per your data's unit
    };



    const cadenceData = {
        colors: colors,
        data: c,
        title: 'Cadence',
        labels: { 'x': 'time (min)', 'y': 'Steps' }
    };

    const verticalOscillationData = {
        colors: c1_colors,  // Assuming you have defined this
        data: c1,  // Assuming you have defined this
        title: 'Vertical Oscillation',
        labels: { 'x': 'time (min)', 'y': 'Oscillation (cm)' }
    };
    // console.log('verticalArray', verticalArray);
    // console.log('cadenceArray', cadenceArray);
    // console.log('overstridingArray', overstridingArray);

    return (
        <Sidebar>
            {showPopup &&
                <Modal show={showPopup} onClose={() => setShowPopup(false)}>
                    <p>{popupMessage}</p>
                </Modal>
            }
            <Head>
                <title>Dashboard</title>
            </Head>

            <main className=''>

                <RecentData />
                <div className="flex space-x-4 pl-4">
                    <TextInput
                        placeholder="Enter name..."
                        onInputChange={(value) => handleRunnerNameChange(value)}
                        onEnterPress={() => handleSearchClick()}
                    />
                    <button
                        className="p-2 bg-blue-500 text-white rounded"
                        onClick={handleSearchClick}
                    >
                        Search
                    </button>
                </div>
                <div className='p-4 grid md:grid-cols-4 grid-cols-1 gap-4'>



                    {/* Data type selector */}
                    <div className="flex flex-col space-y-4 p-4 border rounded">
                        <p>Data Type</p>

                        <button
                            onClick={() => setCurrentDataType('vertical oscillation')}
                            className={`p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ${currentDataType === 'vertical oscillation' ? 'bg-black text-white' : 'hover:bg-gray-200 '}`}
                        >
                            Vertical Oscillation
                        </button>
                        <button
                            onClick={() => setCurrentDataType('overstriding')}
                            className={`p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ${currentDataType === 'overstriding' ? 'bg-black text-white' : 'hover:bg-gray-200 '}`}
                        >
                            Overstriding
                        </button>
                        <button
                            onClick={() => setCurrentDataType('cadence')}
                            className={`p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ${currentDataType === 'cadence' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                        >
                            Cadence
                        </button>
                    </div>




                    <div className="w-full  bg-gray-50 md:col-span-2 relative m-auto rounded-lg p-6 h-[50vh] lg:h-[75vh] overflow-hidden">
                        {
                            currentDataType === 'vertical oscillation' ? (
                                <div className="flex justify-center space-x-2 " >
                                    <p>Graph Type</p>
                                    <GraphType
                                        onTypeChange={(type) => setShowScatter(type === 'scatter')}
                                    />
                                </div>
                            ) : null
                        }
                        {!showScatter && currentDataType === 'vertical oscillation' && (
                            <div className="absolute top-14 right-4 z-20">
                                <label htmlFor="framesPerSecond" className="block text-sm font-medium text-gray-700 mb-2">
                                    {framesPerSecond === 1800 ? "time(minutes: 1)" : `time(seconds: ${framesPerSecond / 30})`}
                                </label>

                                <div className="relative">
                                    <input
                                        type="range"
                                        id="framesPerSecond"
                                        name="framesPerSecond"
                                        min="1"
                                        max={validValues.length}
                                        value={validValues.indexOf(framesPerSecond) + 1}
                                        className={styles.slider}
                                        onChange={handleSliderChange}
                                    />
                                </div>
                            </div>
                        )}

                        {(showScatter && (currentDataType === 'vertical oscillation')) ? (
                            scatterDataPoints.length > 0 ?
                                <ScatterGraph data={scatterDataPoints} title="Vertical Displacement" labels={{ x: "time", y: "Vertical Displacement (cm)" }} />
                                :
                                <div className="flex justify-center items-center h-full text-lg font-semibold">Loading graph...</div>
                        ) : (
                            <BarChart
                                colors={
                                    currentDataType === 'cadence' ? cadenceData.colors :
                                        currentDataType === 'vertical oscillation' ? verticalOscillationData.colors :
                                            overstridingData.colors
                                }
                                cadenceArray={
                                    currentDataType === 'cadence' ? cadenceData.data :
                                        currentDataType === 'vertical oscillation' ? verticalOscillationData.data :
                                            overstridingData.data
                                }
                                title={
                                    currentDataType === 'cadence' ? cadenceData.title :
                                        currentDataType === 'vertical oscillation' ? verticalOscillationData.title :
                                            overstridingData.title
                                }
                                labels={
                                    currentDataType === 'cadence' ? cadenceData.labels :
                                        currentDataType === 'vertical oscillation' ? verticalOscillationData.labels :
                                            overstridingData.labels
                                }
                            />
                        )}
                    </div>
                </div>
            </main>
            <div className='p-4 grid md:grid-cols-4 grid-cols-1 gap-4'>
            </div>
        </Sidebar>
    );
}








