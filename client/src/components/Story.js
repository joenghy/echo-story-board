import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Chart from 'chart.js/auto';
import useFetch from '../libs/useFetch';
import 'chartjs-adapter-date-fns';

const Story = () => {
    const { storyTitle } = useParams();

    const uri = `http://localhost:8080/api/story/${storyTitle}.png`;
    const downloadUri = `http://localhost:8080/api/story/download/${storyTitle}.png`;
    const statUri = `http://localhost:8080/api/story/stat/${storyTitle}.png`;

    const { error, isPending, data: stat } = useFetch(statUri);

    const downloadStory = () => {
        const a = document.createElement("a");
        a.href = downloadUri;
        a.download = (storyTitle ? storyTitle : "story") + ".png";
        a.click();
    };

    useEffect(() => {
        if (!stat) {
            return;
        }

        if (window.myChart instanceof Chart) {
            window.myChart.destroy();
        }

        // setup
        const data = {
            datasets: [
                {
                    label: "# of Views",
                    data: Object.entries(stat.views).map(entry => {
                        return { x: entry[0], y: entry[1] };
                    }),
                    backgroundColor: [
                        "red"
                    ],
                    borderColor: [
                        "red"
                    ],
                    borderWidth: 1
                },
                {
                    label: "# of Downloads",
                    data: Object.entries(stat.downloads).map(entry => {
                        return { x: entry[0], y: entry[1] };
                    }),
                    backgroundColor: [
                        "purple"
                    ],
                    borderColor: [
                        "purple"
                    ],
                    borderWidth: 1
                }
            ]
        };
        // config
        const config = {
            type: "line",
            data,
            options: {
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: false,
                        type: "time",
                        time: {
                            unit: "day"
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
        // render
        window.myChart = new Chart(document.getElementById("myChart"), config);
    });

    return (
        <div className="story-details">
            {error && <div>{error}</div>}
            {<header className="header">
                <h1>{storyTitle}</h1>
                <button className="download-button" onClick={downloadStory}>Download</button>
            </header>}
            {isPending && <div className="loading">Loading...</div>}
            {stat && <div><img src={uri}></img></div>}
            {stat && <div className="chart-box">
                <canvas id="myChart"></canvas>
            </div>}
        </div>
    );
};

export default Story;