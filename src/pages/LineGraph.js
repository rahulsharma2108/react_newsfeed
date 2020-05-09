// import React from 'react'
// import { Chart } from 'react-charts'

// export default class LineGraph extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { mapData: [] }

//     }

//     componentDidMount() {
//         this.recreateChartData();

//     }

//     recreateChartData() {
//         if (this.props.storiesList) {
//             const mapData = this.props.storiesList.map(({ points, objectID }) => {
//                 return [objectID, points];
//             });
//             console.log('map data', mapData);
//             this.setState({ mapData })
//         }
//     }

//     render() {
//         const data = [
//             {
//                 label: 'Upvotes',
//                 data: this.state.mapData
//             }
//         ];

//         const axes = [
//             { primary: true, type: 'linear', position: 'bottom' },
//             { type: 'linear', position: 'left' }
//         ];
//         return (
//             {
//                 this.state.populateGraph && (
//                     <div
//                         style={{
//                             height: '300px'
//                         }}
//                     >
//                         <Chart data={data} axes={axes} />
//                     </div>
//                 )
//             }

//         );
//     }
// }