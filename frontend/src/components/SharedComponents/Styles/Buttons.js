import React from 'react';
import styled from '@emotion/styled';


export const DeleteButton = styled.button`
    color: red;
    padding: 1rem;

`;


class BtnRender extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isToggled: false
        }
    }

    toggle = () => {
        console.log("toggle")
        this.setState({isToggled: !this.state.isToggled});
    }

    render(){
        const { render } = this.props;
        const { isToggled } = this.state;
        return render({ isToggled: this.state.isToggled, toggle: this.toggle });
    }
}

export default BtnRender;