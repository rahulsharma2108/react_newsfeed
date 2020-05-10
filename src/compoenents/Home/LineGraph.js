import React from "react";
import ReactHighcharts from "react-highcharts";

export default class LineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = { populateGraph: false };
  }

  componentDidMount() {
    this.setState({ populateGraph: true });
  }

  recreateChartData(storiesList) {
    if (storiesList) {
      const votesArr = [];
      const idArr = [];
      this.props.storiesList.forEach(({ points, objectID, hideStory }) => {
        if (hideStory == undefined) {
          votesArr.push(points);
          idArr.push(objectID);
        }
      });
      return { votes: votesArr, ids: idArr };
    }
  }

  render() {
    const { populateGraph } = this.state;
    const { storiesList } = this.props;
    const { votes, ids } = this.recreateChartData(storiesList);
    const config = {
      credits: {
        enabled: false,
      },
      title: {
        text: null,
      },
      xAxis: {
        title: {
          text: "ID",
        },
        categories: ids,
      },
      yAxis: {
        title: {
          text: "Votes",
        },
      },
      series: [
        {
          showInLegend: false,
          data: votes,
        },
      ],
    };
    return (
      <>
        {populateGraph && storiesList && (
          <div
            style={{
              height: "300px",
            }}
          >
            <ReactHighcharts config={config} />
          </div>
        )}
      </>
    );
  }
}
