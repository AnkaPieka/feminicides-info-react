import React, { PureComponent } from "react";
import apiHandler from "../../api/apiHandler";
import pattern from "patternomaly";
const Chart = require("chart.js");

export default class CondamnationChart extends PureComponent {
  state = {
    condemned: [],
    notCondemned: [],
    ongoing: [],
    suicide: [],
    nonRens: []
  };

  node = React.createRef(null);
  chart = React.createRef(null);

  componentDidMount() {
    apiHandler
      .dataAllEvents()
      .then((events) => {
        let condamnation = events.map((event) => event.condemned);

        function giveArrayLength(array, value) {
          return array.filter((elem) => elem === value).length;
        };

        let condemned = giveArrayLength(condamnation, "condamné");
        let notCondemned = giveArrayLength(condamnation, "non condamné")
        let ongoing = giveArrayLength(condamnation, "en cours");
        let suicide = giveArrayLength(condamnation, "suicide après acte");
        let nonRens = giveArrayLength(condamnation, "non renseigné");

        this.setState({
          condemned: condemned,
          notCondemned: notCondemned,
          ongoing: ongoing,
          suicide: suicide,
          nonRens: nonRens,
        });

        let condamnationChart = new Chart(this.node.current, {
          type: "bar",
          data: {
            labels: [
              "Statut judiciaire de l'assassin ou de l'assassin présumé",
            ],
            datasets: [
              {
                label: "Condamné",
                data: [this.state.condemned],
                backgroundColor: pattern.draw("square", "thistle"),
              },
              {
                label: "Non condamné",
                data: [this.state.notCondemned],
                backgroundColor: pattern.draw("disc", "plum"),
              },
              {
                label: "En cours",
                data: [this.state.ongoing],
                backgroundColor: pattern.draw("cross", "orchid"),
              },
              {
                label: "Suicide après acte",
                data: [this.state.suicide],
                backgroundColor: pattern.draw("line", "purple"),
              },
              {
                label: "Non renseigné",
                data: [this.state.nonRens],
                backgroundColor: "lightgrey",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            animation: {
              duration: 2000,
              easing: 'easeInQuad'
            },
            title: {
              display: true,
              position: 'bottom',
              fontSize: 18,
              fontFamily: "Lato",
              text: 'Statut judiciaire des coupables ou assassins présumés - 2021'
            }
          }
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    if (this.state.nonRens === []) {
      return <div>Chargement en cours</div>;
    }

    return (
      <div className="chart">
        <canvas style={{ width: 800, height: 400 }} ref={this.node} />
      </div>
    );
  }
}
