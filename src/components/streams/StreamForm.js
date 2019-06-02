import React from 'react';
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component{
    renderError ({error, touched}){
        if(touched && error){
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }
    renderInput = ({input, label, meta}) => {
        // return <input onChange={formProps.input.onChange} value={formProps.input.value} />;
        // console.log(meta);
        const className=`field ${meta.error && meta.touched ? 'error':''}`;
        return ( 
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>

        );
    }

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }

    render(){
        // console.log(this.props);
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <Field name="title" component={this.renderInput} label="Enter Title" />
                    <Field name="description" component={this.renderInput} label="Description" />
                    <button className="ui button primary" text="submit">Submit</button>
                </form>
            </div>
        );
    }  
}

const validate = (formValues) => {
    const errors={};

    if(!formValues.title){
        errors.title="There is no title"
    }

    if(!formValues.description){
        errors.description = "Invalid description"
    }

    return errors;
}


// Way 1
// export default connect() ( reduxForm({
//     form:'Create Stream',
//     validate: validate
// })(StreamCreate));

export default reduxForm({
    form: 'Stream Form',
    validate:validate
})(StreamForm);

// export default connect(null, {createStream})(formWrapped);