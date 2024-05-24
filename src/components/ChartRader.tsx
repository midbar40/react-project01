import React from "react";
import Chart from 'chart.js/auto';
import '../styles/ChartRader.css';

const ChartRader:React.FC = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if(ctx){
            const myChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['네이버', '구글', '유튜브', '카카오', '인스타그램'],
                    datasets: [{
                        label: '온라인 마케팅 점수',
                        data: [90, 70, 80, 50, 60],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        r: {
                            beginAtZero: true
                        }
                    }
                }
            });
            return () => {
                myChart.destroy();
            }
        }
    }, []);

    return(
        <div className="chart-rader-container">
            <canvas ref={canvasRef} width={400} height={350}></canvas>
        </div>
    )
}

export default ChartRader;