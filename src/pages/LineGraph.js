import React from 'react'
import ReactHighcharts from 'react-highcharts'

export default class LineGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  ids:[], votes:[] }

    }

    componentDidMount() {
        this.recreateChartData();

    }

    recreateChartData() {
        if (this.props.storiesList) {
            const votesArr = [];
            const idArr = [];
          this.props.storiesList.forEach(({ points, objectID }) => {
               votesArr.push(points);
               idArr.push(objectID);
            });
           
            this.setState({ ids:idArr,votes:votesArr,populateGraph:true })
        }
    }

    render() {
        const {votes, ids, populateGraph} = this.state;
        const config = {
            credits: {
                enabled: false
            },
            title: {
                text: null
              },
            xAxis: {
                title: {   
                    text: 'ID'
                },
            categories: ids
            },
            yAxis: {
                title: {
                    text: 'Votes'
                }
            },
            series: [{
                showInLegend: false,    
            data: votes
            }]
        };
        return (
            <>
            {
                populateGraph && (
                    <div
                        style={{
                            height: '300px'
                        }}
                    >
                        <ReactHighcharts  config={config} isPureConfig/>
                    </div>
                )
            }
            </>

        );
    }
}