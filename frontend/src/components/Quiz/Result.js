import React,{ useState,useEffect } from 'react'
import "./Result.scss"
import axios from 'axios';
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom';
const Result = () => {
    const history = useHistory()
    const [results,setResults] = useState({
        results:[]
    })
    useEffect(()=>{
        async function fetch(){
            const config={
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
            }
            const result = await axios.get("http://localhost:8000/api/results/",config)
            console.log(result.data)
            setResults(result.data)
        }
        fetch()
    },[history])
    const next = async (e) =>{
        e.preventDefault()
        const config={
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }
        const result = await axios.get(results.next,config)
        console.log(result.data)
        setResults(result.data)
    }
    const previous = async (e) =>{
        e.preventDefault()
        const config={
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }
        const result = await axios.get(results.previous,config)
        console.log(result.data)
        setResults(result.data)
    }
    
    const calcPercentage = (om,tm) =>{
        if(results){
            let resultPer = Number(om) * 100 / Number(tm);
            return resultPer.toFixed(2)
        }
    }

    const getResult = () =>{
        let list = [];
        let listResult = [];

        results.results.map(result=>{
            return list.push(
                <div onClick={()=>history.push(`/result/${result.id}`)} key={result.id} className="result--list-card">
                    <h3>Name of the Test:- {result.test.name}</h3>
                    <h5>Obtained Marks:- {result.obtained_marks}</h5>
                    <h5>Total Marks:- {result.total_marks}</h5>
                    <h5>Percentage:- {calcPercentage(result.obtained_marks,result.total_marks)}%</h5>
                    <p>User:- {result.user}</p>
                </div>
            )
        })
        for(let i =0; i < list.length; i+=2){
            listResult.push(
                <div key={i} className="result--list">
                    <div>
                        {list[i]}
                    </div>
                    <div>
                        {list[i+1] ? list[i+1] : null}
                    </div>
                </div>
            )
        }
        return listResult
    }
    const noResult = (
        <div className="result--no">
            <img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/empty_xct9.svg" alt="Nothing" />
            <h3>No Result Found</h3>
            <p>I am sorry, But it looks like there is no result. Finish some of the quizzes to see your results.</p>
        </div>
    )
    return (
        <div className="result">
            <Helmet>
                <title>Results</title>
            </Helmet>
            <h1>{results.results.length > 1 ? 'Results' : "Result"}</h1>
            <p>All your results will be displayed here</p>
            { results.results.length >= 1 ? getResult() : noResult}

            <div className="result--navigation">
                {results.previous ? <button onClick={e=>previous(e)}>Previous</button> : null}
                {results.next ? <button onClick={(e)=>next(e)}>Next</button> : null}
            </div>
        </div>
    )
}

export default Result
