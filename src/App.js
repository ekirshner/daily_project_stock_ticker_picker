import React, { Component } from 'react';
import './App.css';
import { Sparklines, SparklinesLine } from 'react-sparklines';

//Use this to connect redux and react
import { connect } from 'react-redux';

//Import the action
import { trackCompanyAction } from './actions';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textBoxValue: "",
      searchedCompanyArr: [],
    }
  }

  handleSearchBoxText(event) {
    this.setState({
      textBoxValue: event.target.value,
    }, () => {
      this.searchCompanies()
    });
  }

  searchCompanies() {
    fetch('https://young-plains-68972.herokuapp.com/api/autocomplete?q=' + this.state.textBoxValue)
      .then(res => res.json())
      .then(response => {
        this.setState({
          searchedCompanyArr: response,
        });
      })
  }

  render() {
    let hidden = true;

    if (this.props.trackedCompanies.length > 0) {
      hidden = false;
    }

    const searchedCompanies = this.state.searchedCompanyArr.map((company, index) => {
      return <li onClick={() => this.props.trackCompany(company)} key={ index }> { company.name } </li>
    })

    const trackedCompanies = this.props.trackedCompanies.map((trackedCompany, index) => {
      return <li className="tracked-li" key={ index }> 
             { trackedCompany.name } ({ trackedCompany.ticker }) 
             <Sparklines data={trackedCompany.prices} width={140} height={40} margin={5}>
             <SparklinesLine color="green" />
             </Sparklines></li>
    })



    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Stock Ticker Picker Project</h1>
        </header>

      <div className="container-div">
        <div className="search-section">
          <input type="text" value={this.state.textBoxValue} placeholder="Search Companies.."
            onChange={(event) => this.handleSearchBoxText(event)} />

          <ul>
            {searchedCompanies}
          </ul>
        </div>

        <div className="graph-section">
          <h3 hidden={ hidden }> Currently Tracking </h3>
          <ul>
            {trackedCompanies}
          </ul>
        </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    trackedCompanies: state.trackedCompanies
  };
}


function mapDispatchToProps(dispatch) {
  return {
    trackCompany: function (event) {
      fetch('https://young-plains-68972.herokuapp.com/api/companies/' + event.ticker)
        .then(res => res.json())
        .then(response => {

          const action = trackCompanyAction(response);
          dispatch(action);
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
