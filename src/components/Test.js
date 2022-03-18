import React from "react";

class Test extends React.Component{
    render(){
        return(
            <div className={`alert alert-${this.props.bgColor}`}>
                {this.props.label}<br />
                <button className={`btn btn-${this.props.btnColor}`}>
                    {this.props.btnlabel}
                </button>
            </div>
        );
    }
}
export default Test