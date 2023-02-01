import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Radio from "@mui/material/Radio";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import BigBox from "../BigBox"
// import FormControl from '@material-ui/core/FormControl';
import api from "../../services/api";


// const survey = 'https://cornell.ca1.qualtrics.com/jfe/form/SV_dar12FlzjHUHFem'
const queryParams = () => {
    return new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
}

function RatingScale(props) {
    const change = (index, value) => {
        props.onChange(index, value);
    };

    return props.values.map((item, i) => {
        return (
            <FormControlLabel
                key={i}
                value={item.value}
                required={!!props.required}
                control={
                    <Radio
                        onChange={() => change(props.question, item.value)}
                        checked={props.value === item.value}
                        value={item.value}
                    />
                }
                label={item.label}
                labelPlacement="end"
            />
        );
    });
}

class Brief extends Component {

    state = {
        brief: [],
        checked: [],
        done: false,
        error: false
    };

    componentDidMount() {
        const { task } = this.props;

        const { discussion_id, lang } = queryParams();

        return api
            .post('/brief', { taskId: task.id, discussion_id, lng: lang })
            .then((brief) => {
                this.setState({ brief });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    handleToggle = (index, value) => {
        const { checked } = this.state;
        const newChecked = [...checked];

        newChecked[index] = value;

        this.setState({ checked: newChecked });
    };

    saveBrief = (e) => {
        e.preventDefault();

        const { brief, checked } = this.state;
        const { task } = this.props;
        const { discussion_id, artifactId } = queryParams();

        const data = {
            taskId: task.id,
            artifactId
        }

        let isValid = true;
        data.brief = brief.map((item, i) => {

            // make sure all answers are aselected
            isValid = isValid && typeof checked[i] !== 'undefined'
            return {
                discussion_id,
                content: item,
                isValid: checked[i],
            };
        });
        if (!isValid) {
            this.setState({ error: 'answers' })
        }
        else {

            return api
                .patch(`/brief`, data)
                .then(() => api.patch(`tasks/${task.id}`, { status: 'done' }))
                .then(() => this.setState({ done: true }))
                .catch((error) => {
                    console.error(error);
                });
        }
        return false;

    };

    render() {
        const { brief, checked, done, error } = this.state;
        const { t} = this.props;

        if (done) {
            window.location.href = `/`;
            return <>Thank you<a href={`/`}>Go to survey</a></>
        }
        return (
            <>
                {!brief[0] && <CircularProgress />}

                {brief[0] && (

                    <BigBox
                        headline={t("Design requirement / Feeback")}
                        secondary={t("Summary")}
                        description={t("This is a list of high-level issues that I understood from our conversation. Please mark which issues I wrote correctly so I can send them to the designers. Incorrect items will be discarded.")}
                    >
                        <form onSubmit={this.saveBrief}>
                            {brief.map((item, i) => {
                                return (
                                    <div key={i} style={{ display: "flex" }}>

                                        <div style={{ flex: 1, marginTop: 8, marginBottom: 8 }}>{item}</div>


                                        <RatingScale
                                            values={[
                                              
                                                {
                                                    label: t("Correct"),
                                                    value: 1
                                                },
                                                {
                                                    label: t("Incorrect"),
                                                    value: 0
                                                },
                                            ]}
                                            required={true}
                                            name={"rating"}
                                            value={checked[i]}
                                            question={i}
                                            onChange={this.handleToggle}
                                        />
                                    </div>
                                );
                            })}

                            {error === 'answers' && <Alert severity="warning">{t("You missed some items")}</Alert>}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary">{t("Done")}</Button>
                        </form>

                    </BigBox>
                )
                }
            </>
        );
    }
}

Brief.propTypes = {
    task: PropTypes.object.isRequired,
    artifactId: PropTypes.number.isRequired,
    t: PropTypes.func.isRequired
};


export default withTranslation()(Brief)