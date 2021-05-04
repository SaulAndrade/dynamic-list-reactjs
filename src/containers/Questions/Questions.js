import React, {useState, useEffect} from 'react';
import {Form} from 'react-bootstrap'
import Question from './Question/Question'

import classes from './Questions.module.css'

const Questions = (props) => {

  const [q4, setQ4] = useState({
    id: 'q4',
    title: 'Última do exemplo',
    opts: [
            {
              value: 0,
              label: 'opt1',
              nextQuestionId: false 
            },
            {
              value: 1,
              label: 'opt2',
              nextQuestionId: false 
            },
            {
              value: 2,
              label: 'opt3',
              nextQuestionId: false 
            },
            {
              value: 3,
              label: 'opt4',
              nextQuestionId: false 
            }
    ],
    value: null,
    next: false,
    visible: false,
    valid: false,
    touched: false
  })

  const [q3, setQ3] = useState({
    id: 'q3',
    title: 'Pediu pra sair?',
    opts: [
            {
              value: 0,
              label: 'sim',
              nextQuestionId: false 
            },
            {
              value: 1,
              label: 'não',
              nextQuestionId: 'q4'
            }
    ],
    value: null,
    next: false,
    visible: false,
    valid: false,
    touched: false
  })

  const [q2, setQ2] = useState({
    id: 'q2',
    title: 'Quando aconteceu?',
    opts: [
            {
              value: 0,
              label: 'ontem',
              nextQuestionId: 'q3' 
            },
            {
              value: 1,
              label: 'há mais de 1 semana',
              nextQuestionId: 'q4' 
            }
    ],
    value: null,
    next: false,
    visible: false,
    valid: false,
    touched: false
  })

  const [q1, setQ1] = useState({
      id: 'q1',
      title: 'O que aconteceu?',
      opts: [
              {
                value: 0,
                label: 'foi isso',
                nextQuestionId: 'q2'
              },
              {
                value: 1,
                label: 'foi isso aqui',
                nextQuestionId: 'q2'
              },
              {
                value: 2,
                label: 'ah opa, foi isso',
                nextQuestionId: 'q2'
              }
      ],
      value: null,
      next: false,
      visible: true,
      valid: false,
      touched: false
  })

  const questions = [
    {
      id: 'q1',
      var: q1, 
      setter: setQ1
    },
    {
      id: 'q2',
      var: q2, 
      setter: setQ2
    },
    {
      id: 'q3',
      var: q3, 
      setter: setQ3
    },
    {
      id: 'q4',
      var: q4, 
      setter: setQ4
    }
  ]

  //esse é um conceito avançado chamado função recursiva. 
  //E uma função que chama a si mesma até atingir uma condição de parada.
  //No caso, tô usando pra navegar todas as "próximas" questões possíveis e as "próximas das prõximas" e assim 
  //sucessivamente até atingir o fim da árvore  de questões

  //Resumidamente eu olho uma lista de ids de questão e filtro os 'false'. Se não sobrar nada, a execução termina
  //essa é a condição de parada
  //caso contrário eu escondo a próxima questão de cada elementos da lista e executo isso para suas possíveis
  //próximas questões com a recursão
  const hideQuestions = (qIdList) => {
    const idList = qIdList.filter((qId => qId!==false))
    if (idList.length == 0){
      return true
    }

    idList.forEach(qId => {
      const questionToHide = questions.filter ( q => q.id==qId )[0]
      questionToHide.setter( { ...questionToHide.var, visible: false, value: null} )

      const newIdList = questionToHide.var.opts.map(opt=>opt.nextQuestionId)
      hideQuestions(newIdList)
    })
  }

  //função que executa toda vez que um radioButton mudar
  const updateQuestion = (currentQuestionId, selectedValue, nextQuestionId, checked) => {
    //atualizando o valor da questao para o selecionado
    const currentQuestion = questions.filter( q => q.id === currentQuestionId )[0]

    //escondendo todas as possíveis próximas questões, 1o localizo todas as próximas que não são 'false'
    const questionsToHide = currentQuestion.var.opts.map(opt => opt.nextQuestionId)
    hideQuestions(questionsToHide)
  
    let currentQuestionState = { 
                                    ...currentQuestion.var, 
                                    value: selectedValue,
                                    next: (nextQuestionId)?true:false
                                  }

    //nesse caso estaríamos desmarcando a opção que já está marcada
    if(checked){
      currentQuestionState = { 
                                ...currentQuestion.var, 
                                value: null,
                                next: false
                              }
    }

    //efetivando as mudanças no state
    currentQuestion.setter(currentQuestionState)

    //tornando a próxima questão visível, se houver
    if (nextQuestionId){
      const nextQuestion = questions.filter( q => q.id === nextQuestionId )[0]

      let nextQuestionState = { 
                                ...nextQuestion.var, 
                                visible: true 
                              }

      //novamente lidando com desmarcar a opção
      if(checked){
        nextQuestionState = { 
                              ...nextQuestion.var,
                              value: null,
                              visible: false 
                            }
      }
      //efetivando as mudanças no state                          
      nextQuestion.setter(nextQuestionState)
    }
  }

  //mesma coisa aqui, vai mapear [q1, q2 .. qn] em [<Question q1 />, <Question q2 /> ... <Question qn />]
  const mappedQuestions = questions.map(q => {
    return <Question key={q.var.id}
              id={q.var.id}
              title={q.var.title}
              opts={q.var.opts}
              value={q.var.value}
              visible={q.var.visible}
              changed = {updateQuestion}
            />
  })

  return (
      <Form>
          {mappedQuestions}
      </Form>
  );
};

export default Questions;