import React, { useEffect } from "react";
import Chart from "chart.js/auto"
import '../styles/ChartBar.css';

const ChartBar: React.FC = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (ctx) {
            const myChart = new Chart(ctx, {

                type: 'bar',
                data: {
                    labels: ['네이버', '구글', '유튜브', '카카오', '인스타그램'],
                    datasets: [{
                        label: '온라인 마케팅 점수',
                        data: [70, 50, 40, 20, 10],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                        ],
                        borderWidth: 2
                    }]                
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                },

            })
            return () => {
                myChart.destroy();
            }
        }

    }, [])

    return (
        <div className="chart-bar-container">
            <canvas ref={canvasRef} width={400} height={350}></canvas>
        </div>
        
    )
}

export default ChartBar;