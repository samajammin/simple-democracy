import { drizzleConnect } from 'drizzle-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// TODO handle transaction errors? i.e. rejected require statements
class ContractForm extends Component {
  constructor(props, context) {
    super(props);

    this.contract = context.drizzle.contracts.SimpleDemocracy;
    this.inputs = [];
    this.state = {};

    const abi = this.contract.abi;
    // Iterate over abi for correct function.
    for (let i = 0; i < abi.length; i++) {
      if (abi[i].name === this.props.method) {
        this.inputs = abi[i].inputs;

        for (let j = 0; j < this.inputs.length; j++) {
          this.state[this.inputs[j].name] = '';
        }

        break;
      }
    }
  }

  handleSubmit = () => {
    const method = this.contract.methods[this.props.method];
    method.cacheSend(...Object.values(this.state), {
      from: this.props.account
    });

    // clear inputs after submission
    const inputs = Object.keys(this.state);
    const freshState = inputs.reduce((res, input) => {
      // TODO better way to clear booleans...?
      if (typeof this.state[input] === 'boolean') {
        return res;
      }
      res[input] = '';
      return res;
    }, {});
    this.setState(freshState);
  };

  handleInputChange = event => {
    let value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;

    // if integer, parseInt
    if (/^\d+$/.test(value)) {
      value = parseInt(value);
    }
    this.setState({ [event.target.name]: value });
  };

  translateType(type) {
    switch (true) {
      case /^uint/.test(type):
        return 'number';
      case /^string/.test(type) || /^bytes/.test(type):
        return 'text';
      case /^bool/.test(type):
        return 'checkbox';
      default:
        return 'text';
    }
  }

  render() {
    return (
      <form className="sd-form">
        {this.inputs.map((input, index) => {
          let element;
          let inputType = this.translateType(input.type);
          let inputLabel = this.props.labels
            ? this.props.labels[index]
            : input.name;
          // check if input type is struct and if so loop out struct fields as well

          if (input.name === 'electionId') {
            let electionOptions = [];

            for (let i = 1; i <= this.props.electionCount; i++) {
              electionOptions.push(i);
            }
            element = (
              <div className="sd-dropdown-container">
                <label className="sd-label">Election ID:</label>
                <select onChange={this.handleInputChange} name="electionId">
                  {electionOptions.map(i => {
                    {
                      /* TODO key issue https://fb.me/react-warning-keys */
                    }
                    const optionKey = `election-id-${i}`;
                    return (
                      <option key={optionKey} value={i}>
                        {i}
                      </option>
                    );
                  })}
                </select>
              </div>
            );
          } else {
            element = (
              <input
                className="sd-text-input"
                key={input.name}
                type={inputType}
                name={input.name}
                value={this.state[input.name]}
                placeholder={inputLabel}
                onChange={this.handleInputChange}
              />
            );
          }

          if (inputType === 'checkbox') {
            // return checkbox input wrapped in a label
            return (
              <label className="sd-label" key="checkbox">
                {inputLabel}:{element}
              </label>
            );
          } else {
            return element;
          }
        })}
        <button
          key="submit"
          className="pure-button"
          type="button"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </form>
    );
  }
}

ContractForm.contextTypes = {
  drizzle: PropTypes.object
};

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  };
};

export default drizzleConnect(ContractForm, mapStateToProps);
