import React, { Children, useEffect, useState, useId, useContext} from "react";
import { Routes, Route, Link } from 'react-router-dom';
import './style-Backlog.scss';
import './style-mainPage.scss';
import { Context } from "../../App";

import BlockForTasks from "../Blocks/BlockForTasks";
import DescriptionsBlock from "../description/informations";

const MainPage = ({...props}) => {

    const {lenghtTasks, setLenghtTasks} = useContext(Context);

    // Array for Tasks
    const [tasksBacklog, setTasksBacklog] = useState(()=> {
        return JSON.parse(localStorage.getItem('backlog')) || []
    });
    
    const [tasksReady, setTasksReady] = useState(()=> {
        return JSON.parse(localStorage.getItem('ready')) || []
    });

    const [tasksInPropgress, setTasksInPropgress] = useState(()=> {
        return JSON.parse(localStorage.getItem('in progress')) || []
    });
    const [tasksFinished, setTasksFinished] = useState(()=> {
        return JSON.parse(localStorage.getItem('finished')) || []
    });
    
    useEffect(()=>{
        setLenghtTasks(
            {
            active: `${tasksBacklog.length}`,
            finished: `${tasksFinished.length}`,
            }
        )
    },[tasksBacklog,tasksFinished])

    useEffect(()=> {
        // console.log(tasksBacklog);
        localStorage.setItem('backlog', JSON.stringify(tasksBacklog)) 
    }, [tasksBacklog]);
    
    useEffect(()=> {
        // console.log(tasksReady);
       localStorage.setItem('ready', JSON.stringify(tasksReady)) 
    }, [tasksReady]);
    
    useEffect(()=> {
       localStorage.setItem('in progress', JSON.stringify(tasksInPropgress)) 
    }, [tasksInPropgress]);

    useEffect(()=> {
       localStorage.setItem('finished', JSON.stringify(tasksFinished)) 
    }, [tasksFinished]);


    
    const [inputActive, setInputActive] = useState(false);
    const [inputvalue, setInputValue] = useState('');
    const [submitButton, setSubmitButton] = useState(false);
    const [validated, setValidated] = useState(false);

    // function for get new input-value backlog-block
    function getValueNewTask (e) {
        let newTaskName = e.currentTarget.value;
        setInputValue(newTaskName);
    };
    
    // function for view input backlog and write new Task
    function showInputBacklog() {
        setSubmitButton(!submitButton);
        setInputActive(!inputActive);
    };
    
    
    // function for add new task on list-Backlog
    function submitNewTaskBacklog() {
        
        if(inputvalue != "") {
            getNewArrayBlock(tasksBacklog,inputvalue,"backlog")
            
            localStorage.setItem('backlog', JSON.stringify(tasksBacklog));
        } 
        setInputValue('');
        setInputActive(!inputActive);
        setSubmitButton(!submitButton);
    };

    document.addEventListener('keypress',(e)=>{ 
       if(e.key === "Enter" && inputvalue !== "") {
        submitNewTaskBacklog()
       }
    });

    
    useEffect(()=> {
        inputvalue === ""? setValidated(false) : setValidated(true)
    },[inputvalue])

    useEffect(()=> console.log(`inputvalue is : ${inputvalue? inputvalue: "no value"}`),[inputvalue])
    // useEffect(()=> console.log(`Tasks is : ${tasksBacklog.length? JSON.stringify(tasksBacklog): "no tasks"}`),[tasksBacklog])
    useEffect(()=> console.log(`Submit button is ${submitButton}`),[submitButton])
    
    
    const [showSelectReady, setShowSelectReady] = useState(false);
    const [showSelectInProgress, setShowSelectInProgress] = useState(false);
    const [showSelectFinished, setShowSelectFinished] = useState(false);
    
    
    const [activeButtonReady, setActiveButtonReady] = useState(true);
    const [classNameForButtonReady, setClassNameForButtonReady] = useState('button_add');

    const [activeButtonInProgress, setActiveButtonInProgress] = useState(true);
    const [classNameForButtonInProgress, setClassNameForButtonInProgress] = useState('button_add');

    const [activeButtonFinished, setActiveButtonFinished] = useState(true);
    const [classNameForButtonFinished, setClassNameForButtonFinished] = useState('button_add');
    

    function getNewArrayBlock(arr,name,block,newDescriptions,id) {
        
        const dayTime = new Date();
        const elemId = id? id : Date.now() + 1;
        const informations = newDescriptions? 
        newDescriptions : 
        `Task added in block: "${block}" on time: ${dayTime.getHours()}:${dayTime.getMinutes() < 10? `0` + dayTime.getMinutes(): dayTime.getMinutes() } on day: ${dayTime.getDate()}.${dayTime.getMonth() + 1}.${dayTime.getFullYear()}`;
        
        const newArray = [...arr, {
            title: name,
            id: elemId,
            status: block,
            descriptions: informations,
        }]

        if(block === "backlog") {
            setTasksBacklog(newArray);
        } else if (block === "ready") {
            setTasksReady(newArray)
        } else if (block === "in progress") {
            setTasksInPropgress(newArray)
        } else if (block === 'finished') {
            setTasksFinished(newArray)
        }
    }
    
    function saveToLocalStorage(block, tasks) {
        localStorage.setItem(`${block}`, JSON.stringify(tasks));
    }

    function showSelectTasks(block) {
        if(block === 'ready') {
            setShowSelectReady(!showSelectReady)
        } 
        if(block === 'in progress') {
            setShowSelectInProgress(!showSelectInProgress)
        } 
        if(block === 'finished') {
            setShowSelectFinished(!showSelectFinished)
        } 
    }

    const [valueInfoTask,setValueInfoTask] = useState(()=>{
        return localStorage.getItem('infoTask')
    });
    useEffect(()=>{
        console.log(valueInfoTask)
        localStorage.setItem('infoTask',valueInfoTask)
    },[valueInfoTask])

    const [describtions, setDescribtions] = useState(()=>{
        return localStorage.getItem('description')
    });

    useEffect(()=>{
        console.log(describtions)
        localStorage.setItem('description',describtions)
    },[describtions])

    useEffect(()=>console.log(`selected tasks with information:` + valueInfoTask),[valueInfoTask])

    function getInformationsCurrentTask(array,value,tasks,selectedTasks,status){
        
        for(let i = 0; i < array.length; i++) {
            if(array[i].id == value) {
                setValueInfoTask(array[i].descriptions)
                localStorage.setItem('infoTask',array[i].descriptions)
                // setDescribtions(array[i].descriptions)
                getNewArrayBlock(tasks,selectedTasks,status,array[i].descriptions,value)
            }
            
        }


    }
    
    function SubmitNewReadyTask(e){
        
        let selectTask = e.target.textContent;
        let selectedId  = e.target.dataset.id;
        console.log(`data-set id Task - selected:` + selectedId);
        const filteredArray = tasksBacklog.filter((item) => selectedId != item.id);
        setTasksBacklog(filteredArray)
        getInformationsCurrentTask(tasksBacklog,selectedId,tasksReady,selectTask,'ready')
        
        // getNewArrayBlock(tasksReady,selectTask,"ready",valueInfoTask,selectedId)
        // getItemOfArray("ready",selectedId)
        
        saveToLocalStorage('ready', tasksReady)
        setShowSelectReady(!showSelectReady);
    };

    function SubmitNewInProgressTask(e){
        let selectTask = e.target.textContent;
        let selectedId = e.target.dataset.id;
        console.log(`data-set id Task - selected:` + selectedId);
        const filteredArray = tasksReady.filter((item) => selectedId != item.id);
        
        setTasksReady(filteredArray);
        getInformationsCurrentTask(tasksReady,selectedId,tasksInPropgress,selectTask,'in progress')
        // getNewArrayBlock(tasksInPropgress,selectTask,"in progress",valueInfoTask);
        // getInformationsCurrentTask(tasksReady,selectedId)

        saveToLocalStorage('in progress', tasksInPropgress)
        setShowSelectInProgress(!showSelectInProgress);
    };

    function SubmitNewFinishedTask(e){
        let selectTask = e.target.textContent;
        let selectedId = e.target.dataset.id;
        console.log(`data-set id Task - selected:` + selectedId);
        const filteredArray = tasksInPropgress.filter((item) => selectedId != item.id);
        
        setTasksInPropgress(filteredArray);
        getInformationsCurrentTask(tasksInPropgress,selectedId,tasksFinished,selectTask,'finished')
        // getInformationsCurrentTask(tasksInPropgress,selectedId)
        // getNewArrayBlock(tasksFinished,selectTask,"finished",valueInfoTask);
        
        saveToLocalStorage('finished', tasksFinished)
        setShowSelectFinished(!showSelectFinished);
    };

    useEffect(()=> {
        if(tasksBacklog.length !== 0) {
            setActiveButtonReady(false) 
            setClassNameForButtonReady('button_add active')
        } else {
            setActiveButtonReady(true)
            setClassNameForButtonReady('button_add')
        }
    },[tasksBacklog]);

    useEffect(()=> {
        if(tasksReady.length !== 0) {
            setActiveButtonInProgress(false) 
            setClassNameForButtonInProgress('button_add active')
        } else {
            setActiveButtonInProgress(true)
            setClassNameForButtonInProgress('button_add')
        }
    },[tasksReady]);

    useEffect(()=> {
        if(tasksInPropgress.length !== 0) {
            setActiveButtonFinished(false) 
            setClassNameForButtonFinished('button_add active')
        } else {
            setActiveButtonFinished(true)
            setClassNameForButtonFinished('button_add')
        }
    },[tasksInPropgress]);

    
    const [showDescribtions, setShowDescribtions] = useState(false);
    const [currentBlockElem, setCurrentBlockElem] = useState('');
    const [currentIdElem, setCurrentIdElem] = useState();
    const [currentArray, setCurrentArray] = useState();
    const [currentElementInTasks, setCurrentElementInTasks] = useState();
    const [nameCurrentTask,setNameCurrentTask] = useState();
    useEffect(()=>console.log(nameCurrentTask),[nameCurrentTask])
    useEffect(()=>console.log(`UseEffect: Current idElement is: ${currentIdElem}`),[currentIdElem])
    useEffect(()=> console.log(`currentArray is: ${JSON.stringify(currentArray)}`),[currentArray])
    useEffect(()=>console.log(currentElementInTasks),[currentElementInTasks])
    useEffect(()=>console.log(showDescribtions? "Information Tasks opened":"Information Tasks closed"),[showDescribtions])

    const openDescribtions = (e,block,id)=> {
        setCurrentIdElem(id)
        setShowDescribtions(!showDescribtions)
        setNameCurrentTask(e.target.textContent)
        console.log(`Click item id №: ` + id + `in block:` + block);
        getItemOfArray(block,id)
    }
    const closeBlockInfo = () => {
        setShowDescribtions(false)
      
           if(currentElementInTasks.descriptions === describtions) {
               return
           } else {
               const newFilter = currentArray.filter((item) => currentIdElem != item.id);
               console.log(newFilter);
                  
               return getNewArrayBlock(newFilter,nameCurrentTask,currentBlockElem,describtions,currentIdElem);
           }
       
    }

    const getItemOfArray = (block,id) => {
        let array;

        if(block == "backlog") {
            array = tasksBacklog;
            setCurrentArray(tasksBacklog);
            setCurrentBlockElem("backlog")
        } else if (block === "ready") {
            array = tasksReady;
            setCurrentArray(tasksReady);
            setCurrentBlockElem("ready")
        } else if (block === "in progress") {
            array = tasksInPropgress;
            setCurrentArray(tasksInPropgress);
            setCurrentBlockElem("in progress")
        } else if (block === 'finished') {
            array = tasksFinished;
            setCurrentArray(tasksFinished);
            setCurrentBlockElem("finished")
        }
        

        for(let i = 0; i < array.length; i++) {
            if(array[i].id == id) {
                setDescribtions(array[i].descriptions)
                return setCurrentElementInTasks(array[i]);
                
            }
        }
    }
    
    const handleChangeInfo = (e) => {
        let newInfo = e.target.value
        setDescribtions(newInfo)
        // setValueInfoTask(newInfo)
    }
    
    // const deleteAllTask = ()=> {
    //     localStorage.clear()
    // }
    
    return (
        <main>
        <div className="blocks">
        {/* <button className="delete" onClick={deleteAllTask}>Delete all tasks</button> */}
        <Routes>
        <Route path={`/tasks/${currentIdElem}`} element = {
             <DescriptionsBlock
                item =  {currentElementInTasks}
                saveInfo={closeBlockInfo}
                onChange = {(e)=>handleChangeInfo(e)}/>
            }
            />
        <Route path={`/`} element={
            <>
            <BlockForTasks
                 classNameButtonSubmit = {validated ? "submit_button validated" : "submit_button"}
                 classNameButtonAdd = {'button_add backlog'}
                 tasks={tasksBacklog}
                 title={"Backlog"}
                 inputActive={inputActive}
                 handleChangeInput={(e)=>getValueNewTask(e)}
                 valueInputNewTask={inputvalue}
                 submit={submitButton}
                 handleClickButtonAdd={showInputBacklog}
                 handleClickButtonSubmit={(e)=>submitNewTaskBacklog(e)}
                 saveInfo={closeBlockInfo}
                 handleChange = {(e)=>handleChangeInfo(e)}
                 openDescriptions={openDescribtions}
                 showDescribtions={showDescribtions}
                 item = {currentElementInTasks}
                 selectedIdElement = {currentIdElem}
                 ></BlockForTasks>
             
            <BlockForTasks
                 tasks={tasksReady}
                 tasksSelect={tasksBacklog}
                 title={"Ready"}
                 submit={false}
                 disabledButton = {activeButtonReady}
                 showSelect={showSelectReady}
                 handleSelectTask={(e)=>SubmitNewReadyTask(e)}
                 handleClickButtonAdd={activeButtonReady? null: ()=>showSelectTasks('ready')}
                 classNameButtonAdd={classNameForButtonReady}
                 saveInfo={()=>setShowDescribtions(false)}
                 openDescriptions={openDescribtions}
                 showDescribtions={showDescribtions}
                 item = {currentElementInTasks}
                 array = {currentArray}
                 selectedIdElement = {currentIdElem}
                 />
 
            <BlockForTasks
                 tasks={tasksInPropgress}
                 tasksSelect={tasksReady}
                 title={"In Progress"}
                 submit={false}
                 disabledButton = {activeButtonInProgress}
                 showSelect={showSelectInProgress}
                 handleSelectTask={SubmitNewInProgressTask}
                 handleClickButtonAdd={activeButtonInProgress? null: ()=>showSelectTasks('in progress')}
                 classNameButtonAdd={classNameForButtonInProgress}
                 saveInfo={()=>setShowDescribtions(false)}
                 openDescriptions={openDescribtions}
                 showDescribtions={showDescribtions}
                 item = {currentElementInTasks}
                 array = {currentArray}
                 selectedIdElement = {currentIdElem}
                 />
 
            <BlockForTasks
                 tasks={tasksFinished}
                 tasksSelect={tasksInPropgress}
                 title={"Finished"}
                 submit={false}
                 disabledButton = {activeButtonFinished}
                 showSelect={showSelectFinished}
                 handleSelectTask={SubmitNewFinishedTask}
                 handleClickButtonAdd={activeButtonFinished? null: ()=>showSelectTasks('finished')}
                 classNameButtonAdd={classNameForButtonFinished}
                 saveInfo={()=>setShowDescribtions(false)}
                 openDescriptions={openDescribtions}
                 showDescribtions={showDescribtions}
                 item = {currentElementInTasks}
                 array = {currentArray}
                 selectedIdElement = {currentIdElem}
                 />
            </>

        }/>
           
        </Routes>
        </div>
    </main>
    )
}

export default MainPage;
