import React from 'react'


const signupPage = () => {
    return (
        <div className="page-wrapper bg-gra-03 p-t-45 p-b-50">
            <div className="wrapper wrapper--w790">
                <div className="card card-5">
                    <div className="card-heading">
                        <h2 className="title">Registration Form</h2>
                    </div>
                    <div className="card-body">
                        <form >
                            <div className="form-row m-b-55">
                                <div className="name">Name</div>
                                <div className="value">
                                    <div className="row row-space">
                                        <div className="col-2">
                                            <div className="input-group-desc">
                                                <input
                                                    className="input--style-5"
                                                    type="text"
                                                    name="first_name"
                                                />
                                                <label className="label--desc">first name</label>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="input-group-desc">
                                                <input
                                                    className="input--style-5"
                                                    type="text"
                                                    name="last_name"
                                                />
                                                <label className="label--desc">last name</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="name">Company</div>
                                <div className="value">
                                    <div className="input-group">
                                        <input className="input--style-5" type="text" name="company"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="name">Email</div>
                                <div className="value">
                                    <div className="input-group">
                                        <input className="input--style-5" type="email" name="email"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row m-b-55">
                                <div className="name">Phone</div>
                                <div className="value">
                                    <div className="row row-refine">
                                        <div className="col-3">
                                            <div className="input-group-desc">
                                                <input
                                                    className="input--style-5"
                                                    type="text"
                                                    name="area_code"
                                                />
                                                <label className="label--desc">Area Code</label>
                                            </div>
                                        </div>
                                        <div className="col-9">
                                            <div className="input-group-desc">
                                                <input
                                                    className="input--style-5"
                                                    type="text"
                                                    name="phone"
                                                />
                                                <label className="label--desc">Phone Number</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="name">Subject</div>
                                <div className="value">
                                    <div className="input-group">
                                        <div className="rs-select2 js-select-simple select--no-search">
                                            <select name="subject">
                                                <option disabled="disabled" selected="selected">
                                                    Choose option
                                                </option>
                                                <option>Subject 1</option>
                                                <option>Subject 2</option>
                                                <option>Subject 3</option>
                                            </select>
                                            <div className="select-dropdown"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row p-t-20">
                                <label className="label label--block">
                                    Are you an existing customer?
                                </label>
                                <div className="p-t-15">
                                    <label className="radio-container m-r-55">
                                        Yes
                                        <input type="radio" defaultChecked="checked" name="exist"/>
                                        <span className="checkmark"/>
                                    </label>
                                    <label className="radio-container">
                                        No
                                        <input type="radio" name="exist"/>
                                        <span className="checkmark"/>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <button className="btn btn--radius-2 btn--red" type="submit">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default signupPage;