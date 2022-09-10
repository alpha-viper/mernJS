import React, { Component } from 'react'

export default class Todo extends Component {

    constructor()
    {
        super();
        this.state={
            tasks: [
                {id:1,task:"Revise JS"},
                {id:2,task:"Revise DSA"}
            ],
            currTask:"",
        }
    }

    handleChange=(e)=>{
      console.log(e.target.value);
      this.setState({
        currTask:e.target.value,
      })
    }
    handleSubmit=()=>{
      this.setState({
        tasks:[...this.state.tasks,{task:this.state.currTask,id:this.state.tasks.length+1}]
      })
    }

    handleDeleteTasks = (id) => {
      // let narr = [];
      let narr = this.state.tasks.filter((taskObj)=>{
        return taskObj.id != id;
      });
      this.setState({
        tasks: [...narr],
      });
    };
  
  render() {
    return (
      //<div>Todo</div>
      <div>
        <input type="text" onChange={this.handleChange}/>
        <button onClick={this.handleSubmit}>Submit</button>
        { //use when we need to write JS in JSX
            this.state.tasks.map((taskObj)=>{
                return(
                  <li key={taskObj.id}>
                  <p>{taskObj.task}</p>
                  <button onClick={() => this.handleDeleteTasks(taskObj.id)}>
                    Delete
                  </button>
                </li>
                )
            })

        }
      </div>
    )
  }
}
