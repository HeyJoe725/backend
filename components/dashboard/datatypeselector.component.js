// // components/dashboard/DataTypeSelector.js
// import GraphType from '../../components/dashboard/graphtype.component'


// function DataTypeSelector({ setCurrentDataType }) {

//     return (
//         <div className="flex flex-col space-y-4 p-4 border rounded">
//             <p>Graph Type</p>

//             <GraphType
//                 onTypeChange={(type) => setShowScatter(type === 'scatter')}
//             />

//             <p>Data Type</p>

//             <button
//                 onClick={() => setCurrentDataType('vertical oscillation')}
//                 className="p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//                 Vertical Oscillation
//             </button>
//             <button
//                 onClick={() => setCurrentDataType('overstriding')}
//                 className="p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//                 Overstriding
//             </button>
//             <button
//                 onClick={() => setCurrentDataType('cadence')}
//                 className="p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//                 Cadence
//             </button>
//         </div>

//     );
// }

// export default DataTypeSelector;
