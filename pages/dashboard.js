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
import { standardDeviation, mean, saveToCSV } from '../utils/utils'
import Image from 'next/image'


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
    const second = 1;
    const frames = 30;
    const minute = 60;
    // const [runners, setRunners] = useState([]);
    const [cadenceArray, setCadenceArray] = useState([]);
    const [verticalArray, setVerticalArray] = useState([]);
    const [overstridingArray, setOverstridingArray] = useState([]);
    const [showScatter, setShowScatter] = useState(false);
    const [framesPerSecond, setFramesPerSecond] = useState(1800);
    const [currentDataType, setCurrentDataType] = useState('cadence');
    const [inputValue, setInputValue] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [vo_descriptive, setVoDescriptive] = useState({ mean: null, std: null });
    const [cadence_descriptive, setCadenceDescriptive] = useState({ mean: null, std: null });
    const [overstriding_descriptive, setOverstridingDescriptive] = useState({ mean: null, std: null });
    const [showOverstridingImage, setShowOverstridingImage] = useState(false);
    const [showCadenceImage, setShowCadenceImage] = useState(true);
    const [showVerticalOscillationImage, setShowVerticalOscillationImage] = useState(false);




    const handleRunnerNameChange = (newValue) => {
        setInputValue(newValue);
    };
    const handleSearchClick = (newValue) => {
        setInputValue(newValue);

        fetchRunners(newValue);
    };
    async function fetchRunners(name) {
        try {
            const res = await fetch(`/api/runners?name=${name}`)
            const newRunners = await res.json();
            if (!newRunners || Object.keys(newRunners).length === 0) {
                setPopupMessage('Runner not found in the database.');
                setShowPopup(true);
                return;
            }


            const cadences = newRunners.cadence;
            const verticals = removeOutliers(newRunners.vo);
            const overstrides = newRunners.overstriding;
            setVerticalArray(verticals);
            setOverstridingArray(overstrides);

            let current_key = 0;
            let c = {};
            for (let k in cadences) {
                if ((parseInt(k) % minute) === 0) {
                    current_key += 1;
                    let c_key = String(current_key);
                    c[c_key] = (cadences[k] * 2);
                } else {
                    c[String(current_key)] += (cadences[k] * 2);
                }
            }
            c = removeOutliers(c);
            setCadenceArray(c);

            const vo_descriptive = {
                mean: mean(Object.values(verticals)),
                std: standardDeviation(Object.values(verticals)),
            };
            setVoDescriptive(vo_descriptive);

            const cadence_descriptive = {
                mean: mean(Object.values(c)),
                std: standardDeviation(Object.values(c)),
            };
            setCadenceDescriptive(cadence_descriptive);

            const overstriding_descriptive = {
                mean: mean(Object.values(overstrides)),
                std: standardDeviation(Object.values(overstrides)),
            };

            setOverstridingDescriptive(overstriding_descriptive);


        } catch (error) {
            setPopupMessage('Error fetching runners. Please try again later.');
            setShowPopup(true);
        }

    }
    useEffect(() => {

        // fetchRunners();
    }, []);

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
            maps[t]?.y.push(point.y);
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


    const CADENCE_BOUNDARY = 153;
    let colors = [];
    for (let k in cadenceArray) {
        if (cadenceArray[k] > CADENCE_BOUNDARY) {
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

    let overstriding_per_time = {};
    for (let k in overstridingArray) {
        let peak = Math.floor(parseInt(k) / (frames * minute));
        if (!(String(peak) in overstriding_per_time)) {
            overstriding_per_time[String(peak)] = [];
        }
        overstriding_per_time[String(peak)].push(overstridingArray[k]);
    }

    for (let k in overstriding_per_time) {
        let mean = overstriding_per_time[k].reduce((a, b) => a + b, 0) / overstriding_per_time[k].length;
        overstriding_per_time[k] = mean;
    }




    const OVERSTRIDING_BOUNDARY = 7; // Adjust this value as needed
    let overstriding_colors = [];
    for (let k in overstriding_per_time) {
        if (overstriding_per_time[k] > OVERSTRIDING_BOUNDARY) {
            overstriding_colors.push('rgba(255, 0, 0, 0.7)');

        } else {
            overstriding_colors.push('rgba(0, 255, 8, 0.8)');

        }
    }

    const overstridingData = {
        colors: overstriding_colors,
        data: overstriding_per_time,
        title: 'Overstriding',
        labels: { 'x': 'time (min)', 'y': 'Overstride Value' },// Adjust y-label as per your data's unit

    };



    const cadenceData = {
        colors: colors,
        data: cadenceArray,
        title: 'Cadence',
        labels: { 'x': 'time (min)', 'y': 'Steps' }
    };

    const verticalOscillationData = {
        colors: c1_colors,  // Assuming you have defined this
        data: c1,  // Assuming you have defined this
        title: 'Vertical Oscillation',
        labels: { 'x': 'time (min)', 'y': 'Oscillation (cm)' }
    };

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

                {/* <RecentData /> */}
                <div className="flex space-x-4 p-4 bg-zinc-800 justify-center">
                    <TextInput
                        placeholder="Enter name..."
                        // onInputChange={(value) => handleRunnerNameChange(value)}
                        onEnterPress={(newValue) => handleSearchClick(newValue)}
                    />
                    <button
                        className="p-2 bg-blue-500 text-white rounded"
                        onClick={handleSearchClick}
                    >
                        Search
                    </button>
                </div>

                <div className='p-3 grid md:grid-cols-4 grid-cols-1 gap-4'>

                    <div className='grid grid-cols-3 col-span-3' >
                        <div className='col-span-3 flex flex-col'>
                            {/* Data type selector */}
                            <p className='text-black text-bold text-center bg-green-200 p-2 rounded-t' >Data Type</p>

                            <div className="flex border-black bg-gray-100 justify-between space-x-4 pl-20 pr-20">
                                <button
                                    onClick={() => {
                                        setCurrentDataType('vertical oscillation');
                                        setShowVerticalOscillationImage(true);
                                        setShowOverstridingImage(false); // Hide the overstriding image
                                        setShowCadenceImage(false); // Hide the cadence image
                                    }}
                                    className={`p-2 m-2 rounded border bg-blue-400 text-black focus:outline-none focus:ring-2 focus:ring-offset-2 ${currentDataType === 'vertical oscillation' ? 'bg-black text-white' : 'hover:bg-gray-200 '}`}
                                >
                                    Vertical Oscillation
                                </button>

                                <button
                                    onClick={() => {
                                        setCurrentDataType('overstriding');
                                        setShowOverstridingImage(true);
                                        setShowVerticalOscillationImage(false); // Hide the vertical oscillation image
                                        setShowCadenceImage(false); // Hide the cadence image
                                    }}
                                    className={`p-2 m-2 border bg-blue-400 rounded text-black  focus:outline-none focus:ring-2 focus:ring-offset-2 ${currentDataType === 'overstriding' ? 'bg-black text-white' : 'hover:bg-gray-200 '}`}
                                >
                                    Overstriding
                                </button>

                                <button
                                    onClick={() => {
                                        setCurrentDataType('cadence');
                                        setShowCadenceImage(true);  // Show the cadence image
                                        setShowOverstridingImage(false); // Hide the overstriding image
                                        setShowVerticalOscillationImage(false); // Hide the vertical oscillation image
                                    }}
                                    className={`p-2 m-2 border bg-blue-400 text-black rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ${currentDataType === 'cadence' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                                >
                                    {/* Cadence {(cadenceData.data, verticalOscillationData.data, overstridingData.data, `${inputValue} data.csv`)} */}
                                    Cadence
                                </button>
                            </div>
                        </div>






                        <div className="w-full bg-gray-100 md:col-span-2 relative m-auto rounded-lg p-5 mt-2 ">
                            {
                                currentDataType === 'vertical oscillation' ? (
                                    <div className="flex justify-center space-x-2 text-black text-bold" >
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
                                    line={
                                        currentDataType === 'cadence' ? cadenceData.line :
                                            currentDataType === 'vertical oscillation' ? verticalOscillationData.line :
                                                overstridingData.line
                                    }
                                    bars={
                                        currentDataType === 'cadence' ? cadenceData.bars :
                                            currentDataType === 'vertical oscillation' ? verticalOscillationData.bars :
                                                overstridingData.bars
                                    }

                                />
                            )}
                        </div>

                        {/* Information about the runner */}
                        <div className="w-full h-full md:col-span-1 relative m-auto rounded-lg pl-3 pt-2 ">
                            <div >
                                {/* Show Descriptive Data */}
                                <p className='text-bold place-content-center bg-green-200 p-3 rounded-t text-black' >

                                    {currentDataType === 'vertical oscillation' ? 'Vertical Oscillation: It is the up-and-down movement of a runner\'s body during running.' : null}
                                    {currentDataType === 'overstriding' ? 'Overstriding: It is when a runner\'s foot lands too far in front of their body during a stride, often causing inefficient running and potential injury.' : null}
                                    {currentDataType === 'cadence' ? 'Cadence: It is the number of steps you take in one minute.' : null}

                                </p>

                                <div className=" space-y-2 p-2 border-black border ">

                                    <div className='text-bold' >
                                        <div className='flex justify-between bg-pink-400 text-white p-1 lg:p-2 lg:text-sm text-xs'>
                                            Your Performance:
                                        </div>
                                        {currentDataType === 'vertical oscillation' && vo_descriptive.mean !== null ? (
                                            <div className='border text-black text-bold lg:text-base text-xs p-2'>

                                                <p> {`Average: ${vo_descriptive.mean.toFixed(2)} cm`}</p>
                                                <p>{`Standard Deviation: ${vo_descriptive.std.toFixed(2)} cm`}</p>

                                            </div>
                                        ) : null}
                                        {currentDataType === 'overstriding' && overstriding_descriptive.mean !== null ? (
                                            <div className='border lg:text-base text-xs p-2 text-black text-bold'>
                                                <p> {`Average: ${overstriding_descriptive.mean.toFixed(2)}°`}</p>
                                                <p>{`Standard Deviation: ${overstriding_descriptive.std.toFixed(2)}°`}</p>
                                            </div>
                                        ) : null}

                                        {currentDataType === 'cadence' && cadence_descriptive.mean !== null ? (
                                            <div className='border lg:text-base text-xs p-2 text-black text-bold'>
                                                <p> {`Average: ${cadence_descriptive.mean.toFixed(2)} steps/min`}</p>
                                                <p>{`Standard Deviation: ${cadence_descriptive.std.toFixed(2)} steps/min`}</p>
                                            </div>
                                        ) : null}


                                    </div>

                                    <div className='text-bold' >
                                        <div className='flex justify-between bg-pink-400 text-white p-1 lg:p-2 lg:text-sm text-xs'>
                                            Desire Performance:
                                        </div>

                                        {currentDataType === 'vertical oscillation' && vo_descriptive.std !== null ? (
                                            <div className='border lg:text-base text-xs p-2 text-black text-bold'>
                                                <p> {`Optimal Vertical Oscillation: 5 to 10 cm`}</p>
                                            </div>
                                        ) : null}
                                        {currentDataType === 'overstriding' && overstriding_descriptive.std !== null ? (
                                            <div className='border lg:text-base text-xs p-2 text-black text-bold'>
                                                <p> {`Optimal Knee Flexion: 0° to 7°`}</p>
                                            </div>
                                        ) : null}
                                        {currentDataType === 'cadence' && cadence_descriptive.std !== null ? (
                                            <div className='border lg:text-base text-xs p-2 text-black text-bold'>
                                                <p> {`Recomended cadence: 150 to 170 steps/min`}</p>
                                                <p> {`Optimal cadence: >170 steps/min`}</p>
                                            </div>
                                        ) : null}

                                    </div>

                                </div>
                            </div>

                        </div>


                    </div>


                    <div className="w-full ml-2 p-2 h-full  bg-gray-50 md:col-span-1 content-center items-center  m-auto rounded-lg">
                        {showOverstridingImage && (

                            <>
                                <p className='text-black text-bold p-2 bg-green-200 rounded-t' >

                                    {
                                        overstriding_descriptive.mean ? (
                                            <>
                                                Your average overstride is {overstriding_descriptive.mean.toFixed(2)}°,
                                                which is {overstriding_descriptive.mean > 7

                                                    ? 'higher than the optimal knee flexion of 0° to 7°.' : ((overstriding_descriptive.mean <= 7 && overstriding_descriptive.mean >= 0) ? 'optimal.' : 'You are not overstriding good job!.')}
                                            </>
                                        )
                                            : (
                                                "Overstride data is not available."
                                            )
                                    }
                                </p>
                                <Image src="/images/overstriding.png" alt="Picture of the author" width={1000} height={852} />

                                {overstriding_descriptive.mean > 7 ? (
                                    <>
                                        <div className='flex justify-between bg-pink-400 text-white p-2 text-bold'>
                                            Potential Risks:
                                        </div>
                                        <div className='border p-3 text-black text-bold'>
                                            <p>Patellofemoral pain syndrome</p>
                                            <p>Stress on the joints, especially the knees.</p>

                                        </div>
                                    </>
                                ) : (
                                    <div className='flex justify-between bg-green-400 text-white p-2 text-bold'>
                                        Well Done!
                                    </div>
                                )}



                            </>
                        )}

                        {showVerticalOscillationImage && (
                            <div>
                                <p
                                    className='text-black text-bold p-2 bg-green-200 rounded-t'

                                >
                                    {
                                        vo_descriptive.mean ? (
                                            <>

                                                Your average vertical oscillation is {vo_descriptive.mean.toFixed(2)} cm,
                                                which is {vo_descriptive.mean < 5
                                                    ? 'lower than the optimal vertical oscillation of 5 to 10 cm.' : ((vo_descriptive.mean >= 5 && vo_descriptive.mean <= 10) ? 'optimal.' : 'higher than the optimal vertical oscillation of 5 to 10 cm.')}
                                            </>
                                        )

                                            : (
                                                "Vertical oscillation data is not available."
                                            )
                                    }
                                </p>

                                <Image src="/images/verticalOscillation.png" alt="Vertical Oscillation" width={1000} height={852} />

                                {vo_descriptive.mean < 5 || vo_descriptive.mean > 10 ? (

                                    <div>
                                        <div className='flex justify-between bg-pink-400 text-white p-2 text-bold'>
                                            Potential Risks:
                                        </div>
                                        <div className='border p-3 text-black text-bold'>
                                            <p>Energy wasting due to high vertical movements</p>
                                            <p>Stress on the joints.</p>

                                        </div>
                                    </div>
                                ) : (

                                    <div className='flex justify-between bg-green-400 text-white p-2 text-bold'>
                                        Well Done!
                                    </div>
                                )}



                            </div>
                        )}

                        {showCadenceImage && (
                            <div className='grid grid-cols-1'>
                                <p className='text-black text-bold p-2 bg-green-200 rounded-t'>

                                    {
                                        cadence_descriptive.mean ? (
                                            <>
                                                Your cadence is {cadence_descriptive.mean.toFixed(2)} steps/min,
                                                which is {cadence_descriptive.mean < 150
                                                    ? 'lower than the recomended cadence of 150 to 170 steps/min.' : ((cadence_descriptive.mean >= 150 && cadence_descriptive.mean <= 170) ? 'optimal.' : 'higher than 150 to 170 steps/min, which is optimal!.')}
                                            </>
                                        )
                                            : (
                                                "Cadence data is not available."
                                            )}


                                </p>

                                <div className=' h-40 '>
                                    <Runner averageCadence={cadence_descriptive.mean} />
                                </div>

                                {(cadence_descriptive.mean < 150) ? (
                                    <>
                                        <div className='flex justify-between bg-pink-400 text-white p-2 text-bold'>
                                            Potential Risks:
                                        </div>
                                        <div className='border p-3 text-black text-bold'>
                                            <p>Stress on the joints, especially the knees.</p>
                                            <p>Low running performance.</p>

                                        </div>
                                    </>
                                ) : (
                                    <>

                                        <div className='flex justify-between bg-green-400 text-white p-2 text-bold'>
                                            Well Done!
                                        </div>
                                    </>
                                )}


                            </div>

                        )}
                        <div
                            className='flex flex-col justify-between bg-green-400 text-white m-2 p-2 text-bold'
                        >
                            Improvement Tips:

                            <div className='border p-3 text-black text-bold text-xs lg:text-sm'>
                                <p>Increase your cadence (the number of steps per minute).</p>

                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </Sidebar >
    );
}








