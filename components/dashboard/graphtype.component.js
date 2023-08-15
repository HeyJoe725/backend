
function GraphType({ onTypeChange }) {
    return (
        <div className="flex space-x-4">
            <button onClick={() => onTypeChange('scatter')}>
                <img src="/graph-scatter.svg" alt="Scatter Chart" width={24} height={24} />
            </button>
            <button onClick={() => onTypeChange('bar')}>
                <img src="/bar-chart.svg" alt="Bar Chart" width={24} height={24} />
            </button>
        </div>
    );
}

export default GraphType;
