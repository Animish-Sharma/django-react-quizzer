import axios from 'axios';
import React,{ useEffect,useState } from 'react';
import Header from '../../components/Header';
import "./ResultDetail.scss";
const ResultDetail = ({ match }) => {
    const [result,setResult] = useState({
        test:[],
        response:[]
    })
    const [answer,setAnswer] = useState({
        a:'A',
        b:'B',
        c:"C",
        d:"D"
    })
    const { a,b,c,d } = answer
    useEffect(() =>{
        const fetchDetail = async() =>{
            const config={
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
            }
            const res = await axios.get(`http://localhost:8000/api/results/${match.params.id}/`,config)
            setResult(res.data)
            console.log(res.data)
        }
        fetchDetail();
        
    },[match])

    const sameAns = (res)=> {
        return <div className="res--content-row-card-answers-correct">
            <h2>Correct answer</h2>
            <h4>Your Answer :- {res.user_answer}</h4>
            <h5>Marks Obtained:- {res.question.marks}</h5>            
        </div>
    }
    const diffAns = (res)=> {
        console.log(res)
        return <div className="res--content-row-card-answers-incorrect">
            <h2>Incorrect Answer</h2>
            <h4>Your Answer :- {res.user_answer}</h4>
            <h4>Correct Answer :- {res.answer}</h4>
            <h5>Marks Obtained:- 0</h5>            
        </div>
    }

    const getResult = () =>{
        let list = [];
        let listResult = [];
        result.response.map((res,i)=>{
            return list.push(
                <div key={i} className="res--content-row-card">
                    <div className="image">
                        {res.question.image ? <img width="300" height="200" src={`http://localhost:8000`+res.question.image} alt="Question"/> : null}
                    </div>
                    <h3>{i+1}. {res.question.question}</h3>
                    <h5>Marks:- {res.question.marks}</h5>

                    <div className="res--content-row-card-options">
                        <p>A. {res.question.option_a}</p>
                        <p>B. {res.question.option_b}</p>
                        <p>C. {res.question.option_c}</p>
                        <p>D. {res.question.option_d}</p>

                    </div>
                    <div className="res--content-row-card-answers">
                        {res.user_answer === res.answer ? sameAns(result.response[i]) : diffAns(res)}
                    </div>
                </div>
            )
        })
        for(let i =0; i < list.length; i+= 2){
            listResult.push(
                <div className="res--content-row">
                    <div>
                        {list[i]}
                    </div>
                    <div>
                        {list[i + 1] && list[i+1]}
                    </div>
                </div>
            )
        }
        return listResult
    }
    
    
    return (
        <div className="res">
            <Header title={`Result of ${result.test.name}`} />
            <h2>Result of {result.test.name}</h2>
            <h4>Obtained Marks:- {result.obtained_marks}</h4>
            <h4>Total Marks :- {result.total_marks}</h4>
            <div className="res--content">
                {getResult()}
            </div>
        </div>
    )
}

export default ResultDetail
