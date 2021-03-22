import React, { useState } from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import './sign-up-form.scss'

const SignUpForm = ({ ...props }) => {

    const [email, setEmail] = useState("");
    const [response, setResponse] = useState("");
    const [isValid, setIsValid] = useState(false);

    const onSubmit = async (e) => {
        // Stops the page refreshing
        e.preventDefault()

        const response = await addToMailchimp(email, {

        });

        if (response.result === "error") {
            setResponse(response.msg);
            setIsValid(false);
        } else {
            setResponse("Thank you for signing up - we'll collect your soul within 6-9 working days");
            setIsValid(true);
        }
    };

    return (
        <form className="signup-form" onSubmit={c => onSubmit(c)}>
            <div className="header-container">
                <h4>Sign up</h4>
                <p>It's quick, it's easy and it's free</p>
            </div>
            <div className="values-container">
                <label htmlFor="emailInput">Email:</label>
                <input id="emailInput" type="text" onChange={e => setEmail(e.target.value)} />
                <button type="submit">Submit</button>
            </div>
            {response.length > 0 &&
                <div className={`response-container`}>
                    <p className={`${isValid ? "valid" : "invalid"}`}>{response}</p>
                </div>
            }
        </form>
    )
}

export default SignUpForm;