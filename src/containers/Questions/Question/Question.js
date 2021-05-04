import React from 'react';
import {Form} from 'react-bootstrap'

import classes from './Question.module.css'

const Question = (props) => {

    // mapeia [opt1, opt2 ... optn] em [<Form.Check label=opt1/>, <Form.Check label=opt2/>, <Form.Check label=opt3/>]
    const options = props.opts.map((opt, opt_i) => {
        return <Form.Check key={props.id+'-'+opt_i.toString()}
                    type="checkbox"
                    label={opt.label}
                    value={opt.value}
                    checked={props.value==opt.value}
                    name="radioTest"
                    id={props.id+'-'+opt_i.toString()}
                    onChange={ (e)=>{
                        props.changed(props.id, opt.value, opt.nextQuestionId, props.value==opt.value)
                    }}
                    //executa a função que já foi preparada no objeto para cada opção
                    //tem que estar dentro de uma arrow function ou seria executada toda hora, mesmo sem ser chamada
                />
    })

    //se props.visible for false, aplica a classe Invisible do CSS na questão (some com ela)
    const appliedClasses = (!props.visible)?[classes.Invisible]:[]

    return (
        <fieldset className={appliedClasses.join(' ')}>
            <Form.Group>
                <h2>{props.id}</h2>
                <p>{props.title}</p>
                {options}
            </Form.Group>
        </fieldset>
    );
};

export default Question;