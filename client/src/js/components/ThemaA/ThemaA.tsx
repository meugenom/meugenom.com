import * as React from 'react'
import './ThemaA.scss'


interface IState {
    text: String
}
interface IProps {
    match: {
        params: {
            id: number
            }
    }
}


export default class ThemaA extends React.Component< IProps, IState> {

    constructor(props: IProps){
        super(props);        
        this.state = {
            text: ''
        }

    }


    render(){
        return (
            <div>
                <h2>Thema B</h2>                
            </div>
        )
    }
}