import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from '@material-ui/core/Button';

// import FormControl from '@material-ui/core/FormControl';
import api from "../../lib/api";

import "./Brief.css";

function RatingScale(props) {
  const change = (index, value) => {
    props.onChange(index, value);
  };

  return props.values.map((item, i) => {
    return (
      <FormControlLabel
        key={i}
        value={item}
        control={
          <Radio
            onChange={() => change(props.question, item)}
            checked={props.value === item}
            value={item}
          />
        }
        label={item}
        labelPlacement="bottom"
      />
    );
  });
}

export default class Brief extends Component {
  state = {
    brief: [],
    checked: [],
    done: false,
  };

  componentDidMount() {
    const { discussion_id } = this.props;

    return api
      .get(`/brief?discussion_id=${discussion_id}`)
      .then((response) => {
        this.setState({ brief: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleToggle = (index, value) => {
    console.log(index, value);
    const { checked } = this.state;
    const newChecked = [...checked];

    newChecked[index] = value;

    this.setState({ checked: newChecked });
  };

  saveBrief = () => {
    const { brief, checked } = this.state;
    const { discussion_id } = this.props;
    const data = brief.map((item, i) => {
      return {
        discussion_id,
        content: item,
        isValid: checked[i],
      };
    });
    return api
      .post(`/brief`, data)
      .then(() => {
        this.setState({ done: 1 });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { discussion_id } = this.props;
    const { brief, checked, done } = this.state;

    return (
      <div className="brief">
        {!done && (
          <div>
            <h5>
              This is the generated requirements list. Please mark which
              requirements are correct or incorrect.
            </h5>

            {brief[0] && (
              <Fragment>
                <ul>
                  {brief.map((item, i) => {
                    return (
                      <li key={i}>
                        <p>
                          <strong>{item}</strong>
                        </p>

                        <RatingScale
                          values={[
                            "Strongly disagree",
                            "Disagree",
                            "Undecided",
                            "Agree",
                            "Strongly agree",
                          ]}
                          name={"rating"}
                          value={checked[i]}
                          question={i}
                          onChange={this.handleToggle}
                        />
                      </li>
                    );
                  })}
                </ul>
                <ul>
                  <li>  
                  <Button 
                 variant="contained"
                 color="primary"
                onClick={() => this.saveBrief()}>Finish</Button>
                  </li>
                </ul>
               
              </Fragment>
            )}
          </div>
        )}

        {!brief[0] && <CircularProgress />}

        {done && (
          <div>
            <h3>Copy the following CODE:</h3>
            <h1>{discussion_id}</h1>
          </div>
        )}
      </div>
    );
  }
}

Brief.propTypes = {
  discussion_id: PropTypes.number.isRequired,
};
