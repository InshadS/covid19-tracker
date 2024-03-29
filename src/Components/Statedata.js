import React, { Component } from "react";
import { Accordion } from "react-bootstrap";
import axios from "axios";
import Button from "@restart/ui/esm/Button";
class Statedata extends Component {
  constructor() {
    super();
    this.state = {
      stateData: {},
    };
  }
  componentDidMount() {
    axios
      .get("https://data.covid19india.org/state_district_wise.json")
      .then((response) => {
        this.setState({ stateData: response.data });
        console.log(response.data);
      });
  }
  render() {
    let keys = Object.keys(this.state.stateData);
    return (
      <div className="row">
        <div className="col-md-12">
          <Accordion variant="info">
            {keys.map((itm, ky) => {
              let districts = this.state.stateData[itm].districtData;
              let district_keys = Object.keys(districts);
              let total_active = 0;
              let total_confirmed = 0;
              let total_deaths = 0;
              let total_recovered = 0;
              let district_list = [];
              for (let x in districts) {
                total_active += districts[x].active;
                total_confirmed += districts[x].confirmed;
                total_deaths += districts[x].deceased;
                total_recovered += districts[x].recovered;
                let ob = districts[x];
                ob["district_name"] = x;
                district_list.push(ob);
              }
              return (
                <Accordion.Item eventKey={ky}>
                  <Accordion.Header>
                    {itm} :
                    <span className="btn-secondary p-1 m-2">
                      Total Cases - {total_confirmed}
                    </span>
                    <span className="btn-secondary p-1 m-2">
                      Active - {total_active}
                    </span>
                    <span className="btn-secondary p-1 m-2">
                      Recovered - {total_recovered}
                    </span>
                    <span className="btn-secondary p-1 m-2">
                      Death - {total_deaths}
                    </span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <td>District</td>
                          <td>Confirmed</td>
                          <td>Active</td>
                          <td>Recovered</td>
                          <td>Deaths</td>
                        </tr>
                      </thead>
                      <tbody>
                        {district_list.map((itm, ky) => {
                          return (
                            <tr>
                              <td>{itm.district_name}</td>
                              <td>{itm.confirmed}</td>
                              <td>{itm.active}</td>
                              <td>{itm.recovered}</td>
                              <td>{itm.deceased}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>
      </div>
    );
  }
}
export default Statedata;
