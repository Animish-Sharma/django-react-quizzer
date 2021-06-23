import axios from 'axios';
import React,{ useState,useEffect } from 'react';
import "./Tests.scss";
import Head from '../../components/Header';
const Tests = ({ history }) => {
    const [tests,setTests] = useState({
        results:[]
    })
    useEffect(()=>{
        async function fetchData() {
            const config = {
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
            }
            const res = await axios.get("http://localhost:8000/api/tests/",config);
            console.log(res.data);
            setTests(res.data);
        }
        fetchData()
    },[history])
    function getTests() {
        let list = [];
        let listResult = [];
        tests.results.map((test) => {
            return list.push(
                <div key={test.id} className="tests--row-card">
                    <h2>{test.name}</h2>
                    <h4>Total Marks :- {test.total_marks}</h4>
                    <h4>Published By:- {test.user}</h4>
                    <h5>Total Questions :- {test.total_questions}</h5>
                    <button onClick={()=> history.push(`/test/${test.slug}`)}>Start Test</button>
                </div>
            )
        });
        for(let i = 0; i < list.length; i+= 3){
            listResult.push(
                <div key={i} className="tests--row">
                    <div className={list[i] ? "item-1" : null}>
                        {list[i]}
                    </div>
                    <div className={list[i+1] && list[i] ? "-2" : null}>
                        {list[i+1] ? list[i+1] : null}
                    </div>
                    <div>
                        {list[i+2] ? list[i+2] : null}
                    </div>
                </div>
            );
        }
        return listResult;
    }
    const next = async() =>{
        const config = {
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }
        const res = await axios.get(tests.next,config)
        setTests(res.data)
    }
    const prev = async() =>{
        const config = {
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }
        const res = await axios.get(tests.previous,config)
        setTests(res.data)
    }
    const noTest=(
        <div>
            <h1>No Test available</h1>
        </div>
    )
    return (
        <div className="tests">
            <Head title="Tests"/>
            <h1>Tests</h1>
            <p>All tests are posted on this website will be displayed here on this page.</p>
            {tests.results.length ? getTests() : noTest}
            <div className="tests--navigation">
                {tests.previous ? <button onClick={()=> prev()}>Previous</button> : null}
                {tests.next ? <button onClick={()=> next()}>Next</button> : null}
            </div>
        </div>
    )
}

export default Tests
